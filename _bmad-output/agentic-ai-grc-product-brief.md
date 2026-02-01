# Agentic AI GRC Platform — Product Brief

**Project:** agent-grc  
**Author:** Mark  
**Date:** 2026-01-29  
**Status:** Vision / Product Brief

---

## 1. One-Page Product Brief

### Vision

**Agentic AI GRC** is an AI-native Governance, Risk & Compliance platform that turns fragmented controls, risks, and evidence into a single source of truth—with a **virtual three lines of defence (3LOD)** built in, **real-time or near real-time development of regulatory requirements** (e.g. HKMA, MAS, others), **review of NIST, ISO and COBIT frameworks**, **org chart reading and process-to-org mapping suggestions**, **reading of annual reports and strategy documents to define or suggest governance issues** (referencing COBIT, COSO, and other governance frameworks), a **KCI, KRI and KPI module** linked to governance, process, regulatory, and internal policies and standards (with gap suggestions where policies/standards are not drafted, and suggested metrics), and **AI agents that discuss these indicators and make priority recommendations** using strategy inputs, regulatory context, and industry benchmarks so teams spend less time on manual GRC work and more on decision-making.

### Problem

Organisations juggle risk registers, control libraries, issue trackers, and evidence across spreadsheets and point tools. Mapping to multiple frameworks (ISO 27001, NIST CSF, COBIT, HKMA, MAS) is manual and brittle. New or updated regulatory requirements (HKMA circulars, MAS notices, etc.) are often discovered late. Executive reporting and regulatory gap analysis are labour-intensive and often outdated. Framework updates (e.g. NIST CSF 2.0, ISO 27001:2022, COBIT 2019) are not systematically reviewed against current posture. The three lines of defence (1L operations, 2L risk/compliance oversight, 3L internal audit) often work in silos with no shared view of risk and control—so challenge and assurance are inconsistent and hard to evidence. Process and control ownership is often assigned without a clear view of the organisation structure, so mapping of processes and controls to the org is manual, inconsistent, or misaligned. Governance issues (e.g. tone at the top, oversight gaps, strategy–control misalignment) are often identified ad hoc rather than systematically derived from stated strategy and annual reports and linked to established frameworks such as COBIT and COSO. Key Control Indicators (KCIs), Key Risk Indicators (KRIs), and Key Performance Indicators (KPIs) are often managed in separate tools with weak linkage to governance, process, regulatory, and internal policies/standards; where policies or standards are missing, gaps are not systematically suggested; and prioritisation of metrics and actions rarely uses strategy, regulatory expectations, and industry benchmarks in a structured way.

### Solution

A unified platform that provides:

