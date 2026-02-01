const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const PptxGenJS = require("pptxgenjs");
const outPath = path.join(__dirname, "GRC agent.pptx");

const pres = new PptxGenJS();
pres.title = "Agentic AI GRC Platform — Product Brief";
pres.author = "Mark";
pres.subject = "Product Brief Summary";
pres.theme = { headFontFace: "Aptos Display", bodyFontFace: "Aptos", lang: "en-US" };
pres.layout = "LAYOUT_WIDE";
const robotImagePath = path.join(__dirname, "images", "agentic-robotic-transform-slide.png");
const robotImageGenerator = path.join(__dirname, "generate_robot_image.js");

const COLORS = {
  // Dark + neon AI-first palette
  canvas: "0B0F1A",
  panel: "0F172A",
  text: "E2E8F0",
  muted: "94A3B8",
  neonBlue: "38BDF8",
  neonTeal: "22D3EE",
  neonPurple: "A855F7",
  neonGreen: "34D399",
  neonAmber: "F59E0B",
  white: "FFFFFF"
};

function ensureRobotImage() {
  if (fs.existsSync(robotImagePath)) {
    return true;
  }
  const hasAwsCreds = Boolean(process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY)
    || Boolean(process.env.AWS_PROFILE);
  if (!hasAwsCreds) {
    return false;
  }
  try {
    execSync(`node "${robotImageGenerator}"`, { stdio: "inherit", env: process.env });
  } catch (err) {
    console.warn("Robot image generation failed, using fallback:", err.message);
    return false;
  }
  return fs.existsSync(robotImagePath);
}

function addChrome(slide, title) {
  slide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 13.333, h: 7.5, fill: { color: COLORS.canvas }, line: { color: COLORS.canvas } });
  slide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 13.333, h: 0.85, fill: { color: COLORS.panel }, line: { color: COLORS.panel } });
  slide.addText(title, { x: 0.6, y: 0.15, w: 11, h: 0.5, fontSize: 20, bold: true, color: COLORS.text });
  slide.addShape(pres.ShapeType.rect, { x: 0, y: 7.2, w: 13.333, h: 0.3, fill: { color: COLORS.neonBlue }, line: { color: COLORS.neonBlue } });
}

function addTitleSlide(title, subtitle) {
  const slide = pres.addSlide();
  slide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 13.333, h: 7.5, fill: { color: COLORS.canvas }, line: { color: COLORS.canvas } });
  slide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 13.333, h: 1.0, fill: { color: COLORS.panel }, line: { color: COLORS.panel } });
  slide.addText("Agentic AI GRC Platform", { x: 0.8, y: 1.9, w: 12, h: 0.7, fontSize: 38, bold: true, color: COLORS.text });
  slide.addText(title, { x: 0.8, y: 2.8, w: 12, h: 0.8, fontSize: 30, color: COLORS.text });
  if (subtitle) slide.addText(subtitle, { x: 0.8, y: 3.7, w: 12, h: 0.6, fontSize: 14, color: COLORS.muted });
  slide.addShape(pres.ShapeType.rect, { x: 0.8, y: 5.8, w: 4.8, h: 0.1, fill: { color: COLORS.neonPurple }, line: { color: COLORS.neonPurple } });
}

function addBulletSlide(title, bullets) {
  const slide = pres.addSlide();
  addChrome(slide, title);
  const list = bullets.map((b) => ({ text: b.length > 200 ? b.slice(0, 200) + "…" : b }));
  slide.addText(list, { x: 0.8, y: 1.2, w: 12, h: 5.8, fontSize: 16, color: COLORS.text, bullet: { indent: 20 } });
}

function addCard(slide, x, y, w, h, title, body, accent) {
  slide.addShape(pres.ShapeType.roundRect, { x, y, w, h, fill: { color: COLORS.panel }, line: { color: accent, width: 1 }, radius: 0.08 });
  slide.addShape(pres.ShapeType.rect, { x, y, w, h: 0.12, fill: { color: accent }, line: { color: accent } });
  slide.addText(title, { x: x + 0.2, y: y + 0.25, w: w - 0.4, h: 0.4, fontSize: 16, bold: true, color: COLORS.text });
  slide.addText(body, { x: x + 0.2, y: y + 0.75, w: w - 0.4, h: h - 1, fontSize: 12, color: COLORS.muted });
}

