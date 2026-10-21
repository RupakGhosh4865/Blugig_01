# Avantra Technologies — website

Marketing site for Avantra Technologies, a Mitti (by SafetyCulture) implementation partner.
Partner: [Bravas — The Mitti Experts](https://bravastech.com/).

Next.js 16 (App Router, Cache Components) · Tailwind CSS v4 · Motion · Lenis · three.js / R3F (404 only).
Layout and motion language modelled on zig.ai (see `references/zig-ai-teardown.md`), in the Avantra
logo colours: mark blue `#003FA9`, wordmark slate `#2C3A52`. Open items: `TODO.md`.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run build && npm run start
```

Copy `.env.example` → `.env.local` to wire the contact form (webhook and/or Resend). Without it,
submissions are logged to the server console.

## Pages
`/` · `/solutions` · `/services` · `/how-we-work` · `/about` · `/contact` · `/privacy` · `/terms`
(old `/services/:slug` URLs redirect to `/services` — `next.config.ts`).

## Where things live
- **Copy** — `content/*.ts`: `site`, `navigation`, `home`, `solutions`, `services`, `howWeWork`, `about`, `industries`, `testimonials`
- **Logo** — `public/brand/` (`avantra-logo.png` for light backgrounds, `avantra-logo-white.png` for dark, `avantra-mark.svg`); rendered by `components/layout/Logo.tsx`. Favicon: `app/icon.svg` + `app/apple-icon.png`
- **Brand tokens** — `app/globals.css` (`@theme`): `blue-*` (600 = logo blue), `sky-*` accent for dark surfaces, `navy`, `slate`, `canvas`
- **Icons** — content refers to icons by name; the map is `components/icons/Icon.tsx`
- **Shared sections** — `components/sections/` (`PageHero`, `CtaBand`, `Industries`, `FaqSection`); home sections in `components/sections/home/`
- **Hero illustrations** — `components/sections/home/HeroVisual.tsx`, `components/illustrations/` (illustrative UI, not product screenshots)
- **Contact topics** — `lib/contact-schema.ts` (built from support options + solutions; `/contact?topic={slug}` pre-selects)
- **Dev pages** — `/styleguide`, `/styleguide/3d` (noindex)

## Motion rules
Reduced motion is respected everywhere: `<MotionConfig reducedMotion="user">`, Lenis off, the pinned
approach section falls back to a static timeline, hero loops render their final state, CSS animations
shorten. Pinned scroll sections only run at ≥1024px. Elements with `data-bg-zone="brand" | "navy"`
recolour the page (and swap the nav logo to its white version) while they cross the viewport centre.
