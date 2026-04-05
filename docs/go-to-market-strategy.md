# Evonix GRC — Go-to-Market Strategy

**Version:** 1.0
**Date:** 2026-03-30
**Tagline:** Give your risk team superpowers.

---

## The Strategic Pivot

### What We Learned

HSBC — a $200B bank with one of the most sophisticated GRC operations in the world — told us the truth: **they cannot contemplate replacing their legacy GRC stack.** The switching cost is measured in years and tens of millions of dollars. IBM OpenPages, Archer, ServiceNow — they're embedded. They're not going anywhere.

But they also told us something else: **they have an army of low-cost analysts in India whose entire job is manual non-financial risk reporting.** Hundreds of people reading documents, extracting risk data, categorising against taxonomies, and typing into spreadsheets. In 2026.

### The Insight

The problem isn't the GRC tool. The problem is **the manual work that no GRC tool was designed to automate** — reading documents, extracting governance and risk information, categorising it, and producing reports. Legacy tools are databases with workflows. They don't read. They don't reason. They don't write.

Evonix does.

### The New Positioning

**Old:** "Evonix is a next-generation GRC platform that replaces your legacy stack."

**New:** "Evonix is an AI intelligence layer that sits alongside your existing GRC — solving the problems your current tools can't touch. Starting with zero integration. Starting today."

We don't compete with OpenPages. We **complement** it. We do the things their tools were never designed to do.

---

## Target Use Cases (Priority Order)

### Use Case 1: Non-Financial Risk Reporting Automation

**The Problem:**
Banks spend $8-12M/year on manual non-financial risk (NFR) reporting. Hundreds of analysts in low-cost centres reading documents, extracting risk events, categorising against risk taxonomies, and producing reports for risk committees. The output is inconsistent (200 analysts = 200 interpretations), always late (manual process can't keep pace), sample-based (they can't read everything), and poorly auditable ("why was this categorised as operational risk?" — "because an analyst in Mumbai thought so").

**What Evonix Does:**
- Ingests the same documents the analysts read (regulatory filings, committee papers, board circulars, incident reports)
- Extracts risk events, control failures, regulatory exposures — with confidence scores and source references
- Categorises against the bank's *own* risk taxonomy (not a generic template)
- Maps to Basel III/IV non-financial risk categories
- Produces structured output ready for the risk register
- Generates narrative summaries for risk committees
- Creates a full audit trail — every extraction traceable to source text

**The Value:**
- Analysts shift from *reading and typing* to *reviewing and approving*
- Coverage: sample-based → exhaustive (every page, every document)
- Consistency: variable → deterministic (same taxonomy, every time)
- Speed: quarterly reporting → continuous
- Cost reduction: 70-80% even keeping the analyst team
- Audit quality: immutable trail vs manual notes

**Buyer:** Head of Non-Financial Risk, CRO, COO
**Revenue Model:** $300K-$500K/year per bank (vs $8-12M current cost)
**Integration:** Consumes PDFs + risk taxonomy config. Outputs structured data for existing risk register.
**Technical Lift:** 2-3 sprints to adapt current pipeline (same architecture, different extraction prompts)

---

### Use Case 2: Annual Report Say-Do Analysis

**The Problem:**
Companies spend months producing annual reports that describe their governance posture. But nobody systematically reads those reports to check whether the governance posture is actually reflected in operational controls. The annual report is the most carefully crafted governance document a company produces — and it's almost entirely unused for actual governance.

**What Evonix Does:**
- Ingests the annual report (PDF upload, no integration)
- Extracts governance objectives and risk appetite statements
- Derives control objectives that *should* exist to back those commitments
- Performs gap analysis against ISO 27001, NIST, COSO, HKMA, MAS
- Generates policy drafts for identified gaps
- Produces a full audit trail

**The Question We Ask:**
*"You told the market this is your governance posture — do you actually have the controls to back it up?"*

