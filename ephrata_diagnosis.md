# Ephrata diagnosis and ten-day recovery decision

**Decision snapshot:** September 8, 2026. **Operating window:** September 8–21, 2026, ten business days. **Status:** proposed operating plan; deployment actions and customer outcomes have not been executed or verified in this simulation.

## Decision

Keep Ephrata's recovery open under HS-48251. Prioritize the recurring after-hours routing failure, then trace shift-end events through Casey and WellSky. Allocate 47 hours of cross-functional effort to Ephrata, including a hard maximum of 9 engineering hours. Protect Durant's agreed exit and respond to Medford with a bounded restart-scoping plan. Do not promise that Ephrata will be repaired by the end of the window.

The strongest confirmed diagnosis is a failure of outcome verification and ongoing workflow ownership. The team closed the underlying tickets after narrow tests and marked the account green before confirming sustained customer relief. The technical cause of the September recurrence remains unknown. Adoption, roster maintenance, event handling, and configuration may each contribute; the evidence does not yet establish which is responsible for the latest failures.

## Expected outcome and current reality

The December 22 kickoff note records three connected goals: automatically mark caregivers unavailable at shift end, route after-hours calls to the current on-call staff, and remove Carol Ann Frees's need to check the dashboard each morning. The note is Priya's paraphrase, not a verbatim customer statement.

Carol Ann's September 8 email reports manually correcting two caregivers on three mornings in the previous week and another weekend call reaching her instead of Marcus Lee. These are customer-reported recurrences, not independently reconstructed incidents. They are sufficient to reopen recovery and investigate; they do not establish an exact failure rate or a particular technical defect. Manual status corrections and looking up the on-call roster remain the workaround. The August call about a client fall makes reliable routing particularly consequential, without establishing a clinical outcome.

## Evidence map

| Evidence in supplied account history | What it establishes | What it does not establish | Next verification |
| --- | --- | --- | --- |
| May 14 check-in: Carol Ann still peeks at the board | Manual checking persisted or trust was incomplete before the formal complaint | Whether each check found a fault, or how much time it took | Ask about necessity, findings, and minutes spent |
| August 3 email; HS-48192, HS-48193, HS-48197 | Customer reported stale availability and a misrouted overnight call; three related tickets were opened | Full incident traces or a shared root cause | Reconstruct the reported events separately |
| August 6 call: estimated 3–4 of 14 caregivers fail to log off | A customer-reported adoption concern exists | Whether the product requires log-out to fulfill automatic shift-end behavior | Confirm intended trigger, exception policy, and affected caregiver IDs |
| August 11 engineering note; August 12 closure of HS-48192 | Token was valid; one manual afternoon re-sync changed Denise's status in about 90 seconds; no logged sync errors in the sampled period | Scheduled overnight trigger delivery, all caregiver mappings, effective writes in failing cases, or a contractual latency target | Trace event, job, payload, permissions, write response, and final status for affected caregivers |
| August 13 configuration note | Riley still used April's rotation; engineering replaced it with the June 30 roster | Whether September's roster is authoritative, weekly transitions work, or update ownership is defined | Compare current approved roster, effective dates, time zone, fallback, and live configuration |
| August 14 test and closure of HS-48193 | An 11:20 a.m. test reached Denise and she acknowledged it | After-hours behavior, Marcus/Angela routing, rotation boundaries, or no-answer fallback | Run agreed controlled tests of relevant conditions |
| August 18 closure of HS-48197; August 21 green report | Internal closure and connected/no-error signals were used as health evidence | Sustained absence of manual work or customer acceptance | Replace closure-only criteria with workflow and user-outcome evidence |
| August 24 check-in | Carol Ann reported two good mornings and explicitly wanted to observe longer | A durable recovery | Review a defined multi-day sample and include weekend/rotation exposure |
| August 25 adoption snapshot | 11 of 14 consistently confirmed shift end; 3 showed admin closeout patterns | That those three are the two in September's complaint, or that nonadoption explains routing failures | Match IDs and timestamps against reported incidents |
| September 8 email and HS-48251 | Both symptoms recurred by customer report; recovery was reopened and not yet triaged to engineering | A proven cause, permanent unfixability, or a completed fix | Collect a minimal incident packet and retain an open outcome gate |

