# Sprint Backlog Slice (Top 8 Stories) — FR-48 to FR-54

**Project:** Evonix Agentic AI GRC  
**Date:** 2026-03-08  
**Prepared by:** Mary (BA)  
**Sprint Length Assumption:** 2 weeks  
**Goal:** Ship trust-critical capabilities from FR-48 to FR-54 with demonstrable pilot readiness.

---

## Sprint Goal

Deliver a production-ready slice that proves:
1. Regulatory updates are ingested within defined SLA (FR-48),
2. AI decisions and authorizations are transparent and replayable (FR-49, FR-51),
3. Challenge governance is enforceable with SLAs (FR-50),
4. Cyber incidents are tightly linked to risk/control posture (FR-52),
5. Pilot integration and regulator packet generation are operational (FR-53, FR-54).

---

## Prioritized Story List (Top 8)

| Priority | Story ID | Story | FR Mapping | Est. (SP) |
|---|---|---|---|---|
| P0 | EVX-201 | Regulatory ingestion timestamping + normalization pipeline | FR-48 | 8 |
| P0 | EVX-202 | Regulatory freshness SLA monitor + breach alerts | FR-48 | 5 |
| P0 | EVX-203 | Decision Replay API (input -> evidence -> rationale -> actions) | FR-49 | 8 |
| P0 | EVX-204 | Authorization explainability logging (reason code + context snapshot) | FR-51 | 8 |
| P0 | EVX-205 | Challenge SLA policy engine + escalations | FR-50 | 5 |
| P0 | EVX-206 | Cyber closure guardrail: critical incidents require risk+control links | FR-52 | 5 |
| P1 | EVX-207 | Pilot connectors pack: 2 SIEM + 1 identity/HR connector | FR-53 | 8 |
| P1 | EVX-208 | Regulator packet performance hardening (<=2 min standard scope) | FR-54 | 8 |

**Total:** 55 SP (recommended to split across Sprint A/B if single squad capacity < 40 SP)

---

## Story Details + Acceptance Criteria

### EVX-201 — Regulatory ingestion timestamping + normalization pipeline
**As a** Compliance Manager (2L), **I want** each HKMA/MAS update ingested with publication and ingestion timestamps, **so that** freshness SLA can be measured and audited.  
**FR:** FR-48  
**Dependencies:** None

**Acceptance Criteria**
- Given a new HKMA/MAS publication is detected, when ingestion completes, then the record stores `source_published_at`, `ingested_at`, source URL, and normalized requirement IDs.
- Given a publication is updated, when re-ingested, then version diff metadata is stored and prior version remains queryable.
- Given ingestion fails, when retry policy is exhausted, then failure reason is persisted and alert event is emitted.
- Given an auditor requests evidence, when querying a requirement, then publication and ingestion timestamps are exportable.

---

### EVX-202 — Regulatory freshness SLA monitor + breach alerts
**As a** Regulatory Affairs user, **I want** SLA tracking for update freshness, **so that** delays are visible and actionable.  
**FR:** FR-48  
**Dependencies:** EVX-201

**Acceptance Criteria**
- Given ingestion records exist, when daily SLA job runs, then freshness is calculated as `ingested_at - source_published_at`.
- Given monthly metrics are computed, when report is generated, then it shows `% updates within 24h` and breach count by source.
- Given freshness falls below 95% for HKMA or MAS in rolling 30 days, when threshold breach occurs, then alert is sent to configured owners.
- Given a compliance user opens the dashboard, when viewing SLA panel, then they can filter by regulator and date range.

---

### EVX-203 — Decision Replay API (input -> evidence -> rationale -> actions)
**As an** Auditor or 2L reviewer, **I want** deterministic replay of any AI recommendation, **so that** I can verify lineage and decision integrity.  
**FR:** FR-49  
**Dependencies:** Existing DecisionLog and AuditTrailEntry stores

**Acceptance Criteria**
- Given a recommendation ID, when `GET /decision-replay/{id}` is called, then response contains input summary, cited evidence, reasoning chain, confidence, routing, and human actions.
- Given missing artifact segments, when replay is requested, then response includes explicit gap flags (not silent omissions).
- Given a recommendation has challenge history, when replay is requested, then challenge events and final resolution are included in sequence.
- Given UI consumer constraints, when replay payload is returned, then it is ordered and structured to render in <= 5 interactions.

---

### EVX-204 — Authorization explainability logging (reason code + context snapshot)
**As a** Security Architect, **I want** every allow/deny agent authorization to be explainable, **so that** delegated authority is auditable.  
**FR:** FR-51  
**Dependencies:** Existing authorization middleware

