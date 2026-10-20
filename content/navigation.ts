export const mainNav = [
  { label: "How we work", href: "/#approach" },
  { label: "About", href: "/about" },
  /** Hidden until Insights exists (BUILD_SPEC §7.1). */
  // { label: "Insights", href: "/insights" },
] as const;

export const footerNav = {
  company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "/contact", placeholder: true },
  ],
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
} as const;