function addPillarsSlide(title, pillars) {
  const slide = pres.addSlide();
  addChrome(slide, title);
  const cardW = 3.8;
  const gap = 0.35;
  const startX = 0.7;
  const y = 1.3;
  pillars.forEach((p, i) => {
    addCard(slide, startX + i * (cardW + gap), y, cardW, 4.8, p.title, p.body, p.accent);
  });
}

function addGridSlide(title, items) {
  const slide = pres.addSlide();
  addChrome(slide, title);
  const cols = 2;
  const rows = 2;
  const w = 5.9;
  const h = 2.2;
  const gapX = 0.5;
  const gapY = 0.5;
  const startX = 0.7;
  const startY = 1.2;
  items.forEach((it, idx) => {
    const r = Math.floor(idx / cols);
    const c = idx % cols;
    addCard(
      slide,
      startX + c * (w + gapX),
      startY + r * (h + gapY),
      w,
      h,
      it.title,
      it.body,
      it.accent
    );
  });
}

function addCompetitorTableSlide(title, rows) {
  const slide = pres.addSlide();
  addChrome(slide, title);
  const header = [
    { text: "Vendor", options: { bold: true, color: COLORS.text } },
    { text: "Strength", options: { bold: true, color: COLORS.text } },
    { text: "Gap vs Proposal", options: { bold: true, color: COLORS.text } }
  ];
  const tableData = [header].concat(
    rows.map(r => [
      { text: r.vendor, options: { color: COLORS.text } },
      { text: r.strength, options: { color: COLORS.muted } },
      { text: r.gap, options: { color: COLORS.muted } }
    ])
  );
  slide.addTable(tableData, {
    x: 0.7,
    y: 1.2,
    w: 12,
    h: 5.6,
    colW: [2.6, 4.4, 5.0],
    border: { pt: 1, color: "334155" },
    fill: { color: COLORS.panel },
    fontSize: 12
  });
}

function addMetricSlide(title, metric, label, bullets) {
  const slide = pres.addSlide();
  addChrome(slide, title);
  slide.addShape(pres.ShapeType.roundRect, { x: 0.8, y: 1.3, w: 4.6, h: 2.2, fill: { color: COLORS.panel }, line: { color: COLORS.neonBlue, width: 1 }, radius: 0.08 });
  slide.addText(metric, { x: 1.1, y: 1.5, w: 4.0, h: 0.9, fontSize: 44, bold: true, color: COLORS.neonBlue });
  slide.addText(label, { x: 1.1, y: 2.3, w: 4.0, h: 0.5, fontSize: 14, color: COLORS.muted });
  const list = bullets.map((b) => ({ text: b }));
  slide.addText(list, { x: 5.8, y: 1.4, w: 6.8, h: 4.8, fontSize: 16, color: COLORS.text, bullet: { indent: 20 } });
}

function addStackedLODSlide(title) {
  const slide = pres.addSlide();
  addChrome(slide, title);
  const blocks = [
    { label: "3L — Independent Assurance", body: "Audit plan · Control testing · Findings · Assurance opinion", color: COLORS.neonPurple },
    { label: "2L — Oversight & Challenge", body: "Risk oversight · Challenge flow · Priorities & metrics", color: COLORS.neonBlue },
    { label: "1L — Operational Ownership", body: "Controls · Evidence · Issues · Attestations", color: COLORS.neonTeal }
  ];
  blocks.forEach((b, i) => {
    const y = 1.4 + i * 1.65;
    slide.addShape(pres.ShapeType.roundRect, { x: 0.9, y, w: 11.8, h: 1.35, fill: { color: COLORS.panel }, line: { color: b.color, width: 1 }, radius: 0.08 });
    slide.addShape(pres.ShapeType.rect, { x: 0.9, y, w: 0.18, h: 1.35, fill: { color: b.color }, line: { color: b.color } });
    slide.addText(b.label, { x: 1.2, y: y + 0.18, w: 11, h: 0.4, fontSize: 16, bold: true, color: COLORS.text });
    slide.addText(b.body, { x: 1.2, y: y + 0.65, w: 11, h: 0.4, fontSize: 12, color: COLORS.muted });
  });
}

