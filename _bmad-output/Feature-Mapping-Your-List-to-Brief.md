# Feature Mapping: Your Prepared Features → Product Brief

**Purpose:** Map your prepared features to the updated product brief: what was **added**, what was **de-duplicated**, and where it appears.

---

## Summary

| Your feature | Action | Where in brief |
|--------------|--------|----------------|
| Human-in-the-Loop Governance | **Added** | Solution; Value prop (CISO, Compliance); Differentiators; Personas (implicit in Risk Manager); Use case 12; NFR-23 |
| Marketing and ROI (CFO, dashboards, benchmarking) | **Added** | Solution; Value prop (CFO); Differentiators; Personas (CFO); Use case 13; NFR-24 |
| Ethics Management | **Added** | Solution; Value prop (Chief Ethics Officer); Differentiators; Personas (Chief Ethics Officer); Use case 14; NFR-25 |
| Immutable Audit & Explainability | **Added** | Solution; Value prop (CCO, Compliance); Differentiators; Use cases 15; NFR-6 (extended), NFR-26 |
| Governance Fit Assessment (COBIT / NIST / PCI DSS / ISO 27k) | **Added** (extended existing) | Solution (Governance fit assessment; Control library now includes PCI DSS); Value prop (CCO/Board Gov Officer); Personas (CCO/Board Gov Officer); Use case 16; NFR-27 |
| Automated Adversarial Control Testing | **Added** | Solution; Differentiators; Personas (Security Architect); Use case 17; NFR-28 |
| Virtual Three Lines of Defence | **De-duplicated** | Already in brief; enhanced with “autonomous AI agents operate across 1L/2L/3L; adversarial checks; objective audit trails” in Solution |
| Continuous Governance Alignment | **Added** | Solution; Use case 18; NFR-29 |
| Explainability-as-a-Service | **De-duplicated** | Merged into **Immutable audit & explainability** (regulator-ready reports, NL board summaries) |
| Predictive Governance Intelligence | **Added** | Solution; Value prop (Regulated firms, Executives); Use case 19; NFR-30; Regulatory Affairs persona (predictive horizon scanning) |
| Cross-Enterprise Audit Consortium | **Added** (future) | Solution; Value prop (Industry Regulator); Personas (Industry Regulator); Use case 20; NFR-31 (future) |

---

## De-duplication notes

- **Virtual 3LOD** — Already in brief; your “autonomous AI agents operate across three virtual lines” and “adversarial checks enforced independently, audit trails generated objectively” were folded into the existing 3LOD bullet and the new **Automated adversarial control testing** bullet.
- **Governance Fit Assessment** — Overlaps with existing **Framework review (NIST, ISO, COBIT)** and **Annual report and strategy document analysis**. Kept as a distinct capability that *extends* those: explicit **maturity levels**, **PCI DSS**, **ISO 27k**, and “alignment to best practices.” Control library now explicitly includes **PCI DSS**.
- **Explainability-as-a-Service** — Fully merged into **Immutable audit & explainability**: regulator-ready explainability reports (plain language + technical rationale) and natural-language board-level summaries of AI governance decisions. No separate bullet.

---

## New personas added (Secondary)

- **CFO** — Governance intelligence & ROI dashboards; benchmarking tools.
- **Chief Ethics Officer** — Ethics management; ethics scoring in dashboards.
- **Chief Compliance Officer / Board Governance Officer** — Immutable audit & explainability; governance fit assessment.
- **Security Architect** — Automated adversarial control testing.
- **Industry Regulator** — Cross-enterprise audit consortium (future).

---

## New NFRs added

- **NFR-23** — Human-in-the-loop checkpoints and escalation workflows.
- **NFR-24** — Governance intelligence & ROI dashboards; benchmarking vs industry peers.
- **NFR-25** — Ethical guidelines and ethics compliance scoring.
- **NFR-26** — Regulator-ready explainability reports and NL board summaries.
- **NFR-27** — Governance fit assessment (COBIT, NIST, PCI DSS, ISO 27k; maturity levels).
- **NFR-28** — Automated adversarial control testing.
- **NFR-29** — Continuous governance alignment.
- **NFR-30** — Predictive governance intelligence; regulatory feeds (SEC, HKMA, EU Digital Act).
- **NFR-31** (Future) — Cross-enterprise audit consortium (blockchain, privacy-preserving).

**NFR-6** was extended to support optional **blockchain-backed immutable ledger** for AI-driven governance decisions and control actions.

---

*All updates are in `agentic-ai-grc-product-brief.md`.*
