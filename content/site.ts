/** The production domain: the canonical host for every URL search engines see (next.config.ts redirects other hosts here). */
export const PRODUCTION_URL = "https://www.avantratechnologies.com";

/** Global site settings. Empty contact values are hidden on the site and tracked in TODO.md. */
export const site = {
  name: "Avantra Technologies",
  shortName: "Avantra",
  legalName: "Avantra Technologies",
  tagline: "Mitti Implementation Partner",
  /** Brand line from the logo lockup. */
  slogan: "Smarter operations. Safer teams.",
  /**
   * Canonical origin (canonicals, sitemap, robots, OG, JSON-LD). NEXT_PUBLIC_SITE_URL overrides it, but
   * never fall back to RAILWAY_PUBLIC_DOMAIN: that told search engines the Railway copy was the real site.
   */
  url: (process.env.NEXT_PUBLIC_SITE_URL || PRODUCTION_URL).replace(/\/+$/, ""),
  description:
    "Avantra Technologies is a Mitti implementation partner. We help operations teams plan, configure and roll out Mitti by SafetyCulture — from setup to site-wide adoption.",
  /** Each contact value is rendered only when set (footer, contact page, JSON-LD). */
  email: "info@avantratechnologies.com" as string,
  /** Listed in this order everywhere; the first is the primary (structured data). */
  phones: ["+91 9821711355", "+91 7676771425"] as string[],
  /** One spelling of the city everywhere (site, schema, LinkedIn, partner listings): Bengaluru. */
  address: "Bengaluru, Karnataka, India" as string,
  replyTime: "1 business day",
  social: {
    /** The parent company's page (footer link) until Avantra has its own company page. */
    linkedin: "https://www.linkedin.com/company/sspmconsultants" as string,
  },
  /**
   * Avantra's own profiles, listed as Organization `sameAs` in structured data: add its LinkedIn
   * company page and the Mitti / Workato partner-directory listings once they're live.
   */
  profiles: [] as string[],
  /** Partner programme shown as a badge (footer + About). */
  partner: {
    name: "Workato Automation League — Silver Partner",
    short: "Workato Silver Partner",
  },
  /** Partner credentials shown as badges (hero, About). */
  credentials: [
    { kind: "mitti", name: "Mitti", line: "Certified Experts" },
    { kind: "workato", name: "Workato", line: "Silver Partner" },
  ],
  /** Parent company and the footer legal line (verbatim from the owner). */
  parentCompany: "SSPM IT SOLUTIONS PRIVATE LIMITED",
  /** The parent company's profiles, credited to it (parentOrganization) in structured data, never to Avantra. */
  parentProfiles: ["https://www.linkedin.com/company/sspmconsultants"] as string[],
  copyright: "© 2026 Avantra Technologies. An SSPM IT SOLUTIONS PRIVATE LIMITED COMPANY. All rights reserved.",
  /** Booking link (contact page, integration assessment); NEXT_PUBLIC_CALENDLY_URL overrides it. */
  calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/avantratechnologies-info/30min",
} as const;

/** Contact lines that are set, with their link (footer + contact page). */
export function contactDetails() {
  const lines: { kind: "email" | "phone" | "address"; value: string; href?: string }[] = [
    { kind: "email", value: site.email, href: `mailto:${site.email}` },
    ...site.phones.map((p) => ({ kind: "phone" as const, value: p, href: `tel:${p.replace(/[^+\d]/g, "")}` })),
    { kind: "address", value: site.address },
  ];
  return lines.filter((l) => l.value);
}
