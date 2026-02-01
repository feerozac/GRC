# UI Specification — Agentic AI GRC
Project: agent-grc  
Date: 2026-01-31  
Status: Draft

## 1. UX Principles
- Outcome-focused: surface audit readiness, risk posture, and regulatory alignment at all times.
- Explainable AI: every AI output shows sources, confidence, and review status.
- 3LOD clarity: line-specific views and permissions are obvious and enforced.
- Minimal cognitive load: progressive disclosure for complex workflows.

## 2. Information Architecture
### Global Navigation (left rail)
- Home
- Risks
- Controls & Frameworks
- Issues & Remediation
- Evidence
- Regulatory Intelligence
- KCI/KRI/KPI
- Org & Process
- Documents (Strategy/Annual Reports)
- 3LOD Views
- Reports & Narratives
- Admin (RBAC, Policies, Integrations, Audit Log)

### Global Header
- Entity/Business Unit switcher
- Search (global across risks/controls/issues/evidence)
- Notifications (reg updates, approvals, escalations)
- User menu (profile, preferences, sign out)

## 3. Role-Based Views (3LOD)
### 1L (Operations)
- Primary tasks: evidence upload, control execution attestations, issue remediation updates.
- Dashboard emphasis: assigned controls, overdue evidence, remediation tasks.

### 2L (Risk/Compliance)
- Primary tasks: risk oversight, regulatory gap analysis, challenge workflows.
- Dashboard emphasis: risk trends, reg updates, AI recommendations awaiting review.

### 3L (Internal Audit)
- Primary tasks: control testing, evidence requests, audit findings.
- Dashboard emphasis: audit plan status, testing coverage, open findings.

## 4. Core Screens (MVP)
### 4.1 Home Dashboard
- KPI tiles: audit readiness, open issues, control coverage, reg change SLA.
- Trend charts: risk posture over time, control effectiveness.
- “AI Highlights” panel with review status and sources.

### 4.2 Risk Register
- Table with filters: likelihood, impact, owner, status, framework tags.
- Risk detail drawer: linked controls, linked issues, evidence, AI narrative.
- Actions: create, bulk import, link/unlink controls/issues.

### 4.3 Control Library & Framework Mapping
- Control catalog with framework tags.
- Mapping matrix view (controls × frameworks).
- Control detail: test procedures, evidence requirements, owners, mapping history.

### 4.4 Issues & Remediation
- Issue list with status, owner, due date, linked risk/control.
- Issue detail: remediation plan, updates, evidence, approvals.
- Escalation workflows with HITL checkpoints.

### 4.5 Evidence Hub
- Evidence library with metadata (type, owner, period, control).
- AI-suggested mappings with accept/reject.
- Evidence completeness indicator by control.

### 4.6 Regulatory Intelligence
- Feed timeline (HKMA/MAS), change impact flags.
- Gap analysis workspace: requirement → mapped controls → status → evidence.
- “Explain” panel with citations and AI rationale.

### 4.7 KCI/KRI/KPI Module
- Indicator catalog with linkage to objectives/policies/controls.
- “Suggested metrics” panel with rationale and benchmarks.
- Priority recommendations (AI) with review workflow.

### 4.8 Org & Process Mapping
- Org chart ingestion (CSV/HR API).
- Suggested ownership mappings (approve/reject).
- Process map with ownership overlays.

### 4.9 Document Intelligence
- Upload area + document library.
- Extracted governance issues with COBIT/COSO references.
- Accept/reject and convert to risks/issues.

### 4.10 Reports & Narratives
- Board narrative generator with edit/approve flow.
- Export formats: PPTX, DOCX, PDF.
- Explainability report pack (plain + technical).

## 5. Key Workflows
### 5.1 Regulatory Update → Gap Analysis
1) Notification banner on new regulation.  
2) Gap analysis workspace auto-populates mappings.  
3) AI generates impact summary with citations.  
4) Reviewer approves/edits and assigns actions.  

### 5.2 Evidence Collection & Assurance
1) Control owner receives evidence request.  
2) Upload evidence → AI suggests mapping.  
3) 2L reviews mapping; 3L tests if required.  

### 5.3 AI Narrative to Board Pack
1) Select scope (entity, period, framework).  
2) AI generates narrative + KPIs.  
3) Human edits and final approval.  
4) Export to PPTX.  

## 6. Component Library (Minimum)
- KPI tile, trend chart, list table, tag, status pill.
- Evidence card, AI suggestion card with accept/reject.
- “Explain” panel with citations.
- Review badge (AI-generated, human-reviewed).
- Timeline (reg changes, approvals).
- Modal: upload, approve, reject, escalate.

## 7. Visual Style
- Dark AI-first theme, neon accents (teal, blue, purple).
- Clear contrast for accessibility (WCAG AA).
- Minimal iconography; avoid decorative noise.

## 8. States & Feedback
- Empty state: clear CTA and sample guidance.
- Loading: skeleton tables, inline status.
- AI output: show confidence + sources.
- Error: actionable message with retry.

## 9. Accessibility
- Keyboard navigation for all tables and modals.
- Screen reader labels on AI output and status.
- Color is not the only status cue.

## 10. Non-Functional UI Targets
- Dashboard p95 load < 3s.
- AI narratives < 60s with progress indicator.
- Large tables use pagination or virtualized scrolling.
