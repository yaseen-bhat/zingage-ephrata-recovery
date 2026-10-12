# Ephrata executable recovery handoff

**As of:** September 8, 2026. **Window:** September 8–21, 2026. **Account contact:** Carol Ann Frees, Owner/Administrator. **Outcome owner:** Priya Chandrasekaran. **Technical owner:** Nate Osei. **Support owner:** Diego Marsh. **Peer review / backup:** Jordan Kwan. **Capacity and escalation owner:** Head of Deployment & Customer Ops.

**Current status:** HS-48251 is open, high priority, and not yet triaged to engineering in the supplied record. The plan below is proposed. No email has been sent, configuration changed, offboarding completed, or recovery accepted as part of this simulation.

## Start here

1. Read `ephrata_diagnosis.md` and the three dated source files. Use `ten_day_operating_plan.xlsx` as the allocation ledger.
2. Confirm the proposed Priya/Jordan 36/25-hour split and daily availability with the team on September 8. The supplied ceiling is 61 combined hours. Confirm Nate's three 3-hour blocks on September 9–11. If unavailable, move work within the actual ceiling and recheck every daily limit before presenting dates to customers.
3. Keep Diego's 14 queue-coverage hours protected. Do not move them to project work. Protect Durant's 9-hour strategist/CSM offboarding allocation and September 18 service date.
4. Set up HS-48251 as the parent recovery record linking HS-48192, HS-48193, and HS-48197. Proposed child workstreams: availability, routing, adoption, and customer outcome. These workstreams do not already exist in the source record.

## Commitment ledger

| Account | Already in the record | How this plan treats it |
| --- | --- | --- |
| Ephrata | Purchased automatic availability, current-roster routing, and morning relief; team previously communicated ticket closure; no new fix-by date or credit is documented | Acknowledge recurrence and schedule a bounded verification conversation. Keep fix dates, credits, and new service guarantees uncommitted pending approval |
| Durant | September 18 final service date agreed August 26 and restated September 2; export targeted September 11; invoice through September 18; integration/agents deactivated September 18 | Preserve the date. Execute export and validation first. Any date change goes to the service/contract authority through the Head |
| Medford | Jordan promised scheduling times early the following week on August 28; no reply to September 4 follow-up by the September 8 snapshot; customer board review September 22 | Acknowledge the missed response, conduct scoping, and provide a proposal. No restart, pricing, term, or scope change is already agreed |

All dates below other than existing Durant commitments and the customer's board date are internal planning dates. Customer-facing language must call them checkpoints or proposals, not guaranteed repair milestones.

Before Durant deactivation, Jordan confirms the authorized September 18 service cutoff within the documented exit plan; Diego preserves service until that cutoff. The source specifies the date, not a time of day. A cutoff that changes the agreed final service date requires approval through the Head.

## Resource envelope

Ephrata has 47 scheduled hours: Head 4, Priya 20, Jordan 4, Diego 10, Nate 9. Cross-account coordination is budgeted separately: Head 0.5, Priya 3, Jordan 2. There is no added engineer and no staffed weekend or overnight monitoring shift. The unallocated 30 nonengineering hours across the three accounts may absorb work only after the Head reassigns a named owner/date and the workbook checks pass. Nate's other 15 hours remain available to the wider account book, not to this recovery without escalation.

Nate's 3-hour routing review and 6-hour WellSky audit are lower-bound timeboxes from the supplied ranges. Budget evidence and test work before any correction. At the end of each block, log hours consumed, forecast hours remaining, and the next decision. Do not exceed 9 hours to finish a test or to attempt a speculative repair.

## Sequence, dependencies, and completion evidence

