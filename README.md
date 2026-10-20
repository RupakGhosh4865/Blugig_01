# Blugig Global — website

Next.js 16 (App Router, Cache Components) · Tailwind CSS v4 · Motion · Lenis · three.js / R3F.
Layout and motion language modelled on zig.ai (see `references/zig-ai-teardown.md`), in Blugig's
white + yellow brand with blue actions. Spec: `BUILD_SPEC.md`. Open items: `TODO.md`.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run build && npm run start
```

Copy `.env.example` → `.env.local` to wire the contact form (webhook and/or Resend). Without it,
submissions are logged to the server console.

## Where things live
- **Copy** — `content/*.ts` (site, home, services, navigation, case studies, testimonials)
- **Brand tokens** — `app/globals.css` (`@theme`): swap logo colours here only
- **Home sections** — `components/sections/home/*` in zig's order
- **Service template** — `app/services/[slug]/page.tsx` + `components/sections/service/*`
- **3D** — `components/three/ParticleField.tsx` (tiering, lazy mount, poster) → `ParticleCanvas.tsx` (shader + morph), shapes in `lib/three/shapes.ts`
- **Dev pages** — `/styleguide`, `/styleguide/3d` (noindex)

## Motion rules
Reduced motion is respected everywhere: `<MotionConfig reducedMotion="user">`, Lenis off, pinned
sections fall back to static layouts, particles show the static poster, CSS animations shorten.
Pinned scroll sections only run at ≥1024px.
