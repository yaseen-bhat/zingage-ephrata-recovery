# Update log

Times use America/Los_Angeles. Git history supplies exact commit times and file diffs. Entries describe meaningful file changes, including corrections made during verification.

## 001 — October 11, 2026, 1:21 PM PDT — Establish evidence and execution baseline

**Files:** `ephrata_diagnosis.md`, `ephrata_handoff.md`, `README.md`, `.gitignore`, `references/*.md`.

**Change:** Created the diagnosis, capacity decision, six-stage Ephrata handoff, commitment ledger, proposed acceptance tests, contingency rules, and unsent customer drafts. Added unchanged reference copies and initialized a new repository on `main`.

**Why:** Turn the framework into an executable proposal while preserving the difference between observed evidence and future work.

**Major decisions:** Allocate 55h Ephrata, 10h Durant, 5h Medford, 5.5h shared coordination, and 14h protected coverage. Leave 22 nonengineering hours unallocated and preserve Nate's remaining 15h for the wider account book. Treat the 36h/25h strategist split and daily capacity as assumptions. Fund only the minimum 3h routing review and 6h WellSky audit; do not assume a repair can fit.

**Validation:** Reread all three source files. Manually reconciled the account/person totals and ten-business-day calendar. Workbook calculation and mutation tests are pending; no live customer operation is verified.

## 002 — October 11, 2026, 1:37 PM PDT — Build the live capacity workbook

**Files:** `ten_day_operating_plan.xlsx`, `build/plan.mjs`, `build/build_workbook.mjs`, `verification/calculation_tests.json`, `verification/capacity_inspection.ndjson`, `verification/formula_error_scan.ndjson`, `.gitignore`, `README.md`.

**Change:** Added four workbook tabs: Capacity, Daily plan, Work log, and Inputs. Created 69 individually budgeted work records, 60 day/person/scope capacity rows, source references, protected coverage, deferred-work consequences, milestone checks, status fields, and actual-evidence fields. Added the reproducible builder and plan inputs.

**Why:** Prove the proposed allocation fits and expose conflicts when inputs change, rather than relying on a static capacity table.

**Validation:** Ten meaningful mutation tests passed: engineering overage, coverage reduction, window capacity reduction, daily capacity reduction, missing evidence, blocked-without-next-step, missing capacity, out-of-window work, changed final service date, and zero coverage. No formula errors were found. XLSX export/reimport preserved the totals and base checks. Excel desktop was not opened. Visual review identified quarter-hour rounding and a need to strengthen calendar-sequence guards; these corrections follow in entry 003.