- **Risk register** — Central risk inventory with likelihood/impact, ownership, and linkage to controls and issues.
- **Control library + framework mappings** — One control set mapped to ISO 27001, NIST CSF, COBIT, HKMA, MAS, PCI DSS (and extensible).
- **Real-time / near real-time regulatory development** — Monitor and surface new or updated regulatory requirements from HKMA, MAS, and other configured regulators; ingest and normalise requirements so they appear in the platform soon after publication; feed into AI gap analysis and alert 2L/Regulatory Affairs so impact can be assessed quickly.
- **Framework review (NIST, ISO, COBIT)** — Track and review NIST CSF, ISO 27001, and COBIT (and other frameworks) for version and control-set changes; AI-assisted review of how well current controls and evidence map to the latest framework versions; periodic posture review and gap reports so framework alignment stays current.
- **Issue & remediation tracking** — Findings, actions, due dates, and linkage to controls and risks.
- **AI-driven executive narratives** — Auto-generated, plain-language summaries for boards and committees.
- **AI gap analysis for new regulations** — Compare current posture to new/updated requirements (including those surfaced by real-time regulatory development) and prioritise gaps.
- **Evidence mapping** — Link controls and requirements to artefacts (policies, screenshots, logs) with AI-assisted tagging and retrieval.
- **Org chart reading and process-to-org mapping** — Ingest and read org charts (upload or API from HR/identity systems) to understand structure (departments, roles, reporting lines). AI suggests which processes and controls map to which parts of the org (units, roles, owners) so ownership and coverage align with the actual organisation; users can accept, reject, or adjust suggestions.
- **Annual report and strategy document analysis for governance issues** — Read annual reports and strategy documents (upload or API) to extract stated objectives, risks, and governance-related content. AI defines or suggests governance issues (e.g. oversight gaps, control environment, strategy–execution alignment) by referencing COBIT, COSO, and other governance frameworks; each suggestion cites the relevant framework principle or requirement so issues are auditable and actionable. Users can accept, reject, or refine and add to the issue register.
- **KCI, KRI and KPI module** — Central place for Key Control Indicators (KCIs), Key Risk Indicators (KRIs), and Key Performance Indicators (KPIs). Each indicator links to governance (e.g. board/committee objectives), process (e.g. controls, processes), regulatory (e.g. HKMA, MAS, framework requirements), and internal policies and standards. Where policies or standards are expected but not drafted, the platform suggests gaps (e.g. “policy X not found for control Y”); AI suggests metrics where linkage implies measurement but none exists. Agents “discuss” KCIs, KRIs, and KPIs (e.g. reason over thresholds, trends, and coverage) and produce **priority recommendations** using inputs from strategy, regulatory expectations, and industry benchmarks so 2L and executives get actionable, benchmark-aware priorities.
- **Virtual three lines of defence (3LOD)** — Explicit 1L / 2L / 3L model: role-based views and workflows per line, visibility and challenge flow between lines (e.g. 2L challenges 1L, 3L assures both), and reporting that shows each line’s view and how they align—so governance is structured and auditable in one place. Autonomous AI agents can operate across 1L/2L/3L so risks are managed daily, adversarial checks are enforced independently, and audit trails are generated objectively.
- **Human-in-the-loop governance** — Configurable checkpoints where human experts can override or validate AI governance decisions; escalation workflows for high-risk governance actions so accountability is preserved and no critical decision is fully automated without optional human validation.
- **Governance intelligence & ROI** — Dashboards that quantify ROI of compliance automation and benchmarking tools to compare governance maturity against industry peers so governance is positioned as a value driver, not only a cost.
- **Ethics management** — AI agents apply configurable ethical guidelines (e.g. fairness, bias mitigation, transparency); ethics compliance scoring integrated with governance dashboards so governance decisions remain socially responsible and auditable.
- **Immutable audit & explainability** — All AI-driven governance decisions and control actions recorded on a tamper-evident (or optional blockchain-backed) audit ledger; regulator-ready explainability reports (plain language + technical rationale) and natural-language board-level summaries of AI governance decisions so audits are streamlined and regulatory trust is maintained.
- **Governance fit assessment (COBIT / NIST / PCI DSS / ISO 27k)** — Automatic mapping of governance practices (including from annual reports) against COBIT control objectives, NIST, PCI DSS, and ISO 27k with gap identification, maturity levels, and alignment to best practices (extends framework review and annual report analysis).
- **Automated adversarial control testing** — Adversarial AI agents automate the lifecycle of control testing (design, execution, monitoring, remediation) so vulnerabilities are identified early and assurance is achieved with minimal manual intervention.
- **Continuous governance alignment** — AI agents continually update and map decisions in real time to governance objectives and policies so compliance remains proactive and traceable.
- **Predictive governance intelligence** — AI agents forecast emerging compliance risks using regulatory trends and external data; integration with regulatory feeds (e.g. SEC, HKMA, EU Digital Act) for horizon scanning so the board can proactively adjust governance strategies.
- **Cross-enterprise audit consortium (future)** — Multi-organization anonymized audit trail sharing on a consortium blockchain with privacy-preserving protocols so industry regulators can detect systemic risks across industries.

AI agents orchestrate narrative generation, gap analysis, evidence suggestions, and KCI/KRI/KPI discussion and priority recommendations (using strategy, regulatory, and industry benchmarks) so the platform feels “agentic” rather than just report-building.

