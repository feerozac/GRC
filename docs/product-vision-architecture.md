# Evonix GRC — Product Vision: Intelligence Layer Architecture

**Version:** 1.0
**Date:** 2026-03-30
**Tagline:** Give your risk team superpowers.

---

## The Core Idea

Evonix is an AI intelligence layer that reads everything a risk function produces and consumes, cross-references it all, and surfaces the insights that no manual process — and no legacy GRC tool — can find.

**One engine. Multiple lenses. The cross-reference is the moat.**

The annual report proves we can read. The dashboard proves we can think.

---

## Architecture Overview

```
GOVERNANCE          CONTROL              RISK               ADVERSARIAL        REGULATORY         FINCRIME
DECLARATIONS        ENVIRONMENT          LANDSCAPE           TESTING            OBLIGATIONS        & AML
─────────────      ─────────────        ─────────────       ─────────────      ─────────────     ─────────────
Annual Reports     Control Tests        Risk Register       Red Team Reports   Reg Templates     SARs
Board Papers       Assurance Testing    Incidents           Pen Tests          Reg Circulars     TM Alerts
Risk Appetite      Baseline Reviews     Near Misses         Stress Tests       Framework Stds    KYC/CDD
                   Audit Reports        Issues Log                                               Sanctions
                                        Emerging Risks                                           AML Risk Asmt
                                                                                                 Exam Reports
                                                                                                 Correspondent
      │                  │                   │                    │                  │                 │
      └──────────────────┴───────────────────┴────────────────────┴──────────────────┴─────────────────┘
                                             │
                                             ▼
                                   ┌─────────────────────┐
                                   │     EVONIX AI        │
                                   │     INTELLIGENCE     │
                                   │     LAYER            │
                                   │                      │
                                   │  1. Ingest           │
                                   │  2. Extract (per     │
                                   │     type-specific    │
                                   │     prompt)          │
                                   │  3. Cross-reference  │
                                   │  4. Reason & report  │
                                   └──────────┬───────────┘
                                              │
                     ┌────────────────────────┼────────────────────────┐
                     │              │         │          │             │
                     ▼              ▼         ▼          ▼             ▼
              Risk Dashboard  Control   Board       Regulatory   FinCrime
                              Status    Narrative   Return       Intelligence
                                                    Gap Analysis
```

### How It Works

The pipeline is the same pattern for every input type:

1. **Ingest** — Accept the document or data (PDF, CSV, Excel, structured data)
2. **Extract** — Run a type-specific LLM prompt to pull structured data from the input
3. **Cross-reference** — Compare extracted data against everything else in the system
4. **Report** — Surface findings through the appropriate output view

What changes per input type is the extraction prompt and the output schema. The AI reasoning layer is identical. We are not building 26 products — we are building one intelligence layer with 26 input parsers.

---

## Input Taxonomy — The Full Risk Information Diet

### Category 1: Governance Declarations

*Source of truth for commitments, strategy, risk appetite — what the organisation said.*

| # | Input | Format | What the AI Extracts | Frequency |
|---|-------|--------|---------------------|-----------|
| 1 | Annual Reports | PDF | Governance objectives, risk appetite statements, strategic commitments | Annual |
| 2 | Board Papers / Circulars | PDF/DOCX | Board decisions, risk appetite changes, strategic direction shifts | Quarterly |
| 3 | Risk Appetite Statements | PDF/DOCX | Quantitative thresholds, qualitative boundaries, tolerance levels | Annual (quarterly review) |

### Category 2: Control Environment

*Evidence of whether controls exist and are operating — what the organisation does.*

| # | Input | Format | What the AI Extracts | Frequency |
|---|-------|--------|---------------------|-----------|
| 4 | Control Test Reports | CSV/Excel/PDF | Pass/fail/partial results, exceptions, trends | Quarterly |
| 5 | Control Assurance Testing | PDF/Excel | Design effectiveness, operating effectiveness, sample results | Quarterly/Annual |
| 6 | Control Baseline Reviews | PDF/Excel | Control inventory changes, new/retired controls, ownership changes | Annual |
| 7 | Internal Audit Reports | PDF | Findings, ratings, management actions, deadlines, repeat findings | Continuous |
| 8 | External Audit Reports | PDF | Material weaknesses, significant deficiencies, management letter points | Annual |

