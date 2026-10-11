# Senior Helpers Ephrata — Consolidated Account Case File

**Account:** Senior Helpers Ephrata | **Primary contact:** Carol Ann Frees, Owner/Administrator
**Products in scope:** Riley Receptionist (after-hours call routing), Casey Coordinator (caregiver availability sync, writes back to WellSky), WellSky EMR integration
**Compiled by:** Priya Chandrasekaran, Deployment Strategist | **Compiled for:** Sept 8 account review | **Last entry:** 2026-09-08

This file consolidates the emails, HubSpot tickets, call notes, and system entries on file for Ephrata's after-hours workflow, in chronological order. Pulled from Gmail (Google Workspace), HubSpot Service, and Notion call-note logs. Older kickoff/onboarding material is summarized from the account's kickoff doc, not reproduced in full.

---

**[ACCOUNT RECORD] Order Form / Kickoff Notes — signed 2025-12-15, kickoff call 2025-12-22**
Success criteria as recorded from the kickoff call (attendees: Carol Ann Frees; Priya Chandrasekaran; Nate Osei):
> "Carol Ann currently checks the on-call board herself every morning and has been fielding after-hours calls that should go to whoever's on call. Goal for go-live: caregivers get marked unavailable automatically at shift end, after-hours calls route to the current on-call roster, and Carol Ann stops needing to check the dashboard before her coffee." (Priya's paraphrase in the call note, not a verbatim quote from Carol Ann.)

**[ACCOUNT RECORD] Go-live — 2026-01-12**
WellSky integration connected; Riley Receptionist and Casey Coordinator enabled for Ephrata's 14-caregiver roster.

**[CALL NOTE] 2026-02-20 — 30-day check-in — Priya Chandrasekaran & Carol Ann Frees**
Logged in Notion. "Things seem to be working, still getting used to the dashboard. No complaints raised." No follow-up items opened.

**[CALL NOTE] 2026-05-14 — Quarterly check-in — Priya Chandrasekaran & Carol Ann Frees**
Logged in Notion. General account review (billing, upcoming caregiver onboarding). Per Priya's note: "Carol Ann mentioned in passing that she still 'peeks at the board most mornings out of habit' — didn't flag it as a problem, didn't open a ticket."

---

**[EMAIL] 2026-08-03 06:14 — Carol Ann Frees → Priya Chandrasekaran**
Subject: Still up at 5am checking the board

> Priya — this is the third time in two weeks. I was up again this morning going through the dashboard by hand because two caregivers who finished their shifts last night (Sat) were still showing as available this morning. And Friday night into Saturday, a call about a client fall went to *my* cell phone instead of whoever was on call — I had to look up the roster myself and call Denise. Denise was on call that night, not me.
>
> This is exactly what we signed up to stop doing. I need my mornings back — that was the whole point.
>
> — Carol Ann

**[TICKET] HS-48192 — Opened 2026-08-04 09:02 — Priority: High — Owner: Nate Osei — Pipeline: Support**
Subject: Caregiver shift-end status not syncing to unavailable
Description (from Priya, based on Carol Ann's email): Caregivers remaining marked "available" in WellSky after shift end; customer manually correcting each morning.

**[TICKET] HS-48193 — Opened 2026-08-04 09:06 — Priority: High — Owner: Nate Osei — Pipeline: Support**
Subject: After-hours call routed to admin instead of on-call roster
Description: Overnight call (night of Aug 1–2) reached Carol Ann's personal cell instead of the on-call caregiver (Denise Whitfield, confirmed on-call that night per Ephrata's roster).

**[TICKET] HS-48197 — Opened 2026-08-05 14:40 — Priority: Medium — Owner: Priya Chandrasekaran — Pipeline: Support**
Subject: Manual dashboard review — process ask
Description: Tracks Carol Ann's ask to stop needing a manual AM dashboard check. Linked to HS-48192 / HS-48193; no independent fix, tracked for confirmation once those close.

**[CALL NOTE] 2026-08-06 — Priya Chandrasekaran & Carol Ann Frees (22 min)**
Logged in Notion. Carol Ann: "It's not every caregiver, but I'd guess 3 or 4 of my 14 basically never log themselves off in the app — I end up doing it for them." On the misrouted call: "Denise was on call, the system had her listed as on call in the roster doc I sent you in June, so I don't know why it rang me instead." Action: Nate to review WellSky sync + Riley on-call config.

**[TICKET NOTE] HS-48192 — 2026-08-11 16:50 — Nate Osei**
Checked WellSky OAuth token — valid, handshake healthy. Ran a manual re-sync of the caregiver availability job; ran a test against Denise Whitfield's profile at 2026-08-11 15:15 (afternoon), status updated to unavailable correctly within ~90 seconds. No sync errors in logs for the past 7 days.

**[TICKET] HS-48192 — Closed 2026-08-12 10:15 — Nate Osei**
Resolution: "Re-verified sync against WellSky's connected API; manual test case passed. Marking resolved, will keep monitoring for recurrence."

**[TICKET NOTE] HS-48193 — 2026-08-13 11:00 — Nate Osei**
Ephrata's on-call roster inside Riley's config still reflected the April rotation. Updated to match the roster doc Carol Ann sent 2026-06-30 (current rotation: Denise Whitfield / Marcus Lee / Angela Cho, rotating weekly).

**[TICKET NOTE] HS-48193 — 2026-08-14 11:20 — Nate Osei**
Placed a test call to the Ephrata after-hours line at 11:20am to confirm routing. Call routed correctly to Denise Whitfield (this week's on-call per updated roster). Denise confirmed receipt by text.

**[TICKET] HS-48193 — Closed 2026-08-14 11:45 — Nate Osei**
Resolution: "On-call roster config updated to current rotation; test call routed correctly. Marking resolved."

**[TICKET] HS-48197 — Closed 2026-08-18 09:30 — Priya Chandrasekaran**
Resolution: "Underlying tickets (HS-48192, HS-48193) closed and verified by engineering. Closing this as resolved pending customer confirmation on next check-in."

**[SYSTEM LOG] 2026-08-20 09:14 UTC — WellSky Integration Status, Ephrata**
`integration_status: CONNECTED | last_sync: 2026-08-20T09:11:04Z | sync_errors_7d: 0`

**[INTERNAL REPORT] Weekly Account Health — 2026-08-21 — Deployment Team (compiled by Priya Chandrasekaran)**
Ephrata: **Green.** All 3 open tickets (HS-48192, HS-48193, HS-48197) closed this week. WellSky shows connected, no sync errors past 7 days. No open customer escalations.

**[CALL NOTE] 2026-08-24 — Priya Chandrasekaran & Carol Ann Frees (8 min, check-in)**
Logged in Notion. Carol Ann: "Actually the last two mornings have been fine — I haven't had to go flip anyone's status myself." Said she'd keep an eye on it before calling it done. No new ticket opened.

**[INTERNAL REPORT] Caregiver App Adoption Snapshot — 2026-08-25 — pulled by Nate Osei for Ephrata roster review**
30-day shift-end log-out compliance, Ephrata caregivers (n=14): 11 of 14 (79%) consistently log out / confirm shift-end in-app; 3 caregivers show a pattern of the admin (Carol Ann) manually closing out their shift status instead. Pulled in response to Priya's question after the Aug 6 call, not tied to a specific ticket.

---

**[EMAIL] 2026-09-08 05:52 — Carol Ann Frees → Priya Chandrasekaran (cc: support@zingage — Diego Marsh)**
Subject: Same thing again this morning

> Priya — same thing again. Tuesday, Wednesday, and again this morning (three mornings this past week) I've had to go in and manually mark two caregivers unavailable myself. And Saturday night into Sunday, another after-hours call came to my cell instead of on-call — this time Marcus Lee was on call, not Denise, so it's not just a Denise thing.
>
> This is the same issue I raised back in August. I thought it was fixed — you'd told me the tickets were closed. I need to understand if this is actually fixable or if I should just plan on doing this myself indefinitely.
>
> — Carol Ann

**[TICKET] HS-48251 — Opened 2026-09-08 08:10 — Priority: High — Owner: Priya Chandrasekaran — Pipeline: Support**
Subject: Re-open — after-hours routing / caregiver status (Carol Ann Frees, Ephrata)
Description: Customer reports same symptoms as HS-48192/HS-48193/HS-48197 (all previously closed). Linked to prior tickets for history. Not yet triaged to engineering as of end of day 2026-09-08.

---

*End of consolidated log as of 2026-09-08. Prior smaller support requests (billing, caregiver onboarding paperwork) from Feb–Jul 2026 omitted as not relevant to the after-hours workflow.*
