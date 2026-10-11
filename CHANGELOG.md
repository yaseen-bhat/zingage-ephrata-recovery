# Update log

Times use America/Los_Angeles. Git history supplies exact commit times and file diffs. Entries describe meaningful file changes, including corrections made during verification.

## 001 — October 11, 2026, 1:22 PM PDT — Establish evidence and execution baseline

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

## 003 — October 11, 2026, 1:39 PM PDT — Correct precision and calendar guards

**Files:** `build/build_workbook.mjs`, `ten_day_operating_plan.xlsx`, `verification/calculation_tests.json`, `.gitignore`.

**Change:** Display all hour figures to two decimals so 0.75h and 0.25h blocks remain exact. Separate date labels from names, give effort descriptions adequate row height, and reject duplicate/nonsequential business dates. Flag a source ceiling increased beyond the supplied Head/CSM/engineer limits. Exclude the local dependency symlink from Git.

**Why:** Rounded display hours can obscure schedule feasibility, and duplicate dates must not appear to create extra daily capacity.

**Validation:** Twelve mutation tests passed, including duplicate-date and increased-source-capacity cases. No formula errors. XLSX export/reimport passed. Reviewed rendered views from every tab, including initial and final schedule sections; changed hour precision and date separation are legible. Reviewed all source references. No account allocation changed in this entry.

## 004 — October 11, 2026, 1:43 PM PDT — Adopt the approved leaner observation allocation

**Files:** `ephrata_diagnosis.md`, `ephrata_handoff.md`, `build/plan.mjs`, `build/build_workbook.mjs`, `ten_day_operating_plan.xlsx`, `verification/calculation_tests.json`, `verification/capacity_inspection.ndjson`.

**Change:** Reduced Priya's five-day observation budget from 14h to 6h: 2h on September 14 and 1h on September 15–18. Diego retains 5h for daily evidence collection. Ephrata falls from 55h to 47h, Priya's Ephrata effort from 28h to 20h, and the nonengineering contingency reserve rises from 22h to 30h. Durant, Medford, engineering, protected queue coverage, and acceptance criteria are unchanged.

**Why:** The user approved the leaner allocation after we identified overlapping collection and review effort. Preserve verification while keeping eight additional strategist hours available for exceptions.

**Validation:** Rebuilt and reconciled all 69 work records. Twelve mutation tests passed; no formula errors; XLSX export/reimport passed. Reviewed the revised Capacity views showing 47h for Ephrata and 30h nonengineering reserve. The nine-hour engineering ceiling still limits diagnosis, correction, and retesting together.

## 005 — October 11, 2026, 1:46 PM PDT — Complete the native Google Doc playbook

**Files / external document:** `build/google_doc_playbook.json`, `verification/google_doc_update.json`, `README.md`; original Zingage FDE Framework Google Doc, new `Ten-day operating playbook` tab.

**Change:** Added the completed eleven-step case playbook, making Step 7 the central allocation decision. Included the approved 47-hour recovery budget, individual/day assumptions, ten-day sequence, technical stop rules, deferrals, customer outcome gates, operating ownership, and actual artifact-validation limits. Retained exact playbook text and heading structure in the repository for recovery. The first tab contains the three full Markdown references previously consolidated into the original Doc; the original framework and user draft remain intact.

**Why:** Make the framework usable as an operating plan and preserve the user's source context and own working draft. Keep artifact checks distinct from live deployment results.

**Validation:** Revision-guarded native edit succeeded. Readback matched all 61 authored paragraphs and all eleven step headings. Before/after text, indexes, and heading styles matched for the first tab and original framework. No duplicate native document or attached Library-file edit. The completed playbook includes a September 18 service-cutoff confirmation before Durant deactivation; this execution detail will also be reflected in the local handoff and workbook before packaging.

## 006 — October 11, 2026, 1:47 PM PDT — Protect Durant's final-day service cutoff

**Files:** `ephrata_handoff.md`, `build/plan.mjs`, `ten_day_operating_plan.xlsx`, `verification/calculation_tests.json`.

**Change:** Require confirmation of the authorized September 18 cutoff before Durant's documented deactivation and retain evidence that service was not ended early. Reflect the same prerequisite in the local handoff and workbook as in the native playbook. No hours or dates changed.

**Why:** The record supplies a final service date, but no time of day. Avoid treating a scheduled deactivation date as permission to stop service before the authorized cutoff.

**Validation:** Rebuilt the affected workbook. The same twelve mutation tests and XLSX export/reimport passed, with no formula errors. Account totals remain 47h Ephrata, 10h Durant, 5h Medford, 5.5h shared coordination, and 14h protected coverage.

## 007 — October 11, 2026, 1:48 PM PDT — Package and verify the submission snapshot

**Files:** `ephrata_recovery_package.zip`, `build/package_release.py`, `verification/release_checks.json`, `README.md`.

