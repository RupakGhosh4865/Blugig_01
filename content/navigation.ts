/** Top-level links after the Solutions and Services menus. */
export const mainNav = [
  { label: "How we work", href: "/how-we-work" },
  { label: "About", href: "/about" },
] as const;

export const primaryCta = { label: "Talk to our team", href: "/contact" } as const;

export const footerNav = {
  company: [
    { label: "How we work", href: "/how-we-work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
} as const;
