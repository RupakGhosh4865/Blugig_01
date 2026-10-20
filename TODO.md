# TODO — placeholders & owner inputs

Every `[PLACEHOLDER]` rendered on the site, plus draft copy to confirm. (BUILD_SPEC §17)

## Brand
- [ ] **Logo SVGs** → `public/brand/logo.svg`, `logo-mark.svg`, `logo-white.svg`; then swap the text wordmark in `components/layout/Logo.tsx`.
- [ ] **Exact logo hex values** → replace the stand-in `--color-gold-*` (yellow) and `--color-blue-*` scales in `app/globals.css` (`@theme`). Text-on-light shades (`gold-700/800`) must keep ≥3:1 / ≥4.5:1 contrast.
- [ ] Favicon → `app/icon.svg` (currently a placeholder "B" mark).

## Contact details — `content/site.ts`
- [ ] `email` (line 8), `phone` (line 9), `address` (line 10)
- [ ] `social.linkedin` (line 13)
- [ ] Confirm reply-time promise `replyTime` ("1 business day") — used on /contact and in the form success message (`app/contact/actions.ts`).
- [ ] Production domain → `NEXT_PUBLIC_SITE_URL`.

## Home
- [ ] Partner badges trust line — `content/home.ts:12`
- [ ] Client / partner logos (with permission) — `components/sections/home/Platforms.tsx` currently shows "Platforms we build on" text names. Swap label to "Trusted by teams at" once logos exist.
- [ ] Impact circles use factual counts (6 practices, 3 platforms, 4 steps, 1 partner). If real performance stats are approved, add them and set `site.showImpactStats`.
- [ ] Testimonials — `content/testimonials.ts` (section hidden while empty)
- [ ] Case studies — `content/caseStudies.ts` (hidden while empty)
- [ ] All home copy in `content/home.ts` is DRAFT (before/after lists, statements, wins tooltips, momentum cards, FAQ).

## Services — `content/services.ts`
- [ ] Confirm "Mitti by SafetyCulture" naming/spelling (line ~152)
- [ ] Data Engineering tool stack (line 285)
- [ ] Data Migration tools (line 343)
- [ ] Agentic AI tools (line 408)
- [ ] FAQ answers marked `(draft)` (SafetyCulture, Power BI, Data Engineering, Data Migration, Agentic AI). The `(draft)` suffix is stripped on-page and in JSON-LD.

## About — `app/about/page.tsx`
- [ ] Company story (line 45)
- [ ] Mission line wording (line 55–56, draft)
- [ ] Team bios & photos (lines 88–96)
- [ ] Partners & certifications (line 103)
- [ ] Office / client regions (line 116)

## Legal
- [ ] Privacy policy text + date — `app/privacy/page.tsx`
- [ ] Terms text + date — `app/terms/page.tsx`

## Integrations (env — see `.env.example`)
- [ ] `CONTACT_WEBHOOK_URL` (n8n / Zapier / Make) and/or `RESEND_API_KEY` + `CONTACT_TO_EMAIL` (+ verified `CONTACT_FROM_EMAIL`)
- [ ] Optional `NEXT_PUBLIC_CALENDLY_URL`
- [ ] Optional Spline hero (`public/3d/hero.splinecode`) — not wired yet; the particle globe ships as the hero.
- [ ] Rate limit is in-memory per instance — move to Upstash for multi-region production.
