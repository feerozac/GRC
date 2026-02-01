const path = require("path");
const PptxGenJS = require("pptxgenjs");

const outPath = path.join(__dirname, "wireframes.pptx");
const pres = new PptxGenJS();
pres.layout = "LAYOUT_WIDE";
pres.title = "Agentic AI GRC Wireframes";

const COLORS = {
  bg: "0B0F1A",
  panel: "0F172A",
  line: "22304A",
  text: "E2E8F0",
  muted: "94A3B8",
  blue: "38BDF8",
  teal: "22D3EE",
  purple: "A855F7",
  green: "34D399"
};

function addChrome(slide, title) {
  slide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 13.333, h: 7.5, fill: { color: COLORS.bg }, line: { color: COLORS.bg } });
  slide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 13.333, h: 0.7, fill: { color: COLORS.panel }, line: { color: COLORS.panel } });
  slide.addText(title, { x: 0.5, y: 0.12, w: 12, h: 0.4, fontSize: 18, bold: true, color: COLORS.text });
}

function addCard(slide, x, y, w, h, title) {
  slide.addShape(pres.ShapeType.roundRect, { x, y, w, h, fill: { color: COLORS.panel }, line: { color: COLORS.line, width: 1 }, radius: 0.06 });
  slide.addText(title, { x: x + 0.15, y: y + 0.1, w: w - 0.3, h: 0.3, fontSize: 10, color: COLORS.muted });
}

function addHomeWireframe() {
  const slide = pres.addSlide();
  addChrome(slide, "Home Dashboard — Wireframe");

  // Left nav
  slide.addShape(pres.ShapeType.rect, { x: 0.2, y: 0.9, w: 2.0, h: 6.3, fill: { color: COLORS.panel }, line: { color: COLORS.line } });
  slide.addText("Nav", { x: 0.4, y: 1.1, w: 1.6, h: 0.3, fontSize: 10, color: COLORS.muted });

  // Top bar
  slide.addShape(pres.ShapeType.roundRect, { x: 2.4, y: 0.9, w: 10.6, h: 0.6, fill: { color: COLORS.panel }, line: { color: COLORS.line }, radius: 0.06 });
  slide.addText("Entity | Search | Alerts/User", { x: 2.7, y: 1.05, w: 9.8, h: 0.3, fontSize: 10, color: COLORS.muted });

  // KPI row
  const kpiY = 1.7;
  const kpiW = 2.5;
  const kpiH = 1.0;
  for (let i = 0; i < 4; i++) {
    addCard(slide, 2.4 + i * (kpiW + 0.2), kpiY, kpiW, kpiH, "KPI");
  }

  // Trends + AI Highlights
  addCard(slide, 2.4, 3.0, 7.0, 3.2, "Trends");
  addCard(slide, 9.6, 3.0, 3.4, 3.2, "AI Highlights");
}

function addBoardroomWireframe() {
  const slide = pres.addSlide();
  addChrome(slide, "Boardroom → Control Objectives — Wireframe");

  // Flow
  for (let i = 0; i < 4; i++) {
    addCard(slide, 0.6 + i * 3.1, 1.0, 2.7, 0.7, "Step");
  }

  // Row 1
  addCard(slide, 0.6, 2.1, 6.2, 2.0, "Boardroom Inputs");
  addCard(slide, 7.0, 2.1, 5.7, 2.0, "Extracted Themes");

  // Row 2
  addCard(slide, 0.6, 4.3, 6.2, 2.0, "Governance Objectives");
  addCard(slide, 7.0, 4.3, 5.7, 2.0, "Control Objectives");
}

addHomeWireframe();
addBoardroomWireframe();

pres.writeFile({ fileName: outPath }).then(() => {
  console.log("Saved:", outPath);
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
