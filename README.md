# Ephrata recovery package

This repository holds the proposed operating plan for the September 8–21, 2026 simulation and its supporting build materials. Submission deadline: October 11, 2026, 3:00 PM PDT.

The final `ephrata_recovery_package.zip` contains:

- `ephrata_diagnosis.md`
- `ten_day_operating_plan.xlsx`
- `ephrata_handoff.md`

The diagnosis separates recorded facts from hypotheses. The workbook is the capacity ledger and day-by-day schedule. The handoff identifies actions, owners, prerequisites, evidence, customer communication drafts, and escalation boundaries.

## Status and assumptions

All deployment actions remain proposed. No live account repair, customer message, offboarding action, or restart has been performed in the simulation.

The sourced limits are 7.5 Head hours, 61 combined strategist hours, 34 CSM hours with at least 14 protected for queue coverage, and 24 engineering hours across the wider account book with at most 9 for Ephrata without escalation. The individual strategist split and daily availability are proposed, subject to Day 1 confirmation.

## Traceability

`CHANGELOG.md` records each meaningful change, affected files, rationale, and validation. Each change group is committed separately so its preceding version can be recovered. `references/` contains unchanged copies of the three supplied Markdown files; the originals are untouched. `build/` holds the workbook's reproducible inputs and builder. `verification/` records the checks actually performed.

Source and artifact copies are for the private repository. Customer communication in the handoff consists of unsent drafts.

## Rebuild and verification

The workbook is authored with Codex's bundled `@oai/artifact-tool` runtime. With that dependency available, run `build/build_workbook.mjs` using its bundled Node executable. The builder recalculates the workbook, tests representative input changes and restores them, exports and reimports the XLSX, and produces visual previews. Previews and dependencies are not committed. Verification results are committed in `verification/`.