function addPipelineSlide(title, steps) {
  const slide = pres.addSlide();
  addChrome(slide, title);
  const startX = 0.7;
  const y = 2.1;
  const w = 1.55;
  const h = 1.0;
  const gap = 0.25;
  steps.forEach((s, i) => {
    const x = startX + i * (w + gap);
    slide.addShape(pres.ShapeType.roundRect, { x, y, w, h, fill: { color: COLORS.panel }, line: { color: s.accent, width: 1 }, radius: 0.08 });
    slide.addShape(pres.ShapeType.rect, { x, y, w, h: 0.1, fill: { color: s.accent }, line: { color: s.accent } });
    slide.addText(s.label, { x: x + 0.08, y: y + 0.28, w: w - 0.16, h: 0.6, fontSize: 12, bold: true, color: COLORS.text, align: "center" });
    if (i < steps.length - 1) {
      slide.addShape(pres.ShapeType.line, { x: x + w + 0.02, y: y + 0.5, w: gap - 0.04, h: 0, line: { color: COLORS.muted, width: 2 } });
      slide.addShape(pres.ShapeType.triangle, { x: x + w + gap - 0.12, y: y + 0.42, w: 0.12, h: 0.16, fill: { color: COLORS.muted }, line: { color: COLORS.muted } });
    }
  });
  slide.addText("Round‑trip governance: intent → objectives → controls → proof", { x: 0.7, y: 3.5, w: 12, h: 0.4, fontSize: 14, color: COLORS.muted });
}

function addRobotVisualSlide() {
  const slide = pres.addSlide();
  if (ensureRobotImage()) {
    slide.addImage({ path: robotImagePath, x: 0, y: 0, w: 13.333, h: 7.5 });
    slide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 13.333, h: 0.85, fill: { color: COLORS.panel }, line: { color: COLORS.panel } });
    slide.addText("From Human Intent to Audit‑Ready Output", { x: 0.6, y: 0.15, w: 11, h: 0.5, fontSize: 20, bold: true, color: COLORS.text });
    slide.addShape(pres.ShapeType.rect, { x: 0, y: 7.2, w: 13.333, h: 0.3, fill: { color: COLORS.neonBlue }, line: { color: COLORS.neonBlue } });
    return;
  }

  addChrome(slide, "From Human Intent to Audit‑Ready Output");

  // Humanoid (left)
  slide.addShape(pres.ShapeType.ellipse, { x: 0.9, y: 2.0, w: 0.9, h: 0.9, fill: { color: COLORS.neonTeal }, line: { color: COLORS.neonTeal } });
  slide.addShape(pres.ShapeType.roundRect, { x: 0.75, y: 2.9, w: 1.2, h: 1.5, fill: { color: COLORS.panel }, line: { color: COLORS.neonTeal, width: 2 }, radius: 0.12 });
  slide.addText("Human\nIntent", { x: 0.55, y: 4.5, w: 1.6, h: 0.6, fontSize: 12, color: COLORS.text, align: "center" });

  // Data streams to robots
  slide.addShape(pres.ShapeType.line, { x: 2.2, y: 2.5, w: 2.0, h: 0.2, line: { color: COLORS.neonBlue, width: 2 } });
  slide.addShape(pres.ShapeType.line, { x: 2.2, y: 3.2, w: 2.0, h: 0.2, line: { color: COLORS.neonPurple, width: 2 } });
  slide.addShape(pres.ShapeType.line, { x: 2.2, y: 3.9, w: 2.0, h: 0.2, line: { color: COLORS.neonGreen, width: 2 } });

  // Robots (center)
  const robotXs = [4.5, 6.2, 7.9];
  const robotColors = [COLORS.neonBlue, COLORS.neonPurple, COLORS.neonGreen];
  robotXs.forEach((x, i) => {
    slide.addShape(pres.ShapeType.roundRect, { x, y: 2.2, w: 1.2, h: 1.4, fill: { color: COLORS.panel }, line: { color: robotColors[i], width: 2 }, radius: 0.1 });
    slide.addShape(pres.ShapeType.ellipse, { x: x + 0.35, y: 2.45, w: 0.5, h: 0.5, fill: { color: robotColors[i] }, line: { color: robotColors[i] } });
    slide.addShape(pres.ShapeType.rect, { x: x + 0.25, y: 2.95, w: 0.7, h: 0.12, fill: { color: robotColors[i] }, line: { color: robotColors[i] } });
  });
  slide.addText("Agentic\nRobots", { x: 4.3, y: 3.8, w: 4.8, h: 0.6, fontSize: 12, color: COLORS.text, align: "center" });

  // Output: Papers (right upper)
  slide.addShape(pres.ShapeType.rect, { x: 10.2, y: 2.0, w: 2.0, h: 2.2, fill: { color: COLORS.panel }, line: { color: COLORS.neonBlue, width: 2 } });
  slide.addShape(pres.ShapeType.line, { x: 10.4, y: 2.4, w: 1.6, h: 0, line: { color: COLORS.neonBlue, width: 1 } });
  slide.addShape(pres.ShapeType.line, { x: 10.4, y: 2.8, w: 1.6, h: 0, line: { color: COLORS.neonBlue, width: 1 } });
  slide.addShape(pres.ShapeType.line, { x: 10.4, y: 3.2, w: 1.6, h: 0, line: { color: COLORS.neonBlue, width: 1 } });
  slide.addText("Paper", { x: 10.2, y: 4.3, w: 2.0, h: 0.4, fontSize: 12, color: COLORS.text, align: "center" });

  // Output: Processes (right lower) as flow nodes
  slide.addShape(pres.ShapeType.ellipse, { x: 10.4, y: 4.9, w: 0.5, h: 0.5, fill: { color: COLORS.neonPurple }, line: { color: COLORS.neonPurple } });
  slide.addShape(pres.ShapeType.ellipse, { x: 11.1, y: 5.4, w: 0.5, h: 0.5, fill: { color: COLORS.neonPurple }, line: { color: COLORS.neonPurple } });
  slide.addShape(pres.ShapeType.ellipse, { x: 11.8, y: 4.9, w: 0.5, h: 0.5, fill: { color: COLORS.neonPurple }, line: { color: COLORS.neonPurple } });
  slide.addShape(pres.ShapeType.line, { x: 10.65, y: 5.15, w: 0.55, h: 0.35, line: { color: COLORS.neonPurple, width: 1 } });
  slide.addShape(pres.ShapeType.line, { x: 11.35, y: 5.4, w: 0.5, h: 0.2, line: { color: COLORS.neonPurple, width: 1 } });
  slide.addText("Processes", { x: 10.2, y: 5.95, w: 2.0, h: 0.4, fontSize: 12, color: COLORS.text, align: "center" });
}

