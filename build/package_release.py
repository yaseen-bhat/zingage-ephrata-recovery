"""Package the three required deliverables and verify their exact archive bytes."""

from datetime import datetime, timezone
from hashlib import sha256
import json
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile, ZipInfo
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
DELIVERABLES = [
    "ephrata_diagnosis.md",
    "ten_day_operating_plan.xlsx",
    "ephrata_handoff.md",
]
PACKAGE = ROOT / "ephrata_recovery_package.zip"


def digest(data):
    return sha256(data).hexdigest()


calculation = json.loads((ROOT / "verification/calculation_tests.json").read_text())
expected_totals = {"Ephrata": 47, "Durant": 10, "Medford": 5, "Portfolio": 5.5, "Coverage": 14}
assert calculation["sourceTotals"] == expected_totals
assert calculation["personTotals"] == {
    "Head of Deployment & Customer Ops": 6.5,
    "Priya Chandrasekaran": 23,
    "Jordan Kwan": 15,
    "Diego Marsh": 28,
    "Nate Osei": 9,
}
assert len(calculation["tests"]) == 12
assert all(test["observed"]["pass"] for test in calculation["tests"])
assert all(value == "OK" for value in calculation["baseChecks"])
document = json.loads((ROOT / "verification/google_doc_update.json").read_text())
assert document["content_matches"] and document["eleven_step_headings"] == 11
assert document["first_tab_reference_context_preserved"] and document["original_framework_preserved"]
assert all(source["full_context_present"] for source in document["first_tab_sources"])

references = []
for reference in sorted((ROOT / "references").glob("*.md")):
    original = Path("/Users/yaseenbhat/Downloads") / reference.name
    assert original.read_bytes() == reference.read_bytes(), reference.name
    references.append({"name": reference.name, "sha256": digest(reference.read_bytes()), "original_unchanged": True})
assert len(references) == 3

namespace = {"s": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
with ZipFile(ROOT / "ten_day_operating_plan.xlsx") as workbook:
    assert workbook.testzip() is None
    native = ET.fromstring(workbook.read("xl/workbook.xml"))
    sheets = [sheet.attrib["name"] for sheet in native.findall("s:sheets/s:sheet", namespace)]
    assert sheets == ["Capacity", "Daily plan", "Work log", "Inputs"]
    worksheet_names = [name for name in workbook.namelist() if name.startswith("xl/worksheets/sheet") and name.endswith(".xml")]
    formula_count = sum(len(ET.fromstring(workbook.read(name)).findall(".//s:f", namespace)) for name in worksheet_names)
    assert formula_count > 200
    native_calculation = native.find("s:calcPr", namespace)
    assert native_calculation is None or native_calculation.attrib.get("calcMode", "auto") != "manual"

payloads = {name: (ROOT / name).read_bytes() for name in DELIVERABLES}
for name, payload in payloads.items():
    assert payload, name
    if name.endswith(".md"):
        text = payload.decode("utf-8")
        assert "47" in text and "proposed" in text.lower()

# Stable ZIP entry times keep identical artifact bytes reproducible.
with ZipFile(PACKAGE, "w", compression=ZIP_DEFLATED, compresslevel=9) as archive:
    for name in DELIVERABLES:
        entry = ZipInfo(name, date_time=(2026, 10, 11, 0, 0, 0))
        entry.compress_type = ZIP_DEFLATED
        entry.external_attr = 0o644 << 16
        archive.writestr(entry, payloads[name], compress_type=ZIP_DEFLATED, compresslevel=9)

with ZipFile(PACKAGE) as archive:
    assert archive.namelist() == DELIVERABLES
    assert archive.testzip() is None
    assert all(archive.read(name) == payloads[name] for name in DELIVERABLES)

report = {
    "checked_at": datetime.now(timezone.utc).isoformat(),
    "package": PACKAGE.name,
    "package_sha256": digest(PACKAGE.read_bytes()),
    "package_bytes": PACKAGE.stat().st_size,
    "required_files_at_root_only": True,
    "crc_and_exact_bytes_passed": True,
    "deliverables": [{"name": name, "bytes": len(payload), "sha256": digest(payload)} for name, payload in payloads.items()],
    "allocation_hours": expected_totals,
    "nonengineering_contingency_hours": 30,
    "engineering_hours_preserved_for_wider_book": 15,
    "mutation_tests_passed": 12,
    "base_formula_checks_passed": len(calculation["baseChecks"]),
    "formula_count_in_export": formula_count,
    "workbook_tabs": sheets,
    "native_excel_opened": False,
    "live_customer_workflows_executed": False,
    "references": references,
    "google_doc_revision": document["revision_id"],
    "google_doc_readback_passed": True,
}
(ROOT / "verification/release_checks.json").write_text(json.dumps(report, indent=2) + "\n")
print(json.dumps({key: report[key] for key in ["package", "package_sha256", "package_bytes", "required_files_at_root_only", "crc_and_exact_bytes_passed", "mutation_tests_passed", "formula_count_in_export"]}, indent=2))