### Value Proposition

| Stakeholder   | Benefit |
|--------------|---------|
| CISO / Head of Risk | One place for risk, controls, issues; AI narratives for board packs; clear 2L oversight view; process/control ownership aligned to org; KCI/KRI/KPI linked to governance/process/regulatory with agent priority recommendations; human-in-the-loop checkpoints and escalation for high-risk actions. |
| Compliance / Audit  | Multi-framework view; faster evidence collection and mapping; virtual 3LOD; org chart–driven process/control mapping; KCI/KRI/KPI linked to policies/standards with gap and metric suggestions; agent-driven priorities using regulatory and benchmarks; regulator-ready explainability reports and immutable audit trails. |
| CFO | Governance intelligence dashboards quantifying ROI of compliance automation; benchmarking of governance maturity vs industry peers so governance is seen as a value driver, not only a cost. |
| Chief Ethics Officer | AI agents apply configurable ethical guidelines (fairness, bias mitigation, transparency); ethics compliance scoring integrated with governance dashboards so governance decisions remain socially responsible. |
| Chief Compliance Officer / Board Governance Officer | Immutable (including optional blockchain) audit trail of AI-driven governance decisions and control actions; explainability and tamper-proof audit for regulatory trust; governance fit assessment (COBIT/NIST/PCI DSS/ISO 27k) with maturity levels and gap identification. |
| Regulated firms (HKMA/MAS) | Framework-specific views; real-time/near real-time HKMA/MAS and other regulatory updates; AI gap analysis; 3LOD evidence for regulators; predictive horizon scanning (SEC, HKMA, EU Digital Act). |
| Executives / Board  | Clear, consistent risk and compliance narratives without chasing slides; assurance that 1L/2L/3L are aligned; governance issues suggested from annual reports and strategy, referenced to COBIT/COSO; KCI/KRI/KPI priorities informed by strategy, regulatory, and industry benchmarks; predictive governance intelligence for proactive strategy adjustment. |

### Differentiators

- **Agentic AI** — Proactive narrative generation, gap analysis, and evidence mapping, not only dashboards.
- **Virtual 3LOD** — First-class 1L / 2L / 3L model with line-specific views, challenge workflows, and reporting so governance is structured and demonstrable.
- **Multi-framework by design** — ISO 27001, NIST CSF, COBIT, HKMA, MAS in one control library with shared mappings; NIST/ISO/COBIT framework review so posture stays aligned to latest versions.
- **Real-time regulatory intelligence** — HKMA, MAS, and other regulators monitored for new/updated requirements; near real-time surfacing and feed into gap analysis so compliance teams react early.
- **Evidence-centric** — Evidence mapped to controls and requirements; AI helps find and suggest evidence.
- **Org-driven mapping** — Read org charts and suggest processes/controls mapped to the org structure so ownership and coverage match the real organisation.
- **Document-driven governance** — Read annual reports and strategy documents and suggest governance issues with explicit references to COBIT, COSO, and other frameworks so governance is grounded in established standards.
- **KCI/KRI/KPI with agent-driven priorities** — KCI, KRI, KPI module linked to governance, process, regulatory, and policies/standards; gap suggestions where policies/standards are missing; suggested metrics; agents discuss indicators and make priority recommendations using strategy, regulatory context, and industry benchmarks.
- **Human-in-the-loop** — Configurable checkpoints and escalation workflows for high-risk governance actions so human experts can override or validate AI decisions and accountability is preserved.
- **Governance intelligence & ROI** — Dashboards quantifying ROI of compliance automation; benchmarking of governance maturity vs industry peers.
- **Ethics & explainability** — AI applies configurable ethical guidelines (fairness, bias mitigation, transparency); ethics scoring in dashboards; immutable audit trail (optional blockchain) and regulator-ready explainability reports.
- **Adversarial control testing** — Adversarial AI agents automate control testing lifecycle (design, execution, monitoring, remediation) for early vulnerability identification.
- **Predictive governance** — AI forecasts emerging compliance risks; horizon scanning via regulatory feeds (SEC, HKMA, EU Digital Act).
- **Cross-enterprise audit consortium (future)** — Anonymized audit trail sharing on consortium blockchain with privacy-preserving protocols for systemic risk detection.

