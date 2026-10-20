/** Global site settings. Values in [PLACEHOLDER] brackets are tracked in TODO.md. */
export const site = {
  name: "Blugig Global",
  legalName: "Blugig Global LLC",
  /** Explicit domain → Vercel production URL (system env) → placeholder. */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://www.blugig.com"),
  description:
    "Blugig Global designs the workflows, data pipelines, and AI agents that help teams move faster — on Smartsheet, SafetyCulture, Power BI, and the modern data stack.",
  email: "[PLACEHOLDER: hello@blugig.com]",
  phone: "[PLACEHOLDER: +1 000 000 0000]",
  address: "[PLACEHOLDER: office address]",
  replyTime: "1 business day",
  social: {
    linkedin: "https://www.linkedin.com/company/[PLACEHOLDER]",
  },
  /** BUILD_SPEC §9 S6 — keep false until real, verified numbers exist. */
  showImpactStats: false,
  calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL ?? "",
} as const;