| ID / internal due date | Owner and scheduled effort | Action / prerequisite | Completion evidence and next step |
| --- | --- | --- | --- |
| E1 — Sep 8 | Priya 3h; Head 1h; Diego 1h | Priya spends 2–3h on root-cause triage and initial incident collection. Request affected caregiver IDs, shift-end times, prior manual interventions, call timestamps, and the approved current roster. Diego pulls the adoption evidence. Confirm access and authorized test recipients | Incident packet in HS-48251; known/unknown list; customer reply/check-in proposed; then E2 |
| E2 — Sep 9 | Nate 3h; Priya 3h; Diego 1h; Head 0.75h | Routing first because recurrent calls are going to the wrong person. Compare approved September roster with Riley, effective times, time zone, fallback, and actual call trace. Arrange non-disruptive tests with agreed recipients. Diego performs targeted adoption outreach | Trace of a reported call or documented access gap; configuration difference; controlled after-hours/rotation/fallback cases with results; no unapproved workaround. Forecast remaining work, then E3 |
| E3 — Sep 10 | Nate 3h; Priya 3h; Diego 1h; Jordan 1h; Head 0.25h | Trace affected caregiver event generation, IDs, mapping, job timing, permissions, write response, and persistence. Compare to a successful compliant-caregiver case. Jordan peer-reviews the test design | Evidence ties every case to expected/actual state; missing event vs rejected write vs wrong mapping distinguished where observable; then E4 |
| E4 — Sep 11 | Nate 3h; Priya 3h; Diego 1h; Head 0.5h | Finish the 6h WellSky audit; test exception/retry and persistence paths as feasible. A reversible configuration correction is allowed only if authorized, supported by evidence, and correction plus retest fit within the total 9h. Priya uses 1.5–3h for the customer verification call and written follow-up | Explicit Ready for observation / Inconclusive / Blocked status, consumed hours, test matrix, and approved next action. No automatic ticket closure. Then E5 or escalation |
| E5 — Sep 14–18 | Priya 6h total; Diego 5h; Jordan 2h; Head 1h | Observe five business mornings only if readiness and criteria are established. Diego collects the daily evidence; Priya reviews it in 2h Sep 14 and 1h each remaining day. On Sep 14, examine Sep 12–13 evidence retrospectively; no weekend staff shift is added. Capture required corrections, minutes, eligible shifts/calls, recipient/fallback, and exception owners | Daily observation record; natural-event denominator; deviations have owner/next checkpoint; any recurrence resets the relevant acceptance sample. Then E6 |
| E6 — Sep 21 | Priya 2h; Diego 1h; Jordan 1h; Head 0.5h | Review outcomes with Carol Ann; demonstrate roster update, exception handling, and evidence retrieval with receiving owners. Priya documents any acceptance or outstanding conditions | Accepted recovery only if all gates pass; otherwise retain recovery open with a sized next action, owner, dependency, and escalation request. Do not claim independent operation without the receiving demonstration |

The workbook contains the individual day/person rows, including every coverage block and both other accounts. The figures above exactly reconcile to its Ephrata 47-hour allocation. Three additional Priya hours and two Jordan hours cover portfolio coordination, outside these Ephrata task totals.

## What to collect and how to test

Maintain one incident/test record per case with: ID; reported source; caregiver/call identifier; local timestamp and time zone; shift-end event or approved roster version; expected behavior; observed behavior; job/configuration version; final WellSky state or recipient acknowledgment; elapsed time where relevant; evidence reference; owner; result; next action. Redact unnecessary personal/customer data in the submission. Live evidence stays in the team's existing authorized systems.

| Proposed test | Expected behavior to agree and verify | Actual result |
| --- | --- | --- |
| Compliant caregiver at actual shift end | Correct caregiver becomes unavailable through intended path; persistence checked | Not run |
| Reported affected caregiver with missing app confirmation | Document product's intended automatic behavior and exception path; no silent reliance on Carol Ann | Not run; expected trigger unknown |
| Permission/write/mapping failure | Detect incorrect/missing state, identify owner and retry/escalation behavior supported by product | Not run |
| Approved after-hours recipient | Correct current on-call person receives and acknowledges the agreed controlled call | Not run |
| Marcus's reported on-call case | Reconstruct the September-reported weekend call against the approved roster effective at that time; an agreed controlled case must select Marcus when he is the expected recipient, with receipt/acknowledgment evidence | Not run; reported timestamp and effective roster to confirm |
| Weekly rotation/time-zone boundary | Verify expected recipient immediately before and after an approved effective boundary; cover the Denise-to-Marcus change if confirmed by the roster, rather than repeating a call to Denise | Not run |
| Missing roster or no-answer path | Only the customer-approved existing fallback runs; unintended admin fallback is investigated | Not run; policy to confirm |
| Customer morning and overnight/weekend sample | No required corrections or unexplained misroutes in observed eligible cases; customer reports routine checking no longer necessary | Not observed |

The record's 90-second afternoon test is one past observation, not an SLA. Agree a relevant latency threshold before scoring. Natural calls may not occur in the sample; use controlled cases for coverage but explicitly retain uncertainty about sustained natural operation. If required testing cannot fit Nate's 9h, mark the unrun test and escalate its sized effort.

Nate owns the routing checks in E2, Priya supplies the approved roster and incident packet, and Jordan reviews the evidence. The August 14 test reached Denise during her recorded on-call week; it did not test the weekly advance to Marcus or his reported overnight/weekend case. Confirm expected recipient and effective time before each test. If Marcus is not currently on call, use an authorized, non-disruptive controlled method only if available; otherwise record the untested case and escalate the verification gap. Do not alter the production roster or count another Denise call as proof of Marcus coverage.

## Acceptance and ongoing ownership

Priya closes the customer-outcome gate only when configuration evidence, representative operation evidence, and Carol Ann's relief are all recorded. Proposed minimum observation is five business mornings with weekend evidence and relevant routing/rotation exposure, conditional on readiness. Carol Ann's confirmation is required; it has not been obtained. A simple connected status, clean sync log, or two good mornings is insufficient.

Proposed normal-operation owners: Priya for customer outcome and approved roster reconciliation; Diego for exception capture and business-hours support within budget; Nate for technical diagnosis inside the cap; Jordan for peer review and handoff backup. Customer-side roster maintainer and backup must be designated by Carol Ann on Day 1; do not assign that role to Denise, Marcus, or Angela merely because they are on-call staff. The Head confirms the existing service/escalation authority and engineering allocation approver by role on Day 1; names are absent from the supplied record.