---

## 2. Personas

### Three lines of defence (virtual 3LOD in the product)

The platform models and supports the three lines explicitly:

- **First line (1L)** — Owns and manages risk; implements controls; provides evidence. Views: *my controls*, *my evidence*, *my issues*, *my attestations*.
- **Second line (2L)** — Risk and compliance oversight; challenges 1L; maintains control library and framework mappings; oversees KCI/KRI/KPI and agent priority recommendations; coordinates with 3L. Views: *risk & control oversight*, *challenge status*, *framework coverage*, *KCI/KRI/KPI and priorities*, *open issues across 1L*.
- **Third line (3L)** — Internal audit; independent assurance over 1L and 2L; plans and executes audits; reports to board/audit committee. Views: *audit plan*, *control testing*, *findings*, *assurance opinion*.

Visibility and workflows are scoped by line (and optionally by entity) so each line has the right view and separation is clear for regulators and the board.

### Primary Personas

| Persona | Line | Role | Goals | Pain Points |
|--------|------|------|--------|-------------|
| **Priya, CISO** | 2L | Chief Information Security Officer | Own risk posture; report to board and regulators; align security with business; challenge 1L. | Fragmented tools; manual board packs; slow response to new regulations; unclear 1L/2L boundary. |
| **Marcus, Compliance Manager** | 2L | Compliance / oversight | Maintain control library; run framework mappings; assign process/control ownership aligned to org; identify governance issues from strategy/annual reports using COBIT/COSO; support internal and external audits; challenge 1L. | Duplicate data across frameworks; manual evidence requests; version drift; unclear ownership when org structure changes; governance issues not systematically derived from documents. |
| **Sam, Risk Analyst** | 2L | GRC / Risk Analyst | Maintain risk register; link risks to controls and issues; maintain KRIs/KCIs/KPIs linked to governance, process, regulatory, policies; use agent priority recommendations; run risk reports; support 2L oversight. | Spreadsheet-heavy processes; weak linkage between risks, controls, and remediation; KRI/KCI/KPI not linked to strategy or benchmarks. |
| **Jordan, Internal Auditor** | 3L | Internal Audit | Test controls; request and review evidence; report findings; provide independent assurance; assess governance issues against COBIT/COSO. | Evidence scattered; hard to see control coverage across frameworks; 1L/2L view not structured; governance issues from strategy/annual reports not systematically referenced to frameworks. |
| **Alex, Executive / Board Member** | — | C-suite or Board | Understand risk and compliance in plain language; meet governance duties; see that 1L/2L/3L are aligned; surface governance issues from strategy and annual reports. | Dense reports; inconsistent narratives; last-minute pack preparation; 3LOD not evidenced; governance issues not systematically linked to strategy or frameworks. |

### Secondary Personas

| Persona | Line | Role | Goals | Relevance to Product |
|--------|------|------|--------|----------------------|
| **Regulatory Affairs** | 2L | Regulatory change / policy | Track new/updated regulations in real time or near real time; assess impact; review NIST/ISO/COBIT alignment. | Real-time regulatory development (HKMA, MAS, others); framework review (NIST, ISO, COBIT); AI gap analysis. |
| **Control Owner** | 1L | Operations (e.g. IT, Ops) | Implement controls; provide evidence; close findings; respond to 2L/3L; see which processes/controls belong to their part of the org. | Issue/remediation tracking; evidence upload and mapping; 1L view and challenge workflow; org chart–driven ownership so "my controls" matches org. |
| **CFO** | — | Finance | Quantify ROI of compliance automation; position governance as a value driver; benchmark maturity vs peers. | Governance intelligence & ROI dashboards; benchmarking tools. |
| **Chief Ethics Officer** | 2L | Ethics / conduct | Ensure AI governance decisions apply ethical guidelines (fairness, bias mitigation, transparency); monitor ethics compliance. | Ethics management; ethics scoring in dashboards. |
| **Chief Compliance Officer / Board Governance Officer** | 2L / — | Compliance / board governance | Ensure explainability, tamper-proof audit trails, regulatory trust; governance fit vs COBIT/NIST/PCI DSS/ISO 27k with maturity levels. | Immutable audit & explainability; governance fit assessment. |
| **Security Architect** | 2L | Security / control design | Automate control testing lifecycle; identify vulnerabilities early; reduce manual assurance. | Automated adversarial control testing. |
| **Industry Regulator** | — | Regulator | Detect systemic risks across organizations; review anonymized audit patterns. | Cross-enterprise audit consortium (future). |

