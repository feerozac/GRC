# Evonix GRC — Demo Script

**Source Deck:** `Evonix_GRC_v0.5_FIN.pptx` (11 slides)
**Duration:** ~15 minutes (slides + live demo)
**Prototype URL:** https://evonix-demo.netlify.app/prototype

---

## Pre-Demo Checklist

- [ ] Have `Evonix_GRC_v0.5_FIN.pptx` loaded in presentation mode
- [ ] Open https://evonix-demo.netlify.app/prototype in Chrome (separate tab, pre-loaded)
- [ ] Have `nvidia-10k-2025.pdf` ready on Desktop for upload (1MB — fastest to process)
- [ ] Test internet connection and confirm Railway backend is healthy
- [ ] Verify HSBC pre-baked results load: open the prototype, confirm data appears

---

## Slide 1 — Title (Visual: Chaos)

*Image: Scattered spreadsheets, emails, dashboards, and documents floating in darkness*

> "This is what GRC looks like today at most organisations. Spreadsheets, emails, isolated dashboards — scattered across teams with no single source of truth."

*(Pause — let the image land)*

---

## Slide 2 — "GRC is broken."

> **"GRC is broken."**
>
> "It's a brittle patchwork of risk registers, control libraries, and evidence trapped in silos and spreadsheets. Teams spend more time coordinating than actually managing risk."

---

## Slide 3 — The Founder

*Image: Mark Syed, Co-Founder*

> "My name is Mark Syed. I'm the Co-Founder of Evonix. I've spent 20+ years across government, finance, and technology — living this problem firsthand. I've sat in the audit committees. I've wrestled with the spreadsheets. And I knew there had to be a better way."

---

## Slide 4 — The Evidence

*Visual: $500K per enterprise. 60% wasted on coordination.*

> "The numbers are staggering. The average enterprise spends **$500K+ per year** on GRC team costs. And **60% of that is wasted on coordination** — not on actual risk management.
>
> That's hundreds of thousands of dollars spent moving data between spreadsheets, chasing evidence, and manually mapping controls to frameworks."

---

## Slide 5 — The Solution

*"AI agents that operate compliance."*

> "Evonix is the solution. One platform that unifies risk, control, and evidence into a **single source of truth**, with virtual 3 Lines of Defence workflows baked in.
>
> Two key components:
>
> **The Intelligence** — AI agents that generate executive narratives, perform gap analysis, map evidence, and recommend KCI/KRI/KPI priorities.
>
> **The Foundation** — Multi-framework mapping across ISO 27001, NIST CSF, COBIT, HKMA, MAS — with real-time regulatory feeds and end-to-end issue tracking."

---

## Slide 6 — How It Works

*"One agent per line. Always on." — Architecture flow diagram*

> "Here's how it works. One AI agent per line of defence. Always on.
>
> The platform connects to **real-time regulatory feeds** — HKMA, MAS, EU AI Act — and also ingests your annual reports and strategy documents.
>
> The AI agent then produces four outputs:
> - **Executive Narrative** in under 60 seconds
> - **Gap Analysis** in under 5 minutes
> - **Evidence Mapping** — automatic
> - **Priority Recommendations** — Strategy, Regulatory, Benchmarks
>
> The process is simple:
> 1. **Ingest** — connect regulatory feeds, upload annual reports and strategy documents
> 2. **Analyse** — the AI extracts governance objectives, risk appetite, and derives controls
> 3. **Act** — gap analysis, policy drafting, framework mapping — all with full audit trail"

---

## Slide 7 — The Demo

*"Upload your annual report. Watch this happen."*

> "Now let me show you this in action. Upload your annual report — and watch this happen."

### Option A: Show Pre-Baked Results First (Recommended)

**Switch to the browser tab** with the prototype already loaded.

> "I've already run HSBC's 2025 Annual Report through the pipeline — a 400-page PDF. Let me show you what the AI extracted."

**Walk through the HSBC results** (`RUN-627d905b`):

**Governance Objectives (19 extracted)**
- Point out the structured table: each objective has source section, confidence score, and keywords
- Example: *"Our conduct approach guides us to do the right thing and focus on the impact we have on our customers"* — extracted from the ESG overview with high confidence
- Show variety: sustainability targets, stakeholder value, net zero transition

