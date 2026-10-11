# Ephrata recovery package

This repository holds the proposed operating plan for the September 8–21, 2026 simulation and its supporting build materials. Submission deadline: October 11, 2026, 3:00 PM PDT.

The final `ephrata_recovery_package.zip` contains:

- `ephrata_diagnosis.md`
- `ten_day_operating_plan.xlsx`
- `ephrata_handoff.md`

The diagnosis separates recorded facts from hypotheses. The workbook is the capacity ledger and day-by-day schedule. The handoff identifies actions, owners, prerequisites, evidence, customer communication drafts, and escalation boundaries.

The completed allocation is 47h Ephrata, 10h Durant, 5h Medford, 5.5h shared coordination, and 14h protected queue coverage. Thirty nonengineering hours remain contingency; Nate's other 15h are preserved for the wider account book. The package is ready for review and submission before the user's 3:00 PM deadline.

## Status and assumptions

All deployment actions remain proposed. No live account repair, customer message, offboarding action, or restart has been performed in the simulation.

The sourced limits are 7.5 Head hours, 61 combined strategist hours, 34 CSM hours with at least 14 protected for queue coverage, and 24 engineering hours across the wider account book with at most 9 for Ephrata without escalation. The individual strategist split and daily availability are proposed, subject to Day 1 confirmation.

## Traceability

`CHANGELOG.md` records each meaningful change, affected files, rationale, and validation. Each change group is committed separately so its preceding version can be recovered. `references/` contains unchanged copies of the three supplied Markdown files; the originals are untouched. `build/` holds the workbook's reproducible inputs and builder. `verification/` records the checks actually performed.

Source and artifact copies are for the private repository. Customer communication in the handoff consists of unsent drafts.

## Google Doc playbook

The original [Zingage FDE Framework](https://docs.google.com/document/d/1w_PuN2WxMAgreZP6yWOCIpCCSME-YPLaa43CS9UbwOg) has the complete three-source Markdown context in its first tab and a completed **Ten-day operating playbook** tab. The original framework and the user's Step 1 draft are preserved. `build/google_doc_playbook.json` retains the exact completed playbook text and heading structure; `verification/google_doc_update.json` records the native document revision and readback checks. The attached Library export was not edited and no duplicate native document was created.

## Rebuild and verification

The workbook is authored with Codex's bundled `@oai/artifact-tool` runtime. With that dependency available, run `build/build_workbook.mjs` using its bundled Node executable. The builder recalculates the workbook, tests representative input changes and restores them, exports and reimports the XLSX, and produces visual previews. Previews and dependencies are not committed. Verification results are committed in `verification/`.

Twelve input-change tests passed, with no formula errors. All four tabs received visual review. `verification/release_checks.json` records the required file names, exact ZIP-byte verification, artifact hashes, unchanged source-copy checks, and native Google Doc readback. Excel desktop was not opened, and no live account outcome is claimed. Run `build/package_release.py` with Python to reproduce the archive from the three final deliverables. The ZIP contains only those required files at its root; supporting references and build/verification materials remain in the repository.