---

## 3. Top Use Cases

1. **Unified risk and control view**  
   User opens one place to see risks, linked controls (from the control library), and open issues. They filter by framework (e.g. NIST CSF or HKMA), entity, or owner. *Value:* Single source of truth; no switching between risk register and control spreadsheets.

2. **AI executive narrative for board/committee**  
   User (e.g. CISO or Compliance) requests an executive summary for “Q1 risk and compliance” or “HKMA readiness.” The system generates a short, plain-language narrative (key risks, control health, open issues, trends) that can be dropped into a board pack. *Value:* Consistent, up-to-date narratives; less manual drafting.

3. **AI gap analysis for new/updated regulation**  
   User uploads or references a new/updated regulation (e.g. HKMA TM-E-1, MAS TRM), or uses requirements already surfaced by real-time regulatory development. The system compares existing controls and evidence to the new requirements and produces a gap report with prioritised actions and suggested control mappings. *Value:* Faster regulatory readiness; clear action list; early awareness when regulations are ingested in near real time.

4. **Evidence mapping and retrieval**  
   User links evidence (policy docs, screenshots, logs, attestations) to controls and/or framework requirements. They (or an auditor) later query by control or requirement and get the mapped evidence plus AI-suggested gaps. *Value:* Audit-ready evidence; less “where’s the evidence?” chasing.

5. **End-to-end issue and remediation tracking**  
   User records a finding (from audit, assessment, or self-identified), links it to controls and risks, assigns owners and due dates, and tracks to closure. Status rolls up into risk and control health and into AI narratives. *Value:* Clear accountability; remediation visible in one place and in reports.

6. **Virtual 3LOD: line-specific views and challenge flow**  
   User (1L, 2L, or 3L) opens a view tailored to their line: 1L sees “my controls / evidence / issues”; 2L sees oversight dashboards, challenge items, and framework coverage; 3L sees audit plan, testing status, and findings. 2L can raise and track challenges to 1L; 3L can request evidence and report on 1L/2L. Reporting shows each line’s contribution and alignment. *Value:* Clear 3LOD in one platform; demonstrable governance for board and regulators.

7. **Real-time / near real-time regulatory development (HKMA, others)**  
   Platform monitors configured regulators (e.g. HKMA, MAS) for new or updated requirements (circulars, guidelines, notices). New or changed requirements are ingested and normalised in real time or near real time (e.g. within hours of publication). 2L and Regulatory Affairs see alerts and a “regulatory pipeline”; they can trigger AI gap analysis or impact assessment from the new requirement set. *Value:* Early awareness of regulatory change; faster impact assessment and planning.

8. **Framework review (NIST, ISO, COBIT)**  
   User (e.g. Compliance or Regulatory Affairs) runs a framework review for NIST CSF, ISO 27001, and/or COBIT. The system uses the latest framework version and control set; compares current control library and evidence mappings; and produces a review report (coverage, gaps, suggested mappings). AI assists with mapping and highlights drift from previous framework versions. *Value:* Posture stays aligned to NIST, ISO, COBIT; version upgrades and new controls are systematically reviewed.

