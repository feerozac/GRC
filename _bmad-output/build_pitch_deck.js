const fs = require("fs");
const path = require("path");
const PptxGenJS = require("pptxgenjs");

const outPath = path.join(__dirname, "Agentic-AI-GRC-Pitch-Deck.pptx");

const pres = new PptxGenJS();
pres.title = "Agentic AI GRC — Investor Pitch";
pres.author = "Mark";
pres.subject = "Seed/Series A Pitch Deck";
pres.theme = { headFontFace: "Aptos Display", bodyFontFace: "Aptos" };
pres.layout = "LAYOUT_WIDE";

// Dark + neon AI-first palette
const C = {
  bg: "0B0F1A",
  panel: "0F172A",
  text: "E2E8F0",
  muted: "94A3B8",
  blue: "38BDF8",
  teal: "22D3EE",
  purple: "A855F7",
  green: "34D399",
  amber: "F59E0B",
  red: "F87171",
  white: "FFFFFF"
};

// ─────────────────────────────────────────────────────────────
// HELPER FUNCTIONS
// ─────────────────────────────────────────────────────────────
function addDarkBg(slide) {
  slide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 13.333, h: 7.5, fill: { color: C.bg } });
}

function addAccentBar(slide, color = C.blue) {
  slide.addShape(pres.ShapeType.rect, { x: 0, y: 7.2, w: 13.333, h: 0.3, fill: { color } });
}

function addSlideNumber(slide, num, total) {
  slide.addText(`${num} / ${total}`, { x: 12.2, y: 7.0, w: 1, h: 0.3, fontSize: 10, color: C.muted });
}

// ─────────────────────────────────────────────────────────────
// SLIDE 1: TITLE — THE HOOK
// ─────────────────────────────────────────────────────────────
function slide01_Title() {
  const s = pres.addSlide();
  addDarkBg(s);
  
  // Dramatic centered title
  s.addText("Agentic AI GRC", { 
    x: 0, y: 2.5, w: 13.333, h: 1.2, 
    fontSize: 54, bold: true, color: C.text, align: "center" 
  });
  
  s.addText("Governance that thinks. Compliance that acts.", { 
    x: 0, y: 3.7, w: 13.333, h: 0.6, 
    fontSize: 24, color: C.blue, align: "center", italic: true 
  });
  
  s.addText("The only agent-first GRC platform for continuous governance", { 
    x: 0, y: 4.8, w: 13.333, h: 0.5, 
    fontSize: 16, color: C.muted, align: "center" 
  });
  
  // Accent bar
  s.addShape(pres.ShapeType.rect, { x: 5.5, y: 5.8, w: 2.333, h: 0.08, fill: { color: C.purple } });
  
  addAccentBar(s, C.purple);
  addSlideNumber(s, 1, 15);
}

// ─────────────────────────────────────────────────────────────
// SLIDE 2: THE PROBLEM — MAKE THEM FEEL IT
// ─────────────────────────────────────────────────────────────
function slide02_Problem() {
  const s = pres.addSlide();
  addDarkBg(s);
  
  s.addText("The Problem", { x: 0.8, y: 0.5, w: 12, h: 0.6, fontSize: 32, bold: true, color: C.text });
  
  // Big stat that hurts
  s.addShape(pres.ShapeType.roundRect, { 
    x: 0.8, y: 1.4, w: 5.5, h: 2.8, 
    fill: { color: C.panel }, line: { color: C.red, width: 2 }, radius: 0.1 
  });
  s.addText("60%", { x: 0.8, y: 1.6, w: 5.5, h: 1.2, fontSize: 72, bold: true, color: C.red, align: "center" });
  s.addText("of GRC team time spent on\nmanual coordination", { 
    x: 0.8, y: 2.9, w: 5.5, h: 0.8, fontSize: 16, color: C.muted, align: "center" 
  });
  
  // Pain points
  const pains = [
    { icon: "⏱", text: "Audit prep takes weeks, not hours", color: C.amber },
    { icon: "📋", text: "Evidence scattered across 12+ tools", color: C.amber },
    { icon: "🔄", text: "Regulatory change outpaces response", color: C.red },
    { icon: "💰", text: "Compliance teams cost $500K+/year", color: C.red },
    { icon: "❓", text: "Board asks: 'Are we compliant?' — no one knows instantly", color: C.red }
  ];
  
  pains.forEach((p, i) => {
    s.addText(p.icon + "  " + p.text, { 
      x: 7, y: 1.5 + i * 0.85, w: 5.5, h: 0.7, 
      fontSize: 16, color: p.color 
    });
  });
  
  s.addText("Traditional GRC tools digitize the paperwork.\nThey don't do the work.", { 
    x: 0.8, y: 5.5, w: 12, h: 0.8, fontSize: 20, color: C.text, italic: true 
  });
  
  addAccentBar(s, C.red);
  addSlideNumber(s, 2, 15);
}

