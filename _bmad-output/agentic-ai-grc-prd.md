
# Product Requirements Document (PRD)
Project: Evonix  
Date: 2026-02-07 (updated from 2026-01-31)  
Status: Draft — expanded with Explainability, AI Security & IAM, Agentic Cyber Defence, Regulatory Risk Strategy

## 1. Overview
Evonix is an AI-native Governance, Risk & Compliance platform that consolidates risks, controls, issues, and evidence into a single source of truth. The platform embeds AI agents aligned to the three lines of defence (1L/2L/3L) to automate repetitive work while preserving human accountability and regulator-ready explainability. Evonix differentiates through a **6-Layer Explainability Framework** (per-decision rationale, confidence scoring, structured challenge, regulator-ready reports, continuous monitoring), **AI Security & IAM for Agents** (coworker model with dedicated identities, real-time context-aware authorization, fail-closed operations), and **Agentic Cyber Defence** (detection, response, orchestration, and threat intelligence agents integrated with GRC).

## 2. Goals and Success Metrics
### Goals
- Reduce manual GRC workload and time-to-decision.
- Provide continuous, auditable governance across 1L/2L/3L.
- Improve regulatory readiness through near real-time updates and gap analysis.
- Deliver board-ready narratives and evidence on demand.

### Success Metrics (initial targets)
- 30-50% reduction in time to produce board packs.
- 40% reduction in audit evidence collection time.
- Regulatory updates surfaced within 24 hours (>= 95% of publications).
- 90% of AI outputs reviewed and accepted with minimal edits.
- p95 list and dashboard load times < 3 seconds.

## 3. Scope
### In Scope (v1)
- Risk register, control library, issue tracking, evidence mapping.
- Multi-framework mappings (ISO 27001, NIST CSF, COBIT, HKMA, MAS, PCI DSS).
- Regulatory ingestion for HKMA and MAS with alerts and gap analysis.
- Framework version tracking and review for NIST/ISO/COBIT.
- AI executive narratives and AI gap analysis with citations.
- Virtual 3LOD views and challenge workflows.
- KCI/KRI/KPI module with linkage and priority recommendations.
- Org chart ingestion and process-to-org mapping suggestions.
- Document-driven governance issues (annual reports/strategy) with COBIT/COSO references.
- Human-in-the-loop checkpoints and audit trail.
- **6-Layer Explainability Framework** — DecisionLog, AuditTrailEntry, Challenge, confidence scoring, regulator-ready reports, continuous monitoring.
- **AI Security & IAM for Agents** — Coworker model, dedicated agent identities, real-time context-aware authorization, skill security pipeline, alert-driven operational states, API spend caps.
- **Agentic Cyber Defence** — Detection, Response, Orchestration, and Threat Intel agents; CyberAlert/Incident/ResponseAction data model; HITL for critical actions; Cyber → GRC linkage.
- **Regulatory Risk Strategy** — Regulation-to-artifact mapping, evidence-by-design, on-demand Explainability Report and Audit Trail Pack.

### Out of Scope (v1)
- Cross-enterprise audit consortium.
- Global regulator coverage beyond configured APAC sources (except by explicit contract).
- Fully autonomous remediation actions without human validation.
- Fully autonomous cyber response for critical/high severity (always requires HITL in v1).

## 4. Personas
### Primary
- CISO (2L): oversight, board reporting, risk posture.
- Compliance Manager (2L): control library, mappings, regulatory updates.
- Risk Analyst (2L): risk register, KCI/KRI/KPI, reporting.
- Internal Auditor (3L): control testing, assurance, evidence review.
- Executive/Board: clear narratives and governance alignment.

### Secondary
- Regulatory Affairs (2L), Control Owners (1L), CFO, Chief Ethics Officer, Chief Compliance Officer.
- **SOC / Cyber Operations (1L/2L)**: Triage alerts, approve/reject agent-recommended response actions, review incidents; primary users of Agentic Cyber Defence features.
- **Security Architect / Platform Admin**: Configure agent identities, delegation scopes, skill approval, operational state thresholds, API spend caps; primary users of AI Security & IAM features.