addTitleSlide("C‑Suite Outcome Brief", "Agentic AI GRC · Audit‑ready, regulator‑friendly, time‑saving");
addRobotVisualSlide();

addPillarsSlide("Vision — Outcomes", [
  { title: "Audit‑Ready, Fast", body: "From scattered evidence to board‑ready reporting in hours, not weeks.", accent: COLORS.neonBlue },
  { title: "Accountable by Design", body: "Human‑validated decisions with clear 1L/2L/3L ownership and audit trails.", accent: COLORS.neonTeal },
  { title: "Regulator‑Friendly", body: "Explainable, traceable outputs aligned to changing requirements.", accent: COLORS.neonPurple }
]);

addPillarsSlide("Vision — Governance Exoskeleton", [
  { title: "Strategy In", body: "Ingest exec statements, board papers, and strategy documents.", accent: COLORS.neonBlue },
  { title: "Governance Translated", body: "Objectives → policies → standards → org/process mapping.", accent: COLORS.neonTeal },
  { title: "Proof Out", body: "Metrics to logs: KCIs/KRIs/KPIs tied to evidence.", accent: COLORS.neonPurple }
]);

addPillarsSlide("Three Themes — The Experience", [
  { title: "Explainability by Design", body: "Ethics‑encoded agents. Every decision is transparent and auditable.", accent: COLORS.neonBlue },
  { title: "GRC with Personality", body: "Agents collaborate with teams — not just automate tasks.", accent: COLORS.neonTeal },
  { title: "Metrics Made Human", body: "Numbers translated into actions leaders can trust.", accent: COLORS.neonPurple }
]);