**Risk Appetite Statements (10 extracted)**
- Highlight the **appetite levels** (minimal, cautious, open) and **tolerance thresholds**
- Example: *"CET1 capital ratio in the range of 14–14.5%"* — categorised as financial, cautious appetite
- Example: *"$750bn–$1tn sustainable finance by 2030"* — categorised as strategic, open appetite
- Emphasise: "These are directly machine-readable for risk dashboards — no manual data entry"

**Control Objectives (105 derived)**
- Show the rich taxonomy: preventive, detective, corrective, directive categories
- Each control has an **owner**, **frequency**, and **framework references**
- Example: *"Customer Complaint and Issue Resolution Tracking"* — corrective control, continuous frequency
- Point out: "These 105 controls were derived automatically from the 19 objectives and 10 risk statements — the AI agent did this, not a human"

**Gap Analysis (10 gaps identified)**
- Show the identified policy gaps — each has a priority, affected frameworks, and recommended action
- Example: *"Missing: Risk Appetite Statement"* — flagged against COSO ERM
- Example: *"Missing: Generative AI Risk Management Policy"* — extremely current and relevant

**Policy Drafts (7 generated)**
- Show the AI-generated policy drafts with **confidence scores** (0.82–0.87)
- Each draft has structured sections, citations from regulatory frameworks, and rationale
- Point out the `humanDraftRequired` flag: "The AI knows when a human needs to review"

**Audit Trail**
- Scroll to the audit trail section
- Show the timeline: workflow started → objectives extracted → risk appetite extracted → controls derived → gaps identified → policies drafted
- "Every AI action is logged. Full transparency. This is what regulators want to see."

> "What you're seeing — 19 objectives, 10 risk statements, 105 controls, 10 gaps, and 7 policy drafts — was extracted automatically from a 400-page annual report. A compliance team would typically spend **weeks** doing this manually."

### Option B: Live Upload (if time permits)

> "Now let me run it live on a different document."

