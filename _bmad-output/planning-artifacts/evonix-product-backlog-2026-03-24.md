# Evonix Agentic AI GRC — Product Backlog

**Project:** Evonix  
**Date:** 2026-03-24  
**Status:** Draft — comprehensive backlog covering FR-1 to FR-59 + FR-EX-01 to FR-EX-21  
**Prepared by:** Product / BA  
**Backlog ID convention:** EVX-{number} (core), EVX-SP-{number} (SecurePath)

---

## Backlog Overview

| Phase | Epics | Stories | Total SP (est.) |
|-------|-------|---------|-----------------|
| Phase 1 — Core GRC + Trust Foundation | 5 epics | 40 stories | ~230 SP |
| Phase 2 — Intelligence + Cyber Defence | 6 epics | 32 stories | ~195 SP |
| Phase 3 — Advanced Capabilities | 3 epics | 12 stories | ~70 SP |
| Phase 4 — Ecosystem | 2 epics | 5 stories | ~30 SP |
| SecurePath Integration | 1 epic | 7 stories | ~42 SP |
| **Total** | **17 epics** | **96 stories** | **~567 SP** |

---

## Strategic Alignment

Every story must improve at least one buyer outcome (per competitive analysis Mar 2026):

1. **Time-to-regulator-packet** — How fast can we produce auditable evidence?
2. **Time-to-regulatory-impact-assessment** — How fast do we react to regulatory change?
3. **Time-to-approved-agent-action** — How transparently do agents operate?
4. **Time-to-cyber-incident-to-GRC-linkage** — How tightly is cyber wired to governance?

### Must-Win Feature Pillars (v1)

1. Explainability Evidence Fabric
2. Controlled Agent Autonomy
3. Regulatory Change-to-Action Loop
4. Cyber-to-GRC Closed Loop

---

# PHASE 1 — Core GRC + Trust Foundation

## Epic 1: Core GRC Foundation

**Goal:** Establish the risk register, control library, issue tracker, and evidence lifecycle as the foundational data model and UI.  
**Buyer outcome:** Platform credibility — baseline GRC capability expected by every buyer.  
**FR coverage:** FR-1, FR-2, FR-3, FR-7, FR-8, FR-9

---

### EVX-001 — Risk register CRUD + ownership model

**As a** Risk Analyst (2L), **I want** to create, edit, archive, and search risks with likelihood, impact, ownership, and status, **so that** the organisation has a single source of truth for its risk inventory.  
**FR:** FR-1  
**Dependencies:** None (foundational)  
**Est:** 8 SP

**Acceptance Criteria**
- Given a 2L user, when creating a risk, then fields include title, description, likelihood (1-5), impact (1-5), inherent/residual scoring, owner, status (draft/open/mitigating/closed), and category.
- Given a risk exists, when editing, then all changes produce an AuditTrailEntry with before/after values.
- Given 10,000+ risks, when listing/filtering, then p95 load time is < 3 seconds (NFR-1).
- Given a risk, when viewing, then linked controls, issues, and evidence are visible.

---

### EVX-002 — Control library + multi-framework mapping

**As a** Compliance Manager (2L), **I want** a control library where each control maps to one or more framework requirements, **so that** I maintain one control set with multi-framework coverage.  
**FR:** FR-2  
**Dependencies:** None (foundational)  
**Est:** 8 SP

**Acceptance Criteria**
- Given a 2L user, when creating a control, then fields include title, description, type (preventive/detective/corrective), frequency, owner, and status.
- Given a control, when mapping to frameworks, then user can link to ISO 27001, NIST CSF, COBIT, HKMA, MAS, PCI DSS requirements (multi-select).
- Given a framework requirement, when viewing, then all mapped controls are listed with coverage status.
- Given 5,000+ controls, when listing/filtering by framework, then p95 load time is < 3 seconds.

---

### EVX-003 — Risk-control-issue linkage model

**As a** Risk Analyst (2L), **I want** to link risks to controls, controls to issues, and issues to evidence, **so that** the full governance chain is traceable.  
**FR:** FR-3  
**Dependencies:** EVX-001, EVX-002  
**Est:** 5 SP

**Acceptance Criteria**
- Given a risk, when linking to controls, then many-to-many relationship is supported.
- Given a control, when linking to issues, then the issue inherits control and risk context.
- Given any entity, when viewing, then all linked entities are navigable in the UI.
- Given a linked chain (risk → control → issue → evidence), when queried, then full chain is retrievable for audit/reporting.

---

### EVX-004 — Evidence upload, tagging, and retrieval

**As a** Control Owner (1L), **I want** to upload and tag evidence artifacts (policies, logs, screenshots, attestations) and link them to controls and requirements, **so that** audit evidence is centralized and discoverable.  
**FR:** FR-7  
**Dependencies:** EVX-002  
**Est:** 8 SP

**Acceptance Criteria**
- Given a 1L/2L user, when uploading evidence, then system accepts common formats (PDF, DOCX, PNG, CSV, JSON) up to 50 MB.
- Given evidence, when tagging, then user can tag with control IDs, requirement IDs, time period, and free-text labels.
- Given a control or requirement, when querying evidence, then all linked artifacts are returned with metadata (upload date, uploader, tags).
- Given evidence search, when filtering by control/requirement/period, then results are accurate and load in < 3 seconds.

---

### EVX-005 — AI-assisted evidence mapping suggestions

**As a** Compliance Manager (2L), **I want** AI to suggest evidence-to-control mappings when new evidence is uploaded, **so that** coverage gaps are identified early and mapping effort is reduced.  
**FR:** FR-7  
**Dependencies:** EVX-004, EVX-002  
**Est:** 5 SP

**Acceptance Criteria**
- Given evidence is uploaded, when AI analysis runs, then suggested control/requirement mappings are presented with confidence scores.
- Given a suggestion, when user accepts/rejects, then the decision is recorded in AuditTrailEntry.
- Given low-confidence suggestions (< 60%), then they are flagged visually and require explicit acknowledgment.

---

### EVX-006 — Audit findings and remediation tracking

**As an** Internal Auditor (3L), **I want** to record findings, assign remediation actions with owners and due dates, and track to closure, **so that** audit outcomes are actionable and visible.  
**FR:** FR-8  
**Dependencies:** EVX-003  
**Est:** 5 SP

**Acceptance Criteria**
- Given a 3L user, when recording a finding, then fields include title, description, severity, linked controls/risks, owner, due date, and remediation plan.
- Given a finding, when remediation is assigned, then the owner receives notification and can update status.
- Given a finding is overdue, when SLA threshold passes, then an alert is surfaced to 2L/3L.
- Given findings exist, when reporting, then status rollup feeds into risk/control health and AI narratives.

---

### EVX-007 — Tamper-evident audit log

**As a** Chief Compliance Officer, **I want** all material actions in the platform recorded in a tamper-evident audit log retained for 7+ years, **so that** regulators and auditors can verify the integrity of governance activities.  
**FR:** FR-9  
**Dependencies:** None (cross-cutting infrastructure)  
**Est:** 8 SP

**Acceptance Criteria**
- Given any material action (create/edit/delete on risks, controls, issues, evidence, AI outputs), when persisted, then an AuditTrailEntry is created with unique event ID, ISO 8601 timestamp, actor (human or agent), action, entity type/ID, and payload.
- Given audit log storage, when entries are written, then cryptographic chaining (hash of previous entry) ensures tamper evidence.
- Given audit log query, when filtering by date/actor/entity/action, then results are accurate and exportable (JSON, CSV).
- Given retention policy, when configured, then entries are retained for minimum 7 years (NFR-6).

---

### EVX-008 — Core GRC dashboard

**As a** CISO (2L), **I want** a dashboard showing risk posture, control health, issue status, and evidence completeness at a glance, **so that** I can assess governance health without running reports.  
**FR:** (supports FR-1, FR-2, FR-3, FR-7, FR-8)  
**Dependencies:** EVX-001 through EVX-007  
**Est:** 5 SP

**Acceptance Criteria**
- Given a 2L user, when opening the dashboard, then it shows: top risks by residual score, control effectiveness summary, open issues by severity and age, evidence coverage by framework.
- Given dashboard load, when rendering, then p95 load time < 3 seconds (NFR-2).
- Given filters, when applied (entity, framework, time period), then all widgets update.

---

## Epic 2: Explainability Evidence Fabric