9. **Org chart reading and process-to-org mapping**  
   User uploads an org chart (e.g. CSV, diagram, or API from HR/identity) or connects a source. The platform reads structure (departments, roles, reporting lines). User requests “suggest process/control mapping to org.” The system suggests which processes and controls map to which units or roles; user accepts, rejects, or adjusts. Risk and control ownership, 1L “my controls” views, and reporting then align to the org. When org structure is updated, re-run suggestions to keep mapping current. *Value:* Ownership aligned to real org structure; fewer orphaned controls; clear coverage by department/role; easier onboarding when org changes.

10. **Annual report and strategy document analysis for governance issues**  
   User uploads or connects annual reports and/or strategy documents. The platform reads and extracts objectives, risks, governance-related statements, and strategic priorities. User requests “suggest governance issues.” The system suggests governance issues (e.g. oversight gaps, control environment, alignment between strategy and controls) and references each suggestion to COBIT, COSO, or other configured governance frameworks (principle or requirement cited). User accepts, rejects, or refines and adds to the issue register; issues can link to controls and risks. *Value:* Governance issues defined or suggested from the organisation’s own narrative; COBIT/COSO and others provide a consistent lens; board and audit committee get auditable, framework-grounded governance insights.

11. **KCI, KRI and KPI module with linkage and agent priority recommendations**  
   User (e.g. Compliance or Risk Analyst) configures and maintains KCIs, KRIs, and KPIs in a dedicated module. Each indicator links to governance (e.g. board objectives), process (controls, processes), regulatory (e.g. HKMA, MAS, framework requirements), and internal policies and standards. Where a control or process implies a policy or standard that is not drafted, the platform suggests a gap (“policy/standard X not found”); where linkage implies measurement but no metric exists, AI suggests metrics. User invokes “agent discussion” on selected indicators: agents reason over thresholds, trends, coverage, and context and produce a discussion summary. User then requests “priority recommendations”: agents use strategy (e.g. from strategy documents), regulatory expectations (from ingested regulations), and industry benchmarks (configured or ingested) to rank and recommend priorities (e.g. “focus on KRI set A given strategy and HKMA expectations; benchmark suggests threshold Y”). User accepts or adjusts priorities for 2L oversight and board reporting. *Value:* KCIs, KRIs, KPIs tied to governance, process, regulatory, and policies/standards; gaps in policies/standards surfaced; metrics suggested where missing; prioritisation grounded in strategy, regulatory, and industry benchmarks.

12. **Human-in-the-loop governance** — User (e.g. Risk Manager) configures checkpoints where human experts must override or validate AI governance decisions; escalation workflows for high-risk governance actions so accountability is preserved. *Value:* No critical decision fully automated without optional human validation.

13. **Governance intelligence & ROI** — User (e.g. CFO) opens dashboards quantifying ROI of compliance automation and benchmarking tools comparing governance maturity vs industry peers so governance is seen as a value driver. *Value:* Governance as value driver; data for board and finance.

14. **Ethics management** — User (e.g. Chief Ethics Officer) configures ethical guidelines (fairness, bias mitigation, transparency) applied by AI agents; ethics compliance scoring integrated with governance dashboards. *Value:* Socially responsible governance; ethics scoring visible.

15. **Immutable audit & explainability** — User (e.g. Chief Compliance Officer) relies on tamper-evident (or optional blockchain) audit ledger of AI-driven decisions and control actions; generates regulator-ready explainability reports (plain language + technical rationale) and board-level NL summaries on demand. *Value:* Tamper-proof audit; explainability on demand; regulatory trust.

16. **Governance fit assessment (COBIT / NIST / PCI DSS / ISO 27k)** — User (e.g. Board Governance Officer) runs assessment: platform maps governance practices (e.g. from annual report) against COBIT, NIST, PCI DSS, ISO 27k; identifies gaps, maturity levels, alignment to best practices. *Value:* Gap identification; maturity measurement (extends use cases 8 and 10).

