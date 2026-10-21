/** Top-level links after the Solutions and Services menus. */
export const mainNav = [
  { label: "How we work", href: "/how-we-work" },
  { label: "About", href: "/about" },
] as const;

export const primaryCta = { label: "Talk to our team", href: "/contact" } as const;

export const footerNav = {
  howWeWork: [
    { label: "Our approach", href: "/how-we-work" },
    { label: "Shared ownership", href: "/how-we-work#ownership" },
    { label: "Readiness & handover", href: "/how-we-work#readiness" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Why Avantra", href: "/about#values" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
} as const;