**Goal:** Implement the 6-Layer Explainability Framework so every AI output is transparent, auditable, challengeable, and reportable.  
**Buyer outcome:** Time-to-regulator-packet; differentiates vs. all competitors.  
**FR coverage:** FR-EX-01 to FR-EX-21, FR-49, FR-54  
**Must-Win Pillar:** #1 Explainability Evidence Fabric

---

### EVX-010 — DecisionLog creation for every AI output

**As an** Auditor (3L), **I want** every AI recommendation to produce a DecisionLog record with sources, confidence, and reasoning chain, **so that** I can verify the basis of any AI output.  
**FR:** FR-EX-01, FR-EX-02  
**Dependencies:** EVX-007 (audit trail infrastructure)  
**Est:** 8 SP

**Acceptance Criteria**
- Given any AI recommendation is generated, when output is produced, then a DecisionLog is created with: source documents cited (title, page/section), confidence score (0-100%), reasoning chain (step-by-step logic), framework references, agent ID, and decision type.
- Given a DecisionLog, when viewed, then both summary (1-2 sentences) and detailed view (full chain) are available.
- Given DecisionLog creation, when measured, then overhead does not exceed 500 ms per AI output (NFR-19).

---

### EVX-011 — Source drill-down from recommendation to original documents

**As a** Compliance Manager (2L), **I want** to drill down from any AI recommendation through cited sources to the original documents, **so that** I can verify claims independently.  
**FR:** FR-EX-03  
**Dependencies:** EVX-010, EVX-004  
**Est:** 5 SP

**Acceptance Criteria**
- Given a DecisionLog entry, when user clicks a cited source, then the system navigates to the referenced document (or section/page).
- Given an external source (e.g., HKMA circular), when referenced, then a link or cached excerpt is provided.
- Given drill-down navigation, then the full path from recommendation → source → document is achievable in ≤ 3 clicks.

---

### EVX-012 — Immutable audit trail with cryptographic integrity

**As a** Regulator, **I want** the audit log to be cryptographically chained and tamper-evident, **so that** I can trust the integrity of the governance record.  
**FR:** FR-EX-04, FR-EX-05, FR-EX-06, FR-EX-07  
**Dependencies:** EVX-007  
**Est:** 8 SP

**Acceptance Criteria**
- Given an AI output, when logged, then entry includes: unique event ID, ISO 8601 timestamp, agent/model version, input hash (SHA-256), output hash (SHA-256), confidence score, source count, human action required flag, routing decision.
- Given cryptographic chaining, when a new entry is written, then it includes hash of the previous entry.
- Given audit log export, when requested, then JSON, CSV, and PDF formats are available with integrity verification metadata.
- Given retention configuration, then minimum 7 years with per-jurisdiction override is supported.

---

### EVX-013 — Confidence-based HITL routing engine

**As a** 2L Risk Manager, **I want** AI outputs routed to the right reviewer based on confidence thresholds, **so that** high-risk outputs get deeper review and low-confidence outputs are not acted on without scrutiny.  
**FR:** FR-EX-08, FR-EX-09, FR-EX-10, FR-EX-11  
**Dependencies:** EVX-010  
**Est:** 8 SP

**Acceptance Criteria**
- Given an AI output with confidence ≥ 80% (High), when routing runs, then it is sent to 1L Policy/Control Owner for review.
- Given confidence 60-79% (Medium), when routing runs, then it is sent to 2L Risk Manager for review.
- Given confidence < 60% (Low), when routing runs, then it is sent to 2L Risk Manager for manual drafting (AI provides research only).
- Given thresholds, when configured, then they are adjustable per output type and risk tier.
- Given routing prevents approval by unqualified roles (competence gate).
- Given approval occurs, then approver identity, role, timestamp, and comments are recorded.

---

### EVX-014 — Confidence scoring model

**As a** Risk Analyst (2L), **I want** confidence scores calculated based on source quality, framework coverage, and historical accuracy, **so that** I can trust the scoring informs routing and review appropriately.  
**FR:** FR-EX-12, FR-EX-13, FR-EX-14  
**Dependencies:** EVX-010  
**Est:** 8 SP

**Acceptance Criteria**
- Given an AI output, when confidence is calculated, then it factors: source quality/recency, framework coverage (how many frameworks support the recommendation), and historical accuracy of similar recommendations.
- Given low-confidence outputs, when displayed, then visual indicator (amber/red) is shown.
- Given a low-confidence output, when user attempts to act on it, then explicit acknowledgment is required before proceeding.

---

### EVX-015 — Regulator-ready explainability report generator

**As a** Compliance Manager (2L), **I want** on-demand explainability reports in board summary and auditor detail formats, **so that** I can respond to regulator/audit requests in minutes, not days.  
**FR:** FR-EX-15, FR-EX-16, FR-EX-17, FR-46, FR-54  
**Dependencies:** EVX-010, EVX-012  
**Est:** 8 SP

**Acceptance Criteria**
- Given a scope selection (entity, quarter, process, incident), when report generation is requested, then two formats are produced: Board summary (plain language, 1-2 pages, business impact focus) and Auditor detail (technical rationale, full citations, audit trail excerpt).
- Given standard dataset scope, when generated, then combined report completes within 120 seconds p95 (FR-54).
- Given scheduled generation, then quarterly/configurable cadence is supported (FR-EX-16).
- Given regulatory mapping, then report maps to specific regulatory requirements (e.g., "Addresses HKMA GenAI Circular §4.2").
- Given export, then JSON, CSV, and PDF artifacts are available; download events are logged.

---

### EVX-016 — Decision replay API and UI

**As an** Auditor (3L), **I want** to replay any AI recommendation showing the full chain from input → evidence → rationale → confidence → routing → human actions, **so that** I can verify decision integrity end-to-end.  
**FR:** FR-49  
**Dependencies:** EVX-010, EVX-012  
**Est:** 8 SP  
*Note: Previously scoped as EVX-203; this is the full implementation.*

**Acceptance Criteria**
- Given a recommendation ID, when `GET /decision-replay/{id}` is called, then response contains: input summary, cited evidence, reasoning chain, confidence, routing decision, and human actions.
- Given missing artifact segments, when replay is requested, then response includes explicit gap flags.
- Given the recommendation has challenge history, then challenge events and resolution are included.
- Given UI consumer, then the full replay is achievable in ≤ 5 interactions (FR-49).

---

### EVX-017 — Continuous monitoring: confidence drift detection

**As a** 2L Risk Manager, **I want** the platform to detect when AI recommendation accuracy degrades over time, **so that** I'm alerted before outputs become unreliable.  
**FR:** FR-EX-18, FR-EX-21  
**Dependencies:** EVX-010, EVX-014  
**Est:** 5 SP

**Acceptance Criteria**
- Given daily confidence drift evaluation, when accuracy for a decision type drops below configured threshold, then alert is raised within 24 hours.
- Given a framework update is published (e.g., NIST 800-53 Rev 6), when detected, then alert is raised to relevant owners.
- Given drift alert, then it includes trend data and affected decision types.

---

### EVX-018 — Periodic human-only audit sampling

**As a** Head of Internal Audit (3L), **I want** periodic human-only audits (no AI involvement) for a random sample of decisions, **so that** independent assurance exists over AI output quality.  
**FR:** FR-EX-19  
**Dependencies:** EVX-010  
**Est:** 3 SP

**Acceptance Criteria**
- Given audit schedule configuration, when period triggers, then a random sample of DecisionLog entries is selected for human-only review.
- Given a sampled decision, when reviewed, then reviewer records assessment (accurate/inaccurate/partially accurate) and comments.
- Given audit results, then summary is available in reporting (accuracy rate, trend, findings).

---

### EVX-019 — Bias indicator monitoring and reporting

**As a** Chief Ethics Officer, **I want** the platform to log and report on bias indicators such as systematic over/under-confidence by domain, **so that** fairness risks are visible and actionable.  
**FR:** FR-EX-20  
**Dependencies:** EVX-010, EVX-014  
**Est:** 5 SP

**Acceptance Criteria**
- Given DecisionLog entries over time, when bias analysis runs, then systematic confidence skew by domain/category/agent is detected.
- Given bias detection, when threshold is breached, then alert is raised with trend data.
- Given bias reporting, then dashboard shows confidence distribution by domain with statistical indicators.

---

## Epic 3: Controlled Agent Autonomy (AI Security & IAM)

**Goal:** Implement the coworker model for AI agents with dedicated identities, per-action authorization, fail-closed states, and skill security.  
**Buyer outcome:** Time-to-approved-agent-action; no competitor has this.  
**FR coverage:** FR-30 to FR-37, FR-51  
**Must-Win Pillar:** #2 Controlled Agent Autonomy

