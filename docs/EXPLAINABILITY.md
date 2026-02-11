# Explainability — Evonix Next Gen GRC

> Transparent AI: decision rationale, audit trail, confidence, and regulator-ready reporting.

**Related:** [Regulatory Risk Strategy](REGULATORY-RISK-STRATEGY.md) (managing regulatory risk with explainability) · [Agentic Cyber Defence](AGENTIC-CYBER-DEFENCE.md) (explainability for cyber actions) · [AI Security](AI-SECURITY.md) (coworker model, auditability, failure behavior)

---

## Why Explainability

- **Regulators** (EU AI Act Art. 13/14, NIST AI RMF, MAS TRM, HKMA GenAI) expect transparency and human oversight.
- **Audit** requires a clear trail: who/what decided, on what basis, and who approved.
- **Trust** — users and control owners need to understand and challenge AI outputs.

---

## 6-Layer Explainability Framework

| Layer | Requirement | Implementation |
|-------|-------------|----------------|
| **1. Decision transparency** | Sources, confidence, reasoning | Every AI output has `rationale`, `confidence`, `sources`, `frameworkRefs`; stored in `DecisionLog`. |
| **2. Audit trail integrity** | Immutable log of AI + human actions | `AuditTrailEntry` for every material action (approve, challenge, edit, export). |
| **3. Role-appropriate review** | Qualified reviewer for high-risk | Low confidence or high-impact decisions route to 2L/3L; HITL gates. |
| **4. Confidence thresholds** | Low-confidence → human draft | Outputs below threshold (e.g. 70%) flagged; human must draft or explicitly accept. |
| **5. Regulator-ready reports** | Plain language + technical | Export: Explainability Report, Audit Trail Pack (see Reports & Narratives). |
| **6. Continuous monitoring** | Drift, bias checks | Scheduled jobs; results in audit trail. |

---

## Data Model (Prisma)

- **DecisionLog** — Agent, decision type, input/output refs, rationale, confidence, sources, framework refs, status (pending/approved/challenged).
- **AuditTrailEntry** — Actor (human/agent), action, entity type/id, payload, timestamp.
- **Challenge** — Linked to DecisionLog; raised by user, rationale, status (open/resolved/rejected), resolution.

See `prisma/schema.prisma` for full definitions.

---

## Standards Alignment

- **NIST AI RMF** — Govern, Map, Manage, Measure (transparency and accountability).
- **ISO/IEC 42001:2023** — AI management system; transparency and human oversight.
- **EU AI Act (Art. 13, 14)** — Transparency and human oversight for high-risk AI.
- **MAS TRM / HKMA GenAI** — Explainability and governance of AI use.

---

## Liability & Accountability

- AI outputs are **recommendations**, not decisions.
- **Human approval** required for material actions (control approval, policy publish, escalation).
- **Immutable audit trail** for all AI and human actions.
- **Contractual clarity:** AI assists, human decides, customer owns.

---

## UI / Reports

- **Explainability Panel** (Workflow, Policy Agent) — Rationale, View Sources, Challenge, Approve.
- **Reports & Narratives** — Explainability Report, Audit Trail Pack (export).
- **Confidence scoring** — Per decision type; threshold indicator and HITL routing.

---

## Regulatory risk

Explainability is the foundation for **regulatory risk management**: regulators (EU AI Act, NIST AI RMF, MAS, HKMA) expect transparency and human oversight. Evonix addresses this through the 6-layer framework and regulator-ready reports. For a full **strategy for managing regulatory risk** in the context of Evonix—mapping regulations to controls, evidence-by-default, ownership, and next steps—see [Regulatory Risk Strategy](REGULATORY-RISK-STRATEGY.md).

---

*Part of Evonix Next Gen GRC. Use with Agentic Cyber Defence for full coverage of GRC and security operations.*