### Category 3: Risk Landscape

*The actual risk events, near misses, and emerging threats — what is happening.*

| # | Input | Format | What the AI Extracts | Frequency |
|---|-------|--------|---------------------|-----------|
| 9 | Risk Register Data | CSV/Excel | Risk scores, categories, owners, control mappings, residual ratings | Continuous |
| 10 | Incident / Loss Events | CSV/Excel | Event type, root cause, impact, affected controls, remediation status | Continuous |
| 11 | Near Misses | CSV/Excel/PDF | What almost went wrong, contributing factors, control gaps exposed | Continuous |
| 12 | Issues Log | CSV/Excel | Open issues, severity, owner, due dates, ageing, linked risks | Continuous |
| 13 | Emerging Risks | PDF/DOCX | New risk themes, horizon scanning, industry trends, threat intelligence | Quarterly |

### Category 4: Adversarial Testing

*External and internal challenge to the control environment — what they are tested against.*

| # | Input | Format | What the AI Extracts | Frequency |
|---|-------|--------|---------------------|-----------|
| 14 | Red Team Reports | PDF | Attack vectors tested, vulnerabilities found, controls bypassed, remediation recommendations | Quarterly/Annual |
| 15 | Penetration Test Reports | PDF | Technical findings, severity ratings, affected systems, remediation priority | Quarterly |
| 16 | Scenario Analysis / Stress Tests | PDF/Excel | Scenario parameters, impact estimates, control adequacy under stress | Annual |

### Category 5: Regulatory Obligations

*The external requirements and reporting frameworks — what they must report.*

| # | Input | Format | What the AI Extracts | Frequency |
|---|-------|--------|---------------------|-----------|
| 17 | Regulatory Templates | Structured | Required disclosures, data fields, narrative sections | Periodic |
| 18 | Regulatory Circulars / Notices | PDF | New requirements, deadlines, affected controls, gap analysis | Continuous |
| 19 | Framework Standards | PDF | ISO 27001, NIST, COSO, Basel requirements, control mappings | Reference |

### Category 6: Financial Crime & AML

*Transaction monitoring, customer due diligence, and suspicious activity — the FinCrime lifecycle.*

| # | Input | Format | What the AI Extracts | Frequency |
|---|-------|--------|---------------------|-----------|
| 20 | Suspicious Activity Reports (SARs) | PDF/Structured | Typology, entities involved, transaction patterns, narrative, filing status | Continuous |
| 21 | Transaction Monitoring Alerts | CSV/Excel | Alert ID, rule triggered, customer, transaction details, disposition (TP/FP), investigation notes | Continuous |
| 22 | KYC / Customer Due Diligence | PDF/Structured | Customer risk rating, PEP status, UBO structure, source of wealth, screening results | Continuous |
| 23 | Sanctions Screening Results | CSV/Excel | Hits, false positives, true matches, escalations, regulatory list matched | Continuous |
| 24 | AML Risk Assessment | PDF/Excel | Country risk, product risk, customer risk, channel risk, residual ratings | Annual |
| 25 | Regulatory Examination Reports (FinCrime) | PDF | Examiner findings, MRAs, cease & desist items, deadlines | Periodic |
| 26 | Correspondent Banking Due Diligence | PDF | Respondent bank risk rating, jurisdiction risk, control environment assessment | Annual |

### Summary

| Category | Input Count | Core Question |
|----------|-------------|---------------|
| 1. Governance Declarations | 3 | What did they SAY? |
| 2. Control Environment | 5 | What did they DO? |
| 3. Risk Landscape | 5 | What is HAPPENING? |
| 4. Adversarial Testing | 3 | What were they TESTED against? |
| 5. Regulatory Obligations | 3 | What must they REPORT? |
| 6. Financial Crime & AML | 7 | What are they MISSING? |
| **Total** | **26** | |

---

## Output Views — The GRC Command Centre