---

### EVX-020 — Agent identity registry and credential isolation

**As a** Platform Admin, **I want** each AI agent to have its own dedicated identity, credentials, and session, **so that** agents never operate under human credentials and every action is attributable.  
**FR:** FR-30  
**Dependencies:** EVX-007  
**Est:** 8 SP

**Acceptance Criteria**
- Given agent provisioning, when a new agent is created (1L Ops, 2L Risk, 3L Audit, Policy, Cyber Defence), then it receives a unique identity with separate credentials and session.
- Given agent sessions, then session isolation is enforced — no shared secrets between agents or between agents and humans (NFR-11).
- Given the agent registry, when queried, then all active agents, their roles, and credential status are visible.
- Given credential rotation, then rotation can be triggered without agent downtime.

---

### EVX-021 — Delegation scope management

**As a** Platform Admin, **I want** to explicitly delegate authority to each agent with revocable, scoped permissions, **so that** agent X can recommend but not execute, and agent Y can execute only specific actions with approval.  
**FR:** FR-31  
**Dependencies:** EVX-020  
**Est:** 5 SP

**Acceptance Criteria**
- Given an agent, when delegation is configured, then scope specifies: allowed action types, entity scopes, approval requirements, and escalation targets.
- Given delegation, when revoked, then the agent immediately loses the capability (within 5 seconds per NFR-13).
- Given delegation history, then all grants and revocations are recorded in AuditTrailEntry.

---

### EVX-022 — Real-time context-aware authorization engine

**As a** Security Architect, **I want** every agent action authorized in real time based on current context ("Is this action acceptable, at this specific moment, given what has already happened?"), **so that** authorization is dynamic, not static OAuth scopes.  
**FR:** FR-32, FR-51  
**Dependencies:** EVX-020, EVX-021  
**Est:** 13 SP

**Acceptance Criteria**
- Given an agent requests an action, when authorization evaluates, then it considers: current delegation scope, action type, target entity, current operational state, prior actions in sequence, and time constraints.
- Given authorization decision, then it stores: allow|deny, reason code, policy ID, delegation source, and context snapshot in AuditTrailEntry (FR-51).
- Given authorization latency, then p99 does not exceed 200 ms (NFR-12).
- Given denial, then reason is both human-readable and machine-parseable.

---

### EVX-023 — Agent operational state machine (Normal → Degraded → Paused → Stopped)

**As a** Platform Admin, **I want** agents to transition through alert-driven operational states with fail-closed behavior, **so that** uncertain situations default to inaction, not runaway automation.  
**FR:** FR-35  
**Dependencies:** EVX-020  
**Est:** 8 SP

**Acceptance Criteria**
- Given an agent, when operating normally, then state is Normal.
- Given early warning thresholds are hit (e.g., elevated error rate), then state transitions to Degraded and alert is raised.
- Given uncertainty threshold is hit, then state transitions to Paused; agent suspends all non-critical actions.
- Given severe risk is detected, then state transitions to Stopped; agent halts completely.
- Given state transitions, then they complete within 5 seconds (NFR-13).
- Given uncertain state, then agent defaults to inaction (fail-closed).

---

### EVX-024 — API spend caps and research-loop detection

**As a** Platform Admin, **I want** hard API spend caps per agent and automatic detection of runaway research loops, **so that** cost is controlled and degenerate behavior is halted quickly.  
**FR:** FR-36  
**Dependencies:** EVX-023  
**Est:** 5 SP

**Acceptance Criteria**
- Given per-agent spend cap configuration, when cap is exhausted, then agent is automatically paused and alert is raised within 30 seconds (NFR-14).
- Given high query volume with low artifact output, when pattern matches research-loop heuristic, then agent is paused and alert is raised.
- Given spend tracking, then real-time usage vs. cap is visible on agent operations dashboard.

---

### EVX-025 — Four-phase skill security pipeline

**As a** Security Architect, **I want** new agent skills/tools to pass a four-phase security pipeline before activation, **so that** no unchecked capability expansion occurs.  
**FR:** FR-34  
**Dependencies:** EVX-020, EVX-021  
**Est:** 8 SP

**Acceptance Criteria**
- Given a new skill is proposed for an agent, when pipeline starts, then four phases execute: (1) pre-ingestion text analysis of skill definition, (2) multi-perspective risk review (security, authority, failure-mode, drift), (3) capability mismatch detection, (4) human-in-the-loop approval.
- Given phase 4, when no explicit approval is received within configured SLA, then skill is auto-rejected (silence = rejection, NFR-15).
- Given approved skill, then it is registered with scoped delegation and the agent can use it within authorized bounds.
- Given the pipeline, then all phases and decisions are logged in AuditTrailEntry.

---

### EVX-026 — Agent self-modification prohibition enforcement

**As a** Security Architect, **I want** enforcement that no agent can install skills, modify its own code, rotate credentials, or expand permissions autonomously, **so that** human control is preserved.  
**FR:** FR-37  
**Dependencies:** EVX-022  
**Est:** 3 SP

**Acceptance Criteria**
- Given an agent action request that matches prohibited operations (skill install, code modification, credential rotation, permission expansion), when evaluated, then authorization denies with specific reason code.
- Given attempted self-modification, then alert is raised to Platform Admin.
- Given prohibition enforcement, then it cannot be overridden by the agent itself.

---

### EVX-027 — Agent operations dashboard

**As a** Platform Admin, **I want** a dashboard showing per-agent identity, operational state, API spend vs. cap, delegation scope, recent actions, and authorization decisions, **so that** I have operational visibility over all agents.  
**FR:** (supports FR-30 to FR-37)  
**Dependencies:** EVX-020 through EVX-026  
**Est:** 5 SP

**Acceptance Criteria**
- Given the dashboard, when loaded, then each active agent shows: identity, current state (Normal/Degraded/Paused/Stopped), API spend vs. cap, delegation summary, last 10 actions, and recent auth decisions.
- Given state changes or alerts, then dashboard updates within 30 seconds.
- Given drill-down on an agent, then full authorization log and action history are accessible.

---

## Epic 4: Regulatory Change-to-Action Loop

**Goal:** Ingest HKMA/MAS regulatory updates in near-real-time, normalize requirements, run impact analysis, and generate actionable backlogs from gaps.  
**Buyer outcome:** Time-to-regulatory-impact-assessment.  
**FR coverage:** FR-4, FR-5, FR-6, FR-48  
**Must-Win Pillar:** #3 Regulatory Change-to-Action Loop

---

### EVX-030 — Regulatory source monitor and ingestion pipeline (HKMA/MAS)

**As a** Regulatory Affairs user (2L), **I want** the platform to monitor HKMA and MAS for new or updated publications and ingest them automatically, **so that** regulatory changes are visible within hours of publication.  
**FR:** FR-4, FR-48  
**Dependencies:** None  
**Est:** 8 SP

**Acceptance Criteria**
- Given a new HKMA/MAS publication, when detected, then the platform ingests content with `source_published_at`, `ingested_at`, source URL, and normalized requirement IDs.
- Given a publication is updated, when re-ingested, then version diff metadata is stored and prior version remains queryable.
- Given ingestion failure, when retry is exhausted, then failure reason is persisted and alert event is emitted.
- Given at least 95% of publications, when measured monthly, then they appear in-product within 24 hours of official publication timestamp (FR-48).

---

### EVX-031 — Regulatory freshness SLA monitor and breach alerts

**As a** Regulatory Affairs user (2L), **I want** SLA tracking for regulatory update freshness, **so that** delays are visible and actionable before they become compliance gaps.  
**FR:** FR-48  
**Dependencies:** EVX-030  
**Est:** 5 SP  
*Note: Mirrors EVX-202; included here for backlog completeness.*

**Acceptance Criteria**
- Given ingestion records, when daily SLA job runs, then freshness = `ingested_at - source_published_at`.
- Given monthly metrics, then report shows `% updates within 24h` and breach count by source.
- Given freshness falls below 95% in rolling 30 days, then alert is sent to configured owners.
- Given dashboard, then user can filter SLA panel by regulator and date range.

---

### EVX-032 — Requirement normalization and control/evidence mapping

**As a** Compliance Manager (2L), **I want** ingested regulatory requirements normalized into a canonical model and mapped to existing controls and evidence, **so that** impact assessment can start immediately.  
**FR:** FR-4, FR-5  
**Dependencies:** EVX-030, EVX-002  
**Est:** 8 SP

