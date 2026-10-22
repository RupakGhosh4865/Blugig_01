import type { IconName } from "@/components/icons/DrawIcon";

/** About page copy. */
export const aboutHero = {
  chip: "About Avantra",
  /** Shown with location and legal entity (those come from `site`). */
  founded: "2026" as string,
  titleLead: "Technology works best",
  titleAccent: "when people can use it well.",
  sub: "We help organizations put Mitti into practice—with thoughtful implementation, practical training, and ongoing improvement.",
};

/** Scroll-scrubbed statement + the rest of the story underneath. */
export const story = {
  accent: "A practical partner for operational change.",
  rest: "Avantra helps teams translate everyday operational needs into a working Mitti setup.",
  paragraphs: [
    "We focus on the details that make a rollout useful: clear workflows, practical templates, defined responsibilities, and people who feel ready to use the platform.",
    "Our role is to work alongside your team, understand your priorities, and help build a solution that fits the way your business operates.",
  ],
};

export const values = {
  chip: "Values",
  lead: "What guides",
  accent: "our work",
  items: [
    { title: "Understand before configuring", body: "Start with the process and the people behind it." },
    { title: "Keep it practical", body: "Build workflows teams can use in everyday work." },
    { title: "Work together", body: "Keep decisions, responsibilities, and feedback clear." },
    { title: "Improve continuously", body: "Refine the setup as your needs and adoption evolve." },
  ],
};

export const focus = {
  chip: "Focus",
  lead: "Focused on your",
  accent: "Mitti journey",
  items: [
    { title: "Implementation", body: "Shape the platform around your operating needs.", icon: "sliders" as IconName, href: "/services#platform-configuration" },
    { title: "Enablement", body: "Prepare administrators, managers, and frontline teams.", icon: "team" as IconName, href: "/services#training-launch" },
    { title: "Long-term improvement", body: "Support the next phase of your rollout.", icon: "refresh" as IconName, href: "/services#ongoing-optimization" },
  ],
};

export const partnerBand = {
  chip: "Mitti",
  lead: "Your",
  highlight: "Mitti",
  rest: "Implementation Partner.",
  sub: "From planning and configuration to adoption and rollout.",
};

export const aboutCta = {
  title: "Let's get to know your business.",
  sub: "Tell us about your operations and what you want to improve.",
  label: "Start a conversation",
  href: "/contact",
};
