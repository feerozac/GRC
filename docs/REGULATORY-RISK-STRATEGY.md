# Regulatory Risk Strategy — Evonix Next Gen GRC

> Managing regulatory risk in the context of Evonix: how explainability, auditability, and human oversight translate into evidence and compliance posture.

**Grounds:** [Explainability](EXPLAINABILITY.md) (6-layer framework, DecisionLog, AuditTrailEntry, Challenge, regulator-ready reports)

**Related:** [AI Security](AI-SECURITY.md) · [Agentic Cyber Defence](AGENTIC-CYBER-DEFENCE.md)

---

## 1. What “regulatory risk” means in Evonix

**Regulatory risk** here is: the risk that a regulator or auditor finds Evonix’s use of AI in GRC or cyber defence to be non-compliant, opaque, or inadequately governed—leading to findings, remediation orders, or loss of trust.

Evonix reduces that risk by design: AI outputs are **recommendations**; **humans** approve material actions; every material action and AI decision is **logged and explainable**; and **regulator-ready reports** can be produced on demand. This strategy turns that design into a repeatable, owned process with clear evidence.

---

## 2. Regulatory landscape → Explainability mapping

| Regulation / standard | What they expect | How Evonix addresses it (Explainability) |
|----------------------|------------------|------------------------------------------|
| **EU AI Act (Art. 13, 14)** | Transparency, human oversight, documentation for high-risk AI | Layer 1–2: rationale, sources, confidence in DecisionLog; AuditTrailEntry for all actions. Layer 3: HITL for high-impact. Layer 5: Explainability Report & Audit Trail Pack. Liability: “AI assists, human decides.” |
| **NIST AI RMF** | Govern, Map, Manage, Measure; transparency and accountability | DecisionLog + AuditTrailEntry = accountable record. Confidence thresholds (Layer 4) and role-appropriate review (Layer 3) support governance. Layer 6 (monitoring) feeds Measure. |
| **ISO/IEC 42001:2023** | AI management system; transparency and human oversight | 6-layer framework as part of AI MS controls. Evidence: DecisionLog (transparency), AuditTrailEntry (oversight), Challenge (feedback loop). |
| **MAS TRM / HKMA GenAI** | Explainability and governance of AI use in financial services | Same as above: rationale, sources, approval trail, regulator-ready reports. Explicit “human decides” and audit trail support MAS/HKMA expectations. |

**Principle:** Every regulatory requirement for “transparency” or “human oversight” is mapped to at least one **concrete artifact** (DecisionLog, AuditTrailEntry, Challenge, Explainability Report, Audit Trail Pack) and, where relevant, to a **control or process** (e.g. HITL gate, confidence threshold).

---

## 3. Strategy pillars

### 3.1 Design for evidence (by default)

- **Every material AI output** is recorded in **DecisionLog** with rationale, confidence, sources, frameworkRefs, and status (pending/approved/challenged).
- **Every material human or system action** (approve, challenge, edit, export, escalate) is recorded in **AuditTrailEntry** with actor, action, entity, and timestamp.
- **Challenges** to AI decisions are stored with **Challenge** (raised by, rationale, status, resolution). This demonstrates that the organisation tests and, where needed, overrides AI.

No separate “compliance run”: the product’s normal operation produces the evidence. Regulatory risk is reduced because the evidence exists by design, not as an afterthought.

### 3.2 Regulator-ready outputs (Layer 5)

- **Explainability Report** — Plain-language summary of how AI is used, how decisions are explained (rationale, sources, confidence), and how humans oversee (approvals, challenges). Suitable for regulators and audit.
- **Audit Trail Pack** — Technical export of DecisionLog + AuditTrailEntry (and optionally Challenge) for a given scope (e.g. time window, process, entity). Supports “show me exactly what happened.”

Define a standard scope and format for each (e.g. per engagement, per quarter, per incident) and who can generate them (e.g. 2L Risk, Compliance, or 3L).

### 3.3 Role-appropriate review (Layer 3) and confidence (Layer 4)

