/** Global site settings. Empty contact values are hidden on the site and tracked in TODO.md. */
export const site = {
  name: "Avantra Technologies",
  shortName: "Avantra",
  legalName: "Avantra Technologies",
  tagline: "Mitti Implementation Partner",
  /** Brand line from the logo lockup. */
  slogan: "Smarter operations. Safer teams.",
  /** Explicit domain → Vercel production URL (system env) → local dev. */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  description:
    "Avantra Technologies is a Mitti implementation partner. We help operations teams plan, configure and roll out Mitti by SafetyCulture — from setup to site-wide adoption.",
  /** [TODO] owner to supply — each is rendered only when set. */
  email: "" as string,
  phone: "" as string,
  address: "" as string,
  replyTime: "1 business day",
  social: {
    linkedin: "" as string,
  },
  /** Partner programme shown as a badge (footer + About). */
  partner: {
    name: "Workato Automation League — Silver Partner",
    short: "Workato Silver Partner",
  },
  /** Parent company and the footer legal line (verbatim from the owner). */
  parentCompany: "SSPM IT SOLUTIONS PRIVATE LIMITED",
  copyright: "© 2026 Avantra Technologies. An SSPM IT SOLUTIONS PRIVATE LIMITED COMPANY. All rights reserved.",
  calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL ?? "",
} as const;
