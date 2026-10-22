import type { IconName } from "@/components/icons/DrawIcon";

/** Solutions page copy (common Mitti use cases). */
export type Solution = {
  slug: string;
  title: string;
  body: string;
  icon: IconName;
  /** The Workato use case: menus show the Integrations entry in its place. */
  integration?: true;
};

export const solutionsHero = {
  eyebrow: "Solutions with Mitti",
  titleLead: "Solve the operational problems",
  titleAccent: "that cost you most.",
  sub: "Practical Mitti solutions for inspections, follow-up, and visibility across your sites.",
  primary: { label: "Find your starting point", href: "#use-cases" },
  secondary: { label: "Talk to our team", href: "/contact" },
};

export const solutionsIntro = {
  chip: "Use cases",
  title: "What would you like to improve?",
  sub: "Explore common use cases for Mitti. Each solution can be tailored to your processes, sites, and teams.",
};

export const solutions: Solution[] = [
  {
    slug: "inspections-audits",
    title: "Inspections & audits",
    body: "Replace paper checks with consistent digital inspections.",
    icon: "inspect",
  },
  {
    slug: "issue-reporting",
    title: "Issue reporting",
    body: "Give teams a clear way to capture what needs attention.",
    icon: "alert",
  },
  {
    slug: "corrective-actions",
    title: "Corrective actions",
    body: "Assign ownership and track follow-up.",
    icon: "team",
  },
  {
    slug: "site-standards",
    title: "Site standards",
    body: "Bring repeatable processes to every location.",
    icon: "plan",
  },
  {
    slug: "asset-inspections",
    title: "Asset inspections",
    body: "Structure equipment checks and record findings.",
    icon: "settings",
  },
  {
    slug: "operational-visibility",
    title: "Operational visibility",
    body: "Review activity and trends across your operations.",
    icon: "chart",
  },
  {
    slug: "connected-workflows",
    title: "Connected workflows (Workato)",
    body: "Sync inspections, issues and actions with your ERP, HR and ticketing tools — no re-keying.",
    icon: "refresh",
    integration: true,
  },
];

export const workflow = {
  chip: "Workflow",
  title: "See the workflow, not just the form.",
  sub: "An illustrative workflow configured around your team.",
  steps: [
    { title: "Inspect", body: "Complete digital inspections on site using Mitti." },
    { title: "Identify", body: "Capture issues and raise observations." },
    { title: "Assign", body: "Assign ownership and set follow-up." },
    { title: "Review", body: "Track progress and review trends." },
  ],
};

export const solutionsIndustries = {
  chip: "Industries",
  lead: "Adapted to",
  accent: "your environment",
  sub: "Mitti can be configured for a range of industries and site types.",
};

export const solutionsCta = {
  title: "Which process should we improve first?",
  sub: "Talk to our team about your goals and we'll help you find the right starting point.",
  label: "Discuss your use case",
  href: "/contact",
};