## 5. User Journeys (MVP)
1. Create risk, map controls, link issues, and view evidence in one place.
2. Ingest new HKMA/MAS requirements and run AI gap analysis.
3. Generate board-level executive narrative with editable output.
4. 1L provides evidence; 2L challenges; 3L tests and reports.
5. Upload org chart, accept suggested ownership mappings.
6. Upload annual report or strategy doc and accept suggested governance issues.
7. Define KCIs/KRIs/KPIs and accept agent priority recommendations.
8. **Policy Agent Workflow:** Upload board minutes with "Zero Trust" strategy → Agent extracts encryption requirements → Agent cross-references FIPS 140-3, NIST 800-57, ISO 27001 A.10 → Agent reviews existing encryption policy → Agent drafts revision with citations → 1L Policy Owner reviews and approves → Policy v3.0 published with full audit trail.
9. **Framework Gap Analysis:** Select target frameworks (e.g., PCI DSS v4.0) → Agent maps existing controls → Agent identifies gaps against 300+ requirements → Agent prioritizes gaps by risk → Agent drafts remediation policies with framework citations.
10. **Cyber Alert → Incident → Response (Agentic Cyber Defence):** SIEM fires alert → Detection Agent triages, enriches with threat intel, assigns severity → alert stored as CyberAlert → Orchestration Agent correlates to existing incident or creates new Incident → Response Agent recommends action (e.g. isolate host) with rationale and confidence → SOC analyst approves/rejects (HITL) → ResponseAction executed and logged in AuditTrailEntry → Incident links to GRC risk register and control library.
11. **Explainability Challenge:** AI recommends control change → User disagrees → User raises Challenge (rationale, evidence) → 2L reviewer assesses → Resolution logged with outcome and reasoning → DecisionLog updated with challenge result → Regulator-ready audit trail includes both original recommendation and challenge.
12. **Regulatory Impact Assessment:** New HKMA circular published → platform ingests → FR-47 impact assessment runs against 6-layer framework → maps new requirements to existing DecisionLog, AuditTrailEntry, Challenge artifacts → identifies gaps (e.g. quarterly submission not configured) → generates gap report with prioritized actions → 2L Compliance Manager reviews.
13. **Agent Skill Onboarding (AI Security):** New tool proposed for Response Agent (e.g. "firewall-rule-update") → FR-34 four-phase pipeline: (1) text analysis of skill definition, (2) multi-perspective risk review, (3) capability mismatch detection, (4) human approval → approved skill registered with scoped delegation → agent can now use skill within authorized bounds.

## 6. Functional Requirements
### Risk and Control Management
- FR-1: Create and maintain risks with likelihood, impact, ownership, and status.
- FR-2: Create a control library and map controls to multiple frameworks.
- FR-3: Link risks to controls and issues; link issues to controls and evidence.

### Regulatory and Framework Intelligence
- FR-4: Ingest regulatory updates from HKMA and MAS and alert 2L users.
- FR-5: Run AI gap analysis against new or updated requirements with citations.
- FR-6: Track framework version changes and run alignment reviews (NIST/ISO/COBIT).

### Evidence and Assurance
- FR-7: Upload, tag, and retrieve evidence; AI suggests evidence mappings.
- FR-8: Record audit findings, remediation actions, owners, and due dates.
- FR-9: Maintain a tamper-evident audit log of material actions.

### AI Narratives and Explainability
- FR-10: Generate executive narratives with editable output and versioning.
- FR-11: Provide explainability reports (plain language + technical rationale).

### 6-Layer Explainability Framework
The following requirements implement the Evonix explainability framework aligned to NIST AI RMF, ISO/IEC 42001, EU AI Act, MAS, and HKMA guidelines.

**Layer 1: Decision Transparency**
- FR-EX-01: Every AI recommendation must include:
  - Source documents cited (with page/section references)
  - Confidence score (0-100%)
  - Reasoning chain (step-by-step logic leading to recommendation)
- FR-EX-02: Display reasoning in both summary view (1-2 sentences) and detailed view (full chain).
- FR-EX-03: Allow users to drill down from recommendation → sources → original documents.

**Layer 2: Audit Trail Integrity**
- FR-EX-04: Log every AI output with:
  - Unique event ID, timestamp (ISO 8601), agent/model version
  - Input hash and output hash (SHA-256)
  - Confidence score, sources cited count
  - Human action required flag, routing decision
- FR-EX-05: Audit log must be tamper-evident (cryptographic chaining or blockchain-backed).
- FR-EX-06: Audit log retention: minimum 7 years, configurable per jurisdiction.
- FR-EX-07: Provide audit log export in JSON, CSV, and PDF formats.

**Layer 3: Role-Appropriate Review**
- FR-EX-08: Route AI outputs based on confidence thresholds:
  - High (≥80%): Route to 1L Policy/Control Owner for review
  - Medium (60-79%): Route to 2L Risk Manager for review
  - Low (<60%): Route to 2L Risk Manager for manual drafting (AI provides research only)