**Acceptance Criteria**
- Given ingested requirements, when normalization runs, then each requirement has: canonical ID, source regulation, section reference, requirement text, and keywords.
- Given normalized requirements, when mapping runs, then AI suggests existing controls and evidence that cover or partially cover each requirement.
- Given mapping suggestions, then confidence scores and source citations are included.
- Given user review, when accepting/rejecting mappings, then decisions are recorded in AuditTrailEntry.

---

### EVX-033 — AI gap analysis for new/updated regulations

**As a** Compliance Manager (2L), **I want** AI to compare new/updated requirements against current controls and produce a prioritized gap report, **so that** I know exactly where we're exposed.  
**FR:** FR-5  
**Dependencies:** EVX-032  
**Est:** 8 SP

**Acceptance Criteria**
- Given a new regulation or update, when gap analysis is triggered, then AI compares requirements to current controls/evidence and identifies: fully covered, partially covered, and uncovered requirements.
- Given gap results, then each gap includes: requirement text, current coverage, recommended actions, confidence, and priority.
- Given gap analysis scope (50-200 requirements), when run, then completion is within 5 minutes (NFR-3).
- Given gap report, then it is exportable and feeds into remediation backlog generation.

---

### EVX-034 — Framework version tracking and alignment reviews

**As a** Compliance Manager (2L), **I want** the platform to track framework version changes (NIST CSF, ISO 27001, COBIT) and run alignment reviews when updates are published, **so that** framework posture stays current.  
**FR:** FR-6  
**Dependencies:** EVX-002  
**Est:** 5 SP

**Acceptance Criteria**
- Given a framework version change is detected (e.g., NIST CSF 2.0), when review triggers, then the system compares current control mappings to the new framework version.
- Given version comparison, then new/changed/removed requirements are highlighted.
- Given alignment review, then a report shows coverage, gaps, and suggested mapping updates.
- Given framework configuration, then custom frameworks can be added via import (NFR-15).

---

### EVX-035 — Regulatory alerts and notification engine

**As a** 2L user, **I want** configurable alerts when new regulations are ingested or framework updates are detected, **so that** I can respond promptly.  
**FR:** FR-4  
**Dependencies:** EVX-030, EVX-034  
**Est:** 3 SP

**Acceptance Criteria**
- Given alert configuration, when user subscribes to regulators/frameworks, then notifications are sent on new publications.
- Given alert delivery, then in-app and email channels are supported.
- Given alert, then it includes: publication title, source, summary, and link to assess impact.

---

## Epic 5: AI Narratives & Board Reporting

**Goal:** Generate executive-quality narratives and board packs with versioning and editing, using the explainability framework.  
**Buyer outcome:** Time-to-regulator-packet; board credibility.  
**FR coverage:** FR-10, FR-11

---

### EVX-040 — AI executive narrative generation

**As a** CISO (2L), **I want** to request an AI-generated executive summary for a given scope (e.g., "Q1 risk and compliance" or "HKMA readiness"), **so that** board pack preparation takes minutes instead of days.  
**FR:** FR-10  
**Dependencies:** EVX-001, EVX-002, EVX-006, EVX-010  
**Est:** 8 SP

**Acceptance Criteria**
- Given a scope selection (entity, time period, framework, topic), when narrative is requested, then AI generates a plain-language summary covering: key risks, control health, open issues, trends, and regulatory readiness.
- Given generated narrative, when produced, then it creates a DecisionLog with sources, confidence, and reasoning.
- Given narrative output, then it is editable by the user before finalization.
- Given narrative versioning, then all versions are retained and diffable.
- Given standard scope, when generated, then completion is within 60 seconds (NFR-2).

---

### EVX-041 — AI explainability narrative (plain language + technical rationale)

**As a** Compliance Manager (2L), **I want** explainability reports that combine plain-language business impact summaries with technical rationale, **so that** both board and auditors get what they need from one request.  
**FR:** FR-11  
**Dependencies:** EVX-015, EVX-040  
**Est:** 5 SP

**Acceptance Criteria**
- Given report request, when generated, then two sections are produced: board summary (plain language, business impact) and technical detail (rationale, citations, audit trail).
- Given combined report, when exported, then formatting is suitable for regulator submission.
- Given report generation, then it leverages DecisionLog and AuditTrailEntry data.

---

# PHASE 2 — Intelligence + Cyber Defence

## Epic 6: Agentic Cyber Defence

**Goal:** Deploy Detection, Response, Orchestration, and Threat Intel agents that detect, triage, and respond to cyber threats with full explainability and GRC linkage.  
**Buyer outcome:** Time-to-cyber-incident-to-GRC-linkage.  
**FR coverage:** FR-38 to FR-43, FR-52  
**Must-Win Pillar:** #4 Cyber-to-GRC Closed Loop

---

### EVX-050 — Detection Agent: alert triage, enrichment, and severity assignment

**As a** SOC Analyst, **I want** a Detection Agent that triages incoming SIEM alerts, enriches them with threat intelligence, and assigns severity, **so that** alert volume is managed and critical items surface first.  
**FR:** FR-38, FR-39  
**Dependencies:** EVX-020 (agent identity), EVX-010 (DecisionLog)  
**Est:** 8 SP

**Acceptance Criteria**
- Given a SIEM alert is ingested, when Detection Agent processes it, then it enriches with threat intel (IOCs, known campaigns), assigns severity (critical/high/medium/low/info), and stores as CyberAlert.
- Given triage, then processing completes within 60 seconds of receipt (NFR-16).
- Given triage decision, then a DecisionLog is created with rationale, confidence, and sources.
- Given CyberAlert, then status is set to "triaged" with assigned agent recorded.

---

### EVX-051 — Response Agent: action recommendation with HITL

**As a** SOC Analyst, **I want** a Response Agent that recommends response actions (isolate, block, escalate, run playbook) with rationale and confidence, requiring my approval for critical/high severity, **so that** response is fast but controlled.  
**FR:** FR-38, FR-39, FR-40  
**Dependencies:** EVX-050, EVX-022 (authorization engine)  
**Est:** 8 SP

**Acceptance Criteria**
- Given a triaged alert or incident, when Response Agent evaluates, then it recommends one or more actions (isolate host, block IP, notify, escalate, create ticket, run playbook) with rationale, confidence, and target.
- Given critical/high severity, when action is recommended, then HITL approval is required before execution; prompt surfaces within 30 seconds (NFR-17).
- Given SOC analyst approval/rejection, then ResponseAction status is updated and decision is logged.
- Given execution, then the action is recorded with status (pending/completed/failed/rolled_back).

---

### EVX-052 — Orchestration Agent: alert-to-incident correlation and GRC linkage

**As a** 2L Risk Manager, **I want** an Orchestration Agent that correlates alerts into incidents and auto-links them to risk register and control library entries, **so that** cyber events feed governance posture automatically.  
**FR:** FR-38, FR-41, FR-52  
**Dependencies:** EVX-050, EVX-001, EVX-002  
**Est:** 8 SP

**Acceptance Criteria**
- Given related CyberAlerts, when Orchestration Agent analyzes, then it groups them into an Incident with linked alerts, severity, and summary.
- Given a new Incident, when created, then agent suggests risk register and control library links.
- Given a critical incident, when closure is attempted, then system blocks unless ≥ 1 risk link and ≥ 1 control link exist (FR-52).
- Given GRC linkage, then it is available in dashboards within 5 minutes of incident creation (NFR-18).

---

### EVX-053 — Threat Intelligence Agent: feed ingestion and IOC matching

**As a** SOC Analyst, **I want** a Threat Intel Agent that ingests threat intelligence feeds, normalizes IOCs, and matches them against alerts and assets, **so that** detection is enriched with current threat context.  
**FR:** FR-38, FR-43  
**Dependencies:** EVX-050  
**Est:** 5 SP

**Acceptance Criteria**
- Given configured threat intel feeds (STIX/TAXII, commercial, open-source), when sync runs, then IOCs (hashes, domains, IPs, campaigns) are ingested and stored as ThreatIntelFeed records.
- Given new CyberAlerts, when created, then they are matched against current IOC inventory.
- Given IOC match, then Detection Agent is notified for severity adjustment.
- Given feed status, then last sync time and indicator count are visible on dashboard.

---

### EVX-054 — Cyber Defence UI page

**As a** SOC Analyst, **I want** a dedicated Cyber Defence page showing alerts, incidents, pending approval actions, Cyber → GRC linkage, and cyber explainability, **so that** I have operational visibility in one place.  
**FR:** FR-42  
**Dependencies:** EVX-050 through EVX-053  
**Est:** 8 SP