**Acceptance Criteria**
- Given an agent action request, when authorization is evaluated, then decision includes `allow|deny`, reason code, policy ID, delegation source, and context snapshot.
- Given authorization denies an action, when audit entry is created, then denial reason is human-readable and machine-parseable.
- Given authorization allows an action, when audit entry is created, then delegated authority path is traceable to active grant.
- Given audit export is generated, when filtered for authorization events, then all reason codes are included with timestamps and actor IDs.

---

### EVX-205 — Challenge SLA policy engine + escalations
**As a** 2L Risk Manager, **I want** challenge workflows to follow SLA and escalation rules, **so that** high-priority disputes are resolved predictably.  
**FR:** FR-50  
**Dependencies:** Existing Challenge workflow foundation

**Acceptance Criteria**
- Given a new challenge is opened, when priority is assigned, then SLA target is auto-applied from policy configuration.
- Given challenge age exceeds warning threshold, when threshold is crossed, then warning notification is sent.
- Given challenge breaches SLA, when breach occurs, then escalation route (manager/head) is automatically triggered.
- Given monthly operations review, when SLA report is generated, then it shows resolution rate and breach trend by priority.

---

### EVX-206 — Cyber closure guardrail: critical incidents require risk+control links
**As a** SOC Lead / 2L Risk user, **I want** critical incidents blocked from closure until linked to risk and control records, **so that** cyber events feed governance posture.  
**FR:** FR-52  
**Dependencies:** Incident + risk/control linkage model

**Acceptance Criteria**
- Given an incident is critical severity, when user attempts closure, then system blocks closure unless >=1 risk link and >=1 control link exist.
- Given links exist, when closure is attempted, then closure proceeds and linkage is recorded in audit trail.
- Given a dashboard query, when cyber linkage KPI is viewed, then `% critical incidents with required links before closure` is displayed.
- Given pilot dataset, when KPI is computed, then measurement logic supports FR-52 target tracking.

---

### EVX-207 — Pilot connectors pack: 2 SIEM + 1 identity/HR connector
**As a** Platform Admin, **I want** baseline connectors for pilot deployment, **so that** ingestion and ownership mapping work with minimal custom integration.  
**FR:** FR-53  
**Dependencies:** Integration framework readiness

**Acceptance Criteria**
- Given configured credentials, when SIEM connector A is enabled, then alert ingestion succeeds with mapping to CyberAlert schema.
- Given configured credentials, when SIEM connector B is enabled, then alert ingestion succeeds with mapping to CyberAlert schema.
- Given identity/HR connector credentials, when sync runs, then org units, roles, and reporting relationships are imported for mapping workflows.
- Given connector run fails, when failure occurs, then retry and error telemetry are recorded and surfaced.

---

### EVX-208 — Regulator packet performance hardening (<=2 min standard scope)
**As a** Compliance Manager, **I want** regulator packets generated quickly for standard scope, **so that** audit/regulatory requests are answered in-session.  
**FR:** FR-54  
**Dependencies:** EVX-203, EVX-204 recommended

**Acceptance Criteria**
- Given standard dataset scope, when regulator packet generation is requested, then combined Explainability Report + Audit Trail Pack completes in <= 120 seconds (p95).
- Given board summary output, when packet is generated, then plain-language summary is included.
- Given auditor detail output, when packet is generated, then technical rationale, citations, and audit excerpts are included.
- Given export request, when completed, then JSON/CSV/PDF artifacts are available and download audit event is logged.

---

## Suggested Delivery Sequence

1. **Foundation:** EVX-201 -> EVX-202  
2. **Trust core:** EVX-203 + EVX-204 + EVX-205  
3. **Operational controls:** EVX-206  
4. **Pilot readiness:** EVX-207 + EVX-208

---

## Definition of Done (applies to all stories)

- Acceptance criteria pass in QA/UAT.
- Audit events generated for all material actions in the story scope.
- Story has API/UX notes and operational runbook updates (where applicable).
- Story metrics are observable on dashboard or report endpoint.
- Security/privacy review completed for new data flows.

---

## Sprint Planning Notes

- If single team capacity is ~30-35 SP, execute as:
  - **Sprint A (P0 core):** EVX-201, 202, 203, 205 (26 SP)
  - **Sprint B (P0/P1 completion):** EVX-204, 206, 207, 208 (29 SP)
- If parallel squads exist, run integration/perf track (EVX-207/208) in parallel once replay and auth log contracts stabilize.

---

*This backlog slice is derived from FR-48 to FR-54 and aligned to the competition-informed refinement update (Mar 2026).*
