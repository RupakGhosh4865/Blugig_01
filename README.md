# Avantra Technologies — website

Marketing site for Avantra Technologies, a Mitti (by SafetyCulture) implementation partner.
Partner: [Bravas — The Mitti Experts](https://bravastech.com/).

Next.js 16 (App Router, Cache Components) · Tailwind CSS v4 · Motion · Lenis · three.js / R3F.
Layout and motion language modelled on zig.ai (see `references/zig-ai-teardown.md`) — the original
Blugig build's design, recoloured to the Avantra logo: light brand blue `sky-*` (the old yellow's role),
logo blue `#003FA9` for actions, wordmark slate `#2C3A52`. Open items: `TODO.md`.

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
- **Brand tokens** — `app/globals.css` (`@theme`): `sky-*` (500 = brand surface, ink text on it), `blue-*` (600 = logo blue), `navy`, `slate`, `canvas`
- **Icons** — content refers to icons by name; `components/icons/DrawIcon.tsx` draws them (geometry in `iconData.ts`, from lucide)
- **Home sections** — `components/sections/home/*` in zig's order (several take props and are reused: `Gap`, `Expertise`, `Approach`)
- **Page template blocks** — `components/sections/service/*` (`ServiceHero`, `Capabilities`, `Delivery`, `Tools`, `Related`, `CtaBand`, `NextService`) used by Solutions, Services and How we work
- **Hero animation** — `components/sections/home/HeroWheel.tsx`: zig.ai's hero wheel re-implemented in code (keyframes/easings documented in `references/zig-ai-teardown.md`); card copy in `content/home.ts` → `heroWheel`
- **Illustrations** — bento mock-ups in `components/illustrations/ServiceIllustrations.tsx` (illustrative UI, not product screenshots); particles in `components/three/`
- **Contact topics** — `lib/contact-schema.ts` (built from support options + solutions; `/contact?topic={slug}` pre-selects)
- **Dev pages** — `/styleguide`, `/styleguide/3d` (noindex)

## Motion rules
Reduced motion is respected everywhere: `<MotionConfig reducedMotion="user">`, Lenis off, the pinned
approach section falls back to a static timeline, hero loops render their final state, CSS animations
shorten. Pinned scroll sections only run at ≥1024px wide and ≥640px tall. Elements with `data-bg-zone="sky" | "ink"`
recolour the page (the ink zone also swaps the nav logo to its white version) while they cross the viewport centre.
