import type { IconName } from "@/components/icons/Icon";

/** About page copy. */
export const aboutHero = {
  chip: "About Avantra",
  titleLead: "Technology works best",
  titleAccent: "when people can use it well.",
  sub: "We help organizations put Mitti into practice—with thoughtful implementation, practical training, and ongoing improvement.",
};

export const partnerBand = {
  lead: "Your",
  highlight: "Mitti",
  rest: "Implementation Partner.",
  sub: "From planning and configuration to adoption and rollout.",
};

export const story = {
  title: "A practical partner for operational change.",
  paragraphs: [
    "Avantra helps teams translate everyday operational needs into a working Mitti setup. We focus on the details that make a rollout useful: clear workflows, practical templates, defined responsibilities, and people who feel ready to use the platform.",
    "Our role is to work alongside your team, understand your priorities, and help build a solution that fits the way your business operates.",
  ],
};

export const values = {
  title: "What guides our work.",
  items: [
    { title: "Understand before configuring", body: "Start with the process and the people behind it.", icon: "team" },
    { title: "Keep it practical", body: "Build workflows teams can use in everyday work.", icon: "settings" },
    { title: "Work together", body: "Keep decisions, responsibilities, and feedback clear.", icon: "chat" },
    { title: "Improve continuously", body: "Refine the setup as your needs and adoption evolve.", icon: "chart" },
  ] satisfies { title: string; body: string; icon: IconName }[],
};

export const focus = {
  title: "Focused on your Mitti journey.",
  items: [
    { title: "Implementation", body: "Shape the platform around your operating needs.", icon: "sliders" },
    { title: "Enablement", body: "Prepare administrators, managers, and frontline teams.", icon: "team" },
    { title: "Long-term improvement", body: "Support the next phase of your rollout.", icon: "refresh" },
  ] satisfies { title: string; body: string; icon: IconName }[],
};

export const aboutCta = {
  title: "Let's get to know your business.",
  sub: "Tell us about your operations and what you want to improve.",
  label: "Start a conversation",
  href: "/contact",
};
