# STATEMENT OF WORK

## AI-Powered Non-Financial Risk Reporting — Proof of Concept

---

**SOW Reference:** EVX-SOW-001
**Date:** _________________
**Version:** 1.0

---

## PARTIES

**Provider:** Evonix Limited (or appropriate entity name)
Registered Address: _________________
Contact: Mark Syed, Founder & Principal Consultant
Email: _________________

**Client:** _________________
Registered Address: _________________
Contact: _________________
Email: _________________

This Statement of Work ("SOW") is entered into pursuant to the Mutual Non-Disclosure Agreement dated _________________ and forms the agreement between the Parties for the services described herein.

---

## 1. BACKGROUND

The Client operates a non-financial risk (NFR) reporting function that currently relies on manual document processing — analysts reading documents, extracting risk data, categorising against the Client's risk taxonomy, and producing reports for risk committees.

Evonix has developed an AI-powered intelligence layer capable of automating this document processing pipeline. The purpose of this engagement is to conduct a Proof of Concept ("POC") using the Client's actual documents and risk taxonomy to determine whether the AI solution delivers measurable value compared to the existing manual process.

---

## 2. SCOPE OF WORK

### 2.1 Objectives

The engagement comprises three workstreams:

**Workstream 1 — AI Governance & Readiness (Weeks 1-2):**

(a) Review the Client's existing AI governance framework (Responsible AI policy, model risk management, vendor AI assessment requirements);

(b) Map Evonix capabilities against the Client's internal AI governance requirements;

(c) Pre-complete the Client's vendor AI risk assessment questionnaire;

(d) Deliver an AI Governance Alignment Report showing how Evonix meets each requirement, with mitigations for any gaps identified.

**Workstream 2 — NFR Document Processing POC (Weeks 1-6):**

(e) Process a defined set of the Client's NFR documents through the Evonix AI pipeline;

(f) Extract risk events, control findings, and governance information with confidence scores and source references;

(g) Categorise findings against the Client's own risk taxonomy;

(h) Produce a side-by-side comparison of AI output versus the Client's existing analyst output;

(i) Measure and report on precision, recall, categorisation accuracy, coverage, speed, and auditability; and

(j) Deliver an evidence-based go/no-go recommendation for a pilot phase.

**Workstream 3 — Audit & Explainability (Weeks 3-6):**

(k) Implement a forensic audit trail for all AI processing during the POC (prompt, source text, AI response, confidence score, risk signals, human review status);

(l) Demonstrate tamper-evident logging with cryptographic hash chain;

(m) Deliver a sample audit export and explainability demo for the Client's compliance team;

(n) Map audit capabilities against applicable regulatory requirements (EU AI Act Articles 9, 12, 14; HKMA AI Governance; PRA SS1/23; Fed SR 11-7 as applicable).

### 2.2 In Scope

| Item | Description |
|------|-------------|
| Document types | Up to **10** NFR document types as agreed during discovery |
| Document volume | Up to **50** documents total |
| Taxonomy configuration | Mapping AI extraction to the Client's risk taxonomy (one taxonomy) |
| Framework mapping | Basel III/IV non-financial risk categories |
| Output format | Structured data (CSV/JSON) + narrative summaries |
| Comparison report | Side-by-side analysis vs Client analyst baseline |
| Executive presentation | Findings, metrics, and go/no-go recommendation |

### 2.3 Out of Scope

The following are explicitly excluded from this SOW:

(a) Integration with the Client's existing GRC platform or risk register;

(b) Processing of documents beyond the agreed set;

(c) Ongoing production use beyond the POC period;

(d) Custom dashboard or UI development;

(e) Regulatory advice or legal opinions;

(f) Any work not described in Section 2.2 above.

Out-of-scope items may be addressed under a separate SOW or amendment by mutual written agreement.

---

## 3. DELIVERABLES

| # | Deliverable | Workstream | Format | Due |
|---|------------|------------|--------|-----|
| D0 | AI Governance Alignment Report | WS1 | PDF | End of Week 2 |
| D1 | Discovery Report | WS2 | PDF | End of Week 2 |
| D2 | Taxonomy Configuration | WS2 | Technical document | End of Week 2 |
| D3 | Interim Results & Feedback Session | WS2 | Presentation + data | End of Week 4 |
| D3b | Hallucination Audit | WS2 | PDF + spreadsheet | End of Week 5 |
| D4 | Full Comparison Report | WS2 | PDF + supporting data | End of Week 5 |
| D4b | Audit Trail & Explainability Demo | WS3 | Live demo + export | End of Week 5 |
| D5 | Executive Summary & Recommendation | All | Presentation (PPTX) | End of Week 6 |

