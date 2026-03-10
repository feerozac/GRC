---
stepsCompleted: [1, 2]
inputDocuments:
  - "/Users/user/Downloads/IT Risk and Control Introduction Slides (2).pdf"
  - "_bmad-output/agentic-ai-grc-product-brief.md"
  - "_bmad-output/agentic-ai-grc-prd.md"
  - "_bmad-output/planning-artifacts/competitive-analysis-and-feature-refinement-2026-03-08.md"
  - "_bmad-output/planning-artifacts/servicenow-schema-comparison-workbook-2026-03-08.md"
  - "templates/servicenow-to-evonix-mapping-template.csv"
session_topic: "Analyzing ServiceNow IRM architecture to inform and refine Evonix Agentic AI GRC platform features"
session_goals: "Extract SNOW IRM patterns, identify Evonix differentiation opportunities, generate feature ideas, cross-reference against existing PRD/backlog"
selected_approach: 'user-selected'
techniques_used: ['SCAMPER']
ideas_generated: 36
scamper_progress: 'Completed S, C, A, M, P — paused before E (Eliminate)'
context_file: '_bmad/bmm/data/project-context-template.md'
---

# Brainstorming Session Results

**Facilitator:** Mark
**Date:** 2026-03-10

## Session Overview

**Topic:** Analyzing ServiceNow IRM architecture (IT Risk and Control model) to identify feature opportunities, gaps, and competitive advantages for the Evonix Agentic AI GRC platform

**Goals:**
- Extract key architectural patterns and concepts from ServiceNow IRM that should inform Evonix features
- Identify where Evonix can differentiate from or improve upon ServiceNow's approach (especially with agentic AI, explainability, and 3LOD)
- Generate actionable feature ideas that close parity gaps or create new competitive advantages
- Cross-reference against existing PRD/backlog to find new or refined requirements

### Context Guidance

**ServiceNow IRM Key Concepts (from IT Risk and Control Introduction Slides):**
- Entity Scoping & Entity Types — dynamic collections linked to CMDB tables (People, Process, Technology)
- Risk Statements → per-Entity Risks — hierarchical, top-down risk model
- Control Objectives → per-Entity Controls — linked to frameworks (ISO 22301, COBIT, FFIEC)
- Policy → Control Objective → Control chain
- Continuous Monitoring of ITSM data (Change/Incident/Problem/Request → control compliance)
- Continuous Monitoring for Security (SIR, VR scorecards, KCI/KRI indicator stacks)
- Assessment, Attestation, Test Plans
- Audit engagement lifecycle (Scoping → Fieldwork → Walkthrough → Interview → Report)

**Evonix Existing Context:**
- Product Brief and PRD with 6-Layer Explainability Framework, AI Security & IAM, Agentic Cyber Defence
- Competitive analysis (Mar 2026) identifying must-win feature pillars
- ServiceNow schema comparison workbook and mapping template already in progress
- Sprint backlog (FR-48 to FR-54) in execution

### Session Setup

_Session established with full context from ServiceNow IRM slides and Evonix product artifacts._

## Technique Selection

**Approach:** User-Selected Techniques
**Selected Techniques:**

- SCAMPER Method: Systematic creativity through seven lenses (Substitute/Combine/Adapt/Modify/Put to other uses/Eliminate/Reverse) applied to ServiceNow IRM architecture to discover Evonix feature opportunities

**Selection Rationale:** SCAMPER provides a disciplined, exhaustive framework to decompose SNOW's IRM model concept-by-concept and systematically ask "how could Evonix do this differently, better, or in an entirely agentic way?"

## Technique Execution: SCAMPER

### S — Substitute (7 ideas)

**[S1] Agent-Driven Multi-Source Entity Discovery**
_Concept_: Replace SNOW's CMDB-only entity scoping with AI agents that integrate CMDB, board/strategy documents, process maps, and org structures to build a composite, living entity model. An entity in Evonix isn't just "a row in a table" — it's a multi-dimensional object enriched from every source an agent can reach.
_Novelty_: No GRC platform today builds entities from strategic intent + operational reality + infrastructure + accountability simultaneously.