// ─────────────────────────────────────────────────────────────
// SLIDE 3: THE SOLUTION — THE "AHA" MOMENT
// ─────────────────────────────────────────────────────────────
function slide03_Solution() {
  const s = pres.addSlide();
  addDarkBg(s);
  
  s.addText("The Solution", { x: 0.8, y: 0.5, w: 12, h: 0.6, fontSize: 32, bold: true, color: C.text });
  
  s.addText("AI agents that operate governance — not just organize it", { 
    x: 0.8, y: 1.2, w: 12, h: 0.5, fontSize: 20, color: C.blue 
  });
  
  // Three pillars
  const pillars = [
    { title: "1L Ops Agent", body: "Implements controls\nCollects evidence\nRuns self-assessments", color: C.blue },
    { title: "2L Risk Agent", body: "Monitors risk posture\nMaps to frameworks\nChallenges 1L work", color: C.purple },
    { title: "3L Audit Agent", body: "Independent testing\nValidates evidence\nGenerates assurance", color: C.green }
  ];
  
  pillars.forEach((p, i) => {
    const x = 0.8 + i * 4.1;
    s.addShape(pres.ShapeType.roundRect, { 
      x, y: 2.0, w: 3.8, h: 3.2, 
      fill: { color: C.panel }, line: { color: p.color, width: 2 }, radius: 0.1 
    });
    s.addShape(pres.ShapeType.rect, { x, y: 2.0, w: 3.8, h: 0.15, fill: { color: p.color } });
    s.addText(p.title, { x: x + 0.2, y: 2.3, w: 3.4, h: 0.5, fontSize: 18, bold: true, color: C.text });
    s.addText(p.body, { x: x + 0.2, y: 3.0, w: 3.4, h: 2, fontSize: 14, color: C.muted });
  });
  
  s.addText("Human-in-the-loop checkpoints preserve accountability.\nAI does the work. Humans own the decisions.", { 
    x: 0.8, y: 5.6, w: 12, h: 0.8, fontSize: 16, color: C.muted 
  });
  
  addAccentBar(s, C.blue);
  addSlideNumber(s, 3, 15);
}

// ─────────────────────────────────────────────────────────────
// SLIDE 4: THE 60-SECOND DEMO
// ─────────────────────────────────────────────────────────────
function slide04_Demo() {
  const s = pres.addSlide();
  addDarkBg(s);
  
  s.addText("The 60-Second Demo", { x: 0.8, y: 0.5, w: 12, h: 0.6, fontSize: 32, bold: true, color: C.text });
  
  s.addText("Upload your annual report. Watch this.", { 
    x: 0.8, y: 1.2, w: 12, h: 0.5, fontSize: 20, color: C.teal 
  });
  
  const steps = [
    { num: "1", text: "Extracted strategic priorities", time: "15s" },
    { num: "2", text: "Mapped governance objectives", time: "30s" },
    { num: "3", text: "Suggested KCIs with confidence scores", time: "45s" },
    { num: "4", text: "Gap analysis against HKMA guidelines", time: "60s" }
  ];
  
  steps.forEach((st, i) => {
    const y = 2.0 + i * 1.1;
    s.addShape(pres.ShapeType.ellipse, { 
      x: 1.5, y: y + 0.1, w: 0.7, h: 0.7, 
      fill: { color: C.teal }, line: { color: C.teal } 
    });
    s.addText(st.num, { x: 1.5, y: y + 0.15, w: 0.7, h: 0.6, fontSize: 20, bold: true, color: C.bg, align: "center" });
    s.addText(st.text, { x: 2.5, y: y + 0.15, w: 7, h: 0.6, fontSize: 18, color: C.text });
    s.addText(st.time, { x: 10, y: y + 0.15, w: 1.5, h: 0.6, fontSize: 16, color: C.muted, align: "right" });
  });
  
  // The kicker
  s.addShape(pres.ShapeType.roundRect, { 
    x: 0.8, y: 5.8, w: 11.7, h: 0.9, 
    fill: { color: C.panel }, line: { color: C.amber, width: 2 }, radius: 0.08 
  });
  s.addText("IBM OpenPages can't do step 1.", { 
    x: 0.8, y: 5.9, w: 11.7, h: 0.7, fontSize: 22, bold: true, color: C.amber, align: "center" 
  });
  
  addAccentBar(s, C.teal);
  addSlideNumber(s, 4, 15);
}