17. **Automated adversarial control testing** — User (e.g. Security Architect) invokes adversarial AI agents to automate control testing lifecycle (design, execution, monitoring, remediation) so vulnerabilities are identified early. *Value:* Early vulnerability identification; reduced manual assurance.

18. **Continuous governance alignment** — AI agents continually update and map decisions in real time to governance objectives and policies so compliance remains proactive and traceable. *Value:* Proactive, traceable compliance.

19. **Predictive governance intelligence** — User requests forecast of emerging compliance risks; platform uses regulatory feeds (SEC, HKMA, EU Digital Act) for horizon scanning so the board can proactively adjust strategies. *Value:* Proactive strategy adjustment; early awareness of emerging risks.

20. **Cross-enterprise audit consortium (future)** — Industry Regulator participates in or queries consortium where multiple organizations share anonymized audit trails on consortium blockchain with privacy-preserving protocols for systemic risk detection. *Value:* Systemic risk detection; industry-wide visibility for regulators.

---

## 4. Non-Functional Requirements

### Performance & Scalability

- **NFR-1** Risk register, control library, and issue list shall support at least 10,000 risks, 5,000 controls, and 20,000 issues without degradation of list/dashboard load (< 3 s p95).
- **NFR-2** AI narrative generation shall complete within 60 s for a typical board-style scope (e.g. one entity, one quarter).
- **NFR-3** AI gap analysis for a single regulation (e.g. 50–200 requirements) shall complete within 5 minutes.

### Regulatory & Framework Intelligence

- **NFR-18** Regulatory requirement development from configured sources (e.g. HKMA, MAS) shall be real time or near real time: new or updated requirements shall be ingested and surfaced in the platform within 24 hours of official publication (or within a configurable SLA); users shall be able to subscribe to alerts and run gap analysis on newly ingested requirements.
- **NFR-19** Platform shall support review of NIST CSF, ISO 27001, and COBIT (and extensible to other frameworks): framework version and control-set updates shall be trackable; AI-assisted mapping review and posture reports shall be available so organisations can periodically review alignment to the latest NIST, ISO, and COBIT versions.
- **NFR-20** Platform shall be able to read org charts via upload (e.g. CSV, structured formats) or API (e.g. HR/identity systems) and derive structure (departments, roles, reporting lines); AI shall suggest which processes and controls map to which parts of the org; users shall be able to accept, reject, or correct suggestions so process/control ownership aligns to the organisation; suggestions shall be auditable (reasoning or source cited where feasible).
- **NFR-21** Platform shall be able to read annual reports and strategy documents (upload or API) and use them to define or suggest governance issues; suggestions shall reference COBIT, COSO, and other configurable governance frameworks (e.g. principle or requirement cited); users shall be able to accept, reject, or refine suggestions and add to the issue register; suggestions shall be auditable so board and audit can trace governance issues to document content and framework references.
- **NFR-22** Platform shall provide a KCI, KRI and KPI module in which indicators can be linked to governance, process, regulatory, and internal policies and standards; where linkage implies a policy or standard that is not drafted, the platform shall suggest gaps; where linkage implies measurement but no metric exists, the platform shall suggest metrics; users shall be able to accept, reject, or correct. AI agents shall be able to “discuss” indicators (e.g. thresholds, trends, coverage) and produce priority recommendations using inputs from strategy, regulatory expectations, and industry benchmarks; recommendations shall be reviewable and auditable (sources and reasoning cited where feasible).

### Security & Compliance

