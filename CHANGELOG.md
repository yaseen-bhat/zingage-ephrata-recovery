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

## 003 — October 11, 2026, 1:40 PM PDT — Correct precision and calendar guards

**Files:** `build/build_workbook.mjs`, `ten_day_operating_plan.xlsx`, `verification/calculation_tests.json`, `.gitignore`.

**Change:** Display all hour figures to two decimals so 0.75h and 0.25h blocks remain exact. Separate date labels from names, give effort descriptions adequate row height, and reject duplicate/nonsequential business dates. Flag a source ceiling increased beyond the supplied Head/CSM/engineer limits. Exclude the local dependency symlink from Git.

**Why:** Rounded display hours can obscure schedule feasibility, and duplicate dates must not appear to create extra daily capacity.

**Validation:** Twelve mutation tests passed, including duplicate-date and increased-source-capacity cases. No formula errors. XLSX export/reimport passed. Reviewed rendered views from every tab, including initial and final schedule sections; changed hour precision and date separation are legible. Reviewed all source references. No account allocation changed in this entry.

## 004 — October 11, 2026, 1:44 PM PDT — Adopt the approved leaner observation allocation

**Files:** `ephrata_diagnosis.md`, `ephrata_handoff.md`, `build/plan.mjs`, `build/build_workbook.mjs`, `ten_day_operating_plan.xlsx`, `verification/calculation_tests.json`, `verification/capacity_inspection.ndjson`.

**Change:** Reduced Priya's five-day observation budget from 14h to 6h: 2h on September 14 and 1h on September 15–18. Diego retains 5h for daily evidence collection. Ephrata falls from 55h to 47h, Priya's Ephrata effort from 28h to 20h, and the nonengineering contingency reserve rises from 22h to 30h. Durant, Medford, engineering, protected queue coverage, and acceptance criteria are unchanged.

**Why:** The user approved the leaner allocation after we identified overlapping collection and review effort. Preserve verification while keeping eight additional strategist hours available for exceptions.

**Validation:** Rebuilt and reconciled all 69 work records. Twelve mutation tests passed; no formula errors; XLSX export/reimport passed. Reviewed the revised Capacity views showing 47h for Ephrata and 30h nonengineering reserve. The nine-hour engineering ceiling still limits diagnosis, correction, and retesting together.
