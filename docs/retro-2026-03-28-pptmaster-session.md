# Session Retrospective: PPTMaster + Mies Agent Build

**Date:** 27-28 March 2026
**Participants:** Mark Syed, Claude (Cursor Agent)
**Duration:** ~2 days (extended session)

---

## What We Set Out To Do

Transform a scrappy Python-pptx template filler (PPTMaster) into a production-grade, AI-powered presentation platform — and along the way, create a reusable BMAD agent persona (Mies) that generates investor-quality Slidev decks.

---

## What We Actually Built

### 1. Evonix Pitch Deck (Manual — the "Reference Standard")

Started by hand-crafting a 14-slide Evonix investor pitch deck in Slidev with a cinematic dark theme. This became the quality benchmark that PPTMaster needs to match.

**Key decisions made iteratively:**
- Rejected the default vanilla Slidev look — rebuilt with custom CSS design system
- Rejected a light/cream "Subtextly" redesign — reverted to dark theme
- Adopted "Airbnb-style" design philosophy: one idea per slide, no emoji, bold opinionated headlines, human tone
- Added founder page with real photo, bio, credentials
- Deployed to Netlify (separate project to preserve the prototype site)

**Output:** Live at Netlify + PDF export, 348-line `slides.md` + 179-line `style.css`

### 2. Mies — BMAD Slidev Deck Designer Agent

Created a permanent BMAD agent (`slidev-deck-designer.md`, 287 lines) with:
- Persona: "Less is more" — named after Mies van der Rohe
- Design principles codified from the manual deck-building experience
- Headline quality standards (WEAK vs. STRONG examples)
- Brief fidelity rules (preserve all biographical specifics)
- Competitive positioning knowledge
- Content depth standards (stats, demo, moat slide requirements)
- Activation flow, command structure, and review/critique prompts

### 3. PPTMaster v3.0 — Complete Platform Rebuild

Went from a `python-pptx` template filler to a Slidev-based generation platform. ~2,954 lines of new application code across 9 key files.

**Architecture:**
```
User Brief → Mies (3-pass LLM pipeline) → Slidev Markdown → Build → PDF/PPTX/HTML
                                              ↕
                                    Replicate Flux (images)
```

**Backend (FastAPI):**
- `llm_service.py` (483 lines) — Mies persona + three-pass pipeline (outline → full deck → self-critique)
- `slidev_service.py` (576 lines) — Orchestrates workspace, build, export, async job tracking
- `image_service.py` (169 lines) — Replicate Flux integration with rate limiting and retry
- `pptx_export_service.py` (49 lines) — PDF-to-PPTX conversion via pdf2image
- `theme_service.py` (195 lines) — Predefined design themes with CSS
- `main.py` (313 lines) — 15 API endpoints

**Frontend (vanilla JS):**
- Dark-themed single-page app with theme selection, progress ring, live iframe preview
- Asset upload zone (drag-and-drop photos/logos)
- "Ask Mies to Review" — structured quality critique
- "Refine this deck" — iterative feedback loop

### 4. Feature Set Delivered

| Feature | Status |
|---------|--------|
| Async generation with progress indicators | Done |
| Live browser preview (iframe) | Done |
| PDF export | Done |
| PPTX export (via pdf2image) | Done |
| Markdown download | Done |
| AI image generation (Replicate Flux) | Done |
| Asset upload (photos/logos for founder slide) | Done |
| Iterative refinement (user challenges → Mies revises) | Done |
| Mies quality review (structured critique with grade) | Done |
| Three-pass generation (outline → deck → self-critique) | Done |
| Mermaid diagram support | Done |
| Railway deployment config (Docker) | Done |

---

## What Went Well

1. **The manual-first approach paid off.** Building the Evonix deck by hand before automating gave us a concrete quality target. Every Mies rule came from a real design decision.

2. **Iterative prompt engineering was effective.** The three-pass pipeline (outline → full deck → self-critique) dramatically improved output quality vs. single-shot generation.

3. **The refinement loop is genuinely useful.** Being able to say "the founder bio says 'regulator' — that's wrong" and have Mies fix only that while preserving everything else solves a real problem with AI-generated content.

4. **Image generation integration landed well.** Standalone IMAGE marker detection (not just the two-line format) was a pragmatic fix for LLM output variability.

5. **Keeping the frontend vanilla (no framework) made iteration fast.** No build step, no HMR issues — just edit and reload.