### Deliverable Descriptions

**D0 — AI Governance Alignment Report:** A comprehensive assessment mapping Evonix against the Client's internal AI governance requirements. Includes: (a) AI risk classification of Evonix within the Client's risk taxonomy; (b) model risk management documentation — which model, validation approach, known limitations, drift monitoring; (c) explainability assessment — traceability from output to input for every extraction; (d) data governance mapping — data flow, access controls, retention, deletion, cross-border transfers; (e) human oversight model — which decisions require human approval, escalation paths, override capability; (f) bias and fairness assessment — systematic extraction bias testing methodology; (g) security assessment — prompt injection resilience, adversarial input handling, data isolation; (h) continuous monitoring plan — how AI quality is measured and maintained over time; (i) regulatory mapping to EU AI Act (Articles 9, 12, 14), HKMA AI Governance Guidelines, PRA SS1/23, Fed SR 11-7 as applicable; and (j) a pre-completed vendor AI risk assessment questionnaire for the Client's procurement / third-party risk team.

**D1 — Discovery Report:** Summary of the Client's current NFR reporting workflow, document types selected for the POC, risk taxonomy mapping, and agreed success criteria.

**D2 — Taxonomy Configuration:** Technical documentation of how the Client's risk taxonomy has been mapped to the AI extraction pipeline, including category definitions, confidence thresholds, and edge-case handling rules.

**D3 — Interim Results:** Preliminary extraction results from the first batch of processed documents, shared with the Client's subject matter experts for feedback and calibration.

**D3b — Hallucination Audit:** A random sample of 100 AI findings verified line-by-line against source documents by the Client's analysts. Each finding is classified as: (a) Correct — finding accurately reflects the source text; (b) Partially correct — finding is directionally right but imprecise; (c) Incorrect — finding is not supported by the source text (hallucination); or (d) Missed — finding exists in the source but was not extracted (false negative). The audit produces a precision score, a recall estimate, a confidence calibration curve, and specific examples of each category for discussion. This deliverable provides full transparency on AI accuracy and forms the evidence base for the go/no-go decision.

**D4 — Full Comparison Report:** Comprehensive side-by-side comparison of AI output versus Client analyst baseline, including metrics on: precision (false positive rate), recall (false negative rate), categorisation accuracy, confidence calibration, coverage (documents/pages processed), processing speed, review efficiency (time for analyst to review AI output vs. manual extraction), and source traceability.

**D4b — Audit Trail & Explainability Demo:** A live demonstration of the forensic audit trail for the Client's compliance team. For a selected sample of findings, the demo shows: (a) the exact prompt sent to the AI; (b) the source text provided as context; (c) the raw AI response; (d) the parsed extraction with confidence score; (e) risk signal scores (hallucination heuristics, weak grounding); (f) human review status and reviewer identity; (g) the cryptographic hash chain proving record integrity. Includes an exported audit package in machine-readable format (JSON) that the Client's compliance or model risk team can independently review. Regulatory mapping to EU AI Act Article 12 logging requirements is included.

**D5 — Executive Summary:** Board-ready presentation summarising POC findings across all three workstreams: AI governance alignment status, quantified processing value, accuracy metrics from the Hallucination Audit, audit trail and explainability capabilities, risks and limitations identified, and a clear go/no-go recommendation with supporting evidence.

---

## 4. TIMELINE

| Phase | Activities | Workstreams | Weeks |
|-------|-----------|-------------|-------|
| **Phase 1: Discovery, Governance & Setup** | Kick-off meeting, scope confirmation, document collection, taxonomy mapping, secure environment provisioning, AI governance review, vendor AI assessment pre-completion | WS1 + WS2 | 1-2 |
| **Phase 2: Processing, Calibration & Audit Setup** | AI document processing, extraction calibration, interim feedback session, taxonomy refinement, audit trail implementation | WS2 + WS3 | 3-4 |
| **Phase 3: Analysis, Explainability & Reporting** | Full comparison analysis, hallucination audit, audit trail demo, metrics compilation, executive presentation, go/no-go recommendation | WS2 + WS3 | 5-6 |

**Total Duration:** 6 weeks from the Effective Date.

The timeline assumes:
- Client provides all in-scope documents within 5 business days of kick-off;
- Client makes subject matter experts available for 2 feedback sessions (Weeks 2 and 4);
- Client provides risk taxonomy documentation within 5 business days of kick-off;
- Client provides their AI governance policy / vendor AI assessment questionnaire within 5 business days of kick-off (for Workstream 1).

