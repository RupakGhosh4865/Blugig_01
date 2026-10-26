import { site } from "@/content/site";

/**
 * Home page copy. Section order mirrors zig.ai (the original build's layout);
 * wording comes from the Avantra mockups. Counts are factual (from the offer
 * itself), console lines and card metas are illustrative.
 */
/**
 * Two hero stages: the page opens on the inspection story, a short scroll swaps
 * to the integration story. Index matches `heroWheel.stages`. The credential
 * badges stay put above both stages.
 */
export const hero = {
  badges: site.credentials,
  stages: [
    {
      titleLead: "Every inspection,",
      titleAccent: "turned into action.",
      sub: "Avantra designs, deploys, and scales Mitti across your sites, so issues get fixed faster and every team stays audit-ready.",
      primary: { label: "Book a free rollout plan", href: "/contact", icon: "arrow" },
      secondary: { label: "See how it works", href: "/how-we-work", icon: "play" },
      apps: [],
    },
    {
      titleLead: "Connect Mitti",
      titleAccent: "to every system you run.",
      sub: "Avantra builds Workato automations that sync inspections, issues and actions with your ERP, CRM, HR and ticketing tools.",
      primary: { label: "Plan my integration", href: "/contact" },
      secondary: { label: "See integrations", href: "/services" },
      apps: ["Salesforce", "SAP", "ServiceNow", "Slack", "Teams", "+more"],
    },
  ],
} as const;

/**
 * Hero wheel (illustrative). Each stage is a set of five events resting on the
 * wheel's spokes, top → bottom; switching stage turns the wheel to the next set.
 * [4] is the highlighted outcome. `w` widens a card whose title runs long.
 */
export const heroWheel = {
  stages: [
    [
      { time: "9:02 AM", title: "Inspection completed", detail: "All checks passed", icon: "inspect", tone: "mint" },
      { time: "9:03 AM", title: "Issue flagged", detail: "Surface defect identified", icon: "alert", tone: "peach" },
      { time: "9:03 AM", title: "Action assigned", detail: "Task assigned to site lead", icon: "person", tone: "sky" },
      { time: "9:04 AM", title: "Re-check scheduled", detail: "Follow-up inspection set.", icon: "calendar", tone: "lilac" },
      { time: "9:05 AM", title: "Issue resolved - Closed 2 days early", detail: "Verified and closed", icon: "resolved", tone: "green", w: 430 },
    ],
    [
      { time: "9:03 AM", title: "Issue flagged in Mitti", detail: "Guard rail damaged, Bay 4.", icon: "alert", tone: "peach" },
      { time: "9:03 AM", title: "Workato recipe triggered", detail: "Issue to ticket sync.", icon: "recipe", tone: "teal" },
      { time: "9:03 AM", title: "Ticket created in ServiceNow", detail: "Assigned to site lead.", icon: "ticket", tone: "sky" },
      { time: "9:04 AM", title: "Work order raised in SAP", detail: "Due Friday", icon: "order", tone: "lilac" },
      { time: "9:05 AM", title: "All systems in sync", detail: "0 manual steps", icon: "resolved", tone: "green" },
    ],
  ],
} as const;

export const gap = {
  chip: "The operations gap",
  titleLead: "Inspections happen.",
  titleAccent: "Accountability doesn't.",
  sub: "When inspections, issues and follow-up don't connect, teams chase status instead of improving operations.",
  before: [
    "Checks happen on paper and get filed away.",
    "Issues get raised, then lost between site and office.",
    "Nobody is sure who owns the follow-up.",
    "Leaders can't see what's happening across sites.",
  ],
  after: [
    "Consistent digital inspections on every site.",
    "A clear way to capture what needs attention.",
    "Every finding assigned, owned and tracked.",
    "Activity and trends visible across operations.",
  ],
};

export const statement = {
  accent: "Your Mitti implementation partner,",
  rest: "from planning and configuration to adoption and rollout.",
};

/** Client logo loop under the hero; the logos live in content/clients.ts. */
export const trustedBy = {
  label: "Trusted by teams at",
};

export const expertise = {
  chip: "What we do",
  titleLead: "The right setup.",
  titleAccent: "A stronger way to work.",
  sub: "We translate your operational needs into a practical Mitti rollout.",
};

export const impact = {
  chip: "Why it works",
  titleAccent: "How Avantra",
  titleRest: "makes a Mitti rollout stick",
  sub: "Not the platform alone — the details that make it useful, delivered by one partner from setup to adoption.",
  /** Factual counts derived from the offer itself (not performance claims). */
  items: [
    { value: 6, suffix: "", label: "Solutions for everyday operations." },
    { value: 6, suffix: "", label: "Implementation services, clear deliverables." },
    { value: 4, suffix: "", label: "Steps from discovery to everyday use." },
    { value: 1, suffix: "", label: "Partner from setup to site-wide adoption." },
  ],
  accent:
    "Clear workflows, practical templates, defined responsibilities — and people who feel ready to use the platform.",
};