**[S2] Incident-Intelligence-Driven Entity Risk Profiling**
_Concept_: Agents continuously mine incident logs (security incidents, IT incidents, operational events) to dynamically profile entity risk. Instead of relying on static risk ratings, Evonix agents detect problematic patterns across assets, services, and markets and surface them as risk signals — including cross-referencing against the entity's declared risk posture to find mismatches.
_Novelty_: SNOW uses incidents for control compliance monitoring. Evonix uses incidents as a living, agent-curated intelligence feed that challenges the risk register's assumptions.

**[S3] Cross-Source Risk Contradiction Engine**
_Concept_: Agents correlate all five sources (CMDB, strategy docs, process maps, org charts, incident logs) and automatically detect contradictions — where what the board says is critical doesn't match what incidents reveal as failing, where ownership on paper doesn't match who's actually firefighting, where a "low-risk" entity has a pattern of high-severity incidents. Each contradiction becomes a candidate governance issue or risk signal.
_Novelty_: No platform today performs automated cross-source contradiction detection as a core GRC capability.

**[S4] Topology-Aware Risk Propagation**
_Concept_: Agents ingest network topology and technology architecture to model risk propagation paths — understanding not just individual entity risk but how risk travels through connected systems. A vulnerability in one node gets a risk score amplified by what it can reach.
_Novelty_: Current GRC tools rate risks per-entity in isolation. Evonix would rate risks per-entity in context of what they're connected to.

**[S5] Architecture-vs-Reality Drift Detection**
_Concept_: Agents compare documented technology architecture (intended state) against network topology (actual state) and incident patterns (operational evidence) to detect architectural drift — where reality has diverged from design. Each drift becomes a risk signal.
_Novelty_: Architecture reviews are periodic and manual. This makes them continuous and agent-driven.

**[S6] Bounded Data Flow Risk Sensing**
_Concept_: Rather than agents "understanding" data usage fully, they monitor data flow patterns against known boundaries (jurisdictions, classifications, org units) and flag anomalies — data crossing borders it shouldn't, unclassified flows to external systems, volume spikes suggesting exfiltration. The agent doesn't understand the data — it understands the boundaries the data should respect.
_Novelty_: Makes data risk sensing practical for agents by scoping the problem to boundary violation detection rather than full data comprehension.

**[S7] Framework-Mandated Multi-Source Risk Sensing**
_Concept_: Position Evonix's agent-driven multi-source entity model as the first platform to actually deliver what NIST CA-7, ISO 27001:2022 Control 5.7, MITRE ATT&CK v18, and COBIT APO12 already require — correlation of multiple data sources for continuous risk assessment. Agents are the mechanism that makes the framework requirement achievable at scale.
_Novelty_: Every framework says "use multiple sources." No platform actually automates multi-source correlation for GRC. Compliance-driven sales narrative: "You're already required to do this. We're the only platform where agents actually do it for you."

**Framework Validation for Substitute Ideas:**

| Framework | Requirement | Evonix Agent Capability |
|-----------|------------|------------------------|
| NIST CA-7 | Correlate multiple monitoring sources | Agent correlates CMDB + incidents + topology + architecture + strategy |
| ISO 27001 5.7 | Active threat intel analysis feeding risk assessment | Agent ingests threat intel and auto-updates entity risk profiles |
| ISO 27001 8.2 | Business-wide, multi-stakeholder risk assessment | Agent integrates board docs + org charts + process maps + tech data |
| MITRE ATT&CK v18 | 106 data components across 42 sources | Agent maps attack surface using topology + detection analytics |
| COBIT APO12 | Internal + external + enterprise context | Agent weaves all three into unified entity model |

---

### C — Combine (8 ideas)

**[C1] 3LOD-Layered Continuous Monitoring**
_Concept_: Combine SNOW's ITSM continuous monitoring model with Evonix's virtual 3LOD so each line of defence gets a role-specific view of monitoring results — 1L sees their control health, 2L challenges the monitoring quality and thresholds, 3L assures the monitoring architecture itself.
_Novelty_: SNOW monitors controls. Evonix monitors controls AND monitors the monitors — with structured challenge and assurance at each line.