Delays in Client-side inputs may extend the timeline proportionally.

---

## 5. CLIENT RESPONSIBILITIES

The Client shall:

(a) Provide the agreed documents in electronic format (PDF, CSV, or Excel) within 5 business days of kick-off;

(b) Provide risk taxonomy documentation in a structured format;

(c) Provide an analyst baseline: the output of the Client's existing manual process for the same documents (for comparison purposes);

(d) Make available at least one subject matter expert for feedback sessions in Weeks 2 and 4;

(e) Provide timely feedback on interim results (within 3 business days);

(f) Execute the NDA and DPA prior to any document transfer;

(g) Designate a single point of contact for the engagement.

---

## 6. EVONIX RESPONSIBILITIES

Evonix shall:

(a) Provision a dedicated, secure processing environment for the Client's data;

(b) Process all in-scope documents through the AI pipeline;

(c) Calibrate extraction and categorisation to the Client's risk taxonomy;

(d) Deliver all deliverables per the agreed timeline;

(e) Provide weekly status updates via email;

(f) Make the Principal Consultant (Mark Syed) available as the primary point of contact;

(g) Comply with all data security and privacy obligations set out in this SOW and the DPA.

---

## 7. DATA HANDLING & SECURITY

7.1 All Client documents and data shall be processed in a **dedicated private cloud environment** (Microsoft Azure or equivalent, as agreed). Client data shall not be co-mingled with other clients' data.

7.2 AI processing shall use an **enterprise-grade large language model** with contractual zero data retention and no model training on Client data.

7.3 All data shall be encrypted **in transit** (TLS 1.3 minimum) and **at rest** (AES-256 minimum).

7.4 Evonix shall maintain a **full audit log** of all document processing activities.

7.5 Upon completion of the POC (or upon earlier termination), Evonix shall:

(a) Return all Client data and deliverables to the Client; and

(b) Permanently delete all Client data from Evonix systems within **30 days**, unless otherwise agreed in writing.

7.6 Evonix shall provide written certification of data deletion upon request.

7.7 A separate **Data Processing Agreement** ("DPA") shall be executed prior to any Client data being transferred to Evonix. The DPA is attached as Appendix A (or to be agreed separately).

---

## 8. FEES AND PAYMENT

### 8.1 Fixed Fee

| Component | Fee |
|-----------|-----|
| POC Engagement (6 weeks, all deliverables) | **$_________________** |

The fee is fixed and inclusive of all work described in this SOW.

### 8.2 Payment Schedule

| Milestone | Amount | Due |
|-----------|--------|-----|
| Upon execution of this SOW | 50% of total fee | Net 14 days from invoice |
| Upon delivery of D5 (Executive Summary) | 50% of total fee | Net 30 days from invoice |

### 8.3 Expenses

The fixed fee includes all expenses. No additional charges shall be incurred without prior written approval from the Client.

### 8.4 Invoicing

Invoices shall be issued by Evonix and are payable by bank transfer to the account details provided on the invoice. All amounts are exclusive of applicable taxes (VAT/GST), which shall be charged at the prevailing rate where applicable.

---

## 9. INTELLECTUAL PROPERTY

9.1 **Client Data:** All Client documents, data, risk taxonomies, and outputs derived specifically from Client data remain the exclusive property of the Client.

9.2 **Evonix Technology:** The Evonix AI platform, algorithms, models, prompts, source code, and underlying technology remain the exclusive property of Evonix. Nothing in this SOW grants the Client any licence or right to the Evonix technology beyond the services described herein.

9.3 **Deliverables:** The deliverables (D1-D5) shall be owned by the Client upon payment in full.

9.4 **No Training:** Evonix shall not use Client data to train, fine-tune, or improve its AI models without the Client's prior written consent.

---

## 10. CONFIDENTIALITY

10.1 The terms of the Mutual Non-Disclosure Agreement dated _________________ are incorporated by reference and apply to all information exchanged under this SOW.

---

## 11. WARRANTIES AND LIMITATIONS

11.1 Evonix warrants that:

(a) The services shall be performed with reasonable skill and care by appropriately qualified personnel;

(b) The services shall be performed in accordance with this SOW; and

(c) Evonix has the right to provide the services described herein.

11.2 Evonix does **not** warrant that:

(a) The AI output will be 100% accurate or complete — AI-extracted data requires human review;

(b) The POC results will meet any particular threshold of accuracy or value; or

