# Product Requirements Document (PRD)
Project: agent-grc  
Date: 2026-01-31  
Status: Draft

## 1. Overview
Agentic AI GRC is an AI-native Governance, Risk & Compliance platform that consolidates risks, controls, issues, and evidence into a single source of truth. The platform embeds AI agents aligned to the three lines of defence (1L/2L/3L) to automate repetitive work while preserving human accountability and regulator-ready explainability.

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

### Out of Scope (v1)
- Cross-enterprise audit consortium.
- Global regulator coverage beyond configured APAC sources (except by explicit contract).
- Fully autonomous remediation actions without human validation.

## 4. Personas
### Primary
- CISO (2L): oversight, board reporting, risk posture.
- Compliance Manager (2L): control library, mappings, regulatory updates.
- Risk Analyst (2L): risk register, KCI/KRI/KPI, reporting.
- Internal Auditor (3L): control testing, assurance, evidence review.
- Executive/Board: clear narratives and governance alignment.

### Secondary
- Regulatory Affairs (2L), Control Owners (1L), CFO, Chief Ethics Officer, Chief Compliance Officer.

## 5. User Journeys (MVP)
1. Create risk, map controls, link issues, and view evidence in one place.
2. Ingest new HKMA/MAS requirements and run AI gap analysis.
3. Generate board-level executive narrative with editable output.
4. 1L provides evidence; 2L challenges; 3L tests and reports.
5. Upload org chart, accept suggested ownership mappings.
6. Upload annual report or strategy doc and accept suggested governance issues.
7. Define KCIs/KRIs/KPIs and accept agent priority recommendations.

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

### Human-in-the-loop
- FR-20: Configure human validation checkpoints and escalation rules for high-risk actions.

## 7. Non-Functional Requirements
### Performance
- NFR-1: Support at least 10,000 risks, 5,000 controls, and 20,000 issues.
- NFR-2: p95 list/dashboard loads < 3 seconds.
- NFR-3: AI narratives < 60 seconds; gap analysis < 5 minutes for 50-200 requirements.

### Security and Compliance
- NFR-4: TLS 1.3 in transit; AES-256 at rest.
- NFR-5: RBAC by 1L/2L/3L and entity scoping.
- NFR-6: Audit log retained at least 7 years; tamper-evident storage.

### Availability and Resilience
- NFR-7: 99.5% availability excluding planned maintenance.
- NFR-8: RPO <= 24 hours, RTO <= 4 hours.

### Accessibility and UX
- NFR-9: WCAG 2.1 AA for core workflows.
- NFR-10: Support modern desktop browsers (Chrome, Edge, Safari, Firefox).

## 8. Data and Integrations
### Data Sources
- Regulatory feeds (HKMA, MAS).
- Framework control sets (NIST/ISO/COBIT/PCI DSS).
- Org charts (CSV or HR/identity API).
- Annual reports and strategy documents (upload or API).

### Integrations
- API access for risk, control, issue, and evidence (CRUD + query).
- SSO and SIEM integration (details to be defined).

## 9. Reporting and Analytics
- Board-ready narratives (quarterly and on demand).
- Coverage and gap dashboards by framework and entity.
- Evidence completeness and audit readiness status.
- ROI and governance maturity benchmarks.

## 10. Rollout and Phasing (Proposed)
### Phase 1
Risk, controls, issues, evidence, 3LOD views, regulatory ingestion (HKMA/MAS), AI narratives.

### Phase 2
Org chart mapping, document-driven governance issues, KCI/KRI/KPI module.

### Phase 3
Advanced features: adversarial control testing, predictive governance intelligence, optional blockchain ledger.

## 11. Risks and Dependencies
- Availability of machine-readable regulatory sources.
- Accuracy and acceptance of AI suggestions.
- Access to org charts and strategy documents (data ownership and privacy).
- Benchmark data availability for indicator prioritization.

## 12. Open Questions
- Which regulators beyond HKMA/MAS are required in v1?
- Expected integrations (SSO, SIEM, GRC tools, HR systems)?
- Required framework versions and update cadence?
- Benchmark data sources for KCI/KRI/KPI?
- Is blockchain audit ledger a hard requirement for early adopters?