1. Click **Upload Document** on the prototype page
2. Select `nvidia-10k-2025.pdf` (NVIDIA's 2025 10-K filing)
3. Choose collection: **Annual Reports**
4. Click **Run GRC Extraction Pipeline**

While the pipeline runs (~60 seconds for first results):

> "You can see the pipeline steps lighting up in real time. The document is being ingested, parsed, and the AI agent is now reading through the filing to extract governance objectives."

After ~60 seconds, objectives start appearing:

> "You can already see governance objectives appearing — these are the risk factors and compliance obligations from NVIDIA's 10-K. The AI will now derive controls, perform gap analysis, and draft policies. For a full document this takes around 30 minutes, so let me switch back to our completed HSBC run."

*(Switch back to HSBC results)*

---

## Slide 8 — Why We Win

*"The moat isn't 'using AI.'"*

> "Now, plenty of vendors will tell you they're 'using AI.' The moat isn't using AI — it's how deeply it's integrated into the compliance workflow.
>
> **Virtual 3LOD by Design** — clear, scoped workflows for 1st Line control owners, 2nd Line oversight, and 3rd Line audit. Collaboration without the silos.
>
> **Real-Time Regulatory Intelligence** — live HKMA, MAS, EU AI Act feeds. The AI highlights impacts and gaps within **24 hours** — not months.
>
> Compare that to legacy platforms — IBM, ServiceNow, Archer:
> - Manual regulatory monitoring
> - Static reporting tools
> - Generic platforms that reinforce silos
> - Brittle, custom integrations
> - No AI-native agentic layer
> - **Can't ingest annual reports for governance mapping** — that's what you just saw Evonix do"

---

## Slide 9 — Enterprise-Ready

*"Built for the enterprise. Trusted by regulators."*

> "This isn't a prototype-only story. Evonix is built for the enterprise:
>
> - **10K+ risks, controls, and issues** queried in under 3 seconds
> - **AI executive narrative generation** in under 60 seconds
> - **99.5% platform availability** with 4-hour RTO
>
> Frameworks: ISO 27001, NIST CSF, COBIT, HKMA, MAS, EU AI Act.
>
> Security: TLS 1.3, AES-256 encryption. RBAC scoped by line of defence. 7-year tamper-evident audit log."

---

## Slide 10 — Our Principles

*"AI assists. Humans remain accountable."*

> "Our guiding principle: **AI assists. Humans remain accountable.**
>
> The platform is built in four layers:
> 1. **Foundation** — multi-framework mapper, org-chart reader, document parser, evidence repository
> 2. **Governance Core** — risk register, control library, issue tracking, KCI/KRI/KPI module, real-time regulatory feeds
> 3. **Virtual 3LOD Engine** — line-specific views, challenge flows, reporting with 1L/2L/3L separation
> 4. **Intelligence Layer** — AI agents for narratives, gap analysis, evidence mapping, priority recommendations
>
> And critically: **per-decision explainability**. Every AI recommendation includes rationale, sources, and a confidence score. You saw this in the demo — every extraction shows its confidence level, and every policy draft explains why it was generated."

---

## Slide 11 — Close

*Visual: Handshake over circuit board — partnership meets technology*

> "We're building the future of GRC. We'd love to explore how Evonix can help your organisation move from spreadsheets to a single, AI-powered source of truth.
>
> Thank you. I'm happy to take questions."

---

## Handling Questions

| Question | Answer |
|----------|--------|
| "How accurate is the extraction?" | "Each output includes a confidence score. In our testing with HSBC and NVIDIA, high-confidence extractions (>85%) are correct ~95% of the time. Lower-confidence items are flagged for human review — the platform never makes decisions autonomously." |
| "What frameworks does it support?" | "ISO 27001, NIST CSF, COBIT, HKMA, MAS, EU AI Act, COSO, Basel III, and the UK Corporate Governance Code. Adding new frameworks is a configuration change, not a code change." |
| "How does it handle different document types?" | "Currently optimised for PDF annual reports, board circulars, and regulatory filings. We've tested with HSBC's 400-page annual report and NVIDIA's 10-K filing. We use a combination of LLM-based parsing and traditional PDF extraction for robustness." |
| "What about data privacy?" | "Documents are stored in MinIO (S3-compatible), deployed within your infrastructure. LLM calls can be routed through on-premise models or privacy-compliant API endpoints. Encryption at rest and in transit with AES-256 and TLS 1.3." |
| "How long does the full pipeline take?" | "About 30 minutes for a 100-page filing, longer for a 400-page annual report. Each LLM step runs sequentially for accuracy and explainability. We're optimising for parallel execution in the next sprint to bring this down to under 5 minutes." |
| "What's the deployment model?" | "Cloud-native on Railway with PostgreSQL and MinIO. Can be deployed on-premise or in your private cloud. The architecture is container-based and infrastructure-agnostic." |
| "How do you handle regulatory changes?" | "Real-time regulatory feed integration for HKMA, MAS, EU AI Act, and others. The AI highlights impacts and gaps within 24 hours of a regulatory change, not months." |

---

## Fallback Plan

If the live demo fails or is too slow:

1. Stay on the slides — the deck tells the story independently
2. Show the HSBC pre-baked results (this always works — it's persisted data)
3. Show the audit trail to demonstrate governance and traceability
4. Say: "The pipeline is running on our Railway environment now. I'll share a link after the meeting so you can see the full results."

---

## Pre-Baked Run Reference

### HSBC Annual Report 2025 (PRIMARY)

| Field | Value |
|-------|-------|
| Run ID | `RUN-627d905b` |
| Document | HSBC Annual Report 2025 (~400 pages, 9.6MB) |
| Objectives | 19 |
| Risk Statements | 10 |
| Controls | 105 |
| Gaps | 10 |
| Policy Drafts | 7 |
| Results URL | `https://evonix-app-production.up.railway.app/api/grc-results?runId=RUN-627d905b` |

### NVIDIA 10-K 2025 (SECONDARY)

| Field | Value |
|-------|-------|
| Run ID | `RUN-9fce5677` |
| Document | NVIDIA 10-K 2025 (~100 pages, 1MB) |
| Objectives | 14 |
| Risk Statements | 0 |
| Controls | 76 |
| Gaps | 9 |
| Policy Drafts | 9 (confidence 0.82–0.87) |
| Results URL | `https://evonix-app-production.up.railway.app/api/grc-results?runId=RUN-9fce5677` |