// ─────────────────────────────────────────────────────────────
// SLIDE 5: MARKET OPPORTUNITY
// ─────────────────────────────────────────────────────────────
function slide05_Market() {
  const s = pres.addSlide();
  addDarkBg(s);
  
  s.addText("Market Opportunity", { x: 0.8, y: 0.5, w: 12, h: 0.6, fontSize: 32, bold: true, color: C.text });
  
  // TAM/SAM/SOM circles
  const markets = [
    { label: "TAM", value: "$15.5B", desc: "Global GRC Software (2026)", size: 3.5, color: C.blue },
    { label: "SAM", value: "$4.2B", desc: "APAC + AI-ready enterprises", size: 2.5, color: C.purple },
    { label: "SOM", value: "$180M", desc: "HKMA/MAS regulated firms", size: 1.5, color: C.green }
  ];
  
  let x = 1.5;
  markets.forEach((m) => {
    s.addShape(pres.ShapeType.ellipse, { 
      x, y: 1.8, w: m.size, h: m.size, 
      fill: { color: C.panel }, line: { color: m.color, width: 2 } 
    });
    s.addText(m.label, { x, y: 1.8 + m.size/2 - 0.6, w: m.size, h: 0.4, fontSize: 14, color: m.color, align: "center" });
    s.addText(m.value, { x, y: 1.8 + m.size/2 - 0.2, w: m.size, h: 0.5, fontSize: 22, bold: true, color: C.text, align: "center" });
    x += m.size + 0.8;
  });
  
  // Why now
  s.addText("Why Now?", { x: 0.8, y: 5.0, w: 12, h: 0.5, fontSize: 20, bold: true, color: C.text });
  const reasons = [
    "GenAI crossed enterprise adoption threshold in 2025",
    "APAC regulators (HKMA, MAS) mandating AI governance",
    "Compliance costs rising 15% YoY — automation is no longer optional"
  ];
  reasons.forEach((r, i) => {
    s.addText("→ " + r, { x: 0.8, y: 5.5 + i * 0.45, w: 12, h: 0.4, fontSize: 14, color: C.muted });
  });
  
  addAccentBar(s, C.green);
  addSlideNumber(s, 5, 15);
}

// ─────────────────────────────────────────────────────────────
// SLIDE 6: BUSINESS MODEL
// ─────────────────────────────────────────────────────────────
function slide06_BusinessModel() {
  const s = pres.addSlide();
  addDarkBg(s);
  
  s.addText("Business Model", { x: 0.8, y: 0.5, w: 12, h: 0.6, fontSize: 32, bold: true, color: C.text });
  
  // Revenue streams
  const streams = [
    { name: "Platform SaaS", desc: "Per-user + per-agent pricing", pct: "70%", color: C.blue },
    { name: "Regulatory Feeds", desc: "HKMA/MAS/SEC real-time intel", pct: "15%", color: C.purple },
    { name: "Professional Services", desc: "Big 4 partner implementation", pct: "15%", color: C.teal }
  ];
  
  streams.forEach((st, i) => {
    const x = 0.8 + i * 4.1;
    s.addShape(pres.ShapeType.roundRect, { 
      x, y: 1.4, w: 3.8, h: 2.0, 
      fill: { color: C.panel }, line: { color: st.color, width: 1 }, radius: 0.08 
    });
    s.addText(st.pct, { x, y: 1.5, w: 3.8, h: 0.7, fontSize: 28, bold: true, color: st.color, align: "center" });
    s.addText(st.name, { x: x + 0.2, y: 2.2, w: 3.4, h: 0.4, fontSize: 16, bold: true, color: C.text });
    s.addText(st.desc, { x: x + 0.2, y: 2.6, w: 3.4, h: 0.5, fontSize: 12, color: C.muted });
  });
  
  // Unit economics
  s.addText("Unit Economics", { x: 0.8, y: 3.8, w: 12, h: 0.5, fontSize: 20, bold: true, color: C.text });
  
  const metrics = [
    { label: "ACV (Mid-market)", value: "$85K" },
    { label: "ACV (Enterprise)", value: "$350K" },
    { label: "Gross Margin", value: "80%" },
    { label: "Target CAC Payback", value: "14 mo" }
  ];
  
  metrics.forEach((m, i) => {
    s.addText(m.label, { x: 0.8 + i * 3.1, y: 4.4, w: 2.8, h: 0.4, fontSize: 12, color: C.muted });
    s.addText(m.value, { x: 0.8 + i * 3.1, y: 4.8, w: 2.8, h: 0.5, fontSize: 24, bold: true, color: C.green });
  });
  
  s.addText("Land with mid-market (3-6 mo cycles) → Expand to enterprise", { 
    x: 0.8, y: 5.8, w: 12, h: 0.4, fontSize: 14, color: C.muted 
  });
  
  addAccentBar(s, C.blue);
  addSlideNumber(s, 6, 15);
}

