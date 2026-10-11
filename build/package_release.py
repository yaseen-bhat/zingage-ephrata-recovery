"""Package the deliverables, narrative, and linked supporting material."""

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

support = ["README.md", "CHANGELOG.md"]
for directory in ["references", "build", "verification"]:
    for item in sorted((ROOT / directory).iterdir()):
        if item.is_file() and item.name not in {"release_checks.json", "package_checksum.json"}:
            support.append(item.relative_to(ROOT).as_posix())
for name in support:
    payloads[name] = (ROOT / name).read_bytes()
assert "references/fde_thought_process.txt" in payloads
assert not any("node_modules" in name or "previews" in name or name.startswith("~$") for name in payloads)

report = {
    "checked_at": datetime.now(timezone.utc).isoformat(),
    "package": PACKAGE.name,
    "required_deliverables_at_root": True,
    "updated_readme_included": True,
    "linked_supporting_material_included": True,
    "payload_hashes_exclude_this_manifest": True,
    "crc_and_exact_bytes_passed": True,
    "deliverables": [{"name": name, "bytes": len(payloads[name]), "sha256": digest(payloads[name])} for name in DELIVERABLES],
    "supporting_files": [{"name": name, "bytes": len(payloads[name]), "sha256": digest(payloads[name])} for name in support],
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
payloads["verification/release_checks.json"] = (ROOT / "verification/release_checks.json").read_bytes()

# The archive contains the manifest. Its own hash lives outside the archive
# to avoid a self-referential checksum.
with ZipFile(PACKAGE, "w", compression=ZIP_DEFLATED, compresslevel=9) as archive:
    for name, payload in payloads.items():
        entry = ZipInfo(name, date_time=(2026, 10, 11, 0, 0, 0))
        entry.compress_type = ZIP_DEFLATED
        entry.external_attr = 0o644 << 16
        archive.writestr(entry, payload, compress_type=ZIP_DEFLATED, compresslevel=9)

with ZipFile(PACKAGE) as archive:
    assert archive.namelist() == list(payloads)
    assert archive.testzip() is None
    assert all(archive.read(name) == payload for name, payload in payloads.items())
    manifest = json.loads(archive.read("verification/release_checks.json"))
    for item in manifest["deliverables"] + manifest["supporting_files"]:
        assert digest(archive.read(item["name"])) == item["sha256"]
    import re
    for target in re.findall(r"\]\(([^)]+)\)", archive.read("README.md").decode("utf-8")):
        if target.startswith("https://"):
            continue
        assert target in payloads or any(name.startswith(target.rstrip("/") + "/") for name in payloads), target

checksum = {
    "checked_at": report["checked_at"],
    "package": PACKAGE.name,
    "package_sha256": digest(PACKAGE.read_bytes()),
    "package_bytes": PACKAGE.stat().st_size,
    "archive_file_count": len(payloads),
    "required_deliverables_at_root": True,
    "updated_readme_included": True,
    "all_embedded_bytes_and_manifest_hashes_verified": True,
    "all_local_readme_links_resolve_inside_archive": True,
}
(ROOT / "verification/package_checksum.json").write_text(json.dumps(checksum, indent=2) + "\n")
print(json.dumps(checksum, indent=2))
