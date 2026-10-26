/** Global site settings. Empty contact values are hidden on the site and tracked in TODO.md. */
export const site = {
  name: "Avantra Technologies",
  shortName: "Avantra",
  legalName: "Avantra Technologies",
  tagline: "Mitti Implementation Partner",
  /** Brand line from the logo lockup. */
  slogan: "Smarter operations. Safer teams.",
  /** Explicit domain → Railway public domain (provided at build and run time) → local dev. */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.RAILWAY_PUBLIC_DOMAIN ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}` : "http://localhost:3000"),
  description:
    "Avantra Technologies is a Mitti implementation partner. We help operations teams plan, configure and roll out Mitti by SafetyCulture — from setup to site-wide adoption.",
  /** Each contact value is rendered only when set (footer, contact page, JSON-LD). */
  email: "info@avantratechnologies.com" as string,
  phone: "+91 7676771425" as string,
  address: "Bangalore, Karnataka, India" as string,
  replyTime: "1 business day",
  social: {
    linkedin: "https://www.linkedin.com/company/sspmconsultants" as string,
  },
  /** Partner programme shown as a badge (footer + About). */
  partner: {
    name: "Workato Automation League — Silver Partner",
    short: "Workato Silver Partner",
  },
  /** Partner credentials shown as badges (hero, About). */
  credentials: [
    { kind: "mitti", name: "Mitti", line: "Certified Expert" },
    { kind: "workato", name: "Workato", line: "Silver Partner" },
  ],
  /** Parent company and the footer legal line (verbatim from the owner). */
  parentCompany: "SSPM IT SOLUTIONS PRIVATE LIMITED",
  copyright: "© 2026 Avantra Technologies. An SSPM IT SOLUTIONS PRIVATE LIMITED COMPANY. All rights reserved.",
  calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL ?? "",
} as const;

/** Contact lines that are set, with their link (footer + contact page). */
export function contactDetails() {
  const lines = [
    { kind: "email", value: site.email, href: `mailto:${site.email}` },
    { kind: "phone", value: site.phone, href: `tel:${site.phone.replace(/[^+\d]/g, "")}` },
    { kind: "address", value: site.address, href: undefined },
  ] as const;
  return lines.filter((l) => l.value);
}