**Acceptance Criteria**
- Given the Cyber Defence page, when loaded, then it shows: alerts table (filterable by severity/status/source), active incidents with timeline, response actions pending approval (with rationale displayed), Cyber → GRC linkage table (incident → risk/control), explainability table for cyber actions, and "Export Cyber Audit Trail" button.
- Given pending HITL actions, then approve/reject buttons are inline with rationale visible.
- Given export, then cyber audit trail is downloadable in JSON/CSV/PDF.

---

### EVX-055 — Cyber closure guardrail enforcement

**As a** 2L Risk Manager, **I want** critical incidents blocked from closure until linked to risk and control records, **so that** cyber events always feed governance posture.  
**FR:** FR-52  
**Dependencies:** EVX-052  
**Est:** 3 SP  
*Note: Complements EVX-206 from sprint slice.*

**Acceptance Criteria**
- Given a critical incident, when closure is attempted without risk/control links, then closure is blocked with clear message.
- Given dashboard KPI, then `% critical incidents with required links before closure` is tracked.
- Given target, then measurement logic supports tracking toward 90% coverage target.

---

## Epic 7: Virtual 3LOD & Challenge Workflows

**Goal:** Implement explicit 1L/2L/3L views, challenge workflows, and cross-line reporting.  
**Buyer outcome:** Demonstrable governance structure for regulators and board.  
**FR coverage:** FR-12, FR-13, FR-14, FR-50

---

### EVX-060 — Line-specific views and scoped permissions (1L/2L/3L)

**As a** Control Owner (1L), **I want** a tailored view showing my controls, my evidence, my issues, and my attestations, scoped to my line of defence, **so that** I see only what's relevant to my role.  
**FR:** FR-12  
**Dependencies:** EVX-001, EVX-002, EVX-004  
**Est:** 8 SP

**Acceptance Criteria**
- Given a 1L user, when logged in, then default view shows: "my controls," "my evidence," "my issues," "my attestations."
- Given a 2L user, then default view shows: risk/control oversight, challenge status, framework coverage, open issues across 1L.
- Given a 3L user, then default view shows: audit plan, control testing status, findings, assurance opinion.
- Given RBAC configuration, then visibility and actions respect 3LOD separation (NFR-5).

---

### EVX-061 — Challenge workflow (2L challenges 1L)

**As a** 2L Risk Manager, **I want** to raise, track, and resolve challenges against 1L evidence, controls, or AI recommendations, **so that** oversight is structured and auditable.  
**FR:** FR-13, FR-50  
**Dependencies:** EVX-060, EVX-010 (DecisionLog for AI challenges)  
**Est:** 8 SP

**Acceptance Criteria**
- Given a 2L user, when raising a challenge, then they specify: target (control/evidence/AI recommendation), rationale, evidence, and priority.
- Given a challenge, when created, then SLA target is auto-applied from policy configuration (FR-50).
- Given challenge age exceeds warning threshold, then warning notification is sent.
- Given challenge breaches SLA, then escalation route (manager/head) is automatically triggered.
- Given resolution, then outcome, reasoning, resolver identity, and timestamp are recorded.
- Given monthly report, then resolution rate and breach trend by priority are shown.

---

### EVX-062 — 3L evidence requests and audit workflow

**As an** Internal Auditor (3L), **I want** to request evidence from 1L, plan audits, execute control tests, and record findings, **so that** independent assurance is structured and traceable.  
**FR:** FR-13  
**Dependencies:** EVX-060, EVX-004  
**Est:** 5 SP

**Acceptance Criteria**
- Given a 3L user, when requesting evidence from 1L, then a formal request is created with control/requirement scope, due date, and tracking.
- Given 1L receives request, then they can respond with evidence artifacts linked to the request.
- Given control testing, then 3L can record test results (effective/ineffective/partially effective) with findings.
- Given findings, then they are linked to controls, risks, and remediation actions.

---

### EVX-063 — 3LOD alignment reporting

**As a** Board member, **I want** reporting that shows each line's contribution and how they align, **so that** governance structure is visible and demonstrable for regulators.  
**FR:** FR-14  
**Dependencies:** EVX-060, EVX-061, EVX-062  
**Est:** 5 SP

**Acceptance Criteria**
- Given a report request, when generated, then it shows: 1L control health and evidence status, 2L challenge status and oversight actions, 3L assurance opinion and findings, and aggregate alignment score.
- Given reporting scope (entity, period), then each line's view is distinct but combined in one report.
- Given regulator audience, then report is exportable in board-ready format.

---

## Epic 8: Org & Document Intelligence

**Goal:** Ingest org charts, annual reports, and strategy documents; extract governance objectives; draft policies with framework citations.  
**Buyer outcome:** Document-driven governance grounded in frameworks.  
**FR coverage:** FR-15, FR-16, FR-20 to FR-28

---

### EVX-070 — Org chart ingestion and structure parsing

**As a** Compliance Manager (2L), **I want** to upload or connect org charts and have the platform parse departments, roles, and reporting lines, **so that** ownership mapping can be org-aligned.  
**FR:** FR-15  
**Dependencies:** None  
**Est:** 5 SP

**Acceptance Criteria**
- Given CSV, structured format, or HR/identity API, when org chart is ingested, then departments, roles, and reporting lines are parsed.
- Given parsed org, when displayed, then hierarchical structure is navigable.
- Given org updates, then re-ingestion updates the structure and flags changes.

---

### EVX-071 — Process/control-to-org mapping suggestions

**As a** Compliance Manager (2L), **I want** AI to suggest which processes and controls map to which org units and roles, **so that** ownership and coverage align to the actual organisation.  
**FR:** FR-15  
**Dependencies:** EVX-070, EVX-002  
**Est:** 5 SP

**Acceptance Criteria**
- Given parsed org and existing controls/processes, when mapping is requested, then AI suggests: control X → department Y / role Z.
- Given suggestions, then confidence and reasoning are included.
- Given user review, when accepting/rejecting/adjusting, then decisions are recorded.
- Given org structure change, then re-run suggestions to keep mapping current.

---

### EVX-072 — Annual report and strategy document analysis

**As a** CISO (2L), **I want** the platform to extract governance objectives, risks, and strategic priorities from uploaded annual reports and strategy documents, **so that** governance issues are derived from the organisation's own narrative.  
**FR:** FR-16, FR-20  
**Dependencies:** EVX-010 (DecisionLog)  
**Est:** 8 SP  
*Note: Document extraction is partially implemented in `src/document-extraction/`.*

**Acceptance Criteria**
- Given an uploaded annual report or strategy document, when analysis runs, then objectives, risks, governance-related statements, and strategic priorities are extracted.
- Given extracted content, then each item is linked to the source document section/page.
- Given extraction, then a DecisionLog is created with confidence and sources.

---

### EVX-073 — Governance issue suggestion with COBIT/COSO references

**As a** 2L Risk Manager, **I want** AI to suggest governance issues (oversight gaps, control environment, strategy-execution alignment) referenced to COBIT, COSO, and other frameworks, **so that** issues are auditable and grounded in standards.  
**FR:** FR-16  
**Dependencies:** EVX-072  
**Est:** 5 SP

**Acceptance Criteria**
- Given extracted governance content, when issue suggestion runs, then AI proposes issues with: description, framework reference (e.g., "COBIT EDM03 — Ensure Risk Optimization"), and priority.
- Given suggestions, when user accepts/rejects/refines, then accepted items are added to the issue register linked to controls and risks.
- Given issue register, then framework references are visible and filterable.

---

### EVX-074 — Indexed framework knowledge base (20+ standards)

**As a** Policy Agent, **I want** an indexed knowledge base covering 20+ international standards at control-level granularity, **so that** cross-referencing and gap analysis draw on a comprehensive library.  
**FR:** FR-21  
**Dependencies:** None  
**Est:** 8 SP

**Acceptance Criteria**
- Given the knowledge base, when queried, then it includes: COBIT 2019, ITIL v4/v5, COSO ERM, ISO 38500, NIST 800-53 Rev 5, NIST CSF 2.0, ISO 27001/27002/27017/27018/27701, CIS Controls v8, FIPS 140-3/197/186-5, NIST SP 800-57, PCI DSS v4.0, SOC 2, HIPAA, Basel III/IV, HKMA SPM, MAS TRM.
- Given a framework requirement, then control-level text, section reference, and metadata are available.
- Given cross-framework query (e.g., "encryption requirements"), then results span all relevant frameworks.

---

### EVX-075 — Cross-framework control mapping