(c) The AI solution is suitable for any purpose beyond the POC without further validation.

11.3 **Limitation of Liability.** Evonix's total aggregate liability under this SOW shall not exceed the total fees paid by the Client under this SOW. Neither Party shall be liable for indirect, consequential, special, or punitive damages.

---

## 12. TERM AND TERMINATION

12.1 This SOW shall commence on the Effective Date and continue until the earlier of:

(a) Completion of all deliverables; or

(b) 8 weeks from the Effective Date.

12.2 Either Party may terminate this SOW with **14 days'** written notice. In the event of early termination:

(a) The Client shall pay for all work completed to the date of termination;

(b) Evonix shall deliver all work product completed to date; and

(c) Data deletion provisions (Section 7.5) shall apply.

12.3 In the event of a material breach that is not remedied within 14 days of written notice, the non-breaching Party may terminate immediately.

---

## 13. SUCCESS CRITERIA

The Parties agree that the POC shall be evaluated against the following criteria, to be refined during Phase 1 (Discovery):

| Criterion | Metric | Suggested Target | Notes |
|-----------|--------|-----------------|-------|
| **Precision** (false positive rate) | Of AI findings, % confirmed as valid by analyst review | ≥ 80% | "Of the things the AI flagged, how many were real?" |
| **Recall** (false negative rate) | Of analyst baseline findings, % also found by AI | ≥ 85% | "Of the real findings, how many did the AI catch?" |
| **Categorisation Accuracy** | % agreement between AI taxonomy mapping and analyst mapping | ≥ 75% | Improves with calibration during Weeks 3-4 |
| **Confidence Calibration** | When AI reports 90% confidence, is it correct ~90% of the time? | Monotonically improving | Measured via the Hallucination Audit (D3b) |
| **Coverage** | % of in-scope documents/pages processed | 100% | Non-negotiable — AI reads every page |
| **Source Traceability** | % of AI findings with verifiable page/paragraph reference | 100% | Non-negotiable — every finding must cite its source |
| **Speed** | Processing time per document | ≤ 60 minutes | Based on POC tests: 15-40 min for 80-400 page documents |
| **Review Efficiency** | Time for analyst to review/correct one AI extraction vs doing it from scratch | ≥ 60% faster | Measures the human-in-the-loop productivity gain |
| **Overall Value** | Client assessment: "Would this output be useful to your team?" | Positive | Qualitative assessment by Client SMEs |

Suggested targets are based on Evonix's testing across 5 real-world documents (852+ pages). Final targets to be agreed during Week 1 and documented in Deliverable D1.

**A note on coverage vs. accuracy:** A manual process with 95% accuracy but 20% document coverage captures approximately 19% of total risks. An AI process with 85% accuracy but 100% coverage captures approximately 85% of total risks — a 4.5x improvement in risk detection. The POC will measure both dimensions.

---

## 14. GENERAL PROVISIONS

14.1 **Entire Agreement.** This SOW, together with the NDA and DPA, constitutes the entire agreement between the Parties for the services described herein.

14.2 **Amendment.** This SOW may only be amended by written agreement signed by both Parties.

14.3 **Assignment.** Neither Party may assign this SOW without the prior written consent of the other.

14.4 **Force Majeure.** Neither Party shall be liable for delays caused by events beyond its reasonable control.

14.5 **Governing Law.** This SOW shall be governed by the laws of _________________ (insert jurisdiction).

14.6 **Dispute Resolution.** Disputes shall first be escalated to senior management of each Party for resolution. If unresolved within 30 days, disputes shall be referred to _________________ (courts / arbitration).

14.7 **Counterparts.** This SOW may be executed in counterparts. Electronic signatures are valid.

---

## SIGNATURES

**For and on behalf of Evonix:**

Name: _________________________________

Title: _________________________________

Signature: _________________________________

Date: _________________________________

---

**For and on behalf of [Client]:**

Name: _________________________________

Title: _________________________________

Signature: _________________________________

Date: _________________________________

---

## APPENDIX A: DATA PROCESSING AGREEMENT

*To be attached separately or agreed prior to commencement of services.*

---

## APPENDIX B: DOCUMENT LIST

*To be completed during Phase 1 (Discovery).*

| # | Document Type | Format | Approximate Volume | Notes |
|---|--------------|--------|--------------------|-------|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |
| 4 | | | | |
| 5 | | | | |

---

*This document is a template and should be reviewed by qualified legal counsel before execution. Evonix recommends that both Parties seek independent legal advice.*
