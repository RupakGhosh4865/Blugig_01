/**
 * Home page copy. Section order mirrors zig.ai; content follows BUILD_SPEC §9.
 * Everything here is DRAFT copy for owner review — no invented stats, logos or testimonials.
 */
export const hero = {
  chip: "Workflow, data & AI consulting",
  titleLead: "Turn complexity into a",
  titleAccent: "competitive advantage.",
  sub: "We design the workflows, data pipelines, and AI agents that help teams move faster — on Smartsheet, SafetyCulture, Power BI, and the modern data stack.",
  primary: { label: "Book a consultation", href: "/contact" },
  secondary: { label: "Explore services", href: "/services" },
  trustLine: "[PLACEHOLDER: partner badges — e.g., Smartsheet partner tier, Microsoft]",
  cards: [
    { title: "Blugig did", meta: "14 tasks", kind: "brand" as const },
    { title: "You did", meta: "Approved the roadmap", kind: "person" as const },
  ],
};

export const gap = {
  chip: "The operations gap",
  titleLead: "Projects, data and decisions",
  titleAccent: "still run on spreadsheets",
  sub: "When systems don't connect, teams chase status instead of moving work forward.",
  before: [
    "Project status lives in five trackers and nobody trusts any of them.",
    "Inspections happen on paper. Issues get lost between site and office.",
    "Leaders wait for month-end reports that are out of date on arrival.",
    "AI pilots stall because the data underneath them isn't ready.",
  ],
  after: [
    "One source of truth for every project, owner and deadline.",
    "Digital inspections with every issue tracked to a closed action.",
    "Live dashboards leadership opens every morning.",
    "AI agents working on connected, governed data.",
  ],
};

export const statement = {
  accent: "Blugig makes your systems",
  rest: "work together, not just work harder.",
};

export const platforms = {
  /** Shown until real client logos (with permission) are provided. */
  label: "Platforms we build on",
  items: ["Smartsheet", "SafetyCulture", "Power BI", "Microsoft Fabric", "Microsoft 365", "SQL & Python"],
};

export const expertise = {
  chip: "Expertise",
  titleLead: "Focused expertise.",
  titleAccent: "Connected solutions.",
  sub: "Built for the way your business works — six practices, one team that connects them.",
};

export const impact = {
  chip: "Why it works",
  titleAccent: "How Blugig fixes",
  titleRest: "what breaks transformation projects",
  sub: "Not the tools — the connections between them. We design the workflow, the data and the AI as one system.",
  /** Factual counts derived from the offer itself (not performance claims). */
  items: [
    { value: 6, suffix: "", label: "Connected practices under one roof." },
    { value: 3, suffix: "", label: "Core platforms we go deep on." },
    { value: 4, suffix: "", label: "Steps from discovery to scale." },
    { value: 1, suffix: "", label: "Partner for workflow, data & AI." },
  ],
  accent:
    "Most projects stop at the tool. We connect the workflow, the data and the AI — so the investment actually gets used.",
};

export const wins = {
  chip: "One partner. Two outcomes",
  titleA: "Bottlenecks become visible.",
  titleB: "Fixed before they slow you down.",
  sub: "Same partner. Different problems at different stages of growth.",
  left: {
    title: "Operations & PMO teams",
    tips: [
      { title: "Status lives in spreadsheets", body: "One source of truth." },
      { title: "Inspections on paper", body: "Consistent and audit-ready." },
      { title: "Reports take days", body: "Dashboards leaders trust." },
    ],
  },
  right: {
    title: "Data, IT & AI leaders",
    tips: [
      { title: "Data is scattered", body: "Connect it." },
      { title: "Legacy systems hold you back", body: "Migrate with confidence." },
      { title: "AI pilots stall", body: "Ship governed agents." },
    ],
  },
};

export const approach = {
  chip: "How we work",
  title: "From first workshop to adopted at scale.",
  sub: "Every engagement follows the same four steps — so you always know what happens next, and why.",
  cta: { label: "Book a consultation", href: "/contact" },
  steps: [
    { title: "Discover", body: "Map processes, data, and pain points." },
    { title: "Design", body: "Blueprint the solution and the outcomes." },
    { title: "Build", body: "Configure, integrate, automate, test." },
    { title: "Adopt & Scale", body: "Train teams, govern, improve." },
  ],
};

export const momentum = {
  chip: "Gets stronger over time",
  titleAccent: "Every quarter,",
  titleRest: "your operation gets more connected",
  sub: "We deliver in phases so value shows up early and keeps compounding — workflows first, then reporting, then automation and AI.",
  cards: [
    { label: "First weeks", body: "Processes, data and pain points mapped. Quick wins identified." },
    { label: "First workflows", body: "Teams stop chasing status. Work moves through one system." },
    { label: "Trusted reporting", body: "Leaders see live dashboards instead of waiting for month-end." },
    { label: "AI on top", body: "Agents take repetitive work off the plate — with guardrails." },
  ],
  cta: {
    text: "Start today. Because in six months, today is what you'll wish you'd done.",
    primary: { label: "Book a consultation", href: "/contact" },
    secondary: { label: "Explore services", href: "/services" },
  },
};

export const agent = {
  chip: "Agentic AI",
  title: "AI agents that work where your team already works.",
  body: "We build agents inside Smartsheet, Power BI and Microsoft 365 that triage requests, summarise status and draft reports — with human approval before anything goes out.",
  link: { label: "Explore Agentic AI", href: "/services/agentic-ai" },
  console: [
    { kind: "cmd", text: "> agent: weekly-portfolio-review" },
    { kind: "ok", text: '✓ Read 1,248 rows from "Project Intake"' },
    { kind: "ok", text: "✓ Flagged 3 projects at risk (budget > 90%, due < 14 days)" },
    { kind: "ok", text: "✓ Drafted status summary for leadership" },
    { kind: "send", text: "→ Sent to #pmo-updates for approval" },
  ],
};

export const homeFaqs = [
  {
    q: "Do you only work with Smartsheet, SafetyCulture and Power BI?",
    a: "Those are our core platforms. We connect them to the rest of your stack — Microsoft 365, ERP and CRM systems, SQL databases and APIs.",
  },
  {
    q: "Can you work with the setup we already have?",
    a: "Yes. Most engagements start with a health check of what's there. We fix and extend before building anything new.",
  },
  {
    q: "How long does a typical engagement take?",
    a: "It depends on scope. Focused workflows can go live in weeks; enterprise rollouts are phased so value shows up early.",
  },
  {
    q: "Do you train our team?",
    a: "Yes. Role-based training, documentation and admin handover are part of every engagement, so your team owns the solution.",
  },
  {
    q: "Where should we start with AI?",
    a: "With one repetitive workflow and the data behind it. We assess where agents can safely remove work, then build with guardrails and human approval.",
  },
  {
    q: "Who do you work with?",
    a: "Operations leaders, PMO heads, IT and data managers and executives at mid-size and enterprise companies.",
  },
];