**As a** Compliance Manager (2L), **I want** the platform to cross-map control requirements across frameworks (e.g., NIST AC-2 ↔ ISO A.9 ↔ COBIT DSS05.04 ↔ PCI Req 7), **so that** I maintain one control and cover multiple frameworks.  
**FR:** FR-22  
**Dependencies:** EVX-074, EVX-002  
**Est:** 8 SP

**Acceptance Criteria**
- Given a control requirement from one framework, when cross-mapping is requested, then equivalent or related requirements from other frameworks are shown.
- Given cross-mapping, then relationships are typed (equivalent, related, partial overlap).
- Given mapping matrix, then a framework mapping matrix view is available (FR-26).

---

### EVX-076 — Policy gap analysis against framework requirements

**As a** Compliance Manager (2L), **I want** the platform to review existing policies against framework requirements and identify gaps, conflicts, and outdated provisions, **so that** policies stay aligned.  
**FR:** FR-23  
**Dependencies:** EVX-074  
**Est:** 5 SP

**Acceptance Criteria**
- Given uploaded policies, when review is triggered, then AI compares policy provisions to framework requirements.
- Given comparison, then gaps (missing coverage), conflicts (contradictions), and outdated provisions (superseded by newer framework version) are flagged.
- Given results, then each finding includes framework reference, policy section, and recommended action.

---

### EVX-077 — AI policy drafting with tracked changes and citations

**As a** Policy Agent / 1L Policy Owner, **I want** AI to draft new policies or revisions with tracked changes, framework citations, confidence scores, and rationale, **so that** policy development is faster and auditable.  
**FR:** FR-24, FR-25  
**Dependencies:** EVX-076, EVX-013 (confidence routing)  
**Est:** 8 SP

**Acceptance Criteria**
- Given a gap or policy review finding, when drafting is requested, then AI produces: new text or tracked changes, framework citations (e.g., "Aligns to NIST 800-53 AC-2"), confidence score, and rationale.
- Given confidence routing: Low → 2L drafts manually; Medium → 2L reviews AI draft; High → 1L reviews and approves.
- Given policy draft, then a DecisionLog is created with full provenance.

---

### EVX-078 — Automatic policy review trigger on regulatory/framework change

**As a** Regulatory Affairs user (2L), **I want** policy review automatically triggered when regulatory changes or framework updates are detected, **so that** policies don't fall behind.  
**FR:** FR-27  
**Dependencies:** EVX-030, EVX-034, EVX-076  
**Est:** 3 SP

**Acceptance Criteria**
- Given a new regulatory publication or framework version update, when detected, then affected policies are identified and review tasks are created.
- Given review task, then it links to the triggering change and affected policy sections.

---

### EVX-079 — Policy audit trail: boardroom input → policy artifact

**As a** Auditor (3L), **I want** a full audit trail from boardroom input (board minutes, strategy docs) through to the resulting policy artifact, with all intermediate decisions, **so that** policy provenance is complete.  
**FR:** FR-28  
**Dependencies:** EVX-072, EVX-077  
**Est:** 5 SP

**Acceptance Criteria**
- Given a policy artifact, when provenance is queried, then the system shows: source boardroom input → extracted objectives → framework analysis → gap findings → draft decisions → review/approval → published policy.
- Given each step, then DecisionLog and AuditTrailEntry records are linked.
- Given audit query, then the full chain is navigable.

---

## Epic 9: KCI/KRI/KPI Module

**Goal:** Central indicator management linked to governance, process, regulatory, and policies — with AI-driven priority recommendations.  
**Buyer outcome:** Metric-driven governance with strategy-aligned priorities.  
**FR coverage:** FR-17, FR-18, FR-19

---

### EVX-080 — KCI/KRI/KPI definition and linkage

**As a** Risk Analyst (2L), **I want** to define KCIs, KRIs, and KPIs and link each to governance (board objectives), process (controls), regulatory (requirements), and internal policies/standards, **so that** indicators are connected to what they measure.  
**FR:** FR-17  
**Dependencies:** EVX-001, EVX-002, EVX-030  
**Est:** 8 SP

**Acceptance Criteria**
- Given indicator creation, then user specifies: type (KCI/KRI/KPI), name, description, threshold (warning/breach), measurement frequency, and links to governance/process/regulatory/policy entities.
- Given indicators, then dashboard shows current value vs. threshold with trend.
- Given linkage, then clicking an indicator navigates to linked entities.

---

### EVX-081 — Gap suggestions: missing policies/standards and missing metrics

**As a** Compliance Manager (2L), **I want** the platform to suggest gaps where a control implies a policy/standard that isn't drafted, or where linkage implies measurement but no metric exists, **so that** coverage gaps are surfaced proactively.  
**FR:** FR-18  
**Dependencies:** EVX-080, EVX-002  
**Est:** 5 SP

**Acceptance Criteria**
- Given a control linked to a policy type that doesn't exist, when gap analysis runs, then suggestion is raised: "Policy X not found for control Y."
- Given linkage implies measurement but no KCI/KRI/KPI exists, then metric suggestion is raised with recommended type and threshold.
- Given suggestions, then user can accept (creates draft), reject, or defer.

---

### EVX-082 — Agent-driven priority recommendations

**As a** CISO (2L), **I want** AI agents to reason over indicator thresholds, trends, and context and produce priority recommendations using strategy, regulatory expectations, and industry benchmarks, **so that** 2L and board get actionable, benchmark-aware priorities.  
**FR:** FR-19  
**Dependencies:** EVX-080, EVX-072 (strategy context), EVX-030 (regulatory context)  
**Est:** 8 SP

**Acceptance Criteria**
- Given selected indicators, when agent discussion is invoked, then agents reason over thresholds, trends, coverage, strategy inputs, regulatory expectations, and benchmarks.
- Given discussion output, then a priority-ranked recommendation list is produced with rationale and sources.
- Given recommendations, then a DecisionLog is created for each.
- Given user review, then priorities can be accepted, adjusted, or rejected for 2L oversight and board reporting.

---

## Epic 10: Human-in-the-Loop Governance

**Goal:** Configurable checkpoints where humans must validate AI governance decisions, with escalation for high-risk actions.  
**FR coverage:** FR-29

---

### EVX-085 — HITL checkpoint configuration and escalation engine

**As a** 2L Risk Manager, **I want** to configure human validation checkpoints for specific AI decision types and risk tiers, with escalation workflows for high-risk actions, **so that** no critical decision is fully automated without human validation.  
**FR:** FR-29  
**Dependencies:** EVX-013 (confidence routing), EVX-010  
**Est:** 8 SP

**Acceptance Criteria**
- Given HITL configuration, then user specifies: which decision types require human checkpoint, risk tier thresholds, escalation targets, and timeout behavior.
- Given an AI decision that matches a checkpoint rule, when produced, then it is queued for human validation before taking effect.
- Given escalation timeout, then decision is escalated to next tier.
- Given validation/override, then all decisions are recorded in AuditTrailEntry.

---

## Epic 11: Pilot Connectors & Integration Hub

**Goal:** Provide baseline integrations for pilot deployment: SIEM connectors, identity/HR connector, and SSO.  
**FR coverage:** FR-53

---

### EVX-090 — Integration Hub framework

**As a** Platform Admin, **I want** a connector framework that supports authenticated, incremental data sync with error handling and telemetry, **so that** new integrations can be built consistently.  
**FR:** FR-53  
**Dependencies:** EVX-020 (dedicated connector identities)  
**Est:** 8 SP

**Acceptance Criteria**
- Given the framework, then it supports: authentication (API key, OAuth, certificate), incremental sync (watermarking/cursor), retry on failure, error telemetry, and canonical event model output.
- Given a connector run, then telemetry includes: records processed, errors, latency, and sync watermark.
- Given connector failure, then retry and error are recorded and surfaced.

---

### EVX-091 — SIEM Connector A (e.g., Splunk)

**As a** Platform Admin, **I want** a connector for Splunk that ingests alerts and maps them to the CyberAlert schema, **so that** detection coverage is operational for pilot.  
**FR:** FR-53  
**Dependencies:** EVX-090  
**Est:** 5 SP

**Acceptance Criteria**
- Given configured Splunk credentials, when connector is enabled, then alert ingestion maps to CyberAlert schema.
- Given mapping, then source, severity, title, description, and raw payload are populated.
- Given connector failure, then retry and error telemetry are recorded.

---

### EVX-092 — SIEM Connector B (e.g., Microsoft Sentinel)

**As a** Platform Admin, **I want** a connector for Microsoft Sentinel, **so that** a second SIEM option is available for pilot diversity.  
**FR:** FR-53  
**Dependencies:** EVX-090  
**Est:** 5 SP

