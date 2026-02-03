# Wireframe — Evonix
Project: agent-grc  
Date: 2026-01-31  

Legend:
- [ ] container or panel
- ( ) control or button
- < > dropdown
- { } data object or card

-------------------------------------------------------------------------------
GLOBAL LAYOUT (ALL SCREENS)
-------------------------------------------------------------------------------
[Left Nav]
  - Home
  - Risks
  - Controls & Frameworks
  - Issues & Remediation
  - Evidence
  - Regulatory Intelligence
  - KCI/KRI/KPI
  - Org & Process
  - Documents
  - 3LOD Views
  - Reports & Narratives
  - Admin

[Top Bar]
  <Entity Switcher>   [Global Search..........................]  (Alerts) (User)

-------------------------------------------------------------------------------
SCREEN 1 — HOME DASHBOARD
-------------------------------------------------------------------------------
[Header]
  Title: "Home"
  Subtitle: "Audit readiness, risk posture, and regulatory alignment"

[KPI Tiles Row]
  { Audit Readiness % }  { Open Issues }  { Control Coverage }  { Reg Update SLA }

[Main Grid]
[Left: Trends]
  [Chart: Risk Posture Over Time]
  [Chart: Control Effectiveness]

[Right: AI Highlights]
  { Insight Card: "Top 3 gaps" (Confidence, Sources, Review Status) }
  { Insight Card: "Reg change impact" (Approve/Challenge) }
  { Insight Card: "Evidence risk" (View Evidence) }

[Footer Actions]
  (Generate Board Narrative)  (View Reg Updates)

-------------------------------------------------------------------------------
SCREEN 2 — RISK REGISTER
-------------------------------------------------------------------------------
[Header]
  Title: "Risks"
  (New Risk) (Bulk Import) (Export)

[Filters]
  <Owner> <Status> <Framework> <Likelihood> <Impact> [Search...]

[Table]
  | ID | Risk Name | Likelihood | Impact | Owner | Status | Framework Tags |
  |----|-----------|------------|--------|-------|--------|----------------|

[Right Drawer: Risk Detail]
  { Risk Summary }
  { Linked Controls } (Link Control)
  { Linked Issues } (Create Issue)
  { Evidence } (Request Evidence)
  { AI Narrative } (Generate / Edit / Approve)

-------------------------------------------------------------------------------
SCREEN 3 — CONTROL LIBRARY & FRAMEWORK MAPPING
-------------------------------------------------------------------------------
[Header]
  Title: "Controls & Frameworks"
  (New Control) (Import Controls)

[Split View]
[Left: Control List]
  [Search...] <Framework> <Domain> <Owner>
  | Control ID | Control Name | Framework Tags |

[Right: Control Detail]
  { Control Description }
  { Test Procedure }
  { Evidence Requirements }
  { Mappings Matrix }  (Edit Mappings)

-------------------------------------------------------------------------------
SCREEN 4 — ISSUES & REMEDIATION
-------------------------------------------------------------------------------
[Header]
  Title: "Issues"
  (New Issue) (Bulk Update)

[Issue List]
  | ID | Issue | Owner | Due Date | Status | Linked Risk/Control |

[Issue Detail]
  { Remediation Plan }
  { Status Timeline }
  { Evidence } (Upload)
  { Approvals } (Approve / Escalate)

-------------------------------------------------------------------------------
SCREEN 5 — EVIDENCE HUB
-------------------------------------------------------------------------------
[Header]
  Title: "Evidence"
  (Upload Evidence) (Bulk Upload)

[Filters]
  <Control> <Owner> <Period> <Status>

[Evidence Library]
  { Evidence Card: Name, Type, Owner, Period, Status, Control }
  { AI Suggested Mapping } (Accept / Reject)

[Completeness Panel]
  [Gauge: Evidence Completeness by Control]

-------------------------------------------------------------------------------
SCREEN 6 — REGULATORY INTELLIGENCE
-------------------------------------------------------------------------------
[Header]
  Title: "Regulatory Intelligence"
  (New Feed) (Run Gap Analysis)

[Timeline Feed]
  { Reg Update: HKMA Circular, Date, Impact Score }
  { Reg Update: MAS Notice, Date, Impact Score }

[Gap Analysis Workspace]
  | Requirement | Mapped Controls | Status | Evidence | Owner |
  { AI Explanation Panel } (Sources, Confidence, Approve/Challenge)

-------------------------------------------------------------------------------
SCREEN 7 — KCI / KRI / KPI
-------------------------------------------------------------------------------
[Header]
  Title: "KCI / KRI / KPI"
  (New Indicator) (Import Metrics)

[Indicator Catalog]
  | Indicator | Type | Linked Objective | Status | Owner |

[Right Panel]
  { Suggested Metrics } (Accept / Reject)
  { Priority Recommendations } (Approve / Assign)

-------------------------------------------------------------------------------
SCREEN 8 — ORG & PROCESS MAPPING
-------------------------------------------------------------------------------
[Header]
  Title: "Org & Process"
  (Upload Org Chart) (Sync HR)

[Org Chart View]
  [Org Tree Visualization]
  { Suggested Ownership Mappings } (Approve / Reject)

[Process Map]
  [Process Flow with Ownership Overlays]

-------------------------------------------------------------------------------
SCREEN 9 — DOCUMENT INTELLIGENCE
-------------------------------------------------------------------------------
[Header]
  Title: "Documents"
  (Upload Document)

[Library]
  | Document | Type | Date | Status |

[Extracted Governance Issues]
  { Issue Card: Summary, COBIT/COSO Reference } (Accept / Convert)

-------------------------------------------------------------------------------
SCREEN 10 — REPORTS & NARRATIVES
-------------------------------------------------------------------------------
[Header]
  Title: "Reports & Narratives"
  (Generate Board Narrative) (Export PPTX) (Export PDF)

[Narrative Editor]
  [Editable Narrative Text Area]
  [AI Sources Panel]  (Approve)

[Report Packs]
  { Explainability Report } (Export)
  { Audit Trail Pack } (Export)

-------------------------------------------------------------------------------
SCREEN 11 — 3LOD VIEWS
-------------------------------------------------------------------------------
[Header]
  Title: "3LOD Views"
  <Select Line: 1L / 2L / 3L>

[Line View Dashboard]
  { Line-specific KPIs }
  { Assigned Tasks }
  { Escalations & Challenges }