- FR-EX-09: Thresholds must be configurable per output type and risk tier.
- FR-EX-10: Prevent approval by unqualified roles (enforce competence gate).
- FR-EX-11: Record approver identity, role, timestamp, and any comments.

**Layer 4: Confidence Thresholds**
- FR-EX-12: Calculate confidence scores based on:
  - Source quality and recency
  - Framework coverage (how many frameworks support the recommendation)
  - Historical accuracy of similar recommendations (backtesting)
- FR-EX-13: Flag low-confidence outputs with visual indicator (e.g., amber/red).
- FR-EX-14: Require explicit acknowledgment before acting on low-confidence outputs.

**Layer 5: Regulator-Ready Reports**
- FR-EX-15: Generate on-demand explainability reports with two formats:
  - Board summary: Plain language, 1-2 pages, focus on business impact
  - Auditor detail: Technical rationale, full source citations, audit trail excerpt
- FR-EX-16: Support scheduled report generation (e.g., quarterly for regulatory submission).
- FR-EX-17: Include mapping to specific regulatory requirements (e.g., "Addresses HKMA GenAI Circular §4.2").

**Layer 6: Continuous Monitoring**
- FR-EX-18: Detect confidence drift: Alert if recommendation accuracy degrades over time.
- FR-EX-19: Schedule periodic human-only audits (no AI involvement) for random sample of decisions.
- FR-EX-20: Log and report on bias indicators (e.g., systematic over/under-confidence by domain).
- FR-EX-21: Alert when source frameworks are updated (e.g., NIST 800-53 Rev 6 published).

**Explainability Output Examples**

*Example 1: Policy Gap Detection Output*
```
RECOMMENDATION: Revise Data Encryption Policy to include FIPS 140-3
CONFIDENCE: 91% (High)
SOURCES:
  • Board Minutes Q4 2025, p.3 — "Zero Trust architecture approved"
  • NIST 800-207 §3.1 — "FIPS-validated encryption required for ZTA"
  • FIPS 140-3 §4.1 — Cryptographic module validation requirements
  • Current Policy v2.1 §4.2 — No FIPS reference found
REASONING CHAIN:
  1. Board approved Zero Trust strategy
  2. Zero Trust requires FIPS-validated encryption (per NIST 800-207)
  3. Current policy specifies AES-256 but not FIPS validation
  4. Gap identified: Policy does not meet ZTA encryption requirements
ROUTING: 1L Policy Owner (confidence ≥80%)
```

*Example 2: Regulatory Change Response Output*
```
REGULATORY ALERT: HKMA GenAI Circular (Jan 2026)
NEW REQUIREMENT: §4.2 — Explainability documentation required
GAP ANALYSIS:
  ✅ Layer 1 (Decision Transparency) — Compliant
  ✅ Layer 2 (Audit Trail) — Compliant
  ⚠️ Layer 5 (Regulator-Ready Reports) — Partial gap
     Current: On-demand reports available
     Required: Periodic submission to HKMA (quarterly)
RECOMMENDED ACTIONS:
  1. Configure quarterly explainability report generation
  2. Map audit trail fields to HKMA template
CONFIDENCE: 87% (High)
ROUTING: 2L Compliance Manager
```

### Virtual 3LOD
- FR-12: Provide line-specific views (1L, 2L, 3L) with scoped permissions.
- FR-13: Enable 2L challenge workflows and 3L evidence requests.
- FR-14: Provide aggregated 3LOD alignment reporting for board and regulators.

### Org and Document Intelligence
- FR-15: Ingest org charts and suggest process/control ownership mappings.
- FR-16: Analyze annual reports and strategy documents to suggest governance issues with COBIT/COSO references.

### KCI/KRI/KPI Module
- FR-17: Define indicators linked to governance, process, regulatory, and policy standards.
- FR-18: Suggest missing policies/standards and missing metrics.
- FR-19: Generate agent-driven priority recommendations using strategy, regulatory, and benchmark context.

### Autonomous Policy & Standards Agent
- FR-20: Ingest boardroom inputs (board minutes, strategy documents, risk appetite statements) and extract governance objectives.
- FR-21: Maintain indexed framework knowledge base covering 20+ international standards:
  - Governance: COBIT 2019, ITIL v4/v5, COSO ERM, ISO 38500
  - Security: NIST 800-53 Rev 5, NIST CSF 2.0, ISO 27001/27002/27017/27018/27701, CIS Controls v8
  - Cryptography: FIPS 140-3, FIPS 197, FIPS 186-5, NIST SP 800-57
  - Industry: PCI DSS v4.0, SOC 2, HIPAA, Basel III/IV, HKMA SPM, MAS TRM