addPipelineSlide("Governance Exoskeleton — Round‑Trip Flow", [
  { label: "Strategy\nInputs", accent: COLORS.neonBlue },
  { label: "Gov\nObjectives", accent: COLORS.neonTeal },
  { label: "Policies", accent: COLORS.neonPurple },
  { label: "Standards\n& Controls", accent: COLORS.neonTeal },
  { label: "Org +\nProcess", accent: COLORS.neonGreen },
  { label: "Metrics\nKCI/KRI/KPI", accent: COLORS.neonAmber },
  { label: "Evidence\n& Logs", accent: COLORS.neonBlue }
]);

addPillarsSlide("Problem — The Cost of Fragmentation", [
  { title: "Slow & Reactive", body: "Audit prep is manual; reporting cycles lag regulatory change.", accent: COLORS.neonAmber },
  { title: "Low Confidence", body: "Evidence is scattered; governance decisions are hard to explain.", accent: COLORS.neonBlue },
  { title: "Misaligned Metrics", body: "KRIs/KPIs exist but aren’t tied to strategy or outcomes.", accent: COLORS.neonPurple }
]);

addPillarsSlide("Why Agents Now", [
  { title: "Specialist Scarcity", body: "Risk and compliance teams are costly and stretched.", accent: COLORS.neonBlue },
  { title: "Human Judgement, Amplified", body: "Agents absorb repetitive work; experts focus on decisions.", accent: COLORS.neonTeal },
  { title: "Always‑On Governance", body: "Continuous oversight replaces quarterly scramble cycles.", accent: COLORS.neonPurple }
]);

addPillarsSlide("Solution — How Outcomes Happen", [
  { title: "Single Source of Truth", body: "Risk, controls, issues, and evidence in one place — always audit‑ready.", accent: COLORS.neonBlue },
  { title: "Human‑in‑the‑Loop", body: "Checkpoints and escalation keep accountability while agents automate work.", accent: COLORS.neonTeal },
  { title: "Regulatory Intelligence", body: "Near real‑time change ingestion and automated gap prioritisation.", accent: COLORS.neonPurple }
]);

addMetricSlide("Business Value", "HOURS", "Board‑ready in hours, not weeks", [
  "Time saved: reporting cycles cut dramatically.",
  "Risk reduced: earlier detection, faster remediation.",
  "Regulatory confidence: explainable, traceable outputs.",
  "Cost avoidance: fewer manual hours and less compliance overhead.",
  "Board confidence: clear, consistent narratives and priorities.",
  "Metrics made human: actions, not just numbers."
]);

addPillarsSlide("Regulator Confidence", [
  { title: "Immutable Audit Trails", body: "Tamper‑evident records of AI decisions and control actions.", accent: COLORS.neonBlue },
  { title: "Explainability by Design", body: "Plain‑language + technical rationale, ethics‑encoded.", accent: COLORS.neonTeal },
  { title: "Traceable Evidence", body: "Mapped to controls and requirements with real‑time updates.", accent: COLORS.neonPurple }
]);

addPillarsSlide("Board‑Defensible by Design", [
  { title: "Accountability Built‑In", body: "Human‑in‑the‑loop checkpoints for high‑risk actions.", accent: COLORS.neonBlue },
  { title: "Explainability at Scale", body: "Decisions are transparent, reproducible, and auditable.", accent: COLORS.neonTeal },
  { title: "Automation Without Dilution", body: "Work is automated while governance rigor stays intact.", accent: COLORS.neonPurple }
]);

addBulletSlide("Defenses to Key Challenges", [
  "Liability: human‑in‑the‑loop gates for high‑risk decisions; approvals mapped to 1L/2L/3L.",
  "Explainability at scale: plain‑language executive narrative + technical rationale on demand.",
  "Cost vs trust: automation handles repeatable work; assurance strengthened by continuous evidence.",
  "Strategy → metrics: multi‑source interpretation with human validation and standards mapping.",
  "3LOD trust: persona‑aligned agents preserve independence; transparent challenge flow."
]);