// ─────────────────────────────────────────────────────────────
// SLIDE 7: TRACTION / VALIDATION
// ─────────────────────────────────────────────────────────────
function slide07_Traction() {
  const s = pres.addSlide();
  addDarkBg(s);
  
  s.addText("Validation & Next Steps", { x: 0.8, y: 0.5, w: 12, h: 0.6, fontSize: 32, bold: true, color: C.text });
  
  // Current status
  const status = [
    { item: "Product brief & PRD complete", done: true },
    { item: "UI prototype built (Netlify demo)", done: true },
    { item: "Competitive analysis vs 6 incumbents", done: true },
    { item: "Explainability framework (NIST/ISO/EU AI Act aligned)", done: true },
    { item: "MAS/HKMA sandbox application", done: false },
    { item: "Big 4 partnership discussions", done: false }
  ];
  
  status.forEach((st, i) => {
    const icon = st.done ? "✓" : "○";
    const color = st.done ? C.green : C.muted;
    s.addText(icon, { x: 1.0, y: 1.4 + i * 0.6, w: 0.5, h: 0.5, fontSize: 18, color });
    s.addText(st.item, { x: 1.6, y: 1.4 + i * 0.6, w: 10, h: 0.5, fontSize: 16, color: st.done ? C.text : C.muted });
  });
  
  // Roadmap
  s.addText("12-Month Roadmap", { x: 0.8, y: 5.2, w: 12, h: 0.5, fontSize: 18, bold: true, color: C.text });
  
  const phases = [
    { q: "Q1-Q2", milestone: "MVP + 3 pilots", color: C.blue },
    { q: "Q3", milestone: "GA + first 10 customers", color: C.teal },
    { q: "Q4", milestone: "ISO 42001 cert + Series A", color: C.purple }
  ];
  
  phases.forEach((p, i) => {
    const x = 0.8 + i * 4.1;
    s.addShape(pres.ShapeType.roundRect, { 
      x, y: 5.7, w: 3.8, h: 1.0, 
      fill: { color: C.panel }, line: { color: p.color, width: 1 }, radius: 0.08 
    });
    s.addText(p.q, { x, y: 5.8, w: 3.8, h: 0.4, fontSize: 14, bold: true, color: p.color, align: "center" });
    s.addText(p.milestone, { x: x + 0.2, y: 6.2, w: 3.4, h: 0.4, fontSize: 12, color: C.muted, align: "center" });
  });
  
  addAccentBar(s, C.green);
  addSlideNumber(s, 7, 15);
}