- **Low confidence** (e.g. below 70%) or **high-impact** decisions (e.g. policy publish, control sign-off, cyber response) route to **2L/3L** or designated reviewer. Document the rule and the roles.
- **Thresholds** (e.g. 70% for “human must draft or explicitly accept”) are configured and documented. Changes to thresholds are themselves audited (AuditTrailEntry).

This directly supports “human oversight” and “appropriate governance” in EU AI Act, NIST, ISO 42001, MAS, HKMA.

### 3.4 Liability and accountability (contractual and operational)

- **Contractual clarity:** “AI assists, human decides, customer owns.” Reflected in terms, product docs, and training.
- **Operational:** Material actions (control approval, policy publish, escalation) require **human approval**; that approval is in the audit trail. No “AI decided alone” for those actions.

This limits regulatory and liability risk by making the human the decision-maker and the audit trail the proof.

### 3.5 Continuous monitoring (Layer 6) and change control

- **Drift and bias checks** (or equivalent monitoring) run on a schedule; results are written to the audit trail. Regulators and internal audit can see that the organisation monitors AI behaviour.
- **When regulations change** (e.g. EU AI Act implementing acts, MAS/HKMA updates): (1) assess impact on the 6-layer framework and controls, (2) update mapping (like the table in §2), (3) change config/process if needed, (4) log changes in AuditTrailEntry and, where appropriate, in DecisionLog (e.g. “Policy updated to reflect Art. 14(b)”).

---

## 4. Ownership and process

| Area | Suggested owner | Cadence / trigger |
|------|-----------------|--------------------|
| Mapping regulations → explainability controls | Compliance / 2L Risk | On new regulation or material change; annual review. |
| Explainability Report / Audit Trail Pack production | 2L Risk or Compliance | On request (audit, regulator); optionally periodic (e.g. quarterly). |
| Confidence thresholds and HITL rules | Product / 2L Risk | Design and change control; changes logged. |
| Challenge and override process | Process owner (e.g. 1L/2L) | Documented; usage reviewed (e.g. in audit trail). |
| Regulatory change impact on Evonix | Compliance with Product | When regulation or guidance changes. |

---

## 5. Risk acceptance and limits

- **In-scope:** Risk that Evonix’s AI use is deemed insufficiently transparent or overseen. Mitigated by the 6-layer framework, evidence by default, and regulator-ready reports.
- **Out of scope (for this strategy):** General IT/GRC regulatory risk unrelated to AI (e.g. generic control frameworks); risk that the customer misuses Evonix; risk from third-party models or data (covered by separate vendor/contract and data governance).

---

## 6. Summary: regulatory risk posture

| Risk | Mitigation (Explainability-led) |
|------|----------------------------------|
| “We can’t explain how the AI decided” | DecisionLog: rationale, sources, confidence, frameworkRefs for every material output. |
| “There’s no proof of human oversight” | AuditTrailEntry for every approve/challenge/edit; HITL gates for high-impact; Challenge records. |
| “We can’t produce something for the regulator” | Explainability Report + Audit Trail Pack; standard scope and owner. |
| “Confidence or impact wasn’t considered” | Layer 3 & 4: role-appropriate review and confidence thresholds; documented and logged. |
| “Regulation changed and we didn’t adapt” | Mapping (§2) and change process (§3.5); ownership in §4. |

---

## 7. Next steps

- [ ] Formalise **Explainability Report** and **Audit Trail Pack** formats and access (who can generate, for what scope).
- [ ] Document **confidence thresholds** and **HITL rules** (which decisions go to 2L/3L) in a single control or policy.
- [ ] Assign **owner** for regulation → explainability mapping and for regulatory change impact.
- [ ] Add **regulatory risk** to risk register (e.g. “AI governance / explainability”) with controls pointing to this strategy and to [Explainability](EXPLAINABILITY.md).
- [ ] One-off: produce a **draft Explainability Report** for Evonix (current design) and validate with Compliance or Legal.

---

*Part of Evonix Next Gen GRC. Regulatory risk is managed by making explainability and human oversight the default, and by turning them into evidence and regulator-ready outputs.*