addCompetitorTableSlide("Competitive Landscape (Snapshot)", [
  { vendor: "IBM OpenPages", strength: "Agentic AI + enterprise scale", gap: "No org‑mapping; no doc‑driven governance" },
  { vendor: "ServiceNow GRC", strength: "AI orchestration + integrations", gap: "3LOD not first‑class; no exoskeleton" },
  { vendor: "AuditBoard", strength: "AI‑first + evidence automation", gap: "No org‑mapping; KRI/KPI not agent‑driven" },
  { vendor: "Diligent", strength: "Board reporting + AI suite", gap: "No strategy→governance mapping" },
  { vendor: "MetricStream", strength: "Regulatory intelligence (750+)", gap: "No APAC 24h SLA; no doc‑governance" }
]);

addPillarsSlide("Why They Can’t Copy Fast", [
  { title: "Architecture Debt", body: "Incumbents built for workflows, not agent‑first governance.", accent: COLORS.neonBlue },
  { title: "APAC Focus Gap", body: "HKMA/MAS near‑real‑time intelligence is under‑served.", accent: COLORS.neonTeal },
  { title: "Governance Exoskeleton", body: "Strategy→objectives→policies→metrics→logs is a new data model.", accent: COLORS.neonPurple }
]);

addGridSlide("SWOT — Agentic AI GRC", [
  { title: "Strengths", body: "Org‑mapping, doc‑governance, first‑class 3LOD, agent‑driven priorities, APAC 24h SLA.", accent: COLORS.neonBlue },
  { title: "Weaknesses", body: "New entrant, fewer integrations, credibility to establish.", accent: COLORS.neonTeal },
  { title: "Opportunities", body: "AI adoption surge, APAC regtech demand, 3LOD gap in market.", accent: COLORS.neonPurple },
  { title: "Threats", body: "Incumbent lock‑in, fast‑followers, procurement bias.", accent: COLORS.neonAmber }
]);

addMetricSlide("Proposal Ranking", "9.5/10", "Best fit to the vision vs incumbents", [
  "Unique differentiators: org‑mapping, doc‑governance, agent‑driven KRI/KPI, first‑class 3LOD.",
  "Near real‑time APAC regulatory intelligence.",
  "Main gap: market presence — solved via lighthouse customers."
]);

addStackedLODSlide("Accountability by Design (3LOD)");

addPillarsSlide("Who It Serves", [
  { title: "C‑Suite & Board", body: "Clear, consistent, regulator‑friendly reporting and priorities.", accent: COLORS.neonBlue },
  { title: "Risk & Compliance", body: "Faster cycles, fewer surprises, evidence‑ready assurance.", accent: COLORS.neonTeal },
  { title: "Regulatory Affairs", body: "Near real‑time change tracking and impact visibility.", accent: COLORS.neonPurple }
]);

addBulletSlide("Core Use Cases (1–6)", [
  "1. Board‑ready reporting on demand.",
  "2. Regulatory change ingestion + instant gap analysis.",
  "3. Evidence mapped to controls and requirements.",
  "4. End‑to‑end remediation tracking with accountability.",
  "5. Human‑validated escalation for high‑risk decisions.",
  "6. 3LOD views with challenge flow and audit trails."
]);

addBulletSlide("Outcome Use Cases (7–11)", [
  "7. Governance ROI dashboards and maturity benchmarking.",
  "8. Predictive risk horizon scanning (SEC, HKMA, EU Digital Act).",
  "9. Governance fit assessment vs COBIT/NIST/PCI DSS/ISO 27k.",
  "10. Ethics scoring and socially responsible governance decisions.",
  "11. Org‑aligned ownership with process‑to‑org mapping."
]);

addPillarsSlide("Assurance & Compliance Posture", [
  { title: "Audit‑Proof", body: "Tamper‑evident trails; optional blockchain ledger.", accent: COLORS.neonBlue },
  { title: "Explainable", body: "Regulator‑ready reports with plain + technical rationale.", accent: COLORS.neonTeal },
  { title: "Secure & Resilient", body: "Encryption, RBAC by 3LOD, 99.5% availability.", accent: COLORS.neonPurple }
]);

addTitleSlide("Thank you", "Agentic AI GRC Platform · Product vision for roadmap, epics, and NFRs");

pres.writeFile({ fileName: outPath }).then(() => {
  console.log("Saved:", outPath);
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
