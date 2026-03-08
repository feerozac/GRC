# Two-Week Sprint Execution Plan — FR-48 to FR-54

**Project:** Evonix Agentic AI GRC  
**Date:** 2026-03-08  
**Owner:** Mark (PO/Dev)  
**Prepared by:** Mary (BA)  
**Related backlog:** `sprint-backlog-slice-fr48-fr54-2026-03-08.md`

---

## 1) Sprint Shape (2 Weeks)

**Sprint objective:**  
Ship a trust-focused increment proving regulatory freshness, explainable AI decisions, challenge governance SLA, cyber-to-GRC closure controls, and pilot readiness.

**Total candidate scope:** 55 SP  
**Committed scope (single-squad realistic):** 39 SP  
**Stretch scope:** 16 SP

### Committed (must land)
- EVX-201 (8) Regulatory ingestion timestamping + normalization
- EVX-202 (5) Regulatory freshness SLA monitor
- EVX-203 (8) Decision Replay API
- EVX-205 (5) Challenge SLA engine + escalation
- EVX-206 (5) Cyber closure guardrail
- EVX-208 (8) Regulator packet performance hardening

### Stretch (if velocity allows)
- EVX-204 (8) Authorization explainability logging
- EVX-207 (8) Pilot connectors pack

---

## 2) Calendar Plan (Day-by-Day)

## Week 1 — Foundation + Trust Core Contracts

### Day 1 (Mon) — Sprint kickoff + technical slicing
**Target outcomes**
- Finalize API/data contracts for EVX-201/202/203.
- Lock schema changes and event fields (`source_published_at`, `ingested_at`, reason codes, replay payload contract).
- Create task breakdown and test plan.

**Done when**
- Story tasks are created with estimates and owners.
- API contract docs drafted for Decision Replay and SLA metrics endpoints.
- Risk register updated with top 3 sprint risks.

---

### Day 2 (Tue) — EVX-201 build start
**Target outcomes**
- Implement ingestion timestamp capture and normalization metadata.
- Add failure telemetry and retry exhaustion event.

**Done when**
- HKMA/MAS ingestion records include publication + ingestion timestamps.
- Update/version diff metadata captured for re-ingestion.
- Unit tests for parsing and metadata persistence pass.

---

### Day 3 (Wed) — EVX-201 complete + EVX-202 start
**Target outcomes**
- Finish EVX-201 acceptance criteria.
- Build freshness computation job for EVX-202.

**Done when**
- EVX-201 moves to QA-ready.
- Daily freshness job calculates latency and stores source-level metrics.

---

### Day 4 (Thu) — EVX-202 complete + EVX-203 start
**Target outcomes**
- Implement SLA dashboard/query surface and breach alert logic.
- Start Decision Replay API aggregation logic.

**Done when**
- Rolling 30-day SLA status and breach events are queryable.
- Replay API returns at least input/evidence/reasoning/confidence.

---

### Day 5 (Fri) — EVX-203 core + weekly hardening
**Target outcomes**
- Add routing/human action/challenge timeline to replay payload.
- Perform week-1 integration sanity checks.

**Done when**
- Replay API supports sequence view with challenge history.
- Week-1 demo available: ingest -> SLA metric -> replay endpoint.
- Week-1 retro notes written (risks, blockers, carryovers).

---

## Week 2 — Workflow Enforcement + Performance

### Day 6 (Mon) — EVX-205 challenge SLA engine
**Target outcomes**
- Implement SLA policy assignment, warning thresholds, and escalations.
- Add SLA report extraction for ops review.

**Done when**
- Challenge records auto-apply SLA by priority.
- Warning/breach escalations trigger correctly.

---

### Day 7 (Tue) — EVX-206 cyber closure guardrail
**Target outcomes**
- Enforce closure preconditions for critical incidents.
- Add KPI calculation for linkage compliance.

**Done when**
- Critical incident closure blocked unless linked to >=1 risk and >=1 control.
- KPI endpoint/report shows linkage coverage trend.

---

### Day 8 (Wed) — EVX-208 performance pass (packet generation)
**Target outcomes**
- Optimize packet generation path and data fetch pipeline.
- Add timing instrumentation and p95 measurement harness.

**Done when**
- Standard scope packet generation achieves <=120s p95 in test profile.
- Exports include board summary + auditor detail payloads.

---

### Day 9 (Thu) — QA/UAT sweep + bug burn
**Target outcomes**
- Run acceptance tests for committed stories.
- Fix defects and produce release notes.

**Done when**
- EVX-201/202/203/205/206/208 all pass acceptance criteria.
- No P0/P1 defects open in committed scope.

---

### Day 10 (Fri) — Sprint review + release candidate
**Target outcomes**
- Demonstrate end-to-end trust flow to stakeholders:
  1) regulatory ingestion + SLA,  
  2) decision replay + challenge SLA,  
  3) cyber closure guardrail,  
  4) packet generation performance.
- Decide whether stretch stories move to next sprint or partial carryover.

**Done when**
- Release candidate tagged.
- Sprint review notes and next-sprint cut list published.

---

## 3) Stretch Execution Rules (EVX-204 / EVX-207)

Only pull stretch if by end of Day 7:
- Committed stories are >=80% complete by acceptance checklist,
- No unresolved architecture-risk blocker remains,
- Regression defect count is below defined threshold.

If eligible:
- Day 8-9 parallel track:  
  - EVX-204 (auth explainability logging) first,  
  - EVX-207 (connector pack) second.

---

## 4) Ceremonies and Operating Rhythm

- **Daily standup (15 min):** blockers, today target, AC risks.
- **Mid-week checkpoint (Wed):** scope health vs committed SP.
- **Thu bug triage (30 min):** severity-based burn-down.
- **Fri demo + retro:** factual delivery status and carryover decisions.

---

## 5) Risk Controls for This Sprint

1. **Schema churn risk** (201/203/205 overlap)  
   - Freeze contracts by Day 1 end.

2. **Performance risk** (208 depends on upstream data paths)  
   - Instrument timings from Day 4, not only Day 8.

3. **Hidden integration overhead** (206 linkage and packet joins)  
   - Daily smoke test using realistic sample data.

---

## 6) Definition of Sprint Success

Sprint is successful if all are true:
- Committed 6 stories accepted (201, 202, 203, 205, 206, 208),
- FR-48 SLA telemetry visible and breach-alert capable,
- Replay + challenge evidence chain demoable end-to-end,
- Regulator packet generation <=120s p95 in standard scope test.

---

## 7) Immediate Monday Checklist

1. Create sprint board columns: `Ready -> In Progress -> QA -> Done`.
2. Break each committed story into tasks <= 1 day.
3. Add acceptance criteria checklist to every ticket.
4. Add test data fixtures for ingestion, replay, challenge, cyber linkage.
5. Schedule Day 5 and Day 10 demos in calendar now.

---

*This plan turns the FR-48 to FR-54 backlog slice into an execution cadence for the next two weeks.*
