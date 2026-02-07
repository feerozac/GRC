# Agentic Cyber Defence — Evonix Next Gen GRC

> Autonomous and semi-autonomous agents for detection, response, and threat intelligence, with full explainability and GRC linkage.

**Related:** [Explainability](EXPLAINABILITY.md) (rationale and audit trail for all agent actions) · [AI Security](AI-SECURITY.md) (coworker model, boundaries, failure behavior)

---

## Overview

Agentic Cyber Defence extends the Evonix platform with **cyber-focused agents** that:

- **Detect** — Ingest and triage alerts from SIEM, EDR, IDS, email security, threat intel.
- **Respond** — Recommend or execute response actions (isolate, block, notify, escalate, run playbook) with human-in-the-loop where required.
- **Orchestrate** — Link alerts to incidents, link incidents to GRC risks and controls; feed audit trail and explainability.

All agent actions are logged with **rationale** and **confidence** and can be **challenged** or **approved** by humans.

---

## Agents

| Agent | Role | Explainability |
|-------|------|----------------|
| **Detection Agent** | Triage alerts, enrich with threat intel, suggest severity and assignment | Why this severity; which IOCs matched; link to risk/control. |
| **Response Agent** | Recommend/execute isolate, block, notify, escalate, create ticket | Why this action; confidence; HITL for critical actions. |
| **Orchestration Agent** | Correlate alerts → incidents; link to GRC (risks, controls, issues) | Why linked to this risk; which controls are relevant. |
| **Threat Intel Agent** | Ingest and normalize feeds; match IOCs to alerts and assets | Source of intel; last sync; confidence in match. |

---

## Data Model (Prisma)

- **CyberAlert** — Source, severity, title, description, status, assigned agent, risk/control/incident links.
- **Incident** — Title, severity, status, summary, root cause, linked alerts and response actions.
- **ResponseAction** — Agent, action type, target, payload, status, **rationale**, **confidence**, **approvedBy** (HITL).
- **ThreatIntelFeed** — Name, source, last sync, indicators (IOCs).

See `prisma/schema.prisma` for full definitions.

---

## GRC Integration

- **Alerts/incidents → Risks** — Map to risk register; update risk posture.
- **Alerts/incidents → Controls** — Link to controls (e.g. IAM, EDR); evidence for control effectiveness.
- **Response actions → Audit trail** — Every action in `AuditTrailEntry`; explainability in `DecisionLog` where agent made a recommendation.

---

## Human-in-the-Loop (HITL)

- **Critical severity** — Response actions require human approval before execution.
- **High-risk targets** — e.g. executive accounts, critical servers; approve or reject.
- **Suppression / false positive** — Human can suppress alert and add rationale; logged in audit trail.

---

## AI Security alignment

Cyber defence agents follow the same principles as [AI Security](AI-SECURITY.md): coworker model, identity separation, explicit delegation, alert-driven state transitions, and fail-closed behavior. Alerts and response actions feed the same audit trail and explainability model as GRC agents.

---

## UI (Prototype)

- **Cyber Defence** nav — Dashboard: alerts, incidents, agent status.
- **Alerts** — List/detail, triage, assign, link to risk/control/incident.
- **Incidents** — Create from alerts; timeline; response actions; link to GRC.
- **Response actions** — List with rationale and confidence; Approve / Reject / Challenge.
- **Explainability** — Per alert/incident/action: why this decision; sources; challenge.

---

*Part of Evonix Next Gen GRC. Builds on the same explainability and audit trail as GRC agents.*
