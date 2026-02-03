---
stepsCompleted: [1, 2]
inputDocuments: []
date: 2026-01-29
author: Mark
---

# Product Brief: Evonix

<!-- Content will be appended sequentially through collaborative workflow steps -->

## Executive Summary

Evonix is an enterprise governance, risk, and compliance platform built to eliminate the manual, time‑intensive work of remediation, compliance, regulatory approvals, control testing, and risk identification. It embeds AI agents with distinct personas aligned to the three lines of defence (1L/2L/3L) so governance stays fully engaged while repetitive work is automated. The result is faster decision cycles, audit‑ready outcomes, and regulator‑friendly accountability without sacrificing human oversight.

---

## Core Vision

### Problem Statement

Managing remediation, compliance, regulatory approvals, control testing, risk identification, and strategy linkage is labor‑intensive and fragmented. Risk and compliance teams are highly specialised and costly, yet still spend too much time on coordination rather than reducing risk.

### Problem Impact

Audit preparation remains slow and reactive, regulatory change outpaces reporting cycles, and accountability is hard to evidence. This increases operational risk, audit pressure, and compliance cost.

### Why Existing Solutions Fall Short

Traditional GRC tools organise workflows but do not operate governance continuously. They automate tasks but cannot provide real‑time governance engagement, explainability at scale, or strategy‑to‑metrics translation without heavy manual effort.

### Proposed Solution

An agentic AI–enabled enterprise GRC platform that automates the work while preserving accountability. Human‑in‑the‑loop checkpoints ensure high‑risk decisions are validated by experts, while AI agents continuously identify risks, accelerate remediation, interpret regulatory change, and map governance decisions back to business strategy. This creates audit‑proof, regulator‑ready outputs without slowing the organisation.

### Key Differentiators

- **Accountability by design:** Humans own high‑risk decisions; AI actions are traceable and auditable.
- **Explainability at scale:** Plain‑language executive narratives plus technical rationale for auditors.
- **Automation without loss of rigor:** Repetitive work automated, assurance strengthened by continuous evidence.
- **Strategy → governance “round‑trip”:** Strategy and board intent translate to objectives, policies, standards, org/process, metrics, and logs.
- **3LOD‑aligned agent personas:** Agents reinforce governance culture rather than bypass it.

---

## Autonomous Policy & Standards Agent Workflow

### Overview

Evonix introduces an **Autonomous Policy Agent** that transforms boardroom intent into auditable, framework-aligned policies and standards — without manual research or drafting. The agent operates as a policy research assistant, framework analyst, and technical writer combined.