Before claiming independent use, the receiving roster owner must demonstrate an effective-date update and verify the live configuration. Diego must retrieve and route a test exception without coaching. Priya must show the acceptance evidence and remaining dependencies. These are readiness requirements, not new product features already built.

## Blocked work, escalation, and contingencies

Use a proposed tracker in HS-48251 with: workstream, blocked since, exact prerequisite, owner, hours used/needed, next internal checkpoint, approver, decision, customer impact, and evidence reference. The workbook's Work log provides editable status and actual-evidence fields. A row marked Done without evidence is flagged.

| Observable trigger | Owner / checkpoint | Response |
| --- | --- | --- |
| Access, current roster, or affected IDs unavailable by Sep 9 | Priya, at Day 2 checkpoint | Document missing item and request it; use available cases for bounded investigation; stop affected change/testing until prerequisites exist |
| Forecast Ephrata engineering exceeds 9h, or no budget remains for required retest | Nate reports at each engineering block; Head decides at Sep 11 gate or earlier | Stop additional engineering commitments. Submit evidence, alternatives, exact extra hours, wider-book opportunity cost, and approver decision required. Record any approved change before scheduling it |
| Engineering allocation approver declines more time | Head, same decision gate | Keep technical block open, continue only separately funded observation/adoption/communication work, disclose residual uncertainty, and request the next resourced option |
| Recurrence during Sep 14–18 sample | Diego captures; Priya reviews at next scheduled business-day block | Separate routing/availability incidents, record required manual work, reset relevant sample, keep recovery open. New engineering needs approval once 9h is consumed |
| No representative natural calls or customer check-in unavailable | Priya, Sep 18 and Sep 21 | Report inconclusive coverage or missing acceptance. Agree a next verification step; later-window work must be resourced separately |
| Durant export format/access problem threatens Sep 11 target | Jordan, Sep 9–10; Head allocates within reserves | Use nonengineering reserve for validation or customer coordination, not queue coverage. Confirm an authorized export recipient. Any technical ask must be separately sized; Nate's preserved hours are not prebooked |
| Durant September 18 service date must change | Head, immediately when known | Seek service/contract approval; do not change the date unilaterally |
| Medford requests a live date, pricing, terms, or expanded scope | Jordan, scoping call; Head routes approval | Provide prerequisites and a proposal; record pending approvals rather than imply launch is agreed |

Until routing is verified, confirm the customer's existing approved on-call and contingency process. Do not silently make Carol Ann the permanent fallback or ask her to stop a needed check. Any additional staffed service or customer guarantee requires approval.

## Customer communications to review and send during execution

These are unsent drafts. Use actual findings and agreed check-in times before sending.

### Ephrata initial reply — Priya, internal target Sep 8

Carol Ann, you reported the same availability and routing problems again after we told you the tickets were closed. The earlier afternoon sync and routing tests did not establish that the overnight workflow was reliably giving you your mornings back. I’m keeping the recovery open and will review the routing and availability paths separately.

Could you share the two caregiver names and shift-end times, the approximate time of the weekend call, and the current approved on-call roster? I propose a short verification check-in on **Friday, September 11, 2026**, to review what the evidence shows and what remains unresolved. Please confirm whether that date works and your preferred time; I’ll confirm the appointment with you. We will review any unresolved issues at that check-in as well. I don’t yet have evidence to give you a reliable repair date.

### Ephrata checkpoint — Priya, proposed Sep 11 conversation

Our review has established [specific finding and evidence]. We have completed [actual action], and [specific test/result] supports that conclusion. We still need to verify [remaining case or user outcome]. We propose [agreed observation/check-in], subject to your availability. [If blocked: The next technical step needs additional approved capacity; it is not yet scheduled.] We’ll keep the recovery open until we can show that the relevant workflow works and your routine manual corrections are no longer needed.

### Durant confirmation — Jordan, internal target Sep 8

Diane, our plan remains a September 18 final service date, with the export targeted for September 11, the final invoice reconciled through the 18th, and WellSky/Riley/Casey deactivated on the final service day. Please confirm the required import format and authorized export recipient so we can validate the handoff.

### Medford response — Jordan, internal target Sep 8

Tom, I missed the scheduling follow-up I promised. I’d like to schedule the 30-minute reset conversation you requested and put a scoped proposal in your hands before the September 22 review. We’ll confirm the EVV migration dependencies, pilot scope, success criteria, and required approvals. The proposal will distinguish what is ready from what still needs capacity or approval; I’m not committing a restart date before that review.

## End-of-window report

Report each workstream as Verified / Inconclusive / Blocked, with actual evidence and hours consumed. For Ephrata, explicitly record required manual interventions and Carol Ann's acceptance status. For Durant, attach validated export/receipt, invoice reconciliation, and September 18 deactivation confirmation when actually completed. For Medford, attach scoped proposal, approvals needed, and the agreed next conversation. Unexecuted actions remain Planned; unavailable results remain unknown.
