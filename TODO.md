# TODO — owner inputs

Everything below is either hidden until supplied or marked as draft on the site.

## Contact details — `content/site.ts`
Each value is rendered only when set (footer, contact page, JSON-LD).
- [x] `email`, `phone`, `address`
- [x] `social.linkedin`
- [ ] Confirm reply-time promise `replyTime` ("1 business day") — used on /contact and in the form success message.
- [ ] Production domain → `NEXT_PUBLIC_SITE_URL` in Railway variables (falls back to Railway's generated domain, then localhost).

## Brand
- [ ] Vector logo (SVG), if available — the site uses the supplied PNGs (`public/brand/avantra-logo*.png`); the wordmark, one-colour navy and mark/favicon files are derived from them.
- [ ] Client logos (with permission) — the marquee under the statement shows Mitti services/use cases until then (`content/home.ts` → `platforms`).

## Content to supply (hidden until set)
- [ ] Booking link — `NEXT_PUBLIC_CALENDLY_URL` (shows the "Book a call" button and the scheduler on /contact).

## Content to confirm
- [ ] Integration systems list — `content/home.ts` → `integrations.groups` (example systems per category on Home `#integrations`).
- [ ] FAQ "Is Mitti the same as SafetyCulture?" wording against Mitti brand guidance — `content/home.ts` → `homeFaqs`.
- [ ] Home FAQ answers — `content/home.ts` (`homeFaqs`), written from the services/approach copy.
- [ ] Workato partner badge — confirm usage per Workato's partner brand guidelines (`public/brand/workato-silver-partner.png`, footer + About).
- [ ] "Mitti (by SafetyCulture)" naming and any partner-tier wording before publishing.
- [ ] Testimonials — `content/testimonials.ts` (section hidden while empty).
- [ ] Solution cards link to `/contact?topic=…`; add solution detail pages later if wanted.

## Legal
- [ ] Counsel review of the privacy policy (`app/privacy/page.tsx`) and terms (`app/terms/page.tsx`) — full text written 23 Oct 2026 against how the site actually handles data; confirm the registered address and the ₹10,000 website-liability cap.

## Integrations (env — see `.env.example`)
- [ ] `CONTACT_WEBHOOK_URL` (n8n / Zapier / Make) and/or `RESEND_API_KEY` + `CONTACT_TO_EMAIL` (+ verified `CONTACT_FROM_EMAIL`). Lead payload field is `topic`.
- [ ] Optional `NEXT_PUBLIC_CALENDLY_URL`
- [ ] Rate limit is in-memory per instance — fine for one Railway replica; move to a shared store (e.g. Redis on Railway) if you scale to several.

## Analytics
- [ ] None installed (Vercel Analytics only works on Vercel). If you add one (e.g. Plausible, Umami, GA4), update the privacy policy's "Information we collect" and "Cookies" sections.