**Acceptance Criteria**
- Same as EVX-091 but for Microsoft Sentinel alert format.

---

### EVX-093 — Identity/HR connector for ownership and org mapping

**As a** Compliance Manager (2L), **I want** an identity/HR connector that syncs org units, roles, and reporting relationships, **so that** ownership mapping workflows use current org data.  
**FR:** FR-53  
**Dependencies:** EVX-090, EVX-070  
**Est:** 5 SP

**Acceptance Criteria**
- Given configured identity/HR credentials, when sync runs, then org units, roles, and reporting relationships are imported.
- Given imported data, then it feeds into org chart structure and ownership mapping (EVX-070, EVX-071).
- Given sync failure, then retry and error telemetry are recorded.

---

# PHASE 3 — Advanced Capabilities

## Epic 12: Regulatory Risk Strategy

**Goal:** Map regulations to concrete Evonix artifacts, produce evidence by default, and support impact assessment when regulations change.  
**FR coverage:** FR-44, FR-45, FR-47

---

### EVX-100 — Regulation-to-artifact mapping

**As a** Compliance Manager (2L), **I want** each applicable regulation (EU AI Act, NIST AI RMF, ISO 42001, MAS TRM, HKMA GenAI) mapped to concrete Evonix artifacts (DecisionLog, AuditTrailEntry, Challenge, reports), **so that** compliance coverage is documented and reviewable.  
**FR:** FR-44  
**Dependencies:** EVX-010, EVX-012, EVX-015  
**Est:** 8 SP

**Acceptance Criteria**
- Given a regulation, when mapping is configured, then each requirement links to the Evonix artifact type that satisfies it (e.g., "EU AI Act Art. 13 → DecisionLog + Explainability Report").
- Given mapping, then it is documented and reviewable.
- Given a coverage query, then user can see: regulation → requirements → mapped artifacts → current compliance status.

---

### EVX-101 — Evidence-by-design: regulatory evidence from normal operation

**As a** Compliance Manager (2L), **I want** normal platform operation to produce regulatory evidence by default, with no separate "compliance run" required, **so that** evidence generation is continuous and effortless.  
**FR:** FR-45  
**Dependencies:** EVX-100, EVX-010, EVX-012  
**Est:** 5 SP

**Acceptance Criteria**
- Given normal platform operations (AI recommendations, reviews, challenges, approvals), when audited, then all required regulatory evidence artifacts exist without separate compliance runs.
- Given evidence-by-design audit, then a health check confirms completeness against regulation-to-artifact mapping.

---

### EVX-102 — Regulatory change impact assessment against 6-layer framework

**As a** Compliance Manager (2L), **I want** impact assessment when regulations change, mapping new requirements against the 6-layer explainability framework and existing controls, **so that** gaps are identified and actionable.  
**FR:** FR-47  
**Dependencies:** EVX-100, EVX-030  
**Est:** 8 SP

**Acceptance Criteria**
- Given a regulatory change, when impact assessment runs, then new requirements are mapped against: existing DecisionLog coverage, AuditTrailEntry completeness, Challenge workflow scope, reporting templates, and monitoring configuration.
- Given gaps, then a prioritized gap report is generated with recommended actions.
- Given threshold/HITL rule changes, then they are logged in AuditTrailEntry.

---

## Epic 13: Governance Intelligence & Advanced Analytics

**Goal:** ROI dashboards, maturity benchmarking, predictive governance, and ethics management.  
**FR coverage:** (supports product brief use cases 13, 14, 16, 19)

---

### EVX-105 — Governance ROI and maturity benchmarking dashboard

**As a** CFO, **I want** dashboards quantifying ROI of compliance automation and benchmarking governance maturity against industry peers, **so that** governance is positioned as a value driver.  
**Dependencies:** EVX-008  
**Est:** 8 SP

**Acceptance Criteria**
- Given dashboard, then it shows: time saved (board pack prep, evidence collection, audit response), risk reduction metrics, cost avoidance estimates.
- Given benchmarking, then maturity score is compared against configured industry benchmarks.
- Given data, then it is exportable for board/finance presentation.

---

### EVX-106 — Predictive governance intelligence and horizon scanning

**As a** CISO (2L), **I want** AI to forecast emerging compliance risks using regulatory trends and external data, **so that** the board can proactively adjust governance strategies.  
**Dependencies:** EVX-030, EVX-034  
**Est:** 8 SP

**Acceptance Criteria**
- Given regulatory feed data and trend analysis, when forecast runs, then emerging risk topics are identified with confidence and timeline.
- Given horizon scanning results, then they include: regulatory signal, affected frameworks/controls, recommended preparation actions.
- Given results, then a DecisionLog is created with sources and reasoning.

---

### EVX-107 — Ethics management and compliance scoring

**As a** Chief Ethics Officer, **I want** configurable ethical guidelines applied by AI agents with ethics compliance scoring in dashboards, **so that** governance decisions remain socially responsible and auditable.  
**Dependencies:** EVX-019 (bias monitoring), EVX-010  
**Est:** 5 SP

**Acceptance Criteria**
- Given ethics configuration, then guidelines (fairness, bias mitigation, transparency) are configurable per decision type.
- Given AI outputs, when evaluated, then ethics compliance score is computed and displayed.
- Given ethics dashboard, then scoring trends and violations are visible.

---

### EVX-108 — Governance fit assessment (COBIT/NIST/PCI DSS/ISO 27k)

**As a** Board Governance Officer, **I want** automatic mapping of governance practices against COBIT, NIST, PCI DSS, and ISO 27k with gap identification and maturity levels, **so that** alignment to best practices is measurable.  
**Dependencies:** EVX-074, EVX-072  
**Est:** 5 SP

**Acceptance Criteria**
- Given governance practices (from annual report or manual input), when assessment runs, then mapping against selected frameworks is produced with: coverage, gaps, maturity level (1-5), and alignment score.
- Given results, then each gap links to the framework requirement and recommended action.

---

## Epic 14: Adversarial Control Testing

**Goal:** Adversarial AI agents that automate the control testing lifecycle.  
**FR coverage:** (product brief use case 17)

---

### EVX-110 — Adversarial control testing agent

**As a** Security Architect, **I want** adversarial AI agents that design, execute, and monitor control tests, and flag failed tests with remediation suggestions, **so that** vulnerabilities are identified early without manual test creation.  
**Dependencies:** EVX-002, EVX-020, EVX-022  
**Est:** 13 SP

**Acceptance Criteria**
- Given a control, when adversarial testing is invoked, then the agent designs test cases targeting control effectiveness.
- Given test execution, then results (pass/fail/partial) are recorded with evidence.
- Given failures, then remediation suggestions are generated with rationale and confidence.
- Given the testing agent, then it operates under the same IAM model (scoped delegation, HITL for destructive actions).

---

### EVX-111 — Continuous governance alignment engine

**As a** 2L Risk Manager, **I want** AI agents to continually map decisions to governance objectives and policies in real time, **so that** compliance remains proactive and traceable.  
**Dependencies:** EVX-010, EVX-074  
**Est:** 8 SP

**Acceptance Criteria**
- Given new decisions/actions, when created, then alignment to governance objectives and policies is evaluated.
- Given misalignment, then alert is raised with recommendation.
- Given alignment status, then dashboard shows real-time governance alignment score.

---

# PHASE 4 — Ecosystem

## Epic 15: Extended Regulatory Coverage

**Goal:** Expand beyond HKMA/MAS to additional regulators by contract demand.

---

### EVX-115 — Configurable regulatory source framework

**As a** Product team, **I want** the regulatory ingestion pipeline to support adding new regulator sources via configuration, **so that** expansion beyond HKMA/MAS doesn't require code changes.  
**Dependencies:** EVX-030  
**Est:** 8 SP

**Acceptance Criteria**
- Given a new regulator source (e.g., SEC, EU), when configured, then ingestion, normalization, and alerting work without code changes.
- Given configuration, then it includes: source URL pattern, publication detection rules, normalization template, and SLA target.

---

### EVX-116 — SSO integration

**As a** Platform Admin, **I want** SSO integration (SAML/OIDC), **so that** enterprise identity management is supported for pilot and production.  
**Dependencies:** EVX-060  
**Est:** 5 SP

**Acceptance Criteria**
- Given SSO configuration (SAML 2.0 or OIDC), when enabled, then users authenticate via corporate IdP.
- Given SSO, then roles map to 1L/2L/3L and entity scoping.

---