- FR-22: Cross-map control requirements across frameworks (e.g., NIST AC-2 ↔ ISO A.9 ↔ COBIT DSS05.04 ↔ PCI Req 7).
- FR-23: Review existing policies/standards against framework requirements and identify gaps, conflicts, and outdated provisions.
- FR-24: Draft new policies or revisions with:
  - Tracked changes (for revisions)
  - Framework citations (e.g., "Aligns to NIST 800-53 AC-2")
  - Confidence score (High/Medium/Low)
  - Rationale explaining why the change is needed
- FR-25: Route policy drafts based on confidence:
  - Low → 2L Risk Manager drafts manually
  - Medium → 2L Risk Manager reviews AI draft
  - High → 1L Policy Owner reviews and approves
- FR-26: Generate framework mapping matrix showing policy ↔ framework requirement coverage.
- FR-27: Trigger policy review automatically when regulatory changes or framework updates are detected.
- FR-28: Maintain full audit trail from boardroom input → policy artifact with all intermediate decisions.

### Human-in-the-loop
- FR-29: Configure human validation checkpoints and escalation rules for high-risk actions.

### AI Security & IAM for Agents
- FR-30: Each AI agent (1L Ops, 2L Risk, 3L Audit, Policy Agent, Cyber Defence agents) shall operate with its own dedicated identity (accounts, credentials, sessions); agents shall never use human credentials or sessions (coworker model).
- FR-31: Authority shall be explicitly delegated to each agent and revocable at any time; delegation shall be scoped (e.g. agent X can recommend but not execute; agent Y can execute isolate-host only with human approval).
- FR-32: Authorization for agent actions shall be evaluated in real time and context-aware: "Is this action acceptable, at this specific moment, given what has already happened, which derives from some authority?" — not ahead-of-time static scopes (OAuth-style).
- FR-33: Agent identity, delegation, and all authorization decisions shall be recorded in AuditTrailEntry.
- FR-34: Implement four-phase skill security analysis pipeline for any new agent skill or tool: (1) pre-ingestion text analysis, (2) multi-perspective risk review (security, authority, failure-mode, drift), (3) capability mismatch detection, (4) human-in-the-loop approval. Silence = rejection.
- FR-35: Implement alert-driven operational states for agents: Normal → Degraded (early warning) → Paused (uncertainty threshold) → Stopped (severe risk). Fail-closed: when uncertain, default to inaction. No bypassing alerts or indefinite retries.
- FR-36: Hard API spend caps per agent; research-loop detection (high query volume with low artifact output); automatic pause on cap exhaustion or loop detection.
- FR-37: No agent may install skills, modify its own code, rotate credentials, or expand its own permissions autonomously. All such changes require human authorization.

### Agentic Cyber Defence
- FR-38: Provide cyber defence agents: Detection Agent (triage alerts, enrich with threat intel, suggest severity), Response Agent (recommend/execute isolate, block, notify, escalate, run playbook), Orchestration Agent (correlate alerts → incidents; link to GRC risks and controls), Threat Intel Agent (ingest feeds, match IOCs).
- FR-39: Every cyber agent action shall include rationale, confidence, and sources; material actions (isolate host, block IP, escalate incident) require human approval (HITL) before execution for critical/high severity.
- FR-40: Alerts shall be stored as CyberAlert (source, severity, title, status, assigned agent, risk/control/incident links); incidents as Incident (title, severity, status, summary, root cause, linked alerts and response actions); response actions as ResponseAction (agent, action type, target, payload, status, rationale, confidence, approvedBy).
- FR-41: Cyber alerts and incidents shall link to GRC risk register (risk ID) and control library (control ID) so cyber events feed risk posture and control effectiveness evidence.
- FR-42: Provide Cyber Defence page in UI: alerts table, active incidents, response actions pending approval (with rationale), Cyber → GRC linkage table, explainability table for cyber actions, "Export Cyber Audit Trail" button.
- FR-43: Ingest and normalise threat intelligence feeds (ThreatIntelFeed: name, source, last sync, indicators/IOCs).

