# TODO — owner inputs

Everything below is either hidden until supplied or marked as draft on the site.

## Contact details — `content/site.ts`
Each value is rendered only when set (footer, contact page, JSON-LD).
- [ ] `email`, `phone`, `address`
- [ ] `social.linkedin`
- [ ] Confirm reply-time promise `replyTime` ("1 business day") — used on /contact and in the form success message.
- [ ] Production domain → `NEXT_PUBLIC_SITE_URL` (falls back to the Vercel production URL, then localhost).

## Brand
- [ ] Vector logo, if available — the site uses the supplied PNGs (`public/brand/avantra-logo*.png`) and a traced SVG mark (`public/brand/avantra-mark.svg`, `app/icon.svg`).
- [ ] Photography — the mockups use site/team photos; heroes currently use illustrated UI (`components/illustrations/`, `components/sections/home/HeroVisual.tsx`). Swap in licensed photos if preferred.

## Content to confirm
- [ ] Home FAQ answers — `content/home.ts` (`homeFaqs`), written from the services/approach copy.
- [ ] Partner wording for Bravas — About page partner block (`app/about/page.tsx`) and footer line (`components/layout/Footer.tsx`).
- [ ] "Mitti (by SafetyCulture)" naming and any partner-tier wording before publishing.
- [ ] Testimonials — `content/testimonials.ts` (section hidden while empty).
- [ ] Solution cards link to `/contact?topic=…`; add solution detail pages later if wanted.

## Legal
- [ ] Privacy policy text + date — `app/privacy/page.tsx`
- [ ] Terms text + date — `app/terms/page.tsx`

## Integrations (env — see `.env.example`)
- [ ] `CONTACT_WEBHOOK_URL` (n8n / Zapier / Make) and/or `RESEND_API_KEY` + `CONTACT_TO_EMAIL` (+ verified `CONTACT_FROM_EMAIL`). Lead payload field is `topic`.
- [ ] Optional `NEXT_PUBLIC_CALENDLY_URL`
- [ ] Rate limit is in-memory per instance — move to Upstash for multi-region production.