---

## What Was Harder Than Expected

1. **LLM output unpredictability.** DeepSeek sometimes:
   - Invented product names not in the brief ("Sentry")
   - Generated malformed HTML attributes (`style="...content..."`)
   - Dropped IMAGE markers entirely despite explicit instructions
   - Exceeded `max_tokens` limits (8192 for DeepSeek)
   - Each required a specific fix (sanitiser, prompt reinforcement, critique checklist item)

2. **Slidev + Mermaid + CSS variables don't mix.** Mermaid renders SVGs that can't resolve CSS custom properties like `var(--accent)`. Required a regex-based CSS variable replacement in `_sanitize_markdown()`.

3. **PDF export timeouts.** Complex slides with Mermaid diagrams caused Playwright timeouts. Required both increasing subprocess timeouts (180s) and adding `--timeout 60000` to the Slidev export command.

4. **Replicate rate limiting.** Flux Schnell API returns 429s aggressively. Required 12-second delays between images + exponential backoff retry logic.

5. **Railway deployment.** Multiple failed deploys due to:
   - `playwright-chromium` being too large (removed it)
   - Dockerfile CMD exec form not evaluating `${PORT}`
   - Missing `poppler-utils` for pdf2image
   - Python 3.9 type hint syntax (`str | None` vs `Optional[str]`)

6. **Gap between manual and automated quality.** Comparing the hand-crafted deck to PPTMaster output revealed specific weaknesses: generic headlines, dropped credentials, missing competitive positioning, shallow demo slides. Each required a targeted prompt engineering fix.

---

## What We'd Do Differently

1. **Start with the three-pass pipeline from day one.** The single-shot approach wasted several iterations before we realised outline-first was necessary.

2. **Build the review/critique feature earlier.** Having Mies audit its own work is the most efficient way to find prompt gaps — should have been step 2, not step N.

3. **Pin DeepSeek's max_tokens earlier.** The 8192 limit caused a production failure that could have been caught with a simple test.

4. **Docker-test locally before pushing to Railway.** Several deploy failures were avoidable with a local `docker build && docker run`.

5. **Define IMAGE marker format in a single canonical location.** The format was described in the system prompt, the outline prompt, the critique prompt, and the refine prompt — each slightly differently.

---

## Metrics

| Metric | Value |
|--------|-------|
| Commits (PPTMaster) | 26 |
| Commits (feerozac-grc) | ~20 |
| Application code written | ~2,954 lines (PPTMaster) + ~814 lines (deck + agent) |
| API endpoints | 15 |
| LLM passes per generation | 3 (outline, deck, critique) |
| External APIs integrated | 2 (DeepSeek, Replicate) |
| Bugs fixed in session | ~15 distinct issues |
| Design theme iterations | 3 (vanilla → light → dark cinematic) |
| Export formats | 3 (PDF, PPTX, Markdown) |

---

## Open Items / Next Steps

1. **Quality gap remains** — PPTMaster output is good but not yet matching the manually-crafted reference deck. Continued prompt engineering needed, especially on headline specificity and content depth.

2. **No automated testing** — No unit tests, no integration tests. The pipeline is fragile to LLM output changes.

3. **Railway deployment not verified end-to-end** — Docker config is in place but the full flow (generate → export → download) hasn't been validated on Railway since the v3 rebuild.

4. **Image generation is slow** — 12-second delays × 3-5 images = 60+ seconds just for images. Parallel generation (within rate limits) would help.

5. **Single LLM provider** — DeepSeek only. Adding fallback to another provider (Claude, GPT-4) would improve reliability.

6. **No persistence** — Job tracking is in-memory. Server restart loses all job state. Needs SQLite or similar.

7. **Mies agent spec and PPTMaster prompts are duplicated** — The BMAD agent file and `llm_service.py` contain overlapping but not identical knowledge. Should reconcile.

---

## Key Learnings

> "The quality of AI-generated output is directly proportional to the specificity of the prompt — and the best prompts come from doing the work manually first."

> "A self-critique pass is worth more than doubling the system prompt length."

> "Build the feedback loop (review + refine) before optimising the first-pass output."

---

*Retro recorded by: Claude (Cursor Agent)*
*Project: /Users/user/agentic-grc/PPTMaster*
*Reference deck: /Users/user/agentic-grc/feerozac-grc/presentations/*