// ─────────────────────────────────────────────────────────────
// SLIDE 8: COMPETITIVE LANDSCAPE
// ─────────────────────────────────────────────────────────────
function slide08_Competition() {
  const s = pres.addSlide();
  addDarkBg(s);
  
  s.addText("Competitive Landscape", { x: 0.8, y: 0.5, w: 12, h: 0.6, fontSize: 32, bold: true, color: C.text });
  
  // 2x2 matrix
  s.addShape(pres.ShapeType.line, { x: 1.5, y: 1.5, w: 0, h: 4.5, line: { color: C.muted, width: 1 } });
  s.addShape(pres.ShapeType.line, { x: 1.5, y: 3.75, w: 6, h: 0, line: { color: C.muted, width: 1 } });
  
  s.addText("AI Capability →", { x: 1.5, y: 6.1, w: 6, h: 0.3, fontSize: 10, color: C.muted, align: "center" });
  s.addText("Governance\nDepth", { x: 0.5, y: 3.5, w: 1, h: 1, fontSize: 10, color: C.muted, align: "center", rotate: 270 });
  
  // Competitors positioned
  const competitors = [
    { name: "IBM", x: 4.5, y: 2.5, color: C.muted },
    { name: "ServiceNow", x: 5.0, y: 3.5, color: C.muted },
    { name: "MetricStream", x: 3.5, y: 2.8, color: C.muted },
    { name: "Us", x: 6.5, y: 1.8, color: C.green }
  ];
  
  competitors.forEach((c) => {
    s.addShape(pres.ShapeType.ellipse, { 
      x: c.x, y: c.y, w: 1.2, h: 0.6, 
      fill: { color: c.color === C.green ? C.panel : C.panel }, 
      line: { color: c.color, width: 2 } 
    });
    s.addText(c.name, { x: c.x, y: c.y + 0.1, w: 1.2, h: 0.4, fontSize: 10, color: c.color, align: "center" });
  });
  
  // Why we win
  s.addText("Why We Win", { x: 8.5, y: 1.5, w: 4, h: 0.5, fontSize: 18, bold: true, color: C.text });
  
  const advantages = [
    "Agent-first architecture (not retrofitted)",
    "18-24 month technical moat",
    "APAC regulatory focus (underserved)",
    "First-class 3LOD (no competitor has this)"
  ];
  
  advantages.forEach((a, i) => {
    s.addText("✓ " + a, { x: 8.5, y: 2.1 + i * 0.55, w: 4.3, h: 0.5, fontSize: 13, color: C.green });
  });
  
  // What they can't copy
  s.addText("Incumbents face:", { x: 8.5, y: 4.5, w: 4, h: 0.4, fontSize: 14, bold: true, color: C.text });
  s.addText("• 2-3 year architecture rewrite\n• Data model lock-in\n• Cannibalization fear", { 
    x: 8.5, y: 4.9, w: 4.3, h: 1.5, fontSize: 12, color: C.muted 
  });
  
  addAccentBar(s, C.purple);
  addSlideNumber(s, 8, 15);
}

// ─────────────────────────────────────────────────────────────
// SLIDE 9: MOAT — WHY THEY CAN'T CATCH US
// ─────────────────────────────────────────────────────────────
function slide09_Moat() {
  const s = pres.addSlide();
  addDarkBg(s);
  
  s.addText("18-24 Month Moat", { x: 0.8, y: 0.5, w: 12, h: 0.6, fontSize: 32, bold: true, color: C.text });
  
  s.addText("Why ServiceNow can't ship this in 6 months", { 
    x: 0.8, y: 1.1, w: 12, h: 0.5, fontSize: 18, color: C.amber 
  });
  
  const barriers = [
    { barrier: "Architecture Debt", time: "2-3 years", reason: "Workflow engine → Agent engine is a rewrite" },
    { barrier: "Data Model Lock-in", time: "18+ months", reason: "Strategy-to-metrics breaks existing schemas" },
    { barrier: "Talent Gap", time: "12-18 months", reason: "LLM engineers ≠ enterprise workflow devs" },
    { barrier: "Cannibalization", time: "Indefinite", reason: "AI threatens their $1B+ services business" }
  ];
  
  barriers.forEach((b, i) => {
    const y = 1.8 + i * 1.2;
    s.addShape(pres.ShapeType.roundRect, { 
      x: 0.8, y, w: 11.7, h: 1.0, 
      fill: { color: C.panel }, line: { color: C.blue, width: 1 }, radius: 0.08 
    });
    s.addText(b.barrier, { x: 1.0, y: y + 0.15, w: 3, h: 0.4, fontSize: 16, bold: true, color: C.text });
    s.addText(b.time, { x: 4.2, y: y + 0.15, w: 2, h: 0.4, fontSize: 16, bold: true, color: C.amber });
    s.addText(b.reason, { x: 6.5, y: y + 0.15, w: 5.8, h: 0.7, fontSize: 14, color: C.muted });
  });
  
  s.addText("By the time they ship, we'll have regulator relationships + customer proof.", { 
    x: 0.8, y: 6.3, w: 12, h: 0.5, fontSize: 16, color: C.green, italic: true 
  });
  
  addAccentBar(s, C.amber);
  addSlideNumber(s, 9, 15);
}