**[C2] Challengeable Risk Hierarchy with Explainability**
_Concept_: Combine SNOW's Risk Statement → per-Entity Risk model with Evonix's 3LOD challenge workflow and explainability framework. Risk ratings aren't static assignments — they're living assessments where 2L can challenge 1L's rating with agent-gathered evidence, resolutions are logged with rationale, and 3L independently assures the process.
_Novelty_: In SNOW, risk ratings are set and reviewed periodically. In Evonix, risk ratings are continuously contested through structured 3LOD challenge with explainable outcomes.

**[C3] MITRE-Informed Agentic Control Testing**
_Concept_: Combine SNOW's framework-linked Control Objectives with Evonix's cyber agents and MITRE ATT&CK analytics. Instead of manual attestation, cyber agents actively probe controls against relevant MITRE techniques — real testing, not checkbox compliance.
_Novelty_: SNOW tests controls through human attestation. Evonix tests controls through adversarial agent simulation mapped to MITRE techniques.

**[C4] Agent-Curated Indicator Intelligence**
_Concept_: Combine SNOW's KCI/KRI indicator model with Evonix agents that don't just display indicators but reason over them — correlating KRI trends with incident patterns, cross-referencing KCI thresholds against framework requirements, and producing priority recommendations.
_Novelty_: SNOW displays indicators on dashboards. Evonix agents interpret indicators, detect patterns humans miss, and make prioritised recommendations.

**[C5] Agent-Augmented Audit Lifecycle**
_Concept_: Combine SNOW's structured audit engagement lifecycle with Evonix agents that pre-scope, pre-gather evidence, detect walkthrough discrepancies, generate targeted interview questions, and draft audit reports. The 3L auditor shifts from "do everything manually" to "validate, challenge, and opine."
_Novelty_: SNOW digitises the audit workflow. Evonix agents do the heavy lifting within the workflow so auditors spend time on judgment, not data gathering.

**[C6] Contradiction-Driven Audit Scoping**
_Concept_: Combine the multi-source entity fabric (S1-S6) with the agent-augmented audit lifecycle. When 3L initiates an audit, the scoping agent presents cross-source contradictions as priority audit targets — "The org chart says Team A owns this, but incidents show Team B resolving issues."
_Novelty_: Traditional audit scoping is risk-rated by the risk register. Evonix scoping is driven by where reality contradicts the record.

**[C7] Bidirectional Policy-Control Intelligence**
_Concept_: Combine SNOW's top-down Policy → Control Objective → Control chain with Evonix agents that drive bottom-up intelligence: control failures and incident patterns feed back up to challenge control objectives and flag policy gaps.
_Novelty_: SNOW's chain flows down: policy → control. Evonix's chain flows both ways — controls talk back to policies through agent intelligence.

**[C8] Agent-Challenged Attestation**
_Concept_: Combine SNOW's attestation model with Evonix agents that pre-challenge attestations before they're submitted. When a 1L control owner attests "this control is effective," the agent cross-references against incident data, monitoring results, and evidence freshness. If they attest despite contradictions, that's flagged to 2L with full context.
_Novelty_: SNOW attestation is self-reported trust. Evonix attestation is evidence-challenged trust.

---

### A — Adapt (11 ideas)

**[A1] 1L Agent-Assisted Risk Landscape with 2L Oversight**
_Concept_: Adapt SNOW's entity scoping so that 1L operational teams use agents to build and maintain their risk landscape. Separately, a 2L oversight agent independently analyses the same data sources and flags gaps or mismatches. Two-tier agent model mirrors the real 3LOD operating model.
_Novelty_: Two-tier agent model — 1L agents help build, 2L agents help challenge. Neither agent operates without human validation at their respective line.

**[A2] Bottom-Up Risk Articulation with Automated Taxonomy Mapping**
_Concept_: Adapt SNOW's centralised Risk Statement library so that 1L teams can articulate risks in their own operational language. Agents then map these 1L-specific risks upward to the centralised risk taxonomy and framework requirements. 2L sees both the operational articulation and the framework mapping.
_Novelty_: SNOW pushes risk language down from a central library. Evonix lets risk language flow up from operations and agents handle the translation.

**[A3] Pattern-Based Continuous Monitoring (Replacing Rule-Based)**
_Concept_: Adapt SNOW's rule-based ITSM continuous monitoring into agent-driven pattern detection. Instead of administrators writing rules, agents establish baseline patterns from operational data and detect anomalies — catching risks that nobody thought to write a rule for.
_Novelty_: SNOW monitors for pre-defined rule violations. Evonix monitors for pattern deviations.

