/** How we work page copy. */
export const howHero = {
  eyebrow: "Our implementation approach",
  titleLead: "A clear plan.",
  titleAccent: "A confident rollout.",
  sub: "We work with your team to turn operational requirements into a practical Mitti implementation.",
  primary: { label: "Plan your rollout", href: "/contact" },
  secondary: { label: "See the phases", href: "#approach" },
};

/** Rendered by the pinned <Approach> section; each phase ends in a deliverable. */
export const phases = {
  chip: "Four phases",
  title: "From discovery to everyday use.",
  sub: "Every phase ends with a clear deliverable your team can review, approve and build on.",
  cta: { label: "Plan your rollout", href: "/contact" },
  steps: [
    {
      title: "Discover",
      body: "Understand your processes, people, and priorities.",
      deliverable: "Agreed scope & rollout roadmap",
    },
    {
      title: "Configure & validate",
      body: "Build templates and workflows, then test them with your team.",
      deliverable: "Configured workspace & pilot feedback",
    },
    {
      title: "Train & launch",
      body: "Prepare users and roll out in manageable stages.",
      deliverable: "User onboarding & launch checklist",
    },
    {
      title: "Support & improve",
      body: "Review adoption and refine the setup as your needs evolve.",
      deliverable: "Prioritized improvement plan",
    },
  ],
};

export const ownership = {
  chip: "Shared ownership",
  titleLead: "A shared effort.",
  titleAccent: "Clear ownership.",
  sub: "A rollout works when both sides know what they bring to it.",
  left: {
    label: "Avantra brings",
    items: ["Implementation guidance", "Configuration and onboarding", "Rollout coordination"],
  },
  right: {
    label: "Your team brings",
    items: ["Process knowledge", "A project owner and pilot users", "Feedback and decisions"],
  },
};

export const readiness = {
  chip: "Readiness",
  title: "Designed around your readiness.",
  sub: "Timing depends on scope, team availability, and rollout requirements.",
  /** Typical pilot length, appended to `sub` (shown only when set). */
  pilotTiming: "3–4 weeks" as string,
  items: [
    { title: "Agreed milestones", body: "We set clear milestones based on your scope and priorities." },
    { title: "Regular check-ins", body: "We stay aligned through structured check-ins with your team." },
    { title: "Practical handover", body: "We make sure your team is confident to run and build on the solution." },
  ],
};

export const governance = {
  chip: "Governance",
  lead: "Clear governance",
  accent: "from day one.",
  sub: "Every engagement runs on a simple structure, so decisions are quick and nothing goes quiet.",
  items: [
    { title: "Named delivery lead", body: "One accountable Avantra lead who owns the plan, the team and the outcomes." },
    { title: "Steering cadence", body: "Regular check-ins with your project owner, and a steering review at every phase gate." },
    { title: "Risk escalation", body: "Risks and blockers are logged, owned and raised early — with a clear path to decision-makers." },
  ],
};

export const howCta = {
  title: "Let's map your Mitti journey.",
  sub: "Discuss your requirements and plan a practical rollout with our team.",
  label: "Book a discovery conversation",
  href: "/contact",
};
