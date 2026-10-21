import type { IconName } from "@/components/icons/Icon";

/** Services page copy (Mitti implementation services). */
export type Service = {
  slug: string;
  number: string;
  title: string;
  deliverables: string[];
};

export const servicesHero = {
  chip: "Mitti implementation services",
  titleLead: "Expert support.",
  titleAccent: "Every step of your Mitti journey.",
  sub: "From initial planning to ongoing improvement, we help you put Mitti to work.",
  cta: { label: "Scope your implementation", href: "/contact" },
};

/** Where an engagement can start — shown in the navy band under the hero. */
export const entryPoints: { title: string; icon: IconName; topic: string }[] = [
  { title: "Start a new rollout", icon: "team", topic: "new-to-mitti" },
  { title: "Improve an existing setup", icon: "chart", topic: "already-using-mitti" },
  { title: "Support your next phase", icon: "settings", topic: "ready-to-expand" },
];

export const servicesIntro = {
  title: "Practical services. Clear deliverables.",
  note: "Final scope and deliverables are agreed during discovery.",
};

export const services: Service[] = [
  {
    slug: "discovery-planning",
    number: "01",
    title: "Discovery & planning",
    deliverables: ["Process review", "Priority use cases", "Rollout roadmap"],
  },
  {
    slug: "platform-configuration",
    number: "02",
    title: "Platform configuration",
    deliverables: ["Sites and teams", "Roles and access", "Account structure"],
  },
  {
    slug: "inspections-workflows",
    number: "03",
    title: "Inspections & workflows",
    deliverables: ["Digital templates", "Inspection schedules", "Action ownership"],
  },
  {
    slug: "reporting-setup",
    number: "04",
    title: "Reporting setup",
    deliverables: ["Reporting needs", "Dashboard configuration", "Manager walkthrough"],
  },
  {
    slug: "training-launch",
    number: "05",
    title: "Training & launch",
    deliverables: ["Role-based onboarding", "Pilot feedback", "Phased rollout"],
  },
  {
    slug: "ongoing-optimization",
    number: "06",
    title: "Ongoing optimization",
    deliverables: ["Configuration reviews", "Template improvements", "Adoption support"],
  },
];

export const supportOptions = {
  title: "Choose the support you need.",
  items: [
    {
      slug: "new-to-mitti",
      title: "New to Mitti",
      body: "Build your foundation with a planned implementation.",
      icon: "sprout" as IconName,
    },
    {
      slug: "already-using-mitti",
      title: "Already using Mitti",
      body: "Refine the setup and remove friction for your teams.",
      icon: "sliders" as IconName,
    },
    {
      slug: "ready-to-expand",
      title: "Ready to expand",
      body: "Prepare more sites, users, and workflows for rollout.",
      icon: "chart" as IconName,
    },
  ],
};

export const servicesCta = {
  title: "Let's define your next step.",
  label: "Discuss your requirements",
  href: "/contact",
};
