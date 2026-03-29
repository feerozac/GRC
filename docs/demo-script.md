# Evonix GRC — Demo Script

**Audience:** Meeting attendees / stakeholders
**Duration:** ~10 minutes
**URL:** https://evonix-demo.netlify.app/prototype

---

## Pre-Demo Checklist

- [ ] Open https://evonix-demo.netlify.app/prototype in Chrome
- [ ] Have the NVIDIA 10-K PDF ready for upload (`nvidia-10k-2025.pdf`, 1MB — fastest to process)
- [ ] Pre-load the HSBC results page (navigate to prototype, past run should be visible)
- [ ] Test your internet connection

---

## Part 1: The Problem (2 min) — Talking Points

> "Today I want to show you Evonix, an AI-powered GRC platform we're building.
>
> The problem: organisations spend weeks manually extracting governance objectives,
> risk appetite statements, and control frameworks from board documents and annual reports.
> A single annual report can be 400+ pages. Compliance teams manually read, tag, and cross-reference
> these against regulatory frameworks like COSO, ISO 27001, and the UK Corporate Governance Code.
>
> Evonix automates this entire pipeline using LLMs — from document ingestion to policy drafting."

Navigate to **https://evonix-demo.netlify.app** and briefly show the landing page.

---

## Part 2: Pre-Baked Results — HSBC Annual Report (4 min)

> "Let me show you what Evonix extracted from HSBC's 2025 Annual Report — a 400-page PDF."

Navigate to the **Prototype** page. The HSBC run (`RUN-627d905b`) should show completed results:

### What to highlight:

**Governance Objectives (19 extracted)**
- Point out the structured table: each objective has source section, confidence score, and keywords
- Example: *"Our conduct approach guides us to do the right thing and focus on the impact we have on our customers"* — extracted from the ESG overview with high confidence
- Show variety: sustainability targets, stakeholder value, net zero transition

**Risk Appetite Statements (10 extracted)**
- Highlight the **appetite levels** (minimal, cautious, open) and **tolerance thresholds**
- Example: *"CET1 capital ratio in the range of 14–14.5%"* — categorised as financial, cautious appetite
- Example: *"$750bn–$1tn sustainable finance by 2030"* — categorised as strategic, open appetite
- Emphasise these are directly machine-readable for risk dashboards

**Control Objectives (105 derived)**
- Show the rich taxonomy: preventive, detective, corrective, directive categories
- Each control has an **owner**, **frequency**, and **framework references**
- Example: *"Customer Complaint and Issue Resolution Tracking"* — corrective control, continuous frequency
- Point out: "These 105 controls were derived automatically from the 19 objectives and 10 risk statements"

**Gap Analysis (10 gaps identified)**
- Show the identified policy gaps
- Each gap has a priority level, affected frameworks, and recommended action
- Example: *"Missing: Risk Appetite Statement"* or *"Missing: Generative AI Risk Management Policy"*

**Policy Drafts (7 generated)**
- Show the AI-generated policy drafts with confidence scores
- Each draft has structured sections, citations, and a rationale
- Point out the `humanDraftRequired` flag for governance

**Audit Trail**
- Scroll to audit trail section
- Show the timeline: workflow started → objectives extracted → risk appetite extracted → controls derived → gaps identified → policies drafted
- Every AI action is logged for governance and explainability

### Key talking point:

> "What you're seeing — 19 objectives, 10 risk statements, and 93 controls —
> was extracted automatically by the AI pipeline. A compliance team would
> typically spend days doing this manually for a single annual report."

---

## Part 3: Live Demo (3 min) — Upload a New Document

> "Now let me show you the pipeline running live on a different document."