| # | Output View | Primary User | Core Question | Key Components |
|---|-------------|-------------|---------------|----------------|
| 1 | **Risk Dashboard** | CRO | "What's my risk posture?" | Top risks with trends, control effectiveness %, gap count, AI insights |
| 2 | **Control Status** | NFR team | "Which controls are failing?" | Per-control pass/fail history, trend, linked risks, drill-down AI analysis |
| 3 | **Board Narrative** | CISO / CRO | "Write me the board paper" | AI-generated executive report, citations, split-pane evidence view |
| 4 | **Regulatory Return** | Regulatory team | "Am I ready for the filing?" | Pre-filled template, gaps highlighted, supporting narrative |
| 5 | **Gap Analysis** | Audit / Assurance | "Are we doing what we said?" | Say-vs-do cross-reference, framework mapping, policy drafts |
| 6 | **FinCrime Intelligence** | MLRO / Head of Financial Crime | "What are we missing?" | SAR trends, alert disposition quality, sanctions effectiveness, connection maps |

### User Question Mapping

| User Question | Output View | Inputs Required |
|---|---|---|
| "What's my risk posture?" | Risk Dashboard | All categories |
| "Which controls are failing?" | Control Status | Control Tests + Risk Register |
| "Write me the board paper" | Board Narrative | All categories |
| "Am I ready for the HKMA return?" | Regulatory Return | Risk Register + Regulatory Template |
| "Are we doing what we said?" | Gap Analysis | Annual Report + Control Tests |
| "What are we missing in FinCrime?" | FinCrime Intelligence | SARs + TM Alerts + KYC + Sanctions |

---

## Cross-Reference Scenarios — Where Evonix Becomes Indispensable

No single input tells the full story. The intelligence layer connects them all. These scenarios demonstrate insights that are impossible without automated cross-referencing across multiple input types.

---

### Scenario 1: Red Team Bypassed MFA — But Control Testing Said "Effective"

**Inputs cross-referenced:**
- Red Team Report
- Control Test Report
- Annual Report

**The story:**

The Red Team Report says they bypassed the MFA control on the trading platform. The Control Test Report says the MFA control is "Effective" — because they tested a different scope (corporate systems, not trading). The Annual Report tells the market: "We have robust access controls across all critical systems."

**AI finding:**

> *"Say-do gap detected. The board declared robust access controls across all critical systems (Annual Report, p.47). Control testing confirmed MFA as Effective (Q3 Control Test, ref CT-2847). However, the Red Team bypassed MFA on the trading platform (Red Team Report, finding RT-12). The control test scope did not include trading systems — the test and the Red Team tested different environments.*
>
> *Recommend: (1) expand control test scope to include trading systems, (2) remediate MFA gap on trading platform, (3) consider amending annual report disclosure before publication."*

**Why this matters:** This is security theatre exposed. The board was told one thing, but reality is different. No single document reveals it. Only the cross-reference does.

---

### Scenario 2: Two Near Misses Predicted the Q3 Incident

**Inputs cross-referenced:**
- Near Miss Log (Q1, Q2)
- Incident Log (Q3)
- Control Test Report
- Issues Log

**The story:**

A batch processing job failed in Q1 — manual workaround used, no client impact. Logged as near miss. Same job failed in Q2 — different workaround, minor delay. Logged as near miss. In Q3, the same batch job caused a 4-hour outage, delaying regulatory reporting.

The control (automated monitoring) was rated "Effective" in Q2 testing. But the near miss log shows it was being bypassed manually both times. The issue was logged but aged 180 days without remediation.

**AI finding:**

> *"Pattern detected. Two near misses in Q1 and Q2 were early warnings for the Q3 incident. Root cause is identical: batch processing job failure (ref NM-0041, NM-0067, INC-0312). The automated monitoring control was rated Effective (CT-1923, Q2), but near miss evidence shows it was bypassed manually in both prior events — the control fires, but operators override it.*
>
> *The remediation issue (ISS-0445) has been open 180 days with no completion date. This is a predictable failure — the data trail shows escalating severity: no impact → minor delay → 4-hour outage with regulatory reporting impact.*
>
> *Recommend: (1) escalate ISS-0445 to P1 with 30-day deadline, (2) re-test automated monitoring control with focus on operator override behaviour, (3) report to operational risk committee as a trend."*

**Why this matters:** The AI is predictive, not just retrospective. It connects events across time that humans file and forget.

