import type { IconName } from "@/components/icons/Icon";

/** How we work page copy. */
export const howHero = {
  chip: "Our implementation approach",
  titleLead: "A clear plan.",
  titleAccent: "A confident rollout.",
  sub: "We work with your team to turn operational requirements into a practical Mitti implementation.",
  cta: { label: "Plan your rollout", href: "/contact" },
};

export type Phase = {
  number: string;
  title: string;
  /** Two-line label for the hero path diagram. */
  short: [string, string?];
  body: string;
  deliverable: string;
  icon: IconName;
};

export const phases: Phase[] = [
  {
    number: "01",
    title: "Discover",
    short: ["Discover"],
    body: "Understand your processes, people, and priorities.",
    deliverable: "Agreed scope & rollout roadmap",
    icon: "plan",
  },
  {
    number: "02",
    title: "Configure & validate",
    short: ["Configure &", "validate"],
    body: "Build templates and workflows, then test them with your team.",
    deliverable: "Configured workspace & pilot feedback",
    icon: "settings",
  },
  {
    number: "03",
    title: "Train & launch",
    short: ["Train &", "launch"],
    body: "Prepare users and roll out in manageable stages.",
    deliverable: "User onboarding & launch checklist",
    icon: "team",
  },
  {
    number: "04",
    title: "Support & improve",
    short: ["Support &", "improve"],
    body: "Review adoption and refine the setup as your needs evolve.",
    deliverable: "Prioritized improvement plan",
    icon: "chart",
  },
];

export const phasesIntro = { title: "From discovery to everyday use." };

export const ownership = {
  title: "A shared effort. Clear ownership.",
  avantra: {
    title: "Avantra brings",
    icon: "team" as IconName,
    items: ["Implementation guidance", "Configuration and onboarding", "Rollout coordination"],
  },
  client: {
    title: "Your team brings",
    icon: "person" as IconName,
    items: ["Process knowledge", "A project owner and pilot users", "Feedback and decisions"],
  },
};

export const readiness = {
  title: "Designed around your readiness.",
  note: "Timing depends on scope, team availability, and rollout requirements.",
  items: [
    { title: "Agreed milestones", body: "We set clear milestones based on your scope and priorities.", icon: "target" },
    { title: "Regular check-ins", body: "We stay aligned through structured check-ins with your team.", icon: "chats" },
    { title: "Practical handover", body: "We make sure your team is confident to run and build on the solution.", icon: "plan" },
  ] satisfies { title: string; body: string; icon: IconName }[],
};

export const howCta = {
  title: "Let's map your Mitti journey.",
  sub: "Discuss your requirements and plan a practical rollout with our team.",
  label: "Book a discovery conversation",
  href: "/contact",
};
