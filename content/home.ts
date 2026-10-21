/**
 * Home page copy. Section order mirrors zig.ai (the original build's layout);
 * wording comes from the Avantra mockups. Counts are factual (from the offer
 * itself), console lines and card metas are illustrative.
 */
export const hero = {
  chip: "Mitti implementation partner",
  titleLead: "Turn everyday checks",
  titleAccent: "into better operations.",
  sub: "Implement Mitti with a partner who understands your processes, your people, and your goals.",
  primary: { label: "Explore implementation", href: "/how-we-work" },
  secondary: { label: "Meet Avantra", href: "/about" },
};

/**
 * Hero wheel (illustrative). Four Mitti workflow events ride the wheel, stack,
 * then resolve into the two summary cards — same choreography as zig.ai's hero.
 * Order matters: [0] becomes the "Avantra did" card, [1] hides the "You did" card.
 */
export const heroWheel = {
  activity: [
    { time: "9:02 AM", title: "Inspection completed", detail: "Daily site walk · North site", icon: "inspect", tone: "mint" },
    { time: "9:03 AM", title: "Issue flagged", detail: "Guard rail damaged · Bay 4", icon: "alert", tone: "peach" },
    { time: "9:03 AM", title: "Action assigned", detail: "Maintenance → Due Friday", icon: "person", tone: "sky" },
    { time: "9:04 AM", title: "Re-check scheduled", detail: "Follow-up inspection on May 16", icon: "calendar", tone: "lilac" },
  ],
  brand: { title: "Avantra did", detail: "14 setup tasks", people: ["AM", "JR", "SK"], more: "+12" },
  person: { title: "You did", detail: "Approved the rollout" },
} as const;

export const gap = {
  chip: "The operations gap",
  titleLead: "Everyday checks",
  titleAccent: "still live on paper",
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

export const platforms = {
  label: "Mitti (by SafetyCulture)",
  items: [
    "Implementation",
    "Enablement",
    "Ongoing support",
    "Inspections & audits",
    "Issue reporting",
    "Corrective actions",
    "Site standards",
    "Asset inspections",
    "Operational visibility",
  ],
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
    q: "What is Mitti?",
    a: "Mitti is SafetyCulture's workplace operations platform for digital inspections, audits, actions and reporting. We help teams set it up around the way they actually work.",
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