---

### Scenario 3: Emerging Risk That Already Materialised

**Inputs cross-referenced:**
- Emerging Risk Report (Q1)
- Regulatory Circular (Q3)
- Control Baseline Review
- Risk Register

**The story:**

The Emerging Risk Report in Q1 flagged "AI regulation expected in APAC, potential impact on model governance." In Q3, the HKMA issued binding guidance on AI model risk management. The Control Baseline Review shows no AI model governance controls in the current control library. The Risk Register does not include AI risk.

**AI finding:**

> *"The emerging risk identified in Q1 has materialised. HKMA has issued binding guidance on AI model risk management (Circular CR-2026-04, effective Q1 2027). Your control library has no AI model governance controls (Control Baseline Review, FY2025). Your risk register does not include AI risk.*
>
> *Recommend: (1) add AI risk to the risk register (suggested initial rating: High likelihood / Medium impact based on HKMA timeline), (2) design 4 new controls per HKMA guidance requirements, (3) update board risk appetite statement to include AI risk, (4) allocate budget for AI model validation capability."*

**Why this matters:** Emerging risks are identified but rarely tracked to materialisation. The AI closes the loop automatically.

---

### Scenario 4: The SAR That Was Dismissed as a False Positive

**Inputs cross-referenced:**
- Suspicious Activity Report (SAR)
- Transaction Monitoring Alerts
- KYC / Customer Due Diligence File
- Control Test Report

**The story:**

A SAR was filed in March on Customer X for $2.3M in unusual wire transfers to a high-risk jurisdiction over 6 months. But the transaction monitoring system had flagged Customer X in January — 2 months earlier — and the alert was dispositioned as a false positive by an L1 analyst.

The KYC file shows Customer X was rated "Medium" risk, with the last review 18 months ago (overdue per 12-month policy). No PEP match. The control test rated the monitoring rule as "Effective," but the test sampled 50 alerts — Customer X's alert was not in the sample.

**AI finding:**

> *"Critical connection. A SAR was filed on Customer X in March for $2.3M in suspicious wire transfers (SAR-2026-0847). The transaction monitoring system flagged Customer X in January (Alert TM-44892), but it was closed as a false positive by an L1 analyst.*
>
> *The KYC file shows Customer X was rated Medium risk but hasn't been reviewed in 18 months — overdue per the 12-month review policy. The control test rated the TM rule as Effective (CT-3201), but the sample did not include Alert TM-44892.*
>
> *This means: the system detected suspicious activity 2 months before the SAR, a human dismissed it, KYC was stale, and the control test missed it. Regulators will ask: 'Why didn't you act on the January alert?'*
>
> *Recommend: (1) escalate to MLRO for SAR quality review, (2) trigger enhanced due diligence on Customer X immediately, (3) expand control test sample to include dispositioned alerts, (4) flag KYC review as overdue — remediate within 30 days, (5) review all L1 analyst dispositions on high-risk jurisdiction wires in the last 6 months."*

**Why this matters:** Every MLRO's nightmare. The system caught it, a human dismissed it, and now there is regulatory exposure. The cross-reference reveals the chain of failures.

---

### Scenario 5: The Sanctions Gap Nobody Connected

**Inputs cross-referenced:**
- Sanctions Screening Results (Q1, Q2)
- Near Miss Log
- Emerging Risk Report
- AML Risk Assessment

**The story:**

Sanctions screening true matches increased 167% quarter-on-quarter (3 to 8). Alert volume is up 17%. A near miss shows the sanctions list feed was delayed 48 hours due to a vendor issue — during which new designations were not being screened. The emerging risk report flags 200+ new OFAC designations expected next quarter. But the AML Risk Assessment rates sanctions risk as "Low."

**AI finding:**

> *"Sanctions risk is trending upward but your risk assessment says Low. True matches increased 167% QoQ (3 to 8). Alert volume up 17% (12,000 to 14,000). A near miss shows the sanctions list feed was delayed 48 hours (NM-0089) — new designations were not screened during that window. The emerging risk report flags 200+ new OFAC designations expected in Q3.*
>
> *Your AML Risk Assessment rates sanctions risk as Low — this is inconsistent with the data.*
>
> *Recommend: (1) upgrade sanctions risk rating to Medium or High, (2) review vendor feed SLA and add redundancy, (3) pre-allocate screening capacity for Q3 OFAC expansion, (4) report to board risk committee on sanctions risk trend."*