### Agent Workflow: Boardroom → Policy Artifacts

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        INPUTS (Multi-Modal Ingestion)                       │
├─────────────────────────────────────────────────────────────────────────────┤
│  • Board minutes / strategy documents                                       │
│  • Annual reports / CEO/CFO statements                                      │
│  • Risk appetite statements                                                 │
│  • Existing policies & standards (current state)                            │
│  • Org chart / process documentation                                        │
│  • Regulatory notices (HKMA, MAS, SEC, etc.)                                │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    POLICY RESEARCH AGENT (Autonomous)                       │
├─────────────────────────────────────────────────────────────────────────────┤
│  1. Extract governance objectives from inputs                               │
│  2. Identify applicable frameworks based on industry, region, risk profile  │
│  3. Cross-reference requirements across multiple frameworks                 │
│  4. Map existing policies to framework requirements                         │
│  5. Identify gaps, conflicts, and outdated provisions                       │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                   FRAMEWORK KNOWLEDGE BASE (Indexed)                        │
├─────────────────────────────────────────────────────────────────────────────┤
│  GOVERNANCE & IT MANAGEMENT                                                 │
│  • COBIT 2019 (40 governance objectives)                                    │
│  • ITIL v4 / v5 (service management practices)                              │
│  • COSO ERM (enterprise risk management)                                    │
│  • ISO 38500 (IT governance)                                                │
│                                                                             │
│  SECURITY & CONTROLS                                                        │
│  • NIST 800-53 Rev 5 (security & privacy controls)                          │
│  • NIST CSF 2.0 (cybersecurity framework)                                   │
│  • ISO/IEC 27001:2022 (ISMS requirements)                                   │
│  • ISO/IEC 27002:2022 (security controls guidance)                          │
│  • ISO/IEC 27017 (cloud security)                                           │
│  • ISO/IEC 27018 (cloud privacy)                                            │
│  • ISO/IEC 27701 (privacy management)                                       │
│  • CIS Controls v8                                                          │
│                                                                             │
│  CRYPTOGRAPHY & DATA PROTECTION                                             │
│  • FIPS 140-3 (cryptographic module validation)                             │
│  • FIPS 197 (AES encryption standard)                                       │
│  • FIPS 186-5 (digital signature standard)                                  │
│  • NIST SP 800-57 (key management)                                          │
│  • GDPR (data protection requirements)                                      │
│                                                                             │
│  INDUSTRY-SPECIFIC                                                          │
│  • PCI DSS v4.0 (payment card industry)                                     │
│  • SOC 2 Type II (trust service criteria)                                   │
│  • HIPAA (healthcare — US)                                                  │
│  • Basel III / IV (banking capital & risk)                                  │
│  • HKMA SPM modules (Hong Kong banking)                                     │
│  • MAS TRM / cyber hygiene (Singapore financial)                            │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                   POLICY DRAFTING AGENT (With HITL)                         │
├─────────────────────────────────────────────────────────────────────────────┤
│  For each identified gap or outdated provision:                             │
│                                                                             │
│  1. ANALYZE existing policy/standard (if any)                               │
│     → Extract current provisions                                            │
│     → Identify what's missing vs. framework requirements                    │
│                                                                             │
│  2. RESEARCH framework requirements                                         │
│     → Pull specific control language from indexed frameworks                │
│     → Cross-map overlapping requirements (e.g., NIST↔ISO↔COBIT)             │
│     → Identify conflicts or superseded guidance                             │
│                                                                             │
│  3. DRAFT recommendation                                                    │
│     → Option A: Revise existing policy with tracked changes                 │
│     → Option B: Draft new policy from template                              │
│     → Include framework citations (e.g., "Aligns to NIST 800-53 AC-2")      │
│     → Assign confidence score (High/Medium/Low)                             │
│                                                                             │
│  4. EXPLAIN rationale                                                       │
│     → Why this change is needed                                             │
│     → Which frameworks mandate/recommend it                                 │
│     → Impact on related policies/controls                                   │
│     → Risk of non-compliance                                                │
│                                                                             │
│  5. ROUTE for review                                                        │
│     → Low confidence → 2L Risk Manager drafts manually                      │
│     → Medium confidence → 2L Risk Manager reviews AI draft                  │
│     → High confidence → 1L Policy Owner reviews + approves                  │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         OUTPUTS (Auditable Artifacts)                       │
├─────────────────────────────────────────────────────────────────────────────┤
│  • Draft policy documents (Word/Markdown with tracked changes)              │
│  • Framework mapping matrix (policy ↔ framework requirements)               │
│  • Gap analysis report (what's missing, priority, effort)                   │
│  • Conflict resolution log (where frameworks disagree)                      │
│  • Approval workflow record (who approved, when, rationale)                 │
│  • Audit trail (full lineage from boardroom input to final policy)          │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Supported Framework Cross-Mapping

The agent automatically identifies overlapping requirements across frameworks to avoid redundant policies:

| Control Domain | COBIT 2019 | NIST 800-53 | ISO 27001 | PCI DSS | ITIL v4 |
|----------------|------------|-------------|-----------|---------|---------|
| Access Control | DSS05.04 | AC-1 to AC-25 | A.9 | Req 7, 8 | Access Mgmt |
| Change Management | BAI06 | CM-1 to CM-14 | A.12.1.2 | Req 6.5 | Change Enablement |
| Incident Response | DSS02 | IR-1 to IR-10 | A.16 | Req 12.10 | Incident Mgmt |
| Risk Assessment | APO12 | RA-1 to RA-10 | A.8.2 | Req 12.2 | Risk Mgmt |
| Encryption | DSS05.03 | SC-13 | A.10 | Req 3, 4 | — |
| Audit Logging | DSS05.07 | AU-1 to AU-16 | A.12.4 | Req 10 | — |

### Policy Lifecycle Automation

| Stage | Traditional Approach | Evonix Agent Approach |
|-------|---------------------|----------------------|
| **Gap Identification** | Annual manual audit (weeks) | Continuous monitoring (minutes) |
| **Framework Research** | Consultant engagement ($50K+) | AI retrieves + cross-maps instantly |
| **Policy Drafting** | SME writes from scratch (days) | AI drafts with citations (minutes) |
| **Review Cycle** | Email/Word track changes (weeks) | In-platform workflow with HITL gates |
| **Approval** | Manual signature chase | Automated routing + audit trail |
| **Publication** | Manual upload to SharePoint | Auto-publish to policy portal |
| **Ongoing Review** | Calendar reminder (often missed) | Agent monitors for regulatory triggers |

### Example: FIPS Encryption Policy Workflow

**Trigger:** Board approves "Zero Trust" strategy in Q1 board pack.

1. **Agent ingests** board minutes → extracts "implement zero trust architecture"
2. **Agent identifies** encryption is a core ZTA requirement
3. **Agent researches** FIPS 140-3, NIST 800-57, ISO 27001 A.10
4. **Agent reviews** existing "Data Encryption Policy v2.1" → finds no FIPS reference
5. **Agent drafts** revision:
   - Adds FIPS 140-3 Level 2 requirement for cryptographic modules
   - Adds NIST 800-57 key management lifecycle
   - Adds approval workflow for cryptographic exceptions
   - Confidence: **High** (well-defined framework requirements)
6. **Agent routes** to 1L IT Security Policy Owner for review
7. **Policy Owner approves** → Policy v3.0 published with full audit trail

**Time to policy update:** 2 hours (vs. traditional 3-4 weeks)

### Key Differentiator: Why Competitors Can't Do This

| Barrier | Incumbent Challenge | Evonix Advantage |
|---------|---------------------|------------------|
| **Framework indexing** | No structured, queryable framework database | 20+ frameworks indexed with control-level granularity |
| **Cross-mapping intelligence** | Manual mapping maintained by consultants | AI maintains dynamic cross-reference matrix |
| **Document generation** | No policy authoring capability | AI drafts with tracked changes + citations |
| **Context understanding** | Can't interpret boardroom language | LLM understands strategic intent → translates to control requirements |
| **Continuous triggers** | Static annual review cycles | Real-time monitoring for regulatory changes |

---

## Competitive Analysis

### Evaluation Criteria (Weighted)

| Criteria | Weight | Description |
|----------|--------|-------------|
| **Agentic AI Capability** | 25% | True autonomous agents vs workflow automation |
| **3LOD Native Design** | 20% | First-class 1L/2L/3L separation and workflows |
| **Explainability at Scale** | 15% | Plain-language + technical audit rationale |
| **Strategy-to-Metrics Round-Trip** | 15% | Board intent → objectives → evidence → logs |
| **APAC Regulatory Intelligence** | 10% | HKMA/MAS near real-time coverage |
| **Org/Doc Governance Mapping** | 10% | Org chart + annual report ingestion |
| **Time to Audit-Ready** | 5% | Speed of board pack generation |

### Competitor Scoring (1-5 scale)

| Vendor | Agentic AI (25%) | 3LOD (20%) | Explainability (15%) | Strategy→Metrics (15%) | APAC Reg (10%) | Org/Doc (10%) | Audit Speed (5%) | **Weighted Score** |
|--------|------------------|------------|---------------------|------------------------|----------------|---------------|------------------|-------------------|
| **Evonix (Ours)** | 5 | 5 | 5 | 5 | 5 | 5 | 5 | **5.00** |
| IBM OpenPages | 4 | 3 | 3 | 2 | 3 | 2 | 3 | **2.95** |
| ServiceNow GRC | 4 | 2 | 3 | 2 | 2 | 2 | 3 | **2.65** |
| AuditBoard | 3 | 3 | 4 | 2 | 2 | 2 | 4 | **2.80** |
| MetricStream | 3 | 3 | 3 | 2 | 4 | 2 | 3 | **2.80** |
| Diligent | 3 | 2 | 3 | 3 | 2 | 2 | 4 | **2.65** |

### Why Competitors Don't Cover Org/Doc Governance Mapping

| Barrier | Incumbent Challenge | Our Advantage |
|---------|---------------------|---------------|
| **Architecture Legacy** | Built 10-15 years ago as structured data systems; retrofitting NLP/ML is expensive | Built agent-first with document intelligence native |
| **Data Model Limitations** | Model Risks → Controls → Evidence only; no strategy-to-metrics lineage | Governance exoskeleton: Strategy → Objectives → Policies → Standards → Org → Process → Metrics → Logs |
| **Customer Expectation Mismatch** | Optimized for "help me pass audits" not "interpret my board papers" | Designed for strategy-to-governance translation |
| **AI Maturity Gap** | Experimenting with LLMs; none shipped org/doc parsing at scale | Production-ready with human-in-the-loop validation |
| **Liability Concerns** | Risk-averse about AI-generated governance recommendations | Explainability by Design + immutable audit trail |

### Primary Differentiators to Lead With

1. **Agentic-native architecture** — not retrofitted AI on legacy workflows
2. **First-class 3LOD** — persona-aligned agents preserving governance culture
3. **Strategy → metrics round-trip** — governance exoskeleton from board to logs
4. **APAC regulatory intelligence** — HKMA/MAS 24h SLA

### Competitive Positioning

Position as the **only agent-first GRC platform** built for continuous governance, not workflow automation with AI bolted on.

---

## Liability & Accountability Framework

Evonix is designed for **accountability by design**, not liability transfer. AI outputs are recommendations, not decisions. Every material action requires human approval from a role-appropriate reviewer, with mandatory explainability and an immutable audit trail. Contractual terms are explicit: the AI assists, the human decides, the customer owns the outcome. This model aligns with emerging regulatory expectations (HKMA, MAS, EU AI Act) for AI in governance.

### Stronger Liability Framework (6-Layer Mechanism)

| Layer | Mechanism | Liability Clarity |
|-------|-----------|-------------------|
| **1. Explainability** | Every AI output includes sources, confidence score, and reasoning | User can evaluate quality of recommendation |
| **2. Competence Gate** | High-risk actions require role-appropriate approver (e.g., 2L risk manager, not 1L analyst) | Approval authority matches decision gravity |
| **3. Challenge Window** | Time-boxed period for human review before AI recommendation becomes actionable | Prevents rubber-stamping |
| **4. Immutable Trail** | All AI outputs and human approvals logged to tamper-evident store | Audit can reconstruct decision chain |
| **5. Confidence Thresholds** | Low-confidence AI outputs flagged for mandatory human drafting, not just review | AI knows when to defer |
| **6. Contractual Clarity** | Terms of service explicitly state: AI assists, human decides, customer owns outcome | Legal boundary is unambiguous |

### What Regulators Actually Want

Based on HKMA, MAS, and EU AI Act guidance:

| Regulator Expectation | Our Answer |
|-----------------------|------------|
| **Traceability** | Immutable audit trail with decision lineage |
| **Explainability** | Plain-language + technical rationale for every recommendation |
| **Accountability** | Named human approver for every material action |
| **Human oversight** | Configurable HITL checkpoints by risk tier |
| **Bias/fairness** | Ethics scoring engine (roadmap) |

### Remaining Risk (Acknowledged)

Even with all mitigations, these risks remain:

| Risk | Description | Mitigation Approach |
|------|-------------|---------------------|
| **Novel regulatory interpretation** | AI trained on historical guidance may miss new expectations | Real-time regulatory feed + human review of gap analysis |
| **Cascading errors** | One bad mapping propagates through linked controls | Confidence thresholds + periodic human-only audits |
| **Over-trust** | Users stop critically reviewing AI outputs over time | Mandatory challenge windows + random human-draft requirements |
| **Regulatory change** | New rules may impose stricter AI liability | Active participation in regulator sandboxes + legal monitoring |

**Position:** We cannot eliminate liability risk, but we can make the risk explicit, bounded, and insurable. Transparency about remaining risk builds regulator trust.

---

## Explainability Framework Alignment

Evonix implements a **6-layer explainability framework** designed to satisfy regulatory expectations from MAS, HKMA, and international standards bodies.

### Standards Mapping (Detailed)

| Layer | Source/Inspiration | Specific Reference |
|-------|-------------------|-------------------|
| **1. Decision Transparency** | NIST AI RMF "Explainability"; EU AI Act | NIST AI RMF Map 1.1, EU AI Act Art. 13(1) |
| **2. Audit Trail Integrity** | ISO/IEC 42001 audit requirements; MAS Model Risk | ISO/IEC 42001:2023 §9.2, MAS Model Risk Mgmt |
| **3. Role-Appropriate Review** | EU AI Act "Human Oversight"; MAS proportionality | EU AI Act Art. 14(1)-(4), MAS FEAT Principles |
| **4. Confidence Thresholds** | MAS "proportionate approach"; NIST uncertainty | MAS Guidelines §5.3, NIST AI RMF Measure 2.1 |
| **5. Regulator-Ready Reports** | NIST AI RMF Playbook; EU AI Act transparency | NIST AI RMF Govern 4.1, EU AI Act Art. 13(2) |
| **6. Continuous Monitoring** | ISO/IEC 42001 continual improvement; MAS monitoring | ISO/IEC 42001 §10, MAS Guidelines §6 |

### 6-Layer Explainability Model

| Layer | Requirement | Framework Alignment |
|-------|-------------|---------------------|
| **1. Decision Transparency** | Every AI recommendation includes: sources, confidence score, reasoning chain | NIST AI RMF, EU AI Act Art. 13 |
| **2. Audit Trail Integrity** | Immutable, tamper-evident log of all AI outputs + human approvals | ISO/IEC 42001, MAS lifecycle controls |
| **3. Role-Appropriate Review** | High-risk outputs require approval by qualified reviewer (not rubber-stamp) | MAS human oversight, EU AI Act Art. 14 |
| **4. Confidence Thresholds** | Low-confidence outputs flagged for mandatory human drafting | MAS proportionate approach |
| **5. Regulator-Ready Reports** | On-demand explainability reports: plain language (board) + technical (auditor) | NIST Playbook, EU AI Act transparency |
| **6. Continuous Monitoring** | Drift detection, periodic human-only audits, bias checks | ISO/IEC 42001 PDCA, MAS evaluation & testing |

### Worked Example 1: Policy Gap Detection

**Scenario:** Agent detects that the Data Encryption Policy v2.1 lacks FIPS 140-3 reference.

**Layer 1 — Decision Transparency Output:**
```
┌─────────────────────────────────────────────────────────────────────────┐
│ RECOMMENDATION: Revise Data Encryption Policy to include FIPS 140-3    │
├─────────────────────────────────────────────────────────────────────────┤
│ CONFIDENCE: 91% (High)                                                 │
├─────────────────────────────────────────────────────────────────────────┤
│ SOURCES:                                                               │
│   • Board Minutes Q4 2025, p.3 — "Zero Trust architecture approved"    │
│   • NIST 800-207 §3.1 — "FIPS-validated encryption required for ZTA"   │
│   • FIPS 140-3 §4.1 — Cryptographic module validation requirements     │
│   • Current Policy v2.1 §4.2 — No FIPS reference found                 │
├─────────────────────────────────────────────────────────────────────────┤
│ REASONING CHAIN:                                                       │
│   1. Board approved Zero Trust strategy (source: Board Minutes)        │
│   2. Zero Trust requires FIPS-validated encryption (source: NIST 800-207)│
│   3. Current policy specifies AES-256 but not FIPS validation          │
│   4. Gap: Policy does not meet ZTA encryption requirements             │
│   5. Recommendation: Add FIPS 140-3 Level 2 requirement                │
├─────────────────────────────────────────────────────────────────────────┤
│ IMPACT IF NOT ADDRESSED:                                               │
│   • Non-compliance with board-approved strategy                        │
│   • Potential regulatory finding (HKMA expects industry-standard crypto)│
│   • Audit observation on policy-strategy misalignment                  │
└─────────────────────────────────────────────────────────────────────────┘
```

**Layer 2 — Audit Trail Entry:**
```json
{
  "event_id": "EVX-2026-01-29-00142",
  "timestamp": "2026-01-29T14:32:18.447Z",
  "event_type": "AI_RECOMMENDATION",
  "agent": "policy-research-agent-v2.1",
  "model_version": "evonix-grc-llm-2026.01",
  "input_hash": "sha256:a3f2c9...",
  "output_hash": "sha256:7b4e1d...",
  "confidence_score": 0.91,
  "recommendation_id": "REC-POL-00089",
  "sources_cited": 4,
  "human_action_required": true,
  "routing_decision": "1L_REVIEW",
  "immutable_ledger_tx": "0x7f3a2b..."
}
```

**Layer 3 — Role-Appropriate Review:**
- Confidence 91% (High) → Routes to **1L Policy Owner** for review
- If confidence were 65% (Medium) → Would route to **2L Risk Manager** for review
- If confidence were 45% (Low) → Would require **2L Risk Manager to draft manually**

**Layer 4 — Confidence Threshold Applied:**
- 91% > 80% threshold → AI draft accepted for human review
- Human can: Approve, Edit, Reject, or Challenge

**Layer 5 — Regulator-Ready Report (Board Summary):**
> "The AI governance system identified that our Data Encryption Policy does not reference FIPS 140-3, which is required for the Zero Trust architecture the Board approved in Q4 2025. A policy revision has been drafted and is pending approval from the IT Security Policy Owner. This finding was detected automatically within 24 hours of the Board's strategy approval."

**Layer 6 — Continuous Monitoring:**
- Quarterly validation: Re-check policy against framework updates
- Drift detection: Alert if FIPS 140-3 is superseded by FIPS 140-4
- Bias check: Verify confidence calibration against historical accuracy

---

### Worked Example 2: Regulatory Change Response

**Scenario:** HKMA publishes new GenAI Circular requiring "explainability documentation for AI-assisted decisions."

**Timeline:**
```
T+0h    HKMA publishes circular
T+2h    Evonix regulatory feed ingests document
T+4h    AI gap analysis complete
T+6h    Compliance Manager notified with gap report
T+24h   Draft response plan ready for 2L review
```

**Layer 1 — Decision Transparency Output:**
```
┌─────────────────────────────────────────────────────────────────────────┐
│ REGULATORY ALERT: HKMA GenAI Circular (Jan 2026)                       │
├─────────────────────────────────────────────────────────────────────────┤
│ NEW REQUIREMENT: §4.2 — "Authorized institutions must maintain         │
│ documentation demonstrating explainability of AI-assisted decisions    │
│ in risk management and compliance functions."                          │
├─────────────────────────────────────────────────────────────────────────┤
│ GAP ANALYSIS:                                                          │
│   ✅ Layer 1 (Decision Transparency) — Compliant                       │
│   ✅ Layer 2 (Audit Trail) — Compliant                                 │
│   ✅ Layer 3 (Role-Appropriate Review) — Compliant                     │
│   ⚠️ Layer 5 (Regulator-Ready Reports) — Partial gap                   │
│      Current: On-demand reports available                              │
│      Required: Periodic submission to HKMA (quarterly)                 │
├─────────────────────────────────────────────────────────────────────────┤
│ RECOMMENDED ACTIONS:                                                   │
│   1. Configure quarterly explainability report generation              │
│   2. Map Evonix audit trail fields to HKMA template                    │
│   3. Document in AI Governance Policy                                  │
├─────────────────────────────────────────────────────────────────────────┤
│ CONFIDENCE: 87% (High)                                                 │
│ ROUTING: 2L Compliance Manager for review                              │
└─────────────────────────────────────────────────────────────────────────┘
```

---

### Regulator Perspective: MAS View

| MAS Expectation | Evonix Answer | Assessment |
|-----------------|---------------|------------|
| **Model Risk Management** | Confidence thresholds + validation | ✅ Aligned |
| **Accountability** | Named human approver for material actions | ✅ Aligned |
| **Explainability** | Sources + reasoning + plain language | ✅ Aligned |
| **Audit Trail** | Immutable log with decision lineage | ✅ Aligned |
| **Ongoing Monitoring** | Drift detection, periodic audits | ✅ Aligned |
| **Proportionality** | HITL gates scaled to risk level | ✅ Aligned |

**MAS would likely ask:**
1. "How are confidence thresholds calibrated?" → Backtesting against historical accuracy
2. "Is the audit trail truly tamper-evident?" → Blockchain-backed or cryptographic chaining
3. "What constitutes a 'material action'?" → Defined in configuration; default = policy change, control modification, regulatory response

### Regulator Perspective: HKMA View

| HKMA Expectation | Evonix Answer | Assessment |
|------------------|---------------|------------|
| **Data Governance** | Framework indexing with version control | ⚠️ Enhance data lineage |
| **Model Risk Management** | Confidence scoring + validation | ✅ Aligned |
| **Explainability** | Plain language + technical rationale | ✅ Aligned |
| **Human Oversight** | HITL checkpoints with challenge windows | ✅ Aligned |
| **Training Records** | User certification module (roadmap) | ⚠️ Roadmap item |

**HKMA would likely ask:**
1. "How are staff trained to interpret AI outputs?" → User certification module (roadmap)
2. "What is the escalation path when AI confidence is low?" → Documented in Layer 3
3. "What happens when AI gets it wrong?" → Incident response procedure required

### Gaps to Address (Honest Assessment)

| Gap | Regulator Concern | Mitigation / Roadmap |
|-----|-------------------|----------------------|
| **Calibration evidence** | "How do you know 70% means 70%?" | Backtesting module (v1.1) |
| **Training records** | "Are users trained to interpret confidence?" | User certification module (v1.2) |
| **AI incident response** | "What happens when AI gets it wrong?" | Document procedure (pre-launch) |
| **Model versioning** | "Which model version produced this?" | Add to audit trail (v1.0) |
| **Data lineage** | "Where did framework data come from?" | Document sources and update cadence (v1.0) |

### Certification Roadmap

| Milestone | Timeframe | Benefit |
|-----------|-----------|---------|
| **NIST AI RMF alignment** | Launch | US credibility, foundation for ISO |
| **ISO/IEC 42001 certification** | Year 1 | International credibility, audit-ready |
| **EU AI Act compliance** | Year 1-2 | EU market access |
| **MAS/HKMA sandbox participation** | Year 1 | APAC regulator relationship |
| **Confidence calibration backtesting** | Year 1 | Quantitative proof of AI reliability |

---

## Go-to-Market Trust Strategy

Enterprise buyers (CISOs, CROs) are risk-averse. "Nobody got fired for buying IBM" is a real barrier. Our trust-building strategy:

| Tactic | Implementation | Outcome |
|--------|----------------|---------|
| **Regulator endorsement** | Participate in MAS/HKMA GenAI Sandboxes | "Regulator-vetted" positioning |
| **Big 4 partnership** | Strategic alliance with Deloitte, KPMG, or PwC for implementation | Trust transfer via established brand |
| **ISO/IEC 42001 certification** | Independent AI governance audit | Buyers can point to certification |
| **Cyber insurance backing** | Partner with insurer to offer "AI GRC coverage" add-on | Transfers perceived risk |
| **Pilot-first sales model** | 90-day paid pilot with defined success metrics | Low-risk entry for buyers |
| **Case study velocity** | First 3 customers get discounted rates for public case studies | Social proof acceleration |

---

## Competitive Moat

### Why Incumbents Can't Copy Quickly

| Barrier | Incumbent Challenge | Time to Overcome |
|---------|---------------------|------------------|
| **Architecture debt** | ServiceNow/IBM built 10-15 years ago as workflow engines; agent-first requires core rearchitecture | 2-3 years |
| **Data model lock-in** | Existing Risk → Control → Evidence schema; strategy-to-metrics lineage breaks deployments | 18+ months |
| **Talent gap** | LLM/agent engineering ≠ enterprise workflow dev; hiring + culture integration slow | 12-18 months |
| **Customer expectation anchor** | Customers bought "audit workflow"; pivot to "governance intelligence" confuses positioning | 12+ months |
| **Cannibalization fear** | AI automating GRC work threatens professional services revenue; incentivized to go slow | Indefinite |

### Time-to-Moat Calculation

| Capability | Defensible Lead |
|------------|-----------------|
| Agent-first architecture | 18+ months |
| 3LOD persona engine | 12+ months |
| Strategy-to-metrics lineage | 18+ months |
| APAC regulatory feed (24h SLA) | 12+ months |
| **Total estimated lead** | **18-24 months** |

---

## Go-to-Market Economics

Enterprise GRC deals take 9-18 months. Our strategy to reduce cash-to-close risk:

### Revenue Model

| Lever | Implementation | Benefit |
|-------|----------------|---------|
| **Mid-market wedge** | Target 500-2000 employee firms first | Faster cycles (3-6 months) |
| **PLG component** | Free "Governance Health Check" tool (upload annual report → gap analysis) | Lead generation + upsell |
| **Usage-based pricing** | Lower entry point + expansion as agents/users/documents scale | Land-and-expand |
| **Channel leverage** | Big 4 / regional consultancies sell and implement | Platform fee + services split |
| **APAC focus** | Smaller market but less competition | Faster regulator relationships |

### Runway Protection

| Scenario | Response |
|----------|----------|
| First 2 enterprise deals slip | Mid-market pipeline provides 6+ smaller deals to bridge |
| Burn exceeds plan | Reduce R&D; core platform stable, prioritize sales engineering |
| Competitor fast-follow | Double down on APAC; incumbents won't prioritize HK/SG first |

---

## Proof of Differentiation

### The "Cannot Do" Test

What can Evonix do that IBM OpenPages literally cannot do today?

| Capability | IBM OpenPages | Evonix |
|------------|---------------|--------|
| Ingest annual report → auto-generate governance objectives | ❌ No document AI | ✅ Native |
| Map org chart to process ownership suggestions | ❌ Manual entry only | ✅ AI-proposed |
| Real-time regulatory change → auto-gap analysis (24h SLA) | ❌ Quarterly manual updates | ✅ HKMA/MAS feeds |
| 3LOD-persona agents with distinct challenge/audit behaviors | ❌ Single user role model | ✅ 1L/2L/3L personas |
| Strategy statement → KCI/KRI linkage with confidence scores | ❌ No strategy ingestion | ✅ Round-trip lineage |
| Adversarial control testing by AI red team | ❌ No adversarial capability | ✅ Built-in |
| Cross-framework policy drafting (COBIT↔NIST↔ISO↔PCI) | ❌ Manual consultant work | ✅ AI drafts with citations |
| Auto-detect FIPS/encryption compliance gaps | ❌ No framework library | ✅ 20+ frameworks indexed |
| Board strategy → policy artifact with audit trail | ❌ Disconnected workflows | ✅ End-to-end lineage |

### The 60-Second Demo

> "Upload your annual report. In 60 seconds, we'll show you:
> 1. Extracted strategic priorities
> 2. Mapped governance objectives
> 3. Suggested KCIs with confidence scores
> 4. Gap analysis against HKMA guidelines
>
> IBM can't do step 1."

This demo is the proof point for every sales conversation.

---

## Risk Summary (Shark Tank Stress Test)

| Challenge | Risk | Mitigation |
|-----------|------|------------|
| **Enterprise trust** | CISOs won't risk career on unproven startup | Regulator sandbox + Big 4 + ISO cert + insurance |
| **AI liability** | Who's liable when AI gets it wrong? | Accountability by design; human decides, AI assists |
| **Incumbent fast-follow** | ServiceNow ships in 6 months | 18-24 month moat; architecture debt |
| **Unit economics** | Long sales cycles burn cash | Mid-market wedge + PLG + channel + APAC focus |
| **Differentiation proof** | "Agent-first" is just buzzwords | 60-second annual report demo |