// ─────────────────────────────────────────────────────────────
// SLIDE 10: GO-TO-MARKET
// ─────────────────────────────────────────────────────────────
function slide10_GTM() {
  const s = pres.addSlide();
  addDarkBg(s);
  
  s.addText("Go-to-Market", { x: 0.8, y: 0.5, w: 12, h: 0.6, fontSize: 32, bold: true, color: C.text });
  
  // GTM motion
  const gtm = [
    { phase: "Land", desc: "Mid-market (500-2K employees)\n3-6 month cycles\n$85K ACV", color: C.blue },
    { phase: "Prove", desc: "90-day pilots with ROI metrics\nCase studies for social proof", color: C.teal },
    { phase: "Expand", desc: "Enterprise upsell ($350K+ ACV)\nBig 4 channel partners", color: C.purple }
  ];
  
  gtm.forEach((g, i) => {
    const x = 0.8 + i * 4.1;
    s.addShape(pres.ShapeType.roundRect, { 
      x, y: 1.3, w: 3.8, h: 2.5, 
      fill: { color: C.panel }, line: { color: g.color, width: 2 }, radius: 0.1 
    });
    s.addText(g.phase, { x, y: 1.4, w: 3.8, h: 0.6, fontSize: 22, bold: true, color: g.color, align: "center" });
    s.addText(g.desc, { x: x + 0.2, y: 2.1, w: 3.4, h: 1.5, fontSize: 13, color: C.muted });
    
    if (i < 2) {
      s.addText("→", { x: x + 3.9, y: 2.2, w: 0.5, h: 0.5, fontSize: 28, color: C.muted });
    }
  });
  
  // PLG component
  s.addText("PLG Wedge: Free \"Governance Health Check\"", { 
    x: 0.8, y: 4.2, w: 12, h: 0.5, fontSize: 18, bold: true, color: C.text 
  });
  s.addText("Upload annual report → Get gap analysis → Upsell full platform", { 
    x: 0.8, y: 4.7, w: 12, h: 0.4, fontSize: 14, color: C.muted 
  });
  
  // Trust builders
  s.addText("Trust Builders", { x: 0.8, y: 5.3, w: 12, h: 0.5, fontSize: 18, bold: true, color: C.text });
  const trust = ["Regulator sandbox (MAS/HKMA)", "Big 4 partnership", "ISO 42001 certification", "Cyber insurance backing"];
  trust.forEach((t, i) => {
    s.addText("✓ " + t, { x: 0.8 + i * 3.1, y: 5.8, w: 3, h: 0.4, fontSize: 12, color: C.green });
  });
  
  addAccentBar(s, C.teal);
  addSlideNumber(s, 10, 15);
}

// ─────────────────────────────────────────────────────────────
// SLIDE 11: TEAM (PLACEHOLDER)
// ─────────────────────────────────────────────────────────────
function slide11_Team() {
  const s = pres.addSlide();
  addDarkBg(s);
  
  s.addText("Team", { x: 0.8, y: 0.5, w: 12, h: 0.6, fontSize: 32, bold: true, color: C.text });
  
  s.addText("[ Team slide — add founder photos and bios ]", { 
    x: 0, y: 3, w: 13.333, h: 1, fontSize: 20, color: C.muted, align: "center" 
  });
  
  s.addText("Key hires needed: CTO (AI/ML), Head of Sales (Enterprise GRC), Head of Compliance", { 
    x: 0.8, y: 5.5, w: 12, h: 0.5, fontSize: 14, color: C.muted 
  });
  
  addAccentBar(s, C.purple);
  addSlideNumber(s, 11, 15);
}