## Current workflow and likely breakpoints

Availability path: shift ends → caregiver/app or scheduled event → Casey availability job → caregiver mapping and WellSky write → persisted unavailable status → Carol Ann's morning view. The intended initiating event is unknown. A connected integration cannot prove that an event was generated, the correct record was targeted, or the final value persisted.

Routing path: approved on-call roster with effective dates → maintained Riley configuration → after-hours decision and rotation/time-zone rules → intended recipient → acknowledgment or approved fallback. April-to-June roster drift is confirmed historically. The September routing path has not been reconstructed, and the June roster must not be assumed current.

Outcome path: workflow evidence → exception ownership → customer confirmation → outcome closure. This path demonstrably failed when the manual-review ticket was closed pending confirmation. Priya owns the outcome gate; Nate supplies technical evidence; Diego maintains business-hours exception tracking within his allocated project hours. No new overnight staffing is assumed.

## Hypotheses, discriminating checks, and stop rules

| Hypothesis (not confirmed) | Evidence supporting investigation | Discriminating check | Decision if supported |
| --- | --- | --- | --- |
| Stale roster or wrong effective-time/after-hours rules | Historical April roster drift and recurring weekend misrouting | Compare approved current rotation with live configuration and replay Marcus/Denise/Angela and boundary cases | Correct only an authorized, bounded configuration issue; capture before/after evidence and retest |
| Missing shift-end event or inconsistent adoption | Three admin-closeout patterns; automatic relief promised at kickoff | Determine whether failing caregivers emit an event and whether automatic shift-end behavior is supposed to cover missing log-out | Target adoption support if behavior is required; otherwise identify the automation gap and escalate needed product/service work |
| Mapping, permissions, job timing, retry, or persistence problem | Afternoon manual re-sync passed while overnight symptoms recurred | Trace an actual failed case end to end and compare it with a matched successful case | Apply only a safe correction and test fitting the remaining budget; otherwise retain the blocked item and escalate |
| Health reporting and closure criteria are inadequate | Green status followed ticket closure; outcome closed pending confirmation | Audit acceptance evidence and assign an owner to each recurring workflow step | Keep recovery open until operation and customer benefit are both evidenced |

Routing and availability are separate workstreams until evidence proves a shared cause. Caregiver retraining alone cannot explain or resolve an on-call routing fault. A manual workaround reduces exposure temporarily but does not fulfill the purchased automation outcome.

## Capacity decision and opportunity cost

| Person | Ephrata | Durant | Medford | Cross-account coordination | Protected queue coverage | Unallocated / preserved | Window ceiling |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Head of Deployment & Customer Ops | 4 | 1 | 1 | 0.5 | 0 | 1 | 7.5 |
| Priya Chandrasekaran | 20 | 0 | 0 | 3 | 0 | 13 | 36 proposed |
| Jordan Kwan | 4 | 5 | 4 | 2 | 0 | 10 | 25 proposed |
| Diego Marsh | 10 | 4 | 0 | 0 | 14 | 6 | 34 |
| Nate Osei | 9 | 0 | 0 | 0 | 0 | 15 preserved for the wider account book | 24 across all accounts |
| Total | 47 | 10 | 5 | 5.5 | 14 | 45 | 126.5 |

Only the combined strategist ceiling of 61 hours is sourced. The 36/25 split and all daily availability profiles are proposed allocations to confirm on Day 1; they do not assert individual calendar availability. Strategists use 38 hours, leaving 23 within the combined ceiling. Diego uses 14 project hours plus 14 protected coverage hours, leaving 6 project hours. The Head retains 1 hour. These 30 nonengineering hours absorb discovery, export validation, customer scheduling, and further observation within the window. They cannot replace engineering skills or authorize new customer commitments. Nate's remaining 15 hours are preserved for the wider account book and are not discretionary Ephrata reserve.

Keep verification focused: Diego collects the five daily evidence sets in 5 hours, while Priya uses 6 hours to review the sample and interpret outcomes (2 hours on September 14, then 1 hour on each remaining morning). The same acceptance criteria apply. This avoids duplicating collection and analysis, retains peer review and leadership gates, and leaves 8 additional strategist hours available if exceptions justify them. Unused hours are contingency capacity, not completed work or implied fixes.

