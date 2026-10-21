import type { IconName } from "@/components/icons/Icon";

/** Solutions page copy (common Mitti use cases). */
export type Solution = {
  slug: string;
  title: string;
  body: string;
  icon: IconName;
};

export const solutionsHero = {
  chip: "Solutions with Mitti",
  titleLead: "Better ways to manage",
  titleAccent: "everyday operations.",
  sub: "Practical Mitti solutions for inspections, follow-up, and visibility across your sites.",
  cta: { label: "Find your starting point", href: "#use-cases" },
};

export const solutionsIntro = {
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
];

export const workflow = {
  title: "See the workflow, not just the form.",
  sub: "An illustrative workflow configured around your team.",
  steps: [
    { title: "Inspect", body: "Complete digital inspections on site using Mitti.", icon: "inspect" as IconName },
    { title: "Identify", body: "Capture issues and raise observations.", icon: "alert" as IconName },
    { title: "Assign", body: "Assign ownership and set follow-up.", icon: "person" as IconName },
    { title: "Review", body: "Track progress and review trends.", icon: "chart" as IconName },
  ],
};

export const solutionsIndustries = {
  title: "Adapted to your environment.",
  sub: "Mitti can be configured for a range of industries and site types.",
};

export const solutionsCta = {
  title: "Which process should we improve first?",
  sub: "Talk to our team about your goals and we'll help you find the right starting point.",
  label: "Discuss your use case",
  href: "/contact",
};