**Change:** Created the final archive with exactly the three required deliverables at its root. Added repeatable packaging and a verification report containing each artifact's SHA-256 hash, package hash, allocation totals, source-copy checks, and Google Doc revision. Documented the final allocation and validation limits in the README.

**Why:** Deliver a concrete submission package that can be traced to this repository version and checked independently. Keep supporting reference/build files outside the required submission archive.

**Validation:** ZIP names, CRCs, and exact embedded bytes passed. All three source copies match the unchanged Downloads originals. The exported workbook has four named tabs and 507 formulas; calculation mode is not manual. Twelve input-change tests and eleven base checks passed. Native Doc readback matched the playbook and confirmed both existing tabs preserved. Reviewed the final cutoff prerequisite/evidence cells for legibility. Confirmed the GitHub repository is private with `main` as default. Excel desktop and live customer workflows were not executed. This commit is the submission snapshot; the final push is verified against its commit ID.

## 008 — October 11, 2026, 1:49 PM PDT — Align update times with Git history

**Files:** `CHANGELOG.md`.

**Change:** Corrected the minute labels for entries 001, 003, 004, 006, and 007 to their actual commit minute and added the exact commit map below. No deliverable, allocation, archive, or native document changed.

**Why:** Use recorded Git times for traceability instead of estimated drafting times.

**Validation:** Read the local Git history and verified that the submission snapshot `a80c493545b02dbecb73e2bcde55aab7be251582` matches the remote `main` commit. The ZIP remains the verified package from entry 007.

## 009 — October 11, 2026, 2:28 PM PDT — Rewrite the README around the user's reasoning and AI workflow

**Files:** `README.md`, `references/fde_thought_process.txt`, `verification/readme_consistency.json`, `.gitignore`.

**Change:** Replaced the artifact inventory with a condensed first-person narrative covering the customer's goal, evidence discipline, workflow traces, uncertainties, intervention choice, capacity tradeoffs, execution, acceptance, and independent use. Explicitly state that the user first created a Google Doc and broke the problem down into granular steps, then had AI interpret those notes together with the original account/capacity files to produce the deliverables. Credit AI's implementation/validation and the user's review and allocation decisions. Preserve the full pasted thought process unchanged as a reference. Exclude Excel's temporary owner/lock file from version control; do not delete it or edit the live workbook.

**Why:** Showcase how the user reasoned from the problem to the final proposal, while accurately describing the collaboration and the results. The user directed us to optimize for the final result and ensure the README matches the deliverables.

**Decisions / corrections:** Keep the approved 10h Durant and 5h Medford totals, including leadership time, rather than the pasted draft's 9h/6h split. Describe Medford's response and proposal as funded, proposed actions rather than completed customer work. Do not imply that every Planned work record already has a completed next-step/evidence field.

**Validation:** Condensed 4,848 source words to 1,548 README words. Read the exported workbook: all 69 work records match the build inputs and remain Planned; account totals, person totals, 30h reserve, and eleven base checks match. Confirmed the twelve prior input-change tests passed. Cross-checked memo owners, dates, authority boundaries, and acceptance conditions. All nine local README links resolve. The source copy matches the attachment exactly. ZIP hash and all embedded deliverable bytes remain unchanged and valid. No customer operation, new allocation, or Google Doc edit was performed in this change.

## 010 — October 11, 2026, 2:38 PM PDT — Refresh the downloadable submission with the narrative

**Files:** `README.md`, `build/package_release.py`, `verification/readme_consistency.json`, `verification/release_checks.json`, `verification/package_checksum.json`, `ephrata_recovery_package.zip`.

**Change:** Extend the archive to include the rewritten README and its linked references, change log, build materials, and verification records alongside the three required deliverables. Update the README's package description and preserve the earlier three-file checksum as explicitly historical evidence. Include a payload-hash manifest in the ZIP and store the ZIP's own checksum separately to avoid a self-referential hash. Exclude temporary Excel files, dependencies, previews, and Git metadata.

**Why:** The user requested the updated submission download after completing the reasoning narrative. A reader opening the package should receive that narrative and be able to follow its local links.

**Validation:** Packaging verifies all embedded file bytes, CRCs, manifest hashes, required root-level deliverables, and local README links. The operating allocations and the three core deliverables are unchanged from the approved result. No new workbook authoring or live customer operation is performed.

## Commit map

| Entry | Commit | Committed at (PDT) |
| --- | --- | --- |
| 001 | `4e6693b` | October 11, 2026, 1:22:18 PM |
| 002 | `7052336` | October 11, 2026, 1:37:26 PM |
| 003 | `0066a20` | October 11, 2026, 1:39:57 PM |
| 004 | `6cde895` | October 11, 2026, 1:43:24 PM |
| 005 | `6223d4c` | October 11, 2026, 1:46:22 PM |
| 006 | `f7f7b91` | October 11, 2026, 1:47:44 PM |
| 007 | `a80c493` | October 11, 2026, 1:48:43 PM |

Entry 008 is the commit containing this map; its exact ID and time are available in Git history. The submission archive is unchanged from entry 007.
