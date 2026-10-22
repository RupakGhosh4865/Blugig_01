import type { IconName } from "@/components/icons/DrawIcon";
import type { IllustrationId } from "@/components/illustrations/ServiceIllustrations";

/** Mitti implementation services. `focus` + `cardLine` are the matching "What we do" item on Home. */
export type Service = {
  slug: string;
  number: string;
  title: string;
  focus: string;
  cardLine: string;
  deliverables: string[];
  icon: IconName;
  illustration: IllustrationId;
};

export const services: Service[] = [
  {
    slug: "discovery-planning",
    number: "01",
    title: "Discovery & planning",
    focus: "Implementation planning",
    cardLine: "A rollout plan tailored to your operations and people.",
    deliverables: ["Process review", "Priority use cases", "Rollout roadmap"],
    icon: "plan",
    illustration: "plan",
  },
  {
    slug: "platform-configuration",
    number: "02",
    title: "Platform configuration",
    focus: "Account configuration",
    cardLine: "Set up Mitti to match your structure, workflows and permissions.",
    deliverables: ["Sites and teams", "Roles and access", "Account structure"],
    icon: "settings",
    illustration: "settings",
  },
  {
    slug: "inspections-workflows",
    number: "03",
    title: "Inspections & workflows",
    focus: "Digital inspections",
    cardLine: "Digitize your checklists and field processes for consistent execution.",
    deliverables: ["Digital templates", "Inspection schedules", "Action ownership"],
    icon: "tablet",
    illustration: "tablet",
  },
  {
    slug: "reporting-setup",
    number: "04",
    title: "Reporting setup",
    focus: "Actions & reporting",
    cardLine: "Turn findings into actions with clear visibility.",
    deliverables: ["Reporting needs", "Dashboard configuration", "Manager walkthrough"],
    icon: "chart",
    illustration: "chart",
  },
  {
    slug: "training-launch",
    number: "05",
    title: "Training & launch",
    focus: "Team enablement",
    cardLine: "Practical training and support to build confidence and adoption.",
    deliverables: ["Role-based onboarding", "Pilot feedback", "Phased rollout"],
    icon: "team",
    illustration: "team",
  },
  {
    slug: "ongoing-optimization",
    number: "06",
    title: "Ongoing optimization",
    focus: "Ongoing improvement",
    cardLine: "Refine and expand as your needs evolve.",
    deliverables: ["Configuration reviews", "Template improvements", "Adoption support"],
    icon: "refresh",
    illustration: "refresh",
  },
];

export const servicesHero = {
  chip: "Mitti implementation services",
  titleLead: "Expert support.",
  titleAccent: "Every step of your Mitti journey.",
  sub: "From initial planning to ongoing improvement, we help you put Mitti to work.",
  primary: { label: "Scope your implementation", href: "/contact" },
  secondary: { label: "Browse services", href: "#services" },
};

export const servicesIntro = {
  chip: "Services",
  titleLead: "Practical services.",
  titleAccent: "Clear deliverables.",
  sub: "Take the services you need, in the order that fits your rollout. Final scope and deliverables are agreed during discovery.",
};

/** Where an engagement starts. `entry` is the matching "Start a new rollout"-style label. */
export const supportOptions = {
  chip: "Where you are",
  titleLead: "Choose the support",
  titleAccent: "you need.",
  items: [
    {
      slug: "new-to-mitti",
      entry: "Start a new rollout",
      title: "New to Mitti",
      body: "Build your foundation with a planned implementation.",
      icon: "sprout" as IconName,
    },
    {
      slug: "already-using-mitti",
      entry: "Improve an existing setup",
      title: "Already using Mitti",
      body: "Refine the setup and remove friction for your teams.",
      icon: "sliders" as IconName,
    },
    {
      slug: "ready-to-expand",
      entry: "Support your next phase",
      title: "Ready to expand",
      body: "Prepare more sites, users, and workflows for rollout.",
      icon: "chart" as IconName,
    },
  ],
};

/** Workato integration service — its own section, alongside the six implementation services. */
export const integrationService = {
  id: "integration-automation",
  chip: "Integration & automation",
  lead: "Integration & automation (Workato)",
  sub: "Connect Mitti to the systems you already run. As a Workato Silver Partner, we design, build and hand over the automations.",
  cta: { label: "Plan my integration", href: "/contact?topic=connected-workflows" },
  steps: [
    {
      title: "Discovery",
      body: "Map your systems, data and triggers — which inspections, issues and actions should flow where.",
    },
    {
      title: "Recipe build",
      body: "Build and test Workato recipes that sync Mitti with your ERP, HR and ticketing tools.",
    },
    {
      title: "Monitoring & handover",
      body: "Set up alerts and error handling, document every recipe and train your team to run it.",
    },
  ],
};

/** How an engagement can be shaped. Scope is agreed during discovery. */
export const engagementModels = {
  id: "ways-to-work",
  chip: "Engagement models",
  lead: "Ways to work",
  accent: "with us",
  sub: "Start small, roll out at scale, or keep us on hand — scope is agreed during discovery.",
  items: [
    { title: "Pilot", body: "Prove the setup on one site or team, with clear success measures before you scale." },
    { title: "Enterprise rollout", body: "A phased, multi-site rollout with governance, training and change support." },
    { title: "Retained support", body: "Ongoing administration, improvements and new workflows from a team that knows your setup." },
  ],
};

export const servicesCta = {
  title: "Let's define your next step.",
  sub: "Tell us where your Mitti rollout stands. A short discovery conversation is enough to map the first step.",
  label: "Discuss your requirements",
  href: "/contact",
};

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
