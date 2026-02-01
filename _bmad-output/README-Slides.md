# Product Brief — Slide Deck & PowerPoint

The product brief has been summarised into slide-ready formats. Use one of the options below to get a **PowerPoint file (.pptx)**.

---

## Option 1: Marp → PowerPoint (recommended)

1. Open **`Agentic-AI-GRC-Product-Brief-Slides.md`** in VS Code.
2. Install the **Marp for VS Code** extension (if not already installed).
3. Use **Marp: Export Slide Deck** and choose **PowerPoint (.pptx)**.
   - Or from terminal (with Node/npm):  
     `npx @marp-team/marp-cli Agentic-AI-GRC-Product-Brief-Slides.md -o Agentic-AI-GRC-Product-Brief.pptx`
4. The generated **`Agentic-AI-GRC-Product-Brief.pptx`** will be in the same folder (or the path you chose).

---

## Option 2: Node.js script (pptxgenjs)

1. From the project root, install the dependency and run the script:
   ```bash
   npm install pptxgenjs --no-save
   node _bmad-output/build_ppt.js
   ```
2. The script writes **`_bmad-output/Agentic-AI-GRC-Product-Brief.pptx`**.

---

## Option 3: HTML → copy into PowerPoint or PDF

1. Open **`Agentic-AI-GRC-Product-Brief-Slides.html`** in a browser.
2. **To get PowerPoint:** Create a new presentation and copy each “slide” section (title + bullets) into a new slide.
3. **To get PDF:** Use the browser’s **Print → Save as PDF** (one “slide” per page).

---

## Files in this folder

| File | Description |
|------|-------------|
| `agentic-ai-grc-product-brief.md` | Full product brief (source). |
| `Agentic-AI-GRC-Product-Brief-Slides.md` | Marp markdown slide deck (12 slides). |
| `Agentic-AI-GRC-Product-Brief-Slides.html` | HTML slide deck (same content; open in browser). |
| `build_ppt.js` | Node script to generate .pptx (requires `pptxgenjs`). |
| `build_ppt.py` | Python script to generate .pptx (requires `python-pptx`). |

Slide content covers: Vision, Problem, Solution, Value Proposition, Differentiators, Virtual 3LOD, Personas, Top Use Cases (1–11), NFRs (summary), and closing.
