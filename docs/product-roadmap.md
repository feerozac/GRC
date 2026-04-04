# Evonix GRC — Product Roadmap

**Tagline:** Give your risk team superpowers.

**Last Updated:** 2026-03-30

---

## Vision

Evonix is an AI intelligence layer that sits alongside existing GRC stacks — solving the problems legacy tools were never designed to solve. We don't replace IBM OpenPages, Archer, or ServiceNow. We complement them. We read what they can't read, reason about what rules can't capture, and produce what takes weeks in minutes.

Built on organisation context, powered by adversarial AI agents bound to each line of defence, and running on a continuous heartbeat of risk and control assurance.

---

## Strategic Context

### The Insight (from HSBC)

Banks cannot contemplate replacing their legacy GRC stack. The switching cost is years and tens of millions. But they spend $8-12M/year on armies of analysts in low-cost centres doing manual document processing for non-financial risk reporting — work their GRC tools were never designed to automate.

### Positioning

**We don't compete with legacy GRC. We solve what legacy can't.**

| | Legacy GRC (IBM, Archer, ServiceNow) | Evonix |
|---|---|---|
| **What it is** | Database + workflow engine | AI intelligence layer |
| **What it reads** | Nothing — humans enter data | Documents, filings, reports |
| **What it reasons about** | Nothing — deterministic rules | Context, adequacy, proportionality |
| **Integration required** | 12-18 months | Zero (PDF upload) to light |
| **Cost to try** | $2M+ implementation | Free (public document analysis) |

---

## Prioritised Use Cases