**Why this matters:** Four separate data sources each tell part of the story. No single source reveals the inconsistency between the risk rating and the evidence.

---

### Scenario 6: Correspondent Banking Blind Spot

**Inputs cross-referenced:**
- Correspondent Banking Due Diligence
- Transaction Monitoring Alerts
- SARs
- Regulatory Examination Report
- Annual Report

**The story:**

Respondent Bank Y is in a high-risk jurisdiction, rated "Acceptable" 14 months ago (overdue for review). 47 transaction monitoring alerts involving Bank Y in the last 6 months — 40 closed as false positive, 7 escalated. 2 SARs filed in the last quarter involving transactions routed through Bank Y. The regulator issued an MRA on the correspondent banking programme. The annual report says: "We maintain a robust correspondent banking framework with risk-based due diligence."

**AI finding:**

> *"Say-do gap in correspondent banking. The annual report claims robust correspondent banking due diligence (p.82). However:*
>
> *1. Respondent Bank Y (high-risk jurisdiction) was last reviewed 14 months ago — overdue per the 12-month policy.*
> *2. 47 TM alerts in 6 months involving Bank Y, with 2 SARs filed — this volume should have triggered an enhanced review.*
> *3. The regulator issued an MRA specifically on the correspondent banking programme (Exam Report, finding F-07).*
> *4. The annual report disclosure does not reflect these risks.*
>
> *Recommend: (1) immediate enhanced due diligence on Bank Y, (2) update Bank Y risk rating, (3) remediate MRA findings with 90-day action plan, (4) consider amending board disclosure before annual report publication."*

**Why this matters:** Five data sources paint a picture of a correspondent banking relationship that is under-managed, under-reviewed, and misrepresented to the market.

---

### Scenario 7: Alert Fatigue — The Hidden Risk

**Inputs cross-referenced:**
- Transaction Monitoring Alerts (12-month trend)
- Control Test Report
- Internal Audit Report
- Issues Log

**The story:**

Transaction monitoring alert volume over 12 months:
- Q1: 15,000 alerts, 98.2% false positive rate
- Q2: 18,000 alerts, 98.5% false positive rate
- Q3: 22,000 alerts, 98.9% false positive rate
- Q4: 28,000 alerts, 99.1% false positive rate

The control test rated transaction monitoring as "Effective" — but it only tested whether alerts fire, not whether dispositions are correct. Internal audit flagged the issue: "Transaction monitoring alert volumes increasing; recommend review of rule tuning and disposition quality." A remediation project ("TM rule tuning") has been open in the issues log for 270 days with no completion date.

**AI finding:**

> *"Critical trend. Transaction monitoring alert volume has increased 87% in 12 months (15,000 to 28,000) while the false positive rate has risen from 98.2% to 99.1%. Analysts are reviewing 28,000 alerts to find 252 real ones.*
>
> *The control was rated Effective (CT-4102), but the test only checked whether alerts fire — not whether dispositions are correct. Internal audit flagged this (Audit Finding AF-2025-031). The remediation project (ISS-0612, 'TM Rule Tuning') has been open 270 days with no completion date.*
>
> *At a 99.1% false positive rate, analyst fatigue is a known risk factor for Type II errors — real suspicious activity is likely being missed.*
>
> *Recommend: (1) escalate ISS-0612 to P1 with 60-day deadline, (2) commission disposition quality review on a sample of Q4 false positives, (3) report to MLRO and board risk committee, (4) consider regulatory self-disclosure if material weaknesses are found in disposition quality."*

**Why this matters:** The numbers are visceral — 28,000 alerts to find 252 real ones. Every bank with a transaction monitoring system has this problem. The AI connects a 12-month trend that individual quarterly reports obscure.

---

## Market Sizing — Updated with FinCrime

### Non-Financial Risk Reporting (Original Estimate)