/** Workato integrations section (Home `#integrations`; the nav's Integrations links land here). */
export const integrations = {
  chip: "Integrations · Workato Silver Partner",
  titleLead: "Mitti findings that",
  titleAccent: "act on their own.",
  sub: "We connect Mitti (by SafetyCulture) to the systems your teams already run — so a failed check opens a ticket, a work order or a task automatically, and closes the loop back in Mitti.",
  partner: { title: "Workato Silver Partner", line: "Certified Workato builders · Automation League" },
  /** One card per flow. Systems are examples of common Workato connectors, not a client list. */
  flows: [
    {
      title: "Issues → ITSM",
      flow: "Mitti issue → ticket → status sync",
      body: "Failed items raise a ticket with photos, site and owner; closure syncs back to Mitti.",
      systems: ["ServiceNow", "Jira SM"],
    },
    {
      title: "Actions → CMMS / ERP",
      flow: "Mitti action → work order",
      body: "Asset faults become work orders with the right cost centre and asset ID.",
      systems: ["SAP PM", "Dynamics 365", "NetSuite"],
    },
    {
      title: "People ↔ HRIS",
      flow: "HRIS → Mitti users & groups",
      body: "Joiners, movers and leavers update Mitti users, sites and training automatically.",
      systems: ["Workday", "SuccessFactors", "BambooHR"],
    },
    {
      title: "Insights → BI & chat",
      flow: "Mitti data → BI · alerts → Teams/Slack",
      body: "Inspection data lands in your BI model; critical findings alert the right channel.",
      systems: ["Power BI", "Teams", "Slack"],
    },
  ],
  systemsNote: "Example systems",
  process: {
    label: "How a Workato project runs",
    steps: [
      { title: "Assess", body: "Map systems, data owners and the 2–3 flows worth automating first." },
      { title: "Design", body: "Agree triggers, field mapping, error handling and security." },
      { title: "Build & test", body: "Build Workato recipes in a sandbox and test with real Mitti data." },
      { title: "Launch & hand over", body: "Go live with monitoring, runbook and team training." },
    ],
  },
  /** The button opens the Calendly link (NEXT_PUBLIC_CALENDLY_URL) when set; `href` is the fallback. */
  cta: {
    text: "Not sure where to start? We'll map your first integrations in one session.",
    label: "Book an integration assessment",
    href: "/contact?topic=connected-workflows",
  },
};

export const wins = {
  chip: "One partner. Every stage",
  titleA: "New rollouts start strong.",
  titleB: "Existing setups get better.",
  sub: "Same partner. Different needs at different stages of your Mitti journey.",
  left: {
    title: "New to Mitti",
    tips: [
      { title: "Checks on paper", body: "Digital inspections." },
      { title: "No clear owner", body: "Assigned follow-up." },
      { title: "No rollout plan", body: "A rollout roadmap." },
    ],
  },
  right: {
    title: "Already using Mitti",
    tips: [
      { title: "Templates feel clunky", body: "Template improvements." },
      { title: "Adoption has stalled", body: "Adoption support." },
      { title: "Ready for more sites", body: "A phased rollout." },
    ],
  },
};

export const approach = {
  chip: "Our implementation approach",
  title: "A clear path from plan to practice.",
  sub: "We keep implementation focused, practical and aligned to your operational goals.",
  cta: { label: "See how we work", href: "/how-we-work" },
  steps: [
    { title: "Discover", body: "Understand your processes, use cases and goals." },
    { title: "Configure", body: "Set up Mitti to fit your structure and workflows." },
    { title: "Launch", body: "Roll out with training, support and change readiness." },
    { title: "Improve", body: "Measure, refine and scale across more teams and sites." },
  ],
};

export const momentum = {
  chip: "Gets stronger over time",
  titleAccent: "Every phase,",
  titleRest: "your rollout gets stronger",
  sub: "We deliver in stages so value shows up early — discovery first, then configuration, launch and continuous improvement.",
  cards: [
    { label: "Discover", body: "Agreed scope & rollout roadmap." },
    { label: "Configure & validate", body: "Configured workspace & pilot feedback." },
    { label: "Train & launch", body: "User onboarding & launch checklist." },
    { label: "Support & improve", body: "Prioritized improvement plan." },
  ],
  cta: {
    text: "Make your next rollout your best rollout.",
    primary: { label: "Talk to our team", href: "/contact" },
    secondary: { label: "Explore services", href: "/services" },
  },
};

export const agent = {
  chip: "Illustrative workflow",
  title: "See the workflow, not just the form.",
  body: "Inspect, identify, assign and review — configured around your team, so every finding on site turns into owned, tracked action.",
  link: { label: "Explore solutions", href: "/solutions" },
  consoleLabel: "mitti workflow · illustrative",
  console: [
    { kind: "cmd", text: "> workflow: daily-site-inspection" },
    { kind: "ok", text: "✓ Inspections completed across 4 sites" },
    { kind: "ok", text: "✓ 3 issues raised with photos and notes" },
    { kind: "ok", text: "✓ Actions assigned to owners · due Friday" },
    { kind: "send", text: "→ Trends shared with site managers" },
  ],
};

/** Answers draw only on what the site already states (services, approach, ownership). */
export const homeFaqs = [
  {
    q: "Is Mitti the same as SafetyCulture?",
    a: "Yes — Mitti is the new name for SafetyCulture; it is the same platform.",
  },
  {
    q: "What is Mitti?",
    a: "Mitti (formerly SafetyCulture) is a workplace operations platform for digital inspections, audits, actions and reporting. We help teams set it up around the way they actually work.",
  },
  {
    q: "We're new to Mitti. Where do we start?",
    a: "With discovery. We review your processes, priority use cases and goals, then agree a rollout roadmap before anything is configured.",
  },
  {
    q: "We already use Mitti. Can you help?",
    a: "Yes. We refine existing setups — configuration reviews, template improvements and adoption support — to remove friction for your teams.",
  },
  {
    q: "How long does an implementation take?",
    a: "Timing depends on scope, team availability and rollout requirements. We set clear milestones based on your scope and priorities.",
  },
  {
    q: "What does our team need to bring?",
    a: "Process knowledge, a project owner and pilot users, and timely feedback and decisions. We bring implementation guidance, configuration, onboarding and rollout coordination.",
  },
];