// ─────────────────────────────────────────────────────────────
// SLIDE 12: FINANCIALS
// ─────────────────────────────────────────────────────────────
function slide12_Financials() {
  const s = pres.addSlide();
  addDarkBg(s);
  
  s.addText("Financial Projections", { x: 0.8, y: 0.5, w: 12, h: 0.6, fontSize: 32, bold: true, color: C.text });
  
  // Simple table
  const years = ["Y1", "Y2", "Y3"];
  const arrs = ["$500K", "$2.5M", "$8M"];
  const customers = ["8", "35", "100"];
  
  s.addText("", { x: 1.5, y: 1.5, w: 2, h: 0.5, fontSize: 14, color: C.muted });
  years.forEach((y, i) => {
    s.addText(y, { x: 3.5 + i * 2.5, y: 1.5, w: 2, h: 0.5, fontSize: 16, bold: true, color: C.blue, align: "center" });
  });
  
  s.addText("ARR", { x: 1.5, y: 2.2, w: 2, h: 0.5, fontSize: 14, color: C.muted });
  arrs.forEach((a, i) => {
    s.addText(a, { x: 3.5 + i * 2.5, y: 2.2, w: 2, h: 0.5, fontSize: 18, bold: true, color: C.green, align: "center" });
  });
  
  s.addText("Customers", { x: 1.5, y: 2.9, w: 2, h: 0.5, fontSize: 14, color: C.muted });
  customers.forEach((c, i) => {
    s.addText(c, { x: 3.5 + i * 2.5, y: 2.9, w: 2, h: 0.5, fontSize: 18, bold: true, color: C.text, align: "center" });
  });
  
  // Key assumptions
  s.addText("Key Assumptions", { x: 0.8, y: 4.0, w: 12, h: 0.5, fontSize: 18, bold: true, color: C.text });
  const assumptions = [
    "Mid-market ACV: $85K | Enterprise ACV: $350K",
    "Sales cycle: 3-6 mo (mid) | 9-12 mo (enterprise)",
    "Gross margin: 80% | CAC payback: 14 months",
    "Churn: <10% annually (sticky compliance workflows)"
  ];
  assumptions.forEach((a, i) => {
    s.addText("• " + a, { x: 0.8, y: 4.5 + i * 0.5, w: 12, h: 0.45, fontSize: 13, color: C.muted });
  });
  
  addAccentBar(s, C.green);
  addSlideNumber(s, 12, 15);
}

// ─────────────────────────────────────────────────────────────
// SLIDE 13: THE ASK
// ─────────────────────────────────────────────────────────────
function slide13_TheAsk() {
  const s = pres.addSlide();
  addDarkBg(s);
  
  s.addText("The Ask", { x: 0.8, y: 0.5, w: 12, h: 0.6, fontSize: 32, bold: true, color: C.text });
  
  // Big number
  s.addShape(pres.ShapeType.roundRect, { 
    x: 3.5, y: 1.5, w: 6.333, h: 2.2, 
    fill: { color: C.panel }, line: { color: C.purple, width: 3 }, radius: 0.15 
  });
  s.addText("$3M Seed", { x: 3.5, y: 1.8, w: 6.333, h: 1, fontSize: 48, bold: true, color: C.purple, align: "center" });
  s.addText("18 months runway to Series A", { x: 3.5, y: 2.9, w: 6.333, h: 0.5, fontSize: 16, color: C.muted, align: "center" });
  
  // Use of funds
  s.addText("Use of Funds", { x: 0.8, y: 4.2, w: 12, h: 0.5, fontSize: 20, bold: true, color: C.text });
  
  const funds = [
    { category: "Engineering", pct: "50%", desc: "Core platform + AI agents" },
    { category: "Sales & Marketing", pct: "30%", desc: "First 10 customers + PLG" },
    { category: "Compliance & Legal", pct: "15%", desc: "ISO cert + regulator sandbox" },
    { category: "Operations", pct: "5%", desc: "Infrastructure + admin" }
  ];
  
  funds.forEach((f, i) => {
    const x = 0.8 + i * 3.1;
    s.addText(f.pct, { x, y: 4.8, w: 2.8, h: 0.6, fontSize: 24, bold: true, color: C.blue });
    s.addText(f.category, { x, y: 5.4, w: 2.8, h: 0.4, fontSize: 14, bold: true, color: C.text });
    s.addText(f.desc, { x, y: 5.8, w: 2.8, h: 0.5, fontSize: 11, color: C.muted });
  });
  
  addAccentBar(s, C.purple);
  addSlideNumber(s, 13, 15);
}

