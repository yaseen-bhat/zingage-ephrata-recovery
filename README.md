# Ephrata Recovery & Capacity Plan

This case started with a customer who had bought relief from after-hours work and was still doing that work herself. My task was to diagnose the gap, then decide how one deployment team's next ten business days should be divided across Ephrata, Durant, and Medford.

I used a [Google Doc](https://docs.google.com/document/d/1w_PuN2WxMAgreZP6yWOCIpCCSME-YPLaa43CS9UbwOg) for working notes as I broke down the case: what was failing, what the evidence showed, which questions mattered, and how the team could spend its limited hours. Neowork kept encountering an update bug, so it did not reliably record my process as I worked.

Later, I asked AI to help reconstruct and explain the process in more detail, using my notes, the original account histories and capacity file, and the decisions made during the exercise. The detailed framework in the Google Doc combines my analysis with that AI-assisted expansion. It is a retrospective process write-up, rather than a complete record captured at the time.

My contribution was the problem breakdown, priorities, review, and final allocation decisions. AI helped interpret the material, draft the memos, construct and validate the workbook, package the files, and maintain Git updates. I stayed involved and approved the leaner allocation when AI identified overlapping observation effort. The README below explains how we reached the operating proposal for **September 8–21, 2026**. The repository's change history records the deliverable revisions; it does not recreate the missing Neowork record.

## Start with the customer's actual goal

Senior Helpers Ephrata purchased Zingage to represent caregiver availability correctly, route after-hours calls to the current on-call staff, and give Carol Ann Frees her mornings back. By the September 8 snapshot, she was still manually correcting statuses and receiving calls intended for someone else.

I defined success around that experience: correct persisted availability, calls reaching the right recipient, owned exceptions, and enough confidence for Carol Ann to stop routine checks. A manual status correction could address one incident without restoring the overall workflow.

The same team had two other obligations: complete Visiting Angels Durant's agreed cancellation and answer Affordable at Home Care Medford's overdue restart request. Any Ephrata decision therefore had an opportunity cost elsewhere.

## Separate evidence from assumptions

The records showed a valid integration token, a successful afternoon manual re-sync, and a daytime routing test that reached Denise. They also showed historical roster drift, ticket closure pending customer confirmation, and a later recurrence of both symptoms. Those facts supported investigation, but they did not establish reliable overnight behavior.

The rotation gap is specific: Denise was on call during the August 14 daytime test. That test never exercised the later change to Marcus or the overnight/weekend conditions of the September complaint. Denise receiving a call could not verify that Marcus would receive one during his approved on-call period. The recovery therefore needs a test of the expected recipient across an effective rotation boundary.

The connected account and green health report measured different things from Carol Ann's experience. The clearest supported diagnosis was a verification gap: narrow technical checks had been treated as proof of the customer's original outcome.

I kept that conclusion separate from the technical hypotheses. The adoption snapshot showed three of fourteen caregivers with admin-closeout patterns, but those caregivers had not been matched to the latest complaint. The current trigger, roster, failed event, and call trace remained unknown. Without a denominator, I also could not calculate a failure rate or invent a baseline for minutes of manual work.

## Trace the workflow before choosing a fix

I mapped two paths separately:

- **Availability:** shift end → intended app or scheduled event → Casey job → caregiver mapping and WellSky write → persisted status → morning dashboard.
- **Routing:** approved roster → maintained Riley configuration → after-hours and rotation rules → intended recipient → acknowledgment or approved fallback.

The visible failures were stale status and the wrong recipient. Their earlier technical causes still needed tracing. This distinction mattered: adoption alone could not explain the routing failure, and another re-sync could not prove that the overnight trigger worked.

I prioritized questions that changed the next action: affected IDs and timestamps, the current roster, the intended trigger, event/write traces, access, and actual calendars. Missing answers became dependencies rather than assumptions hidden inside a repair promise.

## Choose a bounded recovery loop

I chose routing investigation first because calls were reaching the wrong person, followed by an end-to-end availability trace. Targeted adoption support and exception ownership could proceed alongside the technical work.

A correction needed evidence, authority, and time for retesting. Broad automation or rebuilding would wait for diagnosis and sizing. Recovery would stay open until operation and customer benefit were supported; September 11 was an internal readiness checkpoint, without a guaranteed repair date.

This approach could produce a diagnosis and partial containment even if a complete repair did not fit. That was a defensible limit to communicate, rather than assuming every account would be fixed.

## Make the capacity decision explicit

Resource allocation was the central decision. The supplied limits were 7.5 leadership hours, 61 combined strategist hours, and 34 CSM hours with at least 14 protected for support coverage. Nate had 24 engineering hours across the wider account book, with a maximum of nine for Ephrata without escalation.

Engineering was the bottleneck. Routing review was estimated at 3–6 hours and the WellSky audit at 6–10. I allocated the lower bounds—three and six hours—and required investigation, any correction, and retesting to fit that same nine-hour ceiling. Unused strategist hours could not substitute for engineering skills or authorize a new commitment.

| Allocation | Hours | What it funds |
| --- | ---: | --- |
| Ephrata | **47** | Investigation, conditional verification, customer review, and handoff |
| Durant | **10** | Nine strategist/CSM hours for offboarding plus one leadership hour |
| Medford | **5** | Four strategist hours for scoping/proposal plus one leadership hour |
| Shared coordination | **5.5** | Calendar confirmation, forecasts, and allocation decisions |
| Protected support coverage | **14** | Diego's standing support queue |

I protected Durant's September 18 final service date and September 11 export target in the plan. Medford's allocation funds a response, reset conversation, and scoped proposal before its September 22 board review; those actions remain proposed, and a production restart depends on capacity and approvals.

AI flagged overlapping observation effort during review, and I approved a leaner allocation. Diego retained five collection hours; Priya's review budget fell from fourteen to six. The acceptance criteria stayed the same. Ephrata dropped from 55 to 47 hours, freeing eight strategist hours and bringing the **nonengineering contingency reserve to 30 hours**. Nate's other fifteen hours remained preserved for the wider account book.

Only the combined strategist ceiling was sourced. The proposed Priya/Jordan split of 36/25 hours and daily calendars require Day 1 confirmation. Lower capacity means resizing the plan while protecting coverage and commitments. Reassignment needs a named owner/date and a new capacity check.

## Turn the decisions into executable work

The sequence starts with incident collection and calendar confirmation on September 8, followed by routing and availability investigation on September 9–11. The September 11 gate determines whether observation can begin. If ready, the team reviews five business mornings on September 14–18 and weekend evidence retrospectively, then holds the outcome review and receiving-owner demonstration on September 21. No additional overnight or weekend shift is assumed.

Carol Ann's initial message explicitly proposes a verification check-in on **Friday, September 11, 2026**, with the appointment time and her availability to be confirmed. If investigation remains blocked, the proposed check-in reviews that dependency and next step; it carries no repair-date guarantee.

I required named owners, prerequisites, allocated effort, expected evidence, and explicit next steps for blocked work. Priya owns Ephrata's outcome; Nate technical evidence; Diego business-hours exceptions; Jordan Durant/Medford and peer review; leadership allocation and approvals. The customer-side roster maintainer and backup still need confirmation.

AI translated this into a four-tab workbook connecting 69 work records to daily and overall capacity checks. It flags conflicts, coverage gaps, completion without evidence, and blocked work without a next step. The handoff adds unsent customer drafts and escalation triggers. Engineering above nine hours requires a sized approval request.

## Define proof before declaring recovery

I used three levels of success:

1. **Implementation:** approved configuration, trigger, mappings, and any correction are documented with before/after evidence and rollback.
2. **Operation:** representative shift-end, after-hours, rotation-boundary, and fallback cases behave correctly, with expected/actual results and denominators recorded.
3. **Customer outcome:** Carol Ann confirms that routine corrections and checking are no longer necessary, supported by observed cases and manual-work measurements.

These are proposed criteria to agree with the customer. Zero eligible calls would not prove natural routing success. Recurrence resets the relevant sample; missing access, cases, or acceptance keeps recovery open with a named, resourced next action.

Independent use also requires a receiving-owner demonstration: update an approved roster entry, retrieve evidence, and route an exception without coaching. A document alone does not establish that the receiving team can run the workflow.

## What this submission establishes

AI produced and versioned the package, ran twelve changed-input tests and formula/export checks, and reviewed all four workbook tabs visually. Those checks support the plan's arithmetic and controls. Desktop Excel behavior was outside that validation; live repairs, offboarding, restart, observation, and acceptance remain pending.

| Artifact | Purpose |
| --- | --- |
| [Diagnosis](ephrata_diagnosis.md) | Evidence, hypotheses, uncertainty, tradeoffs, and proposed proof of relief |
| [Operating workbook](ten_day_operating_plan.xlsx) | Person/day allocations, work log, editable inputs, and live checks |
| [Execution handoff](ephrata_handoff.md) | Sequence, owners, dependencies, customer drafts, and blocked-work handling |
| [Submission package](https://github.com/yaseen-bhat/zingage-ephrata-recovery/blob/main/ephrata_recovery_package.zip) | The three required deliverables, this README, and supporting references, change log, build materials, and verification records |

The [latest framework snapshot](references/fde_framework_latest.txt), [earlier process snapshot](references/fde_thought_process.txt), three account/capacity references in [references/](references/), and [Google Doc process write-up](https://docs.google.com/document/d/1w_PuN2WxMAgreZP6yWOCIpCCSME-YPLaa43CS9UbwOg) provide the longer context. The framework snapshots include working notes and AI-assisted explanation, with draft figures preserved as written; the final allocation above matches the workbook. The [update log](CHANGELOG.md) and Git history trace each meaningful deliverable change. [Verification records](verification/) show the checks performed; [build materials](build/) preserve the workbook inputs, builder, and packaging process.

My main takeaway was to connect technical work to the customer's actual goal, make resource tradeoffs visible, and define completion evidence before execution. The result is a tested, executable proposal with clear limits and owners for what happens next.
