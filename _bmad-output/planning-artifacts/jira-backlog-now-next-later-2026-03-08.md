# Jira Backlog View — Now / Next / Later (2026-03-08)

**Purpose:** Compact prioritization view for Jira board setup from current planning artifacts.

**Source artifacts**
- `sprint-backlog-slice-fr48-fr54-2026-03-08.md`
- `two-week-sprint-execution-plan-fr48-fr54-2026-03-08.md`
- `securepath-integration-backlog-candidates-2026-03-08.md`

---

## NOW (commit first)

| Rank | Story ID | Summary | Priority | SP | Notes |
|---|---|---|---|---:|---|
| 1 | EVX-201 | Regulatory ingestion timestamping + normalization pipeline | P0 | 8 | Foundation for SLA metrics |
| 2 | EVX-202 | Regulatory freshness SLA monitor + breach alerts | P0 | 5 | Depends on EVX-201 |
| 3 | EVX-203 | Decision Replay API (input -> evidence -> rationale -> actions) | P0 | 8 | Trust/audit core |
| 4 | EVX-205 | Challenge SLA policy engine + escalations | P0 | 5 | Governance enforcement |
| 5 | EVX-206 | Cyber closure guardrail: critical incidents require risk+control links | P0 | 5 | Cyber -> GRC linkage |
| 6 | EVX-208 | Regulator packet performance hardening (<=2 min standard scope) | P1 | 8 | Committed in sprint execution plan |

**NOW subtotal:** 39 SP

---

## NEXT (pull once NOW is stable)

| Rank | Story ID | Summary | Priority | SP | Notes |
|---|---|---|---|---:|---|
| 7 | EVX-204 | Authorization explainability logging (reason code + context snapshot) | P0 | 8 | Stretch in current sprint plan |
| 8 | EVX-207 | Pilot connectors pack: 2 SIEM + 1 identity/HR connector | P1 | 8 | Stretch in current sprint plan |
| 9 | EVX-SP-01 | Build SecurePath connector auth + incremental sync framework | P0 | 5 | SecurePath stream start |
| 10 | EVX-SP-02 | Implement canonical mapper for findings/remediation/evidence events | P0 | 8 | Depends on EVX-SP-01 |
| 11 | EVX-SP-03 | Map critical findings to CyberAlert + Incident linkage workflow | P0 | 8 | Depends on EVX-SP-02 |
| 12 | EVX-SP-04 | Preserve source trace in DecisionLog/AuditTrailEntry for replay | P0 | 5 | Depends on EVX-SP-03 |

**NEXT subtotal:** 42 SP

---

## LATER (reliability and optional expansion)

| Rank | Story ID | Summary | Priority | SP | Notes |
|---|---|---|---|---:|---|
| 13 | EVX-SP-05 | Add ingest latency and mapping coverage dashboard | P1 | 3 | Operational observability |
| 14 | EVX-SP-06 | Add schema drift detection + quarantine queue | P1 | 5 | Data quality resilience |
| 15 | EVX-SP-07 | Optional bi-directional sync back to SecurePath | P2 | 8 | Only after read-first stability |

**LATER subtotal:** 16 SP

---

## Jira setup suggestion

Use three board states or labels:
- `lane-now`
- `lane-next`
- `lane-later`

CSV prepared for import:
- `jira-import-now-next-later-2026-03-08.csv`