**[A4] 3LOD-Native Agent Architecture**
_Concept_: Adapt the entire agent design so that agents are explicitly scoped to a line of defence. 1L agents assist with building and operating. 2L agents assist with challenging and overseeing. 3L agents assist with assuring. Each agent's permissions, data access, and outputs are governed by its line. The IAM model enforces line separation.
_Novelty_: No GRC platform designs its AI around lines of defence. Evonix would be the first where the agent architecture is the governance architecture.

**[A5] Bottom-Up Governance Traceability Chain**
_Concept_: Agents establish risk scenarios using business/process language. The agent then automatically translates upward through the full hierarchy: Process Language → Controls → Control Objectives → Standards (HOW) → Policy (WHAT) → Corporate Context & Industry Benchmark & Boardroom (WHY). Every level in the chain is linked and traceable. 2L validates the framework mappings.
_Novelty_: Every GRC tool builds governance top-down from frameworks. Evonix builds it bottom-up from process reality and agents translate to governance language.

**Key Governance Traceability Chain Architecture:**
```
BOTTOM (closest to reality)
  ↑  Process Language — how people actually describe what they do and what goes wrong
  ↑  Controls — what's in place to manage the risk
  ↑  Control Objectives — what the controls are trying to achieve
  ↑  Standards (HOW) — how the organisation has decided to achieve it
  ↑  Policy (WHAT) — what the organisation has committed to
  ↑  Corporate Context / Industry Benchmark / Board Room (WHY) — why it matters
TOP (strategic intent)
```

**[A6] Automated Governance Chain Gap Detection**
_Concept_: As agents build the bottom-up traceability chain, they automatically detect missing links at every level. Missing standard = "people don't know HOW." Missing policy = "the organisation hasn't committed to WHAT." Missing corporate context = "nobody has articulated WHY." Agents present gaps to the appropriate line.
_Novelty_: Evonix tells you where in the governance chain the break is and what it means.

**[A7] Bidirectional Governance Chain Navigation**
_Concept_: The governance traceability chain works in both directions. Bottom-up: agents translate process language to governance. Top-down: agents trace strategic intent down to process reality and detect where the message gets lost. "The board said operational resilience is priority #1, but the 1L teams running the 5 most critical processes have no visibility to that strategic context."
_Novelty_: Governance isn't just about mapping — it's about whether intent at the top actually reaches reality at the bottom, and vice versa.

**[A8] 2L as Framework Translation Authority**
_Concept_: Formalise 2L's role in the governance chain as the framework translation authority. 1L agents and teams work in process/business language. 2L agents and teams map those articulations to industry frameworks (NIST, ISO, COBIT, HKMA, MAS). 3L assures the mapping methodology.
_Novelty_: Eliminates the most common GRC friction point — forcing operational teams to think in framework language.

| Level | Who Owns It | Language | Agent Role |
|-------|-------------|----------|------------|
| Process Language | 1L | Business/operational | Capture, assist articulation |
| Controls | 1L | Operational | Map to process risks, detect gaps |
| Control Objectives | 2L frames, 1L implements | Bridging | Translate controls → objectives |
| Standards (HOW) | 2L oversees, 1L executes | Governance/operational | Detect HOW gaps |
| Policy (WHAT) | 2L owns | Governance | Detect WHAT gaps |
| Corporate Context / Benchmark / Boardroom (WHY) | Board/Executive | Strategic | Link to strategy, detect WHY gaps |

**[A9] Framework-Embedded Best Practice Recommendations at Every Chain Level**
_Concept_: At every level of the governance traceability chain, agents don't just detect gaps — they actively recommend solutions grounded in industry frameworks. Recommendations include specific framework references (NIST control IDs, ISO clauses, COBIT practices), industry benchmark data, and draft artefacts (control statements, standards, policy clauses). Each recommendation carries a confidence score, cites its sources, and logs to the DecisionLog.
_Novelty_: Current GRC tools map your existing stuff to frameworks. Evonix agents proactively tell you what you're missing and draft what you need.