| # | Use Case | Status | Revenue/Bank | JIRA |
|---|----------|--------|-------------|------|
| 1 | **NFR Reporting Automation** | Next | $300K-$500K/yr | [EVX-50](https://sydsoft.atlassian.net/browse/EVX-50) |
| 2 | **Annual Report Say-Do Analysis** | Proven | $50K-$150K/yr | [EVX-51](https://sydsoft.atlassian.net/browse/EVX-51) |
| 3 | **Board Reporting / Exec Narrative** | Planned | $100K-$200K/yr | [EVX-52](https://sydsoft.atlassian.net/browse/EVX-52) |
| 4 | **Regulatory Change Impact** | Future | $150K-$300K/yr | [EVX-53](https://sydsoft.atlassian.net/browse/EVX-53) |
| 5 | **Financial Crime & AML Intelligence** | Future | $300K-$500K/yr | EVX-65 |
| | **Total per bank** | | **$900K-$1.65M/yr** | |

**Full GTM strategy:** [docs/go-to-market-strategy.md](./go-to-market-strategy.md)
**Full architecture:** [docs/product-vision-architecture.md](./product-vision-architecture.md)

---

## Intelligence Layer Architecture

### The Core Idea

One engine. Multiple lenses. The cross-reference is the moat.

The annual report proves we can read. The dashboard proves we can think.

### Input Taxonomy — 26 Types Across 6 Categories

| Category | Count | Core Question | Examples |
|----------|-------|---------------|----------|
| 1. Governance Declarations | 3 | What did they SAY? | Annual reports, board papers, risk appetite |
| 2. Control Environment | 5 | What did they DO? | Control tests, assurance, audits, baseline reviews |
| 3. Risk Landscape | 5 | What is HAPPENING? | Risk register, incidents, near misses, issues, emerging risks |
| 4. Adversarial Testing | 3 | What were they TESTED against? | Red team, pen tests, stress tests |
| 5. Regulatory Obligations | 3 | What must they REPORT? | Templates, circulars, framework standards |
| 6. Financial Crime & AML | 7 | What are they MISSING? | SARs, TM alerts, KYC, sanctions, AML risk assessment |
| **Total** | **26** | | |

### Output Views — 6 Lenses on the Same Data

| Output View | Primary User | Core Question |
|-------------|-------------|---------------|
| Risk Dashboard | CRO | "What's my risk posture?" |
| Control Status | NFR team | "Which controls are failing?" |
| Board Narrative | CISO / CRO | "Write me the board paper" |
| Regulatory Return | Regulatory team | "Am I ready for the filing?" |
| Gap Analysis | Audit / Assurance | "Are we doing what we said?" |
| FinCrime Intelligence | MLRO | "What are we missing?" |

### The Cross-Reference — Why This Matters

No single input tells the full story. The intelligence layer connects them all. See [product-vision-architecture.md](./product-vision-architecture.md) for 7 detailed cross-reference scenarios including:

- Red Team bypassed MFA — but control testing said "Effective"
- Two near misses predicted the Q3 incident
- SAR filed on a customer whose alert was dismissed as false positive 2 months earlier
- Alert fatigue: false positive rate climbed from 98.2% to 99.1% while remediation stalled for 270 days

### POC Pivot

**Old:** "Upload an annual report, get a governance gap analysis in 37 minutes."

**New:** "Here's your risk posture. 200 controls. 87% effective. 12 failures this quarter. 4 cross-reference insights you missed. Board paper? 60 seconds."

| Sprint | Inputs Added | Cross-References Unlocked |
|--------|-------------|--------------------------|
| Done | Annual Reports | Say-Do analysis (proven) |
| Sprint 1 | Control Tests, Issues Log | Say vs Do gap, issue ageing |
| Sprint 2 | Risk Register, Near Misses, Incidents | Pattern detection, predictive insights |
| Sprint 3 | Red Team, Audit Reports | Scope mismatches, adversarial vs operational |
| Sprint 4 | SARs, TM Alerts, KYC, Sanctions | Alert quality, SAR connections, sanctions trends |
| Sprint 5 | Emerging Risks, Reg Circulars, Templates | Full lifecycle, regulatory readiness |

---

## Roadmap Overview

```
Phase 1 ──► Phase 2 ──► Phase 3 ──► Phase 4 ──► Phase 5
  NOW      NEXT         FUTURE      FUTURE      VISION

Annual     3LoD Agent   Risk        Control     Continuous
Report     Separation   Architecture Library &   Monitoring &
Ingestion  & Adversarial Ingestion   RCSA        The Heartbeat
           Dynamics
```

### Land-and-Expand Path

```
Day 1:    Upload annual report → governance map in 37 minutes (zero integration)
Month 1:  Connect internal policies → continuous gap monitoring
Month 3:  Connect regulatory feeds → real-time compliance posture
Month 6:  Full 3LoD platform with challenge flows, approvals, evidence repository
```

---

## Information Architecture (4 Tiers)

| Tier | What | Source Documents | Phase |
|------|------|-----------------|-------|
| **1. Organisation Context** | What the board committed to | Annual reports, board circulars, strategy documents | Phase 1 |
| **2. Risk Architecture** | How risk is structured and scored | ERMF, risk matrix, ORMF, risk taxonomy | Phase 3 |
| **3. Control Architecture** | What controls exist and how they operate | Control library, policies, procedures, RCSAs | Phase 4 |
| **4. Evidence & Monitoring** | What's actually happening | Incident data, KRI/KCI trends, audit findings, regulatory feeds | Phase 5 |

---

## Phase 1: Annual Report Ingestion & Governance Extraction

**JIRA:** [EVX-44](https://sydsoft.atlassian.net/browse/EVX-44)
**Status:** In Progress — core pipeline operational
**Timeline:** Current

### What It Does

Single-agent pipeline: ingest PDF → extract governance objectives → extract risk appetite → derive controls → gap analysis → policy drafts. Full audit trail.

### Key Results

| Document | Pages | Time | Objectives | Controls | Gaps | Drafts |
|----------|-------|------|------------|----------|------|--------|
| HSBC AR 2025 | ~400 | ~15 min | 19 | 105 | 10 | 7 |
| NVIDIA 10-K 2025 | ~100 | ~30 min | 14 | 76 | 9 | 9 |
| Samsung AR 2024 | ~80 | ~19 min | 4 | 25 | 10 | 10 |
| Berkshire 10-K 2024 | ~272 | ~37 min | 17 | 84 | 10 | 10 |
| **Total** | **~852** | **~101 min** | **54** | **290** | **39** | **36** |

Manual equivalent: ~6 months of analyst work. Cost: $27K–$61K per document. Evonix: <$2.

### Remaining Work

- Pipeline performance optimisation (parallel execution)
- Progress bar / real-time status UX
- Error handling hardening
- Additional document type testing

---

## Phase 2: 3LoD Agent Separation & Adversarial Dynamics

**JIRA:** [EVX-45](https://sydsoft.atlassian.net/browse/EVX-45)
**Status:** Planning
**Depends on:** Phase 1 complete

### The Core Idea

Decompose the monolithic pipeline into three distinct AI agents, each with a BMAD-style persona definition: identity, principles, communication style, and boundaries they don't cross.

### Why Agents ≠ Processes

| | Process | Agent |
|---|---|---|
| **Input → Output** | Deterministic, same every time | Contextual, adapts to organisation |
| **Judgment** | None — follows rules | Reasons about adequacy and sufficiency |
| **Challenge** | Can't challenge — just executes | Can disagree, explain why, escalate |
| **Learning** | Static until rules are updated | Incorporates new context each run |
| **Accountability** | "The system flagged this" | "The 2LoD agent challenged this because..." |

### Agent Definitions

**1LoD — Extraction Agent:**
- Mandate: Extract what the board committed to — binding obligations, not aspirational language
- Principles: Extract only what the document states. Source reference + confidence score for everything. Never cross into challenge or assurance.
- Boundary: Does not perform gap analysis against external frameworks

**2LoD — Challenge Agent:**
- Mandate: Challenge 1LoD's work using regulatory frameworks and industry standards
- Principles: Assess correctness and completeness. Challenge adequacy and proportionality against stated risk appetite.
- Boundary: Does not own or execute controls

**3LoD — Assurance Agent:**
- Mandate: Test control effectiveness — design and operational
- Principles: Establish evidence. Clear pass/fail criteria. Generate assurance reports.
- Boundary: Does not design or remediate controls

### MVP Validation

Run current pipeline → run standalone 2LoD challenge agent against outputs → compare. Did the adversarial agent find anything the monolithic pipeline missed?

---

## Phase 3: Risk Architecture Ingestion

**JIRA:** [EVX-46](https://sydsoft.atlassian.net/browse/EVX-46)
**Status:** Future
**Depends on:** Phase 2

### New Document Types

- **ERMF** — risk taxonomy, risk categories, escalation thresholds
- **Risk Matrix** — likelihood × impact scoring, tolerance bands
- **ORMF** — operational risk categories, loss event types, KRI definitions

### What It Unlocks

The 3LoD agents move from reasoning about a single document to reasoning about the full risk landscape:

- 1LoD maps extracted objectives to the existing risk taxonomy
- 2LoD challenges whether controls are proportionate to the risk level using the risk matrix
- Gap analysis becomes: "Your ERMF says AI risk is HIGH/HIGH, but your controls are only detective — your risk matrix demands preventive controls at this level"

---

## Phase 4: Control Library & RCSA Ingestion

**JIRA:** [EVX-47](https://sydsoft.atlassian.net/browse/EVX-47)
**Status:** Future
**Depends on:** Phase 3

### New Data Types

- **Existing control library** — current controls, ownership, frequency, type
- **Internal policies & procedures** — how controls are executed
- **RCSAs** — control owners' self-assessments
- **Incident data & loss events** — historical operational risk events

### What It Unlocks

- 3LoD agent has real evidence to test against
- Say-do analysis becomes multi-layered: annual report says X, ERMF says Y, control library shows Z — where are the disconnects?
- RCSA challenge: "Control owner rated this as effective, but incident data shows 3 failures last quarter"

---

## Phase 5: Continuous Monitoring & The Heartbeat

**JIRA:** [EVX-48](https://sydsoft.atlassian.net/browse/EVX-48)
**Status:** Vision
**Depends on:** Phases 1-4

### The Heartbeat Cycle

```
Ingest → Analyse → Challenge → Assure → (loop)
  1LoD      1LoD      2LoD       3LoD
```

**Traditional GRC:** Annual RCSA cycle. Quarterly control testing. Point-in-time assurance.
**Evonix:** Always on. Always current. Every cycle produces an updated governance posture with audit trail.

### New Capabilities

- **Real-time regulatory feeds** — HKMA, MAS, EU AI Act, FCA, PRA. Gap analysis within 24 hours of new regulation.
- **Continuous document monitoring** — auto-ingest new reports, detect year-on-year governance posture drift.
- **KRI/KCI trend monitoring** — threshold breach alerting, predictive control failure detection.
- **Multi-modal input** — PDFs, board presentations, audio recordings, verbal briefings.
- **Executive narrative generation** — board reports in under 60 seconds.

### What It Unlocks

- "How has our risk posture changed since last quarter?" — answered in seconds
- "HKMA issued new guidance yesterday. What's our exposure?" — gap analysis in minutes
- "Prepare a board report on our top 10 risks" — generated in 60 seconds
- Competitive benchmarking: run peers' annual reports and compare governance posture

---

## Strategic Moat

Phase 1 is the **wedge** — zero integration, upload a PDF, get a governance map.

Phase 5 is the **destination** — continuous, always-on governance with adversarial 3LoD agents.

The annual report is the entry point. NFR Reporting is the beachhead. The continuous intelligence layer is the moat.

No legacy GRC vendor can do this because:
- They are **databases with workflows** — they don't read, reason, or write
- Evonix starts from **organisation context** — the board's own words, commitments, and risk disclosures
- Agents have **philosophy-bound reasoning** — not rule-based matching
- The adversarial dynamic is **structural** — cascaded from the top of the organisation, not ad hoc
- Every AI decision is **explainable** — rationale, sources, confidence scores, full audit trail
- **Zero integration to start** — no procurement cycle, no IT involvement, prove value in an afternoon

### Land-and-Expand Commercial Motion

| Milestone | What Happens | Revenue |
|-----------|-------------|---------|
| Day 1 | Run annual report — free, no integration, 37 min | $0 (proof of value) |
| Month 1 | NFR Reporting pilot — 1 document type | Paid POC |
| Month 3 | Full NFR portfolio — annual contract | $300K-$500K/yr |
| Month 6 | Board Reporting — upsell | +$100K-$200K/yr |
| Month 9 | Regulatory Change — platform expansion | +$150K-$300K/yr |

### Market Sizing — Updated with FinCrime

| Market | TAM |
|--------|-----|
| NFR Reporting + GRC use cases (830 institutions) | $200M-$615M |
| Financial Crime & AML (1,330 institutions) | $384M |
| **Total Addressable Market** | **~$1B** |

Global financial crime compliance spend alone: **$206B/year** (LexisNexis, 2023).

Full cost analysis: [docs/cost-analysis-nfr-reporting.md](./cost-analysis-nfr-reporting.md)

**Give your risk team superpowers.**
