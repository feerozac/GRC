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

The POC will:

(a) Process a defined set of the Client's NFR documents through the Evonix AI pipeline;

(b) Extract risk events, control findings, and governance information with confidence scores and source references;

(c) Categorise findings against the Client's own risk taxonomy;

(d) Produce a side-by-side comparison of AI output versus the Client's existing analyst output;

(e) Measure and report on coverage, consistency, speed, and auditability; and

(f) Deliver an evidence-based go/no-go recommendation for a pilot phase.

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

| # | Deliverable | Format | Due |
|---|------------|--------|-----|
| D1 | Discovery Report | PDF | End of Week 2 |
| D2 | Taxonomy Configuration | Technical document | End of Week 2 |
| D3 | Interim Results & Feedback Session | Presentation + data | End of Week 4 |
| D4 | Full Comparison Report | PDF + supporting data | End of Week 5 |
| D5 | Executive Summary & Recommendation | Presentation (PPTX) | End of Week 6 |

### Deliverable Descriptions

**D1 — Discovery Report:** Summary of the Client's current NFR reporting workflow, document types selected for the POC, risk taxonomy mapping, and agreed success criteria.

**D2 — Taxonomy Configuration:** Technical documentation of how the Client's risk taxonomy has been mapped to the AI extraction pipeline, including category definitions, confidence thresholds, and edge-case handling rules.

**D3 — Interim Results:** Preliminary extraction results from the first batch of processed documents, shared with the Client's subject matter experts for feedback and calibration.

**D4 — Full Comparison Report:** Comprehensive side-by-side comparison of AI output versus Client analyst baseline, including metrics on: extraction accuracy, categorisation consistency, coverage (documents/pages processed), processing speed, and auditability (source reference quality).

**D5 — Executive Summary:** Board-ready presentation summarising POC findings, quantified value delivered, risks and limitations identified, and a clear go/no-go recommendation with supporting evidence.

---

## 4. TIMELINE

| Phase | Activities | Duration | Weeks |
|-------|-----------|----------|-------|
| **Phase 1: Discovery & Setup** | Kick-off meeting, scope confirmation, document collection, taxonomy mapping, secure environment provisioning | 2 weeks | 1-2 |
| **Phase 2: Processing & Calibration** | AI document processing, extraction calibration, interim feedback session, taxonomy refinement | 2 weeks | 3-4 |
| **Phase 3: Analysis & Reporting** | Full comparison analysis, metrics compilation, executive presentation, go/no-go recommendation | 2 weeks | 5-6 |

**Total Duration:** 6 weeks from the Effective Date.

The timeline assumes:
- Client provides all in-scope documents within 5 business days of kick-off;
- Client makes subject matter experts available for 2 feedback sessions (Weeks 2 and 4);
- Client provides risk taxonomy documentation within 5 business days of kick-off.

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

| Criterion | Metric | Target |
|-----------|--------|--------|
| **Extraction Accuracy** | % of risk events correctly identified vs analyst baseline | ≥ ___% |
| **Categorisation Consistency** | % agreement with Client taxonomy mapping | ≥ ___% |
| **Coverage** | % of documents/pages processed | 100% of in-scope documents |
| **Speed** | Processing time per document | ≤ ___ minutes per document |
| **Auditability** | % of findings with source reference | 100% |
| **Overall Value** | Client assessment of "would this output be useful to your team?" | Positive |

Success criteria targets to be agreed during Week 1 and documented in Deliverable D1.

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