**[A10] Cross-Framework Recommendation Synthesis**
_Concept_: When an agent recommends a control, standard, or policy, it synthesises across all relevant frameworks simultaneously — producing a single control statement that satisfies NIST, ISO, COBIT, PCI DSS, and HKMA requirements. No need to maintain separate controls per framework.
_Novelty_: SNOW maps one control to multiple frameworks. Evonix agents synthesise across frameworks to recommend unified artefacts.

**[A11] Maturity-Aware Best Practice Recommendations**
_Concept_: Agent recommendations are calibrated to the organisation's current maturity level per domain. Starting team: "Begin with CIS Controls IG1." Existing controls: "Enhance to reach ISO certification readiness." Mature team: "Industry leaders are implementing NIST CSF 2.0 Tier 4 practices."
_Novelty_: Current GRC tools treat all organisations the same. Evonix agents meet you where you are.

---

### M — Modify (5 ideas)

**[M1] Ecosystem-Scale Risk Sensing**
_Concept_: Modify SNOW's single-instance IRM model so Evonix agents sense risk across the organisational ecosystem — suppliers, partners, regulators, markets. External signals map into the internal governance chain with confidence and source citations.
_Novelty_: SNOW sees risk inside the instance. Evonix sees risk across the ecosystem.

**[M2] Dual-Cadence Governance: Continuous + Periodic with Agent Bridging**
_Concept_: Dual-cadence system — continuous layer (agents monitor events in real-time) and periodic layer (RCSA, quarterly reporting, 90-day plans). Agents bridge the two: when periodic assessment is due, it's 80% pre-populated with evidence-backed updates from the continuous layer. Periodic assessment becomes validation, not discovery.
_Novelty_: Evonix does both continuous and periodic — and agents make periodic assessments dramatically faster by surfacing everything that happened between cycles.

_Key insight from Mark: Regulators require periodic (annual RCSA), boards operate on quarters/90-day plans. Must support both dynamic and periodic cadences._

**[M3] Cadence-Adaptive Reporting with Inherited Intelligence**
_Concept_: Agents automatically aggregate and reformat governance intelligence for each cadence — real-time for SOC, weekly for 1L teams, monthly for 2L, quarterly for board, annual for regulators. Each report inherits intelligence from faster cadences below it.
_Novelty_: Current GRC tools require separate reporting runs. Evonix generates all cadences from a single living intelligence layer.

| Cadence | Who Needs It | Agent Contribution |
|---------|-------------|-------------------|
| Real-time | SOC, 1L operations | Event detection, immediate alerts |
| Weekly/Sprint | 1L teams | "What changed this sprint that affects your risk profile" |
| Monthly | 2L risk & compliance | Trend analysis, KRI movement, emerging patterns |
| Quarterly | Board, executives | Pre-built narrative, quarter-over-quarter risk movement |
| Annual | Regulators, RCSA | Pre-populated RCSA with full year of evidence |

**[M4] Pre-Populated Regulatory Assessments**
_Concept_: For regulatory-mandated periodic assessments (RCSA, SOX attestation), agents pre-populate with everything that's changed since the last cycle. The assessor's job shifts from "fill in the assessment" to "review, validate, and sign off."
_Novelty_: RCSA today is painful manual data-gathering. Evonix makes it a validation exercise where 80% of the work is done with full evidence trails.

**[M5] Multi-Resolution Risk Views**
_Concept_: Modify SNOW's flat entity-level risk model into a multi-resolution view. The same risk appears differently at process level, service level, business unit level, and enterprise level. Agents generate these views from the governance chain. 1L sees process resolution. Board sees enterprise resolution. Fully traceable between levels.
_Novelty_: SNOW shows risk at one level. Evonix shows the same risk at every level simultaneously.

---

### P — Put to Other Uses (5 ideas)

**[P1] GRC Architecture Repurposed for Strategic Execution Governance**
_Concept_: Use the Entity → Risk → Control → Monitoring pattern for strategic execution tracking. Board priorities become entities. Execution risks are articulated using the governance chain. Agents continuously monitor project/financial data for execution risk. Board gets unified view: operational risk AND strategic execution in one platform.
_Novelty_: GRC tools manage operational risk. Strategy tools manage execution. Evonix connects them through one governance architecture.