### Regulatory Risk Strategy (embedded)
- FR-44: Map each applicable regulation (EU AI Act Art. 13/14, NIST AI RMF, ISO 42001, MAS TRM, HKMA GenAI) to concrete Evonix artifacts: DecisionLog (Layer 1), AuditTrailEntry (Layer 2), Challenge (Layer 3–4), Explainability Report and Audit Trail Pack (Layer 5), continuous monitoring results (Layer 6). Mapping shall be documented and reviewable.
- FR-45: Normal platform operation shall produce regulatory evidence by default (evidence-by-design): no separate "compliance run" required to generate explainability artifacts.
- FR-46: On-demand generation of Explainability Report (plain language, 1–2 pages, business impact) and Audit Trail Pack (technical, full source citations, audit trail excerpt) for a configurable scope (e.g. time window, process, entity, incident).
- FR-47: When regulations change, platform shall support impact assessment against the 6-layer framework and existing controls; changes to thresholds, HITL rules, or mappings shall be logged in AuditTrailEntry.

## 7. Non-Functional Requirements
### Performance
- NFR-1: Support at least 10,000 risks, 5,000 controls, and 20,000 issues.
- NFR-2: p95 list/dashboard loads < 3 seconds.
- NFR-3: AI narratives < 60 seconds; gap analysis < 5 minutes for 50-200 requirements.

### Security and Compliance
- NFR-4: TLS 1.3 in transit; AES-256 at rest.
- NFR-5: RBAC by 1L/2L/3L and entity scoping.
- NFR-6: Audit log retained at least 7 years; tamper-evident storage.

### AI Security & Agent Operations
- NFR-11: Each agent identity shall have separate credentials, session isolation, and least-privilege access; no shared secrets between agents or between agents and humans.
- NFR-12: Authorization decisions shall be evaluated per-action (not per-session); latency of authorization check shall not exceed 200 ms p99.
- NFR-13: Agent operational state transitions (Normal → Degraded → Paused → Stopped) shall complete within 5 seconds; fail-closed: agents shall default to inaction when authorization or state is uncertain.
- NFR-14: API spend caps shall be configurable per agent; cap exhaustion shall trigger automatic pause and alert within 30 seconds.
- NFR-15: Skill security pipeline (FR-34) shall enforce silence = rejection: any skill not explicitly approved within configured SLA shall be auto-rejected.

### Cyber Defence
- NFR-16: Cyber alerts shall be ingested and triaged within 60 seconds of receipt (p95).
- NFR-17: Critical/high severity alerts shall surface HITL approval prompt within 30 seconds of response recommendation.
- NFR-18: Cyber → GRC linkage (alert/incident to risk/control) shall be available in dashboards within 5 minutes of incident creation.

### Explainability
- NFR-19: DecisionLog creation overhead shall not exceed 500 ms per AI output (p95).
- NFR-20: Explainability Report generation shall complete within 60 seconds for standard scope (single entity, single quarter).
- NFR-21: Confidence drift detection (FR-EX-18) shall evaluate daily and alert within 24 hours of threshold breach.

### Availability and Resilience
- NFR-7: 99.5% availability excluding planned maintenance.
- NFR-8: RPO <= 24 hours, RTO <= 4 hours.

### Accessibility and UX
- NFR-9: WCAG 2.1 AA for core workflows.
- NFR-10: Support modern desktop browsers (Chrome, Edge, Safari, Firefox).

## 8. Data and Integrations
### Data Sources
- Regulatory feeds (HKMA, MAS, SEC, EU).
- Framework control sets (20+ frameworks indexed at control-level granularity):
  - COBIT 2019, ITIL v4/v5, COSO ERM, ISO 38500
  - NIST 800-53 Rev 5, NIST CSF 2.0, ISO 27001/27002/27017/27018/27701, CIS Controls v8
  - FIPS 140-3, FIPS 197, FIPS 186-5, NIST SP 800-57
  - PCI DSS v4.0, SOC 2, HIPAA, Basel III/IV, HKMA SPM, MAS TRM
- Org charts (CSV or HR/identity API).
- Annual reports and strategy documents (upload or API).
- Existing policy and standards documents (upload for AI review).
- **Threat intelligence feeds** (STIX/TAXII, commercial feeds, open-source IOC feeds) for Agentic Cyber Defence.
- **SIEM / alert sources** (e.g. Splunk, Sentinel, Elastic) for cyber alert ingestion.
- **Agent identity store** (internal) — agent accounts, credentials, delegation records, session state.

### Integrations
- API access for risk, control, issue, and evidence (CRUD + query).
- SSO and SIEM integration (details to be defined).