**The Value:**
- Board assurance before publishing annual reports
- Audit readiness — the control mapping auditors expect, auto-generated
- Regulatory credibility — proactive compliance posture
- Proven: 852 pages, 290 controls, under 2 hours across 5 real companies

**Buyer:** Company Secretary, General Counsel, Head of Compliance
**Revenue Model:** Per-analysis or annual subscription ($50K-$150K/year)
**Integration:** Zero. Upload a PDF from investor relations. No system access needed.
**Technical Lift:** Already built and proven.

---

### Use Case 3: Board Reporting / Executive Narrative Generation

**The Problem:**
Every CISO and CRO spends 2-3 weeks before each board meeting manually compiling risk data and writing the narrative. They pull from risk registers, control testing results, incident data, and regulatory updates — then craft a 20-page board paper that tells the story. It's the most senior, most expensive people in the risk function doing document assembly.

**What Evonix Does:**
- Ingests risk data (from existing risk register, incident reports, regulatory updates)
- Generates an AI executive narrative with structured sections
- Includes citations, confidence scores, and trend analysis
- Produces board-ready format in under 60 seconds
- Maintains version history and audit trail

**The Value:**
- 2-3 weeks of CISO/CRO time → 60 seconds
- Consistent format and quality every quarter
- Data-driven narrative with citations (not opinion-based)
- Frees senior leadership to focus on risk decisions, not document assembly

**Buyer:** CISO, CRO, Board Risk Committee Secretary
**Revenue Model:** $100K-$200K/year (valued against senior executive time)
**Integration:** Light — consumes export from existing risk register
**Technical Lift:** 1-2 sprints (narrative generation layer on top of extraction pipeline)

---

### Use Case 4: Regulatory Change Impact Assessment

**The Problem:**
When a new regulation is published (HKMA circular, MAS notice, EU AI Act amendment), the compliance team must assess: what does this mean for us? Which controls are affected? Where are we exposed? This takes weeks of manual analysis. By the time they've assessed the impact, the next regulation has arrived.

**What Evonix Does:**
- Ingests new regulatory text
- Cross-references against the organisation's existing governance commitments and control framework
- Identifies gaps, affected controls, and required actions
- Prioritises by impact and urgency
- Generates impact assessment report

**The Value:**
- Weeks of manual assessment → hours
- First-mover advantage on regulatory response
- Continuous monitoring instead of periodic review
- Regulatory radar — never caught off guard

**Buyer:** Head of Compliance, Regulatory Affairs
**Revenue Model:** $150K-$300K/year (continuous monitoring subscription)
**Integration:** Moderate — requires regulatory feed + existing framework mapping
**Technical Lift:** Phase 5 capability (regulatory feed integration)

---

## Go-to-Market Motion

### Land Strategy: Zero Friction

```
Step 1: "Let us run your annual report. Free. No integration. 37 minutes."
Step 2: Show them what they're missing — gaps, controls, policy drafts
Step 3: "Now imagine this running on every document your NFR team reads"
```

**Why this works:**
- No procurement cycle — it's a free analysis of a public document
- No IT involvement — upload a PDF, get results
- No data privacy concerns — public annual reports only
- Trial in an afternoon, not a quarter
- Creates undeniable proof of value before any commercial conversation

### AI Governance as a Service

A critical differentiator: **we don't just deliver technology — we help banks navigate their own AI governance requirements.**

Every bank deploying AI must satisfy internal AI governance frameworks, model risk management functions, and regulatory requirements (EU AI Act, HKMA, PRA SS1/23, Fed SR 11-7). Most AI vendors leave this to the buyer. Evonix includes it in the engagement:

| Deliverable | What It Covers | Value |
|---|---|---|
| **AI Governance Alignment Report** | Maps Evonix against the bank's internal Responsible AI policy, model risk requirements, and vendor AI assessment criteria | Removes the #1 internal blocker — the AI Risk Committee |
| **Vendor AI Assessment Pre-Completion** | Pre-completes the bank's third-party AI risk questionnaire | Saves 2-3 months of procurement back-and-forth |
| **Forensic Audit Trail** | Tamper-evident logging of every AI decision — prompt, response, confidence, source, human review status | EU AI Act Article 12 compliant. More transparent than manual process. |
| **Regulatory Mapping** | Explicit mapping to EU AI Act (Arts 9, 12, 14), HKMA, PRA, Fed as applicable | De-risks the compliance conversation |

**Positioning:** *"We don't just pass your AI governance assessment — we help you build the case internally. Your Head of NFR shouldn't have to fight the AI Risk Committee alone."*

This consulting layer adds $20-30K of perceived value to the engagement while costing minimal incremental effort — the documentation is standardised and reusable across clients.

### Expand Strategy: From Public to Internal

```
Month 1: Say-Do Analysis on public documents (Use Case 2) — free pilot
Month 2: NFR Reporting pilot on 1 document type (Use Case 1) — paid POC + AI governance alignment
Month 3: Expand NFR to full document portfolio — annual contract
Month 6: Board Reporting integration (Use Case 3) — upsell
Month 9: Regulatory Change monitoring (Use Case 4) — platform expansion
```

### Pricing Architecture

| Use Case | Model | Price Range | Anchor Cost |
|----------|-------|-------------|-------------|
| NFR Reporting | Annual subscription | $300K-$500K/year | vs $8-12M manual cost |
| Say-Do Analysis | Per-analysis or annual | $50K-$150K/year | vs $27K-$61K per document (consultants) |
| Board Reporting | Annual subscription | $100K-$200K/year | vs 6-8 weeks of CISO/CRO time per year |
| Regulatory Change | Annual subscription | $150K-$300K/year | vs dedicated regulatory affairs team |
| **Total per bank** | | **$600K-$1.15M/year** | **vs $10-15M current cost** |

---

## Market Sizing

### Non-Financial Risk Reporting (Primary Wedge)

| Segment | # Banks | Avg NFR Spend | Evonix Revenue/Bank | Segment TAM |
|---------|---------|---------------|---------------------|-------------|
| G-SIBs (Global Systemically Important) | 30 | $10-15M/year | $500K/year | $15M |
| Large Regional Banks | 100 | $5-8M/year | $350K/year | $35M |
| Mid-Market Banks | 500 | $2-4M/year | $200K/year | $100M |
| Insurance / Asset Mgmt | 200 | $3-6M/year | $250K/year | $50M |
| **Total Addressable** | **830** | | | **$200M** |

### Financial Crime & AML (New Market)

Global financial crime compliance spend: **$206.1B/year** (LexisNexis, 2023) / **$270B** (Deloitte, 2024).

| Segment | # Institutions | Evonix Revenue/Institution | Segment TAM |
|---------|---------------|---------------------------|-------------|
| G-SIBs | 30 | $800K/year | $24M |
| Large Regional Banks | 100 | $500K/year | $50M |
| Mid-Market Banks | 500 | $300K/year | $150M |
| Payment / FinTech firms | 500 | $200K/year | $100M |
| Insurance / Asset Mgmt | 200 | $300K/year | $60M |
| **FinCrime Subtotal** | **1,330** | | **$384M** |

### Full Platform (All 5 Use Cases + FinCrime)

| Market | TAM |
|--------|-----|
| NFR Reporting + GRC use cases | $310M-$615M |
| Financial Crime & AML | $384M |
| **Total Addressable Market** | **~$1B** |

---

## Use Case 5: Financial Crime & AML Intelligence

**The Problem:**
FinCrime compliance teams drown in transaction monitoring alerts (99%+ false positive rates), manually review SARs, and struggle to connect patterns across KYC, sanctions screening, and incident data. Legacy FinCrime tools (Actimize, Mantas, Norkom) generate alerts but don't reason about them. They don't cross-reference a SAR with a control test with a KYC review and find the gap.