**[P2] IRM Architecture Repurposed for AI Model Governance**
_Concept_: Apply Entity → Risk → Control → Monitoring to AI model governance. Each AI model is an entity with EU AI Act classification. Risk statements map to AI-specific risks (bias, drift, hallucination). Controls map to AI governance controls. Same 3LOD, explainability, and challenge mechanisms.
_Novelty_: ServiceNow built AI Control Tower as a separate product. Evonix does it as a natural extension of the same GRC architecture.

**[P3] Assessment Architecture Repurposed for Third-Party Governance**
_Concept_: Apply assessment/attestation model to vendor management. Each vendor is an entity. Agent-challenged attestation applies. Governance chain maps vendor process risk through to corporate supply chain resilience priority. Agents detect vendor risk profile changes and trigger re-assessment.
_Novelty_: Vendor risk management treated as entities in the same governance architecture — same 3LOD, same explainability, same dual-cadence monitoring.

**[P4] Audit Lifecycle Repurposed for Regulatory Impact Response**
_Concept_: When a new regulation is ingested, trigger the same structured lifecycle as an audit engagement — agents scope affected entities, gather evidence, compare processes against new requirements, generate targeted questions, draft impact assessment report.
_Novelty_: Regulatory impact assessment becomes structured, agent-augmented, and repeatable using the same pattern as audit.

**[P5] KCI/KRI Pattern Repurposed for ESG Governance**
_Concept_: Apply KCI/KRI indicator model to ESG metrics (carbon, diversity, supply chain labour, privacy). The governance chain applies: ESG process data → ESG controls → ESG standards (GRI, SASB, TCFD) → ESG policy → corporate sustainability commitment.
_Novelty_: ESG governance unified into the same architecture as cyber, operational, and strategic risk.

**Meta-Insight: One Architecture, Six Domains**

| Domain | Entity Type | Risk Type | Framework | Monitoring |
|--------|-----------|-----------|-----------|------------|
| Operational GRC | IT assets, processes, locations | Operational, cyber, compliance | NIST, ISO, COBIT | ITSM + security data |
| Strategic Execution | Initiatives, projects | Execution, market, talent | Corporate strategy, OKRs | Project + financial data |
| AI Governance | AI models, agents | Bias, drift, safety | EU AI Act, NIST AI RMF, ISO 42001 | Model performance metrics |
| Third-Party Risk | Vendors, partners | Supply chain, concentration | SOC 2, ISO 27001, HKMA outsourcing | Vendor signals + attestations |
| Regulatory Change | Regulations, requirements | Compliance gaps | Jurisdiction-specific | Regulatory feeds |
| ESG | Sustainability factors | Environmental, social, governance | GRI, SASB, TCFD | ESG data sources |

---

## Session Progress (Paused)

**SCAMPER Progress:** Completed S, C, A, M, P — paused before E (Eliminate) and R (Reverse)
**Ideas Generated:** 36
**Resume Point:** Continue with E (Eliminate) — explore what to strip away from SNOW's model to make Evonix leaner and more powerful. Then R (Reverse). Then move to idea organisation.

### Key Breakthroughs So Far

1. **Bottom-Up Governance Traceability Chain** (A5) — Process Language → Controls → Control Objectives → Standards (HOW) → Policy (WHAT) → Corporate Context/Benchmark/Boardroom (WHY). Foundational architecture for Evonix.
2. **1L owns the risk landscape, 2L frames in industry frameworks** (A1, A8) — Clear 3LOD division of labour that eliminates the friction of forcing operational teams to think in framework language.
3. **Framework-embedded best practice recommendations at every chain level** (A9) — Agents don't just map; they recommend from frameworks, calibrated to maturity.
4. **Multi-source entity fabric with cross-source contradiction detection** (S1-S7) — Backed by NIST CA-7, ISO 27001 5.7, MITRE ATT&CK, COBIT APO12.
5. **Dual-cadence governance** (M2) — Continuous + periodic with agent bridging. Regulators get their RCSA; teams get real-time intelligence.
6. **One architecture, six domains** (P1-P5) — Same governance pattern applied to operational GRC, strategic execution, AI governance, third-party risk, regulatory change, and ESG.