- **NFR-4** All data at rest and in transit shall be encrypted (TLS 1.3 in transit; AES-256 at rest).
- **NFR-5** Access shall be RBAC with support for roles by line of defence (1L Control Owner, 2L Risk/Compliance, 3L Auditor, plus CISO/Executive) and scope by entity/business unit where required; visibility and actions shall respect 3LOD separation (e.g. 3L read-only over 1L/2L data where policy requires).
- **NFR-6** Audit log of material actions (e.g. risk/control/issue changes, evidence uploads, AI runs) shall be retained for at least 7 years and be tamper-evident; platform shall support optional blockchain-backed immutable ledger for AI-driven governance decisions and control actions where required for regulatory trust.
- **NFR-23** Platform shall support configurable human-in-the-loop checkpoints where human experts can override or validate AI governance decisions; escalation workflows for high-risk governance actions shall be configurable (e.g. route to designated approvers, block or flag until validation); overrides and validations shall be recorded in the audit trail.
- **NFR-24** Platform shall provide governance intelligence dashboards that quantify ROI of compliance automation (e.g. time saved, risk reduction, audit cost avoidance) and benchmarking tools to compare governance maturity against industry peers (anonymised or configured benchmarks).
- **NFR-25** Platform shall support configurable ethical guidelines (e.g. fairness, bias mitigation, transparency) applied by AI agents when making or suggesting governance decisions; ethics compliance scoring shall be integrated with governance dashboards and auditable.
- **NFR-26** Platform shall support generation of regulator-ready explainability reports (plain language + technical rationale) and natural-language board-level summaries of AI governance decisions on demand so audits are streamlined.
- **NFR-27** Platform shall support governance fit assessment mapping governance practices (e.g. from annual report) against COBIT, NIST, PCI DSS, and ISO 27k with gap identification, maturity levels, and alignment to best practices.
- **NFR-28** Platform shall support automated adversarial control testing (design, execution, monitoring, remediation) via adversarial AI agents so vulnerabilities are identified early and assurance is achieved with minimal manual intervention.
- **NFR-29** Platform shall support continuous governance alignment: AI agents shall continually update and map decisions in real time to governance objectives and policies so compliance remains proactive and traceable.
- **NFR-30** Platform shall support predictive governance intelligence: AI agents shall forecast emerging compliance risks using regulatory trends and external data; integration with regulatory feeds (e.g. SEC, HKMA, EU Digital Act) for horizon scanning shall be supported.
- **NFR-31** (Future) Platform may support cross-enterprise audit consortium: multi-organization anonymized audit trail sharing on consortium blockchain with privacy-preserving protocols for systemic risk detection by industry regulators.

### Availability & Resilience

- **NFR-7** Core read/write operations shall have 99.5% availability (excluding planned maintenance).
- **NFR-8** Critical data shall be backed up at least daily with RPO ≤ 24 h and RTO ≤ 4 h.

### Usability & Accessibility

- **NFR-9** Primary workflows (risk register, control library, issue list, evidence mapping) shall be usable on modern desktop browsers (Chrome, Edge, Safari, Firefox) without browser plugins.
- **NFR-10** UI shall meet WCAG 2.1 Level AA for core user journeys (risk, control, issue, evidence, narrative request).

### AI & Data Quality

- **NFR-11** AI-generated narratives shall be reviewable and editable before use; system shall support versioning of generated content.
- **NFR-12** AI gap analysis outputs shall cite source requirements and mapped controls so results are auditable and explainable.
- **NFR-13** Evidence mapping shall support both manual tagging and AI-suggested mappings; users shall be able to accept, reject, or correct suggestions.

### Integrations & Extensibility

- **NFR-14** Platform shall expose APIs for risk, control, issue, and evidence (CRUD and query) to support SSO, SIEM, and downstream reporting.
- **NFR-15** Framework and control set shall be extensible (e.g. add new framework or custom requirement set) via configuration or import without code change for standard cases.

### Virtual three lines of defence

- **NFR-16** Platform shall provide distinct default views and workflows for 1L (control owner / evidence), 2L (oversight / challenge), and 3L (audit / assurance) so each line has a tailored experience; 2L shall be able to raise and track challenges to 1L, and 3L shall be able to request evidence and record findings linked to controls/risks.
- **NFR-17** Reporting shall support 3LOD views (e.g. “1L control health,” “2L challenge status,” “3L assurance summary”) and an aggregated view showing alignment across lines for board and regulator use.

---

*This brief is the product vision for the Agentic AI GRC platform and should be used to align roadmap, epics, and NFRs with stakeholders.*
