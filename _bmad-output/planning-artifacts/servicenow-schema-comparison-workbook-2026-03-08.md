# ServiceNow Schema Comparison Workbook (for tomorrow)

**Project:** Evonix Agentic AI GRC  
**Date:** 2026-03-08  
**Purpose:** Fast, structured comparison between a ServiceNow schema export and Evonix data model requirements.

---

## 1) What to bring from ServiceNow

Ask for one of these exports:
- Table dictionary export (preferred): table, column, type, nullable, reference target
- ERD screenshot + table list
- CSV export of schema metadata from your instance

Minimum table set to request (likely names, confirm in your instance):
- `incident` or `sn_si_incident` (Security Incident Response)
- Alert/event table (for cyber alert source)
- `task` (workflow/action lineage)
- `sys_audit` / `sys_journal_field` (audit trail)
- Risk/control tables (`sn_risk_*`, `sn_compliance_*`, `sn_grc_*`)
- User/identity references (`sys_user`, groups, roles)

---

## 2) Evonix target models to compare against

From `prisma/schema.prisma`:
- DecisionLog
- AuditTrailEntry
- Challenge
- CyberAlert
- Incident
- ResponseAction
- ThreatIntelFeed

---

## 3) Comparison method (60-90 min session)

Use this fill-in template during the session:  
`templates/servicenow-to-evonix-mapping-template.csv`

1. **Map required fields first** (ignore optional fields initially).
2. Mark each field as one of:
   - `Direct` (same semantics)
   - `Transform` (convert/derive)
   - `Missing` (no source)
3. Score each model:
   - **Green**: >=85% required coverage, no critical semantic gap
   - **Amber**: 60-84% or 1 critical gap
   - **Red**: <60% or >1 critical gap
4. Decide migration strategy per model:
   - Reuse ServiceNow table
   - Extend ServiceNow with custom fields
   - Build Evonix-native table + integration bridge

---

## 4) Critical fit checks (do not skip)

### A. Explainability readiness
- Can we store per-decision rationale and confidence?
- Can we store source citations (JSON-like structure)?
- Can we preserve challenge lifecycle with timestamps?

### B. Audit integrity
- Can we capture actor type (human/agent), action, entity link, payload?
- Is there immutable or tamper-evident support (or compensating control)?

### C. Cyber-to-GRC linkage
- Can incidents link to both risk and control records?
- Can response actions be linked to both alert and incident?

### D. Workflow governance
- Can SLA state and escalation events be represented for challenges?
- Can approval identity and timestamps be captured for HITL?

---

## 5) Model-by-model required fields (baseline)

Use these as "required for v1 trust slice."

### DecisionLog (required)
- `id`
- `createdAt`
- `decisionType`
- `status`
- `rationale`
- `confidence`
- `sources`
- `frameworkRefs`

### AuditTrailEntry (required)
- `id`
- `createdAt`
- `actorType`
- `action`
- `entityType`
- `entityId`
- `payload`

### Challenge (required)
- `id`
- `createdAt`
- `decisionLogId`
- `status`
- `raisedBy`
- `resolvedBy`
- `resolvedAt`

### CyberAlert (required)
- `id`
- `createdAt`
- `source`
- `severity`
- `title`
- `status`
- `riskId`
- `controlId`
- `incidentId`

### Incident (required)
- `id`
- `createdAt`
- `updatedAt`
- `title`
- `severity`
- `status`
- `riskId`

### ResponseAction (required)
- `id`
- `createdAt`
- `agentId`
- `actionType`
- `status`
- `rationale`
- `confidence`
- `approvedBy`
- `approvedAt`
- `alertId`
- `incidentId`

### ThreatIntelFeed (required)
- `id`
- `createdAt`
- `name`
- `source`
- `lastSync`
- `indicators`

---

## 6) Gap classification

- **G1 - Missing field**: no source field exists
- **G2 - Semantic mismatch**: field exists but means something else
- **G3 - Cardinality mismatch**: one-to-many needed but one-to-one available (or reverse)
- **G4 - Type mismatch**: type conversion risk (JSON/text/datetime/enum)
- **G5 - Governance risk**: required auditability/explainability cannot be guaranteed

---

## 7) Decision output template (fill after session)

| Model | Coverage % (required) | Critical gaps | Decision | Notes |
|---|---:|---:|---|---|
| DecisionLog |  |  | Reuse / Extend / Build-native |  |
| AuditTrailEntry |  |  | Reuse / Extend / Build-native |  |
| Challenge |  |  | Reuse / Extend / Build-native |  |
| CyberAlert |  |  | Reuse / Extend / Build-native |  |
| Incident |  |  | Reuse / Extend / Build-native |  |
| ResponseAction |  |  | Reuse / Extend / Build-native |  |
| ThreatIntelFeed |  |  | Reuse / Extend / Build-native |  |

---

## 8) Tomorrow meeting agenda (suggested)

1. 10 min - Confirm plugin/modules active in ServiceNow instance
2. 20 min - Walk source tables and references
3. 20 min - Map required fields only
4. 15 min - Identify red/amber models and critical gaps
5. 10 min - Choose migration strategy by model
6. 5 min - Assign follow-up actions

---

## 9) Practical recommendation before you start

For this sprint (FR-48 to FR-54), prioritize compatibility for:
1. `Incident`, `CyberAlert`, `ResponseAction`
2. `AuditTrailEntry`, `DecisionLog`, `Challenge`

If ServiceNow does not cleanly support explainability and challenge lineage at required depth, keep those models Evonix-native and integrate selectively rather than forcing schema fit.