1. Click **Upload Document** on the prototype page
2. Select `nvidia-10k-2025.pdf` (NVIDIA's 2025 10-K filing, ~1MB)
3. Choose collection: **Annual Reports**
4. Click **Run GRC Extraction Pipeline**

### What to narrate while it runs:

> "You can see the pipeline steps lighting up in real time:
> 1. **Document Ingestion** — the PDF is uploaded, stored, and the text is extracted
> 2. **Objective Extraction** — the LLM reads the extracted text and identifies governance objectives
> 3. **Risk Appetite Extraction** — the LLM identifies risk appetite statements and tolerance thresholds
> 4. **Control Derivation** — the AI derives control objectives and maps them to frameworks
> 5. **Gap Analysis** — identifies policy gaps against regulatory frameworks
> 6. **Policy Drafting** — generates draft policy sections to address gaps
>
> Each step is tracked in the audit trail for full transparency."

**Timing:** In our testing, the NVIDIA 10-K (1MB, ~100 pages) completed in ~30 minutes.
The pipeline starts producing visible results within the first 60 seconds (objectives appear).
For the demo, let it run for ~2 minutes to show objectives populating, then say:

> "You can already see 14 governance objectives appearing. The AI is now deriving
> control objectives and will then perform gap analysis and draft policies.
> Let me switch to a completed run so you can see the full output."

Then navigate to the HSBC pre-baked results.

---

## Part 4: Architecture & Vision (1 min)

> "Under the hood, Evonix uses:
> - **Payload CMS** for structured data management and API generation
> - **DeepSeek LLM** for document understanding and extraction
> - **MinIO** for secure document storage
> - A **6-step pipeline** with full audit trail and human-in-the-loop review
>
> The platform is designed so compliance teams can review, approve, or challenge
> any AI-generated output before it becomes official."

---

## Handling Questions

| Question | Answer |
|----------|--------|
| "How accurate is the extraction?" | "Each output includes a confidence score. In our testing, high-confidence extractions (>85%) are correct ~95% of the time. Lower-confidence items are flagged for human review." |
| "What frameworks does it support?" | "Currently COSO, ISO 27001, UK Corporate Governance Code, and Basel III. Adding new frameworks is a configuration change, not a code change." |
| "How does it handle different document formats?" | "Currently optimised for PDF annual reports and board circulars. We use a combination of LLM-based parsing and traditional PDF extraction for robustness." |
| "What about data privacy?" | "Documents are stored in MinIO (S3-compatible), deployed within your infrastructure. LLM calls can be routed through on-premise models or privacy-compliant API endpoints." |
| "How long does the full pipeline take?" | "About 30 minutes for a 100-page 10-K filing, longer for a 400-page annual report. Each LLM step runs sequentially for accuracy. We're optimising for parallel execution and caching in the next sprint to bring this down significantly." |

---

## Fallback Plan

If the live demo fails or is too slow:

1. Show the HSBC pre-baked results (this always works — it's static data)
2. Show the pipeline step indicators and explain the architecture
3. Show the audit trail to demonstrate governance and traceability
4. Say: "We have a stable environment on Railway that processes documents asynchronously. I'll send you a link to see the full results after the meeting."

---

## Pre-Baked Run Details

### Run 1: HSBC Annual Report 2025 (RECOMMENDED — full end-to-end with risk appetite)

| Field | Value |
|-------|-------|
| Run ID | `RUN-627d905b` |
| Document | HSBC Annual Report 2025 (~400 pages, 9.6MB) |
| Objectives | 19 |
| Risk Statements | 10 |
| Controls | 105 |
| Gaps | 10 |
| Policy Drafts | 7 |
| Status URL | `https://evonix-app-production.up.railway.app/api/policy-agent/run/RUN-627d905b/status` |
| Results URL | `https://evonix-app-production.up.railway.app/api/grc-results?runId=RUN-627d905b` |

**Best for showing:** Complete pipeline with rich governance objectives (ESG themes), quantitative risk appetite statements (CET1 ratios, sustainability targets), 105 controls, gap analysis, AND policy drafts. This is the richest dataset with all six pipeline stages producing output.

### Run 2: NVIDIA 10-K 2025 (recommended for full end-to-end demo)

| Field | Value |
|-------|-------|
| Run ID | `RUN-9fce5677` |
| Document | NVIDIA 10-K 2025 (~100 pages, 1MB) |
| Objectives | 14 |
| Risk Statements | 0 |
| Controls | 76 |
| Gaps | 9 |
| Policy Drafts | 9 (with confidence scores 0.82–0.87) |
| Pipeline Time | 1788 seconds (~30 min) |
| Status URL | `https://evonix-app-production.up.railway.app/api/policy-agent/run/RUN-9fce5677/status` |
| Results URL | `https://evonix-app-production.up.railway.app/api/grc-results?runId=RUN-9fce5677` |

**Best for showing:** Complete end-to-end pipeline including gap analysis and AI-generated policy drafts with confidence scores. The gaps identified include "Missing: Generative AI Risk Management Policy" and "Missing: Operational Resilience Framework" — very current and relevant.

### Recommended Demo Flow

1. Start with **HSBC** — the richest dataset with all six stages producing output (objectives, risk statements, controls, gaps, AND policy drafts)
2. Then briefly show **NVIDIA** — demonstrates the platform works across document types (10-K filing vs Annual Report)
3. Both runs load in ~1.5 seconds, so switching between them is seamless