// ─────────────────────────────────────────────────────────────
// SLIDE 14: WHY NOW, WHY US
// ─────────────────────────────────────────────────────────────
function slide14_WhyNowWhyUs() {
  const s = pres.addSlide();
  addDarkBg(s);
  
  s.addText("Why Now. Why Us.", { x: 0.8, y: 0.5, w: 12, h: 0.6, fontSize: 32, bold: true, color: C.text });
  
  // Why now
  s.addText("Why Now", { x: 0.8, y: 1.3, w: 5.5, h: 0.5, fontSize: 22, bold: true, color: C.blue });
  const whyNow = [
    "GenAI crossed enterprise threshold",
    "APAC regulators mandating AI governance",
    "GRC incumbents are 10-15 years old",
    "Compliance costs rising 15% YoY"
  ];
  whyNow.forEach((w, i) => {
    s.addText("→ " + w, { x: 0.8, y: 1.9 + i * 0.55, w: 5.5, h: 0.5, fontSize: 14, color: C.muted });
  });
  
  // Why us
  s.addText("Why Us", { x: 7, y: 1.3, w: 5.5, h: 0.5, fontSize: 22, bold: true, color: C.purple });
  const whyUs = [
    "Built agent-first from day one",
    "Deep GRC + APAC regulatory expertise",
    "Explainability by design (not retrofit)",
    "First-mover in 3LOD agent architecture"
  ];
  whyUs.forEach((w, i) => {
    s.addText("→ " + w, { x: 7, y: 1.9 + i * 0.55, w: 5.5, h: 0.5, fontSize: 14, color: C.muted });
  });
  
  // The vision
  s.addShape(pres.ShapeType.roundRect, { 
    x: 0.8, y: 4.5, w: 11.7, h: 2.0, 
    fill: { color: C.panel }, line: { color: C.teal, width: 2 }, radius: 0.1 
  });
  s.addText("The Vision", { x: 1, y: 4.7, w: 11.3, h: 0.5, fontSize: 18, bold: true, color: C.teal });
  s.addText("Become the default GRC platform for AI-native enterprises.\nGovernance that thinks. Compliance that acts. Audit-ready by design.", { 
    x: 1, y: 5.2, w: 11.3, h: 1, fontSize: 16, color: C.text 
  });
  
  addAccentBar(s, C.teal);
  addSlideNumber(s, 14, 15);
}

// ─────────────────────────────────────────────────────────────
// SLIDE 15: CLOSING — THANK YOU
// ─────────────────────────────────────────────────────────────
function slide15_ThankYou() {
  const s = pres.addSlide();
  addDarkBg(s);
  
  s.addText("Agentic AI GRC", { 
    x: 0, y: 2.2, w: 13.333, h: 0.8, 
    fontSize: 42, bold: true, color: C.text, align: "center" 
  });
  
  s.addText("Governance that thinks. Compliance that acts.", { 
    x: 0, y: 3.1, w: 13.333, h: 0.6, 
    fontSize: 22, color: C.blue, align: "center", italic: true 
  });
  
  s.addShape(pres.ShapeType.rect, { x: 5.5, y: 4.0, w: 2.333, h: 0.08, fill: { color: C.purple } });
  
  s.addText("mark@example.com  |  demo: agentic-grc.netlify.app", { 
    x: 0, y: 5.0, w: 13.333, h: 0.5, 
    fontSize: 14, color: C.muted, align: "center" 
  });
  
  s.addText("Let's talk.", { 
    x: 0, y: 5.8, w: 13.333, h: 0.6, 
    fontSize: 20, bold: true, color: C.green, align: "center" 
  });
  
  addAccentBar(s, C.green);
  addSlideNumber(s, 15, 15);
}

// ─────────────────────────────────────────────────────────────
// BUILD THE DECK
// ─────────────────────────────────────────────────────────────
slide01_Title();
slide02_Problem();
slide03_Solution();
slide04_Demo();
slide05_Market();
slide06_BusinessModel();
slide07_Traction();
slide08_Competition();
slide09_Moat();
slide10_GTM();
slide11_Team();
slide12_Financials();
slide13_TheAsk();
slide14_WhyNowWhyUs();
slide15_ThankYou();

pres.writeFile({ fileName: outPath }).then(() => {
  console.log("🎨 Pitch deck saved:", outPath);
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