## 9. Reporting and Analytics
- Board-ready narratives (quarterly and on demand).
- Coverage and gap dashboards by framework and entity.
- Evidence completeness and audit readiness status.
- ROI and governance maturity benchmarks.
- **Explainability Report** — On-demand, per-scope (entity/quarter/process/incident): board summary (plain language, 1–2 pages) and auditor detail (full citations, audit trail excerpt).
- **Audit Trail Pack** — Exportable (JSON, CSV, PDF) for regulatory submission; maps to EU AI Act Art. 13/14, NIST AI RMF, ISO 42001, MAS TRM, HKMA GenAI requirements.
- **Cyber Defence dashboard** — Active alerts, incident timeline, response actions (pending / executed / rejected), Cyber → GRC linkage, agent operational state, threat intel feed status.
- **Agent operations dashboard** — Per-agent identity, operational state (Normal/Degraded/Paused/Stopped), API spend vs cap, delegation scope, recent actions, authorization decisions.

## 10. Rollout and Phasing (Proposed)
### Phase 1 — Core GRC + Explainability Foundation
Risk, controls, issues, evidence, 3LOD views, regulatory ingestion (HKMA/MAS), AI narratives. **6-Layer Explainability Framework** (DecisionLog, AuditTrailEntry, confidence scoring, HITL routing, Explainability Report, Audit Trail Pack). **AI Security foundation** (agent identities, delegation, fail-closed operational states).

### Phase 2 — Intelligence + Cyber Defence
Org chart mapping, document-driven governance issues, KCI/KRI/KPI module. **Agentic Cyber Defence** (Detection, Response, Orchestration, Threat Intel agents; CyberAlert/Incident/ResponseAction; Cyber → GRC linkage). **Challenge mechanism** (structured dispute/review of AI outputs).

### Phase 3 — Advanced + Regulatory Risk
Advanced features: adversarial control testing, predictive governance intelligence, optional blockchain ledger. **Full Regulatory Risk Strategy** (regulation-to-artifact mapping, impact assessment on regulatory change). **Real-time context-aware IAM for agents** (per-action authorization, skill security pipeline). **Agent operations dashboard**.

### Phase 4 — Ecosystem
Cross-enterprise audit consortium. Extended regulator coverage. SIEM integrations. Marketplace for agent skills.

## 11. Risks and Dependencies
- Availability of machine-readable regulatory sources.
- Accuracy and acceptance of AI suggestions.
- Access to org charts and strategy documents (data ownership and privacy).
- Benchmark data availability for indicator prioritization.
- **Agent credential management** — Secure storage and rotation for multiple agent identities; dependency on secrets management infrastructure.
- **SIEM integration complexity** — Different alert formats and APIs across Splunk, Sentinel, Elastic; normalization effort.
- **Threat intelligence feed quality** — IOC freshness and false-positive rates affect cyber agent effectiveness.
- **Regulatory pace** — EU AI Act implementation timelines may shift; ISO 42001 adoption varies by jurisdiction.
- **Explainability performance overhead** — Per-output DecisionLog creation adds latency; must stay within NFR-19 budget.

## 12. Open Questions
- Which regulators beyond HKMA/MAS are required in v1?
- Expected integrations (SSO, SIEM, GRC tools, HR systems)?
- Required framework versions and update cadence?
- Benchmark data sources for KCI/KRI/KPI?
- Is blockchain audit ledger a hard requirement for early adopters?
- **What SIEM platforms should be supported for cyber alert ingestion in Phase 2?**
- **Should agent delegation scopes be configurable per deployment or centrally managed?**
- **What threat intel feed formats (STIX 2.1, proprietary) are required for v1 cyber defence?**
- **Is ISO 42001 certification a target for Evonix itself (not just supporting customer compliance)?**
- **Should the Challenge mechanism support anonymous challenges (e.g. whistleblower-style)?**

## 13. Related Documents
- [Explainability Framework](../docs/EXPLAINABILITY.md)
- [AI Security & IAM](../docs/AI-SECURITY.md)
- [Agentic Cyber Defence](../docs/AGENTIC-CYBER-DEFENCE.md)
- [Regulatory Risk Strategy](../docs/REGULATORY-RISK-STRATEGY.md)
- [Competitive Research: AI Explainability in GRC (Feb 2026)](competitive-research-explainability-2026.md)
- [Product Brief](agentic-ai-grc-product-brief.md)
- [Prisma Schema (data model)](../prisma/schema.prisma)
- [Prototype (UI visualization)](../netlify-demo/prototype.html)

