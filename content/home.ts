import type { IconName } from "@/components/icons/Icon";

/** Home page copy. */
export const hero = {
  chip: "Mitti implementation partner",
  titleLead: "Turn everyday checks",
  titleAccent: "into better operations.",
  sub: "Implement Mitti with a partner who understands your processes, your people, and your goals.",
  primary: { label: "Explore implementation", href: "/how-we-work" },
  secondary: { label: "Meet Avantra", href: "/about" },
  badge: "From setup to site-wide adoption",
};

export const mittiStrip = {
  product: "Mitti",
  maker: "(by SafetyCulture)",
  pillars: ["Implementation", "Enablement", "Ongoing support"],
};

export const statement = {
  accent: "We translate your operational needs",
  rest: "into a practical Mitti rollout.",
};

export const whatWeDo = {
  chip: "What we do",
  titleLead: "The right setup.",
  titleAccent: "A stronger way to work.",
  items: [
    { title: "Implementation planning", body: "A rollout plan tailored to your operations and people.", icon: "plan" },
    { title: "Account configuration", body: "Set up Mitti to match your structure, workflows and permissions.", icon: "settings" },
    { title: "Digital inspections", body: "Digitize your checklists and field processes for consistent execution.", icon: "tablet" },
    { title: "Actions & reporting", body: "Turn findings into actions with clear visibility.", icon: "chart" },
    { title: "Team enablement", body: "Practical training and support to build confidence and adoption.", icon: "team" },
    { title: "Ongoing improvement", body: "Refine and expand as your needs evolve.", icon: "refresh" },
  ] satisfies { title: string; body: string; icon: IconName }[],
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

export const homeIndustries = {
  chip: "Industries",
  title: "Built around the work you do.",
  sub: "We help operational teams in a range of industries put Mitti to work in practical, meaningful ways.",
};

export const homeCta = {
  title: "Make your next rollout your best rollout.",
  label: "Start a conversation",
  href: "/contact",
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