| Segment | # Institutions | Revenue/Institution | Segment TAM |
|---------|---------------|-------------------|-------------|
| G-SIBs | 30 | $500K/yr | $15M |
| Large Regional Banks | 100 | $350K/yr | $35M |
| Mid-Market Banks | 500 | $200K/yr | $100M |
| Insurance / Asset Mgmt | 200 | $250K/yr | $50M |
| **NFR Subtotal** | **830** | | **$200M** |

### Financial Crime & AML (New)

Global financial crime compliance spend: **$206.1 billion/year** (LexisNexis, 2023) / **$270 billion** (Deloitte, 2024).

| Segment | # Institutions | Revenue/Institution | Segment TAM |
|---------|---------------|-------------------|-------------|
| G-SIBs | 30 | $800K/yr | $24M |
| Large Regional Banks | 100 | $500K/yr | $50M |
| Mid-Market Banks | 500 | $300K/yr | $150M |
| Payment/FinTech firms | 500 | $200K/yr | $100M |
| Insurance / Asset Mgmt | 200 | $300K/yr | $60M |
| **FinCrime Subtotal** | **1,330** | | **$384M** |

### Full Platform (All Use Cases)

| Market | TAM |
|--------|-----|
| NFR Reporting + GRC use cases | $200M–$615M |
| Financial Crime & AML | $384M |
| **Total Addressable Market** | **$584M–$999M** |
| **Rounded** | **~$1B** |

---

## POC Pivot — Phased Implementation

### The Shift

**Old POC:** "Upload an annual report, get a governance gap analysis in 37 minutes."

**New POC:** "Here's your risk posture. 200 controls. 87% effective. 12 failures this quarter. The AI has found 4 cross-reference insights you missed. Want the board paper? 60 seconds."

The annual report is the input that proves we can read. The dashboard is the output that proves we can think.

### Sprint Plan

| Sprint | Inputs Added | Outputs Added | Cross-References Unlocked | Demo Value |
|--------|-------------|---------------|--------------------------|------------|
| **Done** | Annual Reports | Gap Analysis | Say-Do analysis | Proven (5 real tests) |
| **Sprint 1** | Control Test Reports, Issues Log | Risk Dashboard, Control Status | Say vs Do gap detection, issue ageing | Very high — daily utility |
| **Sprint 2** | Risk Register, Near Misses, Incidents | Enhanced Dashboard with trends | Pattern detection, predictive insights | Extremely high — CRO use case |
| **Sprint 3** | Red Team Reports, Audit Reports | Adversarial vs operational views | Scope mismatches, audit follow-up | High — differentiated |
| **Sprint 4** | SARs, TM Alerts, KYC, Sanctions | FinCrime Intelligence view | Alert quality, SAR connections, sanctions trends | Massive — $206B market |
| **Sprint 5** | Emerging Risks, Reg Circulars, Templates | Regulatory Return, Board Narrative | Full lifecycle, regulatory readiness | Platform-complete |

### Technical Lift Per Input Type

Each new input type requires:
- 1 extraction prompt (type-specific LLM system prompt)
- 1 Payload CMS collection (structured output schema)
- 1 parser (CSV/Excel/PDF)
- 1 API endpoint

The cross-referencing is a prompt layer that runs *after* individual extraction — it reads all extracted data and looks for connections. The dashboard is incremental — each new input type adds widgets and insights.

---

## Competitive Positioning — Updated

| | Legacy GRC | Legacy FinCrime | Evonix |
|---|---|---|---|
| **What it is** | Database + workflow | Detection engine | AI intelligence layer |
| **What it reads** | Nothing | Transaction data | Everything — 26 input types |
| **What it reasons about** | Nothing | Alert rules | Context, adequacy, connections |
| **Cross-references** | Manual | Within FinCrime only | Across all 6 categories |
| **Narrative generation** | Manual (2–3 weeks) | Manual | AI (60 seconds) |
| **Integration** | 12–18 months | 6–12 months | Zero to start |

**Evonix creates a new category: AI-Powered Risk Intelligence.**

Not a GRC platform. Not a FinCrime tool. An intelligence layer that reads what humans cannot keep up with, cross-references what no single system can connect, and produces what takes weeks in minutes.

**26 input types. 6 output views. One intelligence engine. The cross-reference is the moat.**