Durant receives 9 strategist/CSM hours, the upper end of the supplied 5–9 hour estimate, plus 1 leadership hour. The September 11 export is a documented target; September 18 is the agreed final service date. Medford receives the upper 4-hour strategist estimate for scoping and a proposal, plus 1 leadership hour. Its September 22 board review does not create a committed restart date.

Ephrata's routing review (3–6 hours) plus WellSky audit (6–10 hours) require 9–16 engineering hours before any separately sized remediation. The base plan funds only the lower bounds: 3 hours routing and 6 hours WellSky. Those blocks include evidence collection and tests; any correction must also fit the same 9 hours. If the forecast exceeds the cap or testing cannot fit, stop at the boundary, preserve evidence, and have the Head seek approval from the engineering allocation authority. No tenth engineering hour is booked by assumption. This accepts a real possibility of diagnosis and partial containment without verified recovery.

## What is deferred and its consequence

| Deferred work | Consequence in this window | Owner / trigger |
| --- | --- | --- |
| Extra engineering, custom automation, or a broad integration rebuild | Ephrata may remain partly or wholly unresolved; recovery stays open | Head escalates a sized request when remaining required work exceeds the 9-hour cap |
| Medford production restart, engineering implementation, or changed commercial scope | Board can receive a scoped proposal and prerequisites, not a claim that the pilot is live | Jordan scopes; Head routes pricing/term/scope changes and later staffing commitments to the relevant approver |
| New roster, hiring, or changes to other-account strategist loads | No additional people or off-book capacity can be assumed | Head escalates before changing those obligations |
| Claim of durable Ephrata recovery without representative observations | Customer cannot yet be told the recurring problem is resolved | Priya retains verification status and proposes the next observation step with a resource request if outside the window |

## Proposed evidence that would prove Carol Ann's day changed

Agree these criteria during the bounded customer check-in. They are proposed acceptance criteria, not contractual SLAs or already-observed results.

1. **Implementation:** current approved roster, effective dates, permissions/mappings, event trigger, exception path, and any actual correction are documented. Each change has before/after evidence and a rollback path.
2. **Operation:** affected caregivers plus representative compliant caregivers are traced from shift end through persisted WellSky status. Controlled tests cover after-hours routing, the current roster and a rotation boundary, and an agreed no-answer/missing-data path. Record event counts, eligible cases, expected/actual values, timestamps, and evidence references. The historical 90-second manual test is not an acceptance threshold; establish and record an appropriate latency bound with the customer and technical owner before scoring a test.
3. **User outcome:** conditional on readiness by September 11, sample the five business mornings September 14–18 and review September 12–13 weekend evidence retrospectively. Proposed target: zero required customer availability corrections, zero unexplained misroutes in observed eligible calls, and Carol Ann's confirmation that she no longer needs a routine verification check. Capture minutes of required manual work against a Day 1 baseline; the historical minutes baseline is unknown.

Zero eligible calls is insufficient evidence of successful natural routing. Passing daytime or controlled tests alone is insufficient evidence of sustained user relief. A later correction resets the relevant observation period; five complete business mornings may then extend beyond this window and require a separately resourced follow-up. If access, case coverage, latency criteria, or customer acceptance is missing, report the specific uncertainty and leave the gate open.

## Source references

- **Deployment team capacity and decision boundaries for the ten-business-day window.md:** sections 1–4 supply assessment capacity, protected coverage, engineering cap, effort ranges, and authority boundaries.
- **Senior Helpers Ephrata — Account History.md:** December 22 kickoff; May 14 check-in; August 3 and September 8 emails; HS-48192/48193/48197 and HS-48251; August 11–25 tests, closure, health, customer check-in, and adoption evidence.
- **Visiting Angels Durant and Affordable at Home Care Medford's account histories.md:** Durant's August 21/26 and September 2 commitments and September 8 outstanding export; Medford's August 26/28 and September 4/8 unanswered restart record.

The source files are the case record as of September 8. Later operating results are not available and have not been invented.