**What Evonix Does:**
- Ingests SARs, transaction monitoring alerts, KYC files, sanctions screening results, AML risk assessments, regulatory examination reports, correspondent banking due diligence
- Cross-references across all FinCrime data sources to surface connections humans miss
- Identifies patterns: alert disposition quality trends, SAR-to-alert connections, sanctions risk trajectory
- Generates MLRO reports with citations and evidence trails

**Key Scenarios:**
- SAR filed on a customer whose TM alert was dismissed as false positive 2 months earlier
- Sanctions risk trending up (167% QoQ true match increase) while AML risk assessment rates it "Low"
- False positive rate climbing from 98.2% to 99.1% over 12 months — 28,000 alerts to find 252 real ones — while remediation project stalls for 270 days

**Buyer:** MLRO, Head of Financial Crime, CCO
**Revenue Model:** $300K-$500K/year per institution
**Integration:** CSV/Excel upload from existing TM and case management systems

---

## The Cross-Reference — The Moat

The single most powerful capability Evonix has is **cross-referencing across input types**. No single document, report, or data source tells the full story. The intelligence layer connects them.

**Evonix reads 26 input types across 6 categories:**

| Category | Count | Core Question |
|----------|-------|---------------|
| Governance Declarations | 3 | What did they SAY? |
| Control Environment | 5 | What did they DO? |
| Risk Landscape | 5 | What is HAPPENING? |
| Adversarial Testing | 3 | What were they TESTED against? |
| Regulatory Obligations | 3 | What must they REPORT? |
| Financial Crime & AML | 7 | What are they MISSING? |

**Example:** The annual report says "robust access controls." Control testing says MFA is "Effective." But Red Team bypassed MFA on the trading platform — because control testing and Red Team tested different scopes. No single document reveals this. Only the cross-reference does.

Full architecture and 7 detailed scenarios: [docs/product-vision-architecture.md](./product-vision-architecture.md)

---

## Competitive Positioning — Updated

### We Don't Compete With Legacy GRC or Legacy FinCrime

| | Legacy GRC | Legacy FinCrime | Evonix |
|---|---|---|---|
| **What it is** | Database + workflow | Detection engine | AI intelligence layer |
| **What it reads** | Nothing | Transaction data | Everything — 26 input types |
| **What it reasons about** | Nothing | Alert rules | Context, adequacy, connections |
| **Cross-references** | Manual | Within FinCrime only | Across all 6 categories |
| **Narrative generation** | Manual (2-3 weeks) | Manual | AI (60 seconds) |
| **Integration** | 12-18 months | 6-12 months | Zero to start |
| **Cost to try** | $2M+ implementation | $1M+ | Free (public document) |

### The New Category

Evonix creates a new category: **AI-Powered Risk Intelligence.** Not a GRC platform. Not a FinCrime tool. An intelligence layer that reads what humans cannot keep up with, cross-references what no single system can connect, and produces what takes weeks in minutes.

**26 input types. 6 output views. One intelligence engine. The cross-reference is the moat.**

---

## Investor Narrative — Updated

*"Banks spend $270 billion per year on compliance. $206 billion of that is financial crime alone. Their GRC tools are databases. Their FinCrime tools are alert engines. Neither can read a document. Neither can reason about whether a control is adequate. Neither can connect a SAR filed in March to a transaction monitoring alert dismissed in January to a KYC review that's 18 months overdue.*

*Evonix is an AI intelligence layer that reads 26 types of risk documents — from annual reports to Red Team findings to transaction monitoring alerts. It cross-references everything. It surfaces the insights that no manual process and no legacy tool can find.*

*We've proven it works. 852 pages. 290 controls derived. Under 2 hours. Less than $2 per document. And we're just getting started — the same engine that reads annual reports reads SARs, control test results, audit findings, and regulatory filings.*

*We're not asking banks to replace their GRC stack. We're solving the problems it was never designed to solve. The annual report is the wedge. The cross-reference intelligence layer is the moat. The $1 billion market is the destination."*

**Give your risk team superpowers.**