## Epic 16: Cross-Enterprise Audit Consortium (Future)

**Goal:** Multi-organization anonymized audit trail sharing for systemic risk detection.

---

### EVX-120 — Anonymized audit trail sharing protocol

**As an** Industry Regulator, **I want** anonymized cross-enterprise audit trails shared via privacy-preserving protocols, **so that** systemic risks can be detected across organizations.  
**Dependencies:** EVX-012  
**Est:** 13 SP

**Acceptance Criteria**
- Given participation configuration, then audit trail entries are anonymized using differential privacy or equivalent.
- Given shared data, then no individual organization or person is identifiable.
- Given consortium query, then systemic patterns (e.g., widespread control failures) are detectable.

---

### EVX-121 — Optional blockchain-backed immutable ledger

**As a** Chief Compliance Officer, **I want** optional blockchain-backed immutable audit ledger, **so that** tamper-evidence has the highest possible integrity guarantee.  
**Dependencies:** EVX-012  
**Est:** 8 SP

**Acceptance Criteria**
- Given configuration, when blockchain mode is enabled, then audit trail entries are written to an immutable ledger.
- Given verification, then any entry can be independently verified against the ledger.

---

# SECUREPATH INTEGRATION

## Epic 17: SecurePath Integration

**Goal:** Ingest SecurePath findings, remediation tasks, and evidence into Evonix with full traceability.  
**FR coverage:** FR-55 to FR-59  
**Status:** Pending schema validation

*Stories EVX-SP-01 through EVX-SP-07 are defined in `securepath-integration-backlog-candidates-2026-03-08.md` and incorporated by reference:*

| Story ID | Story | Est. (SP) |
|----------|-------|-----------|
| EVX-SP-01 | SecurePath connector auth + incremental sync framework | 5 |
| EVX-SP-02 | Canonical mapper for findings/remediation/evidence events | 8 |
| EVX-SP-03 | Map critical findings to CyberAlert + Incident linkage | 8 |
| EVX-SP-04 | Preserve source trace in DecisionLog/AuditTrailEntry | 5 |
| EVX-SP-05 | Ingest latency and mapping coverage dashboard | 3 |
| EVX-SP-06 | Schema drift detection + quarantine queue | 5 |
| EVX-SP-07 | Optional bi-directional sync | 8 |

---

# CROSS-CUTTING: Previously Written Sprint Stories (Reference)

The following stories were previously defined in `sprint-backlog-slice-fr48-fr54-2026-03-08.md`. They are sprint-level decompositions of stories in this backlog and should be reconciled:

| Sprint Story | Backlog Story(s) | Relationship |
|-------------|-------------------|-------------|
| EVX-201 (Reg ingestion timestamping) | EVX-030 | Sprint slice of EVX-030 |
| EVX-202 (Reg freshness SLA monitor) | EVX-031 | Sprint slice of EVX-031 |
| EVX-203 (Decision Replay API) | EVX-016 | Sprint slice of EVX-016 |
| EVX-204 (Auth explainability logging) | EVX-022 | Sprint slice of EVX-022 |
| EVX-205 (Challenge SLA engine) | EVX-061 | Sprint slice of EVX-061 |
| EVX-206 (Cyber closure guardrail) | EVX-055 | Sprint slice of EVX-055 |
| EVX-207 (Pilot connectors pack) | EVX-091, EVX-092, EVX-093 | Sprint bundle |
| EVX-208 (Regulator packet performance) | EVX-015 | Sprint slice of EVX-015 |

---

# BACKLOG PRIORITIZATION SUMMARY

## Recommended Build Order (within phases)

### Phase 1 — Sprint sequence recommendation

**Sprint 1-2: Data foundation**
- EVX-001 (Risk register) → EVX-002 (Control library) → EVX-003 (Linkage model)
- EVX-007 (Tamper-evident audit log)

**Sprint 3-4: Evidence + Explainability core**
- EVX-004 (Evidence upload) → EVX-005 (AI evidence mapping)
- EVX-010 (DecisionLog) → EVX-012 (Immutable audit trail)
- EVX-013 (Confidence-based HITL routing)

**Sprint 5-6: Regulatory + Trust**
- EVX-030 (Regulatory ingestion) → EVX-031 (Freshness SLA) → EVX-032 (Requirement normalization) → EVX-033 (Gap analysis)
- EVX-014 (Confidence scoring)

**Sprint 7-8: Agent Autonomy**
- EVX-020 (Agent identity) → EVX-021 (Delegation) → EVX-022 (Authorization engine)
- EVX-023 (Operational state machine) → EVX-024 (Spend caps)
- EVX-025 (Skill security pipeline)

**Sprint 9-10: Reporting + Dashboard**
- EVX-015 (Regulator-ready reports) → EVX-016 (Decision replay)
- EVX-040 (Executive narratives)
- EVX-008 (Core dashboard) → EVX-027 (Agent operations dashboard)

**Sprint 11-12: Monitoring + Refinement**
- EVX-017 (Confidence drift) → EVX-018 (Human-only audit sampling) → EVX-019 (Bias monitoring)
- EVX-006 (Audit findings)
- EVX-034 (Framework version tracking) → EVX-035 (Regulatory alerts)

### Phase 2 — Sprint sequence recommendation

**Sprint 13-14: Cyber foundation**
- EVX-050 (Detection Agent) → EVX-051 (Response Agent) → EVX-052 (Orchestration Agent)
- EVX-053 (Threat Intel Agent)

**Sprint 15-16: Cyber UI + 3LOD**
- EVX-054 (Cyber Defence UI) → EVX-055 (Closure guardrails)
- EVX-060 (3LOD views) → EVX-061 (Challenge workflow) → EVX-062 (3L audit workflow)

**Sprint 17-18: Document Intelligence**
- EVX-070 (Org chart ingestion) → EVX-071 (Org mapping)
- EVX-072 (Document analysis) → EVX-073 (Governance issue suggestion)
- EVX-074 (Framework knowledge base) → EVX-075 (Cross-framework mapping)

**Sprint 19-20: Policy + KPI + Integration**
- EVX-076 (Policy gap analysis) → EVX-077 (Policy drafting) → EVX-078 (Auto policy review trigger)
- EVX-080 (KCI/KRI/KPI) → EVX-081 (Gap suggestions) → EVX-082 (Priority recommendations)
- EVX-090 (Integration Hub) → EVX-091/092/093 (Connectors)

---

# DEFINITION OF DONE (all stories)

- Acceptance criteria pass in QA/UAT.
- Audit events generated for all material actions in story scope.
- DecisionLog created for all AI outputs in story scope.
- API/UX notes and operational runbook updates completed.
- Story metrics observable on dashboard or report endpoint.
- Security/privacy review completed for new data flows.
- No regressions in existing functionality.
- p95 latency budgets met per applicable NFRs.

---

# ADOPTION READINESS GATES (before regulated-client rollout)

All four gates must pass:

1. **Governance gate** — Explainability/reporting quality and challenge traceability validated using regulator-style packet checks.
2. **Security gate** — Agent IAM isolation, delegation enforcement, and fail-closed behavior validated with negative and adversarial tests.
3. **Operational gate** — SOC and 2L workflows meet latency and approval-volume thresholds without bottlenecks.
4. **Assurance gate** — Independent audit replay of sampled decisions is reproducible end-to-end from source to outcome.

---

# OPEN QUESTIONS (backlog impact)

These open questions from the PRD may spawn additional stories once resolved:

1. Which regulators beyond HKMA/MAS for v1? (Impacts EVX-115 timing)
2. Which SIEM platforms for pilot? (Impacts EVX-091/092 target)
3. Agent delegation: per-deployment or centrally managed? (Impacts EVX-021 design)
4. Threat intel feed formats required? (Impacts EVX-053 scope)
5. ISO 42001 certification target for Evonix itself? (May add compliance stories)
6. Anonymous challenge support? (May extend EVX-061)
7. Regulator packet format acceptance criteria? (HKMA-first, MAS-first, or dual?)
8. SOC/2L operational thresholds for pilot? (Impacts NFR validation stories)
9. Which SecurePath product variant and schema? (Impacts EVX-SP-01 through SP-07)
10. SecurePath read-only or bi-directional in v1? (Impacts EVX-SP-07 priority)

---

*This backlog is derived from the Evonix PRD (FR-1 to FR-59, FR-EX-01 to FR-EX-21), product brief, competitive analysis (Mar 2026), and existing sprint artifacts. It should be reviewed with product, architecture, and engineering leads for estimation refinement and sprint allocation.*
