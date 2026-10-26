/** The Integrations page (top-level nav link and the Services-menu entry). */
export const integrationsHref = "/integrations";

/** Services-menu entry for the Integrations page. */
export const integrationsMenu = {
  title: "Integrations",
  line: "Connect Mitti to your ERP, HR and ticketing tools with Workato.",
  href: integrationsHref,
} as const;

/** Top-level links after the Solutions and Services menus. */
export const mainNav = [
  { label: "Integrations", href: integrationsHref },
  { label: "How we work", href: "/how-we-work" },
  { label: "About", href: "/about" },
] as const;

export const primaryCta = { label: "Talk to our team", href: "/contact" } as const;

export const footerNav = {
  company: [
    { label: "How we work", href: "/how-we-work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Blog", href: "/blog" },
  ],
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
} as const;
