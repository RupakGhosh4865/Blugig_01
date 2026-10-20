# BLUGIG GLOBAL LLC — Website Build Spec

> Source of truth for Claude Code. Put this file in the project root.
> If anything in `/references` (motionsites prompts, 21st.dev components, Stitch exports) conflicts with this file, **this file wins**.
> Copy marked *(draft)* is placeholder copy written for layout — the owner will review it.

---

## 1. Project summary

**Company:** Blugig Global LLC
**What they do:** Consulting for workflow, data, and AI — Smartsheet, SafetyCulture, Power BI, data engineering, data migration, and agentic AI.
**Audience:** Operations leaders, PMO heads, IT/data managers, and executives at mid-size and enterprise companies. They judge credibility fast and read on both desktop and phone.
**The site must feel:** futuristic, premium, calm, precise. Think "a control room for your business" — dark, luminous, engineered. Not a gaming site, not a crypto site.
**Primary conversion:** "Book a consultation" (contact form). Secondary: explore a service page.

## 2. Goals and non-goals

**Goals**
- A signature first impression: cinematic 3D hero + choreographed motion.
- Six service pages built from **one data-driven template**, each with its own visual identity (particle shape + accent).
- Fast and accessible despite the 3D: real content renders server-side; 3D loads after.
- Easy to edit: all copy lives in `/content/*.ts`.

**Non-goals**
- No CMS in v1 (content in TypeScript files).
- No blocking preloader / intro screen.
- No scroll-jacking that changes scroll speed or direction beyond Lenis smoothing.
- No invented facts (stats, logos, testimonials, certifications) — use placeholders.

## 3. Tech stack (fixed)

| Area | Choice |
|---|---|
| Framework | Next.js (latest stable), App Router, TypeScript, React Server Components by default |
| Styling | Tailwind CSS v4 with CSS-variable tokens (`@theme` in `app/globals.css`) |
| UI primitives | shadcn/ui (Radix) — re-themed to our tokens |
| Animation | **Motion** (formerly Framer Motion) — package `motion`, import from `motion/react`. No GSAP unless a specific effect is impossible with Motion (ask first). |
| Smooth scroll | `lenis` (`lenis/react`) |
| 3D | `three` + `@react-three/fiber` + `@react-three/drei` for the particle engine; `@splinetool/react-spline` + `@splinetool/runtime` for the hero if a Spline scene is provided |
| Forms | `react-hook-form` + `zod` + Server Action |
| Email / leads | Server Action → `CONTACT_WEBHOOK_URL` (n8n/Zapier/Make) and/or Resend (`RESEND_API_KEY`) — both optional via env |
| Icons | `lucide-react` for UI; custom animated SVG line icons for the 6 services |
| Analytics | `@vercel/analytics` + `@vercel/speed-insights` |
| Hosting | Vercel |

Component sources allowed: 21st.dev (via Magic MCP or pasted), shadcn/ui, Aceternity UI, Magic UI, React Bits, Motion Primitives — **always re-themed to our tokens** and converted to `motion/react`.

## 4. Brand and design tokens

### 4.1 Logo
- Files go in `public/brand/` → `logo.svg` (full), `logo-mark.svg` (icon only), `logo-white.svg` (for dark bg).
- Until the real SVG is added, use a text wordmark "BLUGIG" (Display font, 700, tracking -0.02em) with a small gold square accent, built as a component `<Logo />` so swapping is one change.

### 4.2 Color (dark-first)
> Blue and gold below are stand-ins. **Replace with the exact hex values from the logo** once provided — change them only in `globals.css`.

| Token | Value | Use |
|---|---|---|
| `--color-bg` | `#050810` | Page background |
| `--color-bg-elev` | `#0A0F1C` | Alternate section background |
| `--color-surface` | `#0F1628` | Cards |
| `--color-surface-2` | `#16203A` | Hover / raised cards |
| `--color-line` | `rgb(255 255 255 / 0.08)` | 1px borders, grid lines |
| `--color-line-strong` | `rgb(255 255 255 / 0.16)` | Focused / hovered borders |
| `--color-fg` | `#EDF1FA` | Primary text |
| `--color-fg-muted` | `#9AA4BC` | Secondary text |
| `--color-fg-subtle` | `#7C86A2` | Captions, meta (meets AA on bg) |
| `--color-primary` | `#2F7BFF` | Electric blue — accents, glows, links, numbers |
| `--color-primary-strong` | `#1F5FE0` | Button backgrounds with white text (AA) |
| `--color-cyan` | `#5CE1FF` | Highlights, particle sparkle, focus glow |
| `--color-gold` | `#D4A845` | Premium accent from logo — **max ~5% of any screen** (badges, small rules, hover underline on primary CTA) |
| `--color-paper` | `#F5F7FB` | Optional light section background |
| `--color-ink` | `#0B1220` | Text on light sections |

Per-service accent (used for the particle tint, hero glow, and card hover):
`smartsheet #2F7BFF` · `safetyculture #3DDC97` · `power-bi #F2C14E` · `data-engineering #5CE1FF` · `data-migration #8B7CFF` · `agentic-ai #2F7BFF → #5CE1FF gradient`.
Accents only ever appear as glows, particles, thin lines, and small icons — never as large flat fills.

### 4.3 Typography
- **Display:** Inter Tight — 600/700, tracking `-0.03em`, line-height 1.0–1.05 (matches the existing brand look).
- **Body:** Inter — 400/500, line-height 1.6.
- **Mono:** JetBrains Mono — labels, eyebrows, numbering (`01`, `02` …), metadata. Uppercase, tracking `0.18em`, 12–13px.
- Load all via `next/font/google` with `display: swap` and CSS variables.
- Fluid scale:
  - `display-xl` `clamp(3rem, 7vw, 7.5rem)` (hero H1)
  - `h1` `clamp(2.5rem, 5vw, 4.5rem)`
  - `h2` `clamp(2rem, 3.6vw, 3.25rem)`
  - `h3` `clamp(1.25rem, 1.6vw, 1.5rem)`
  - `body-lg` `1.125rem` · `body` `1rem` · `small` `0.875rem` · `eyebrow` `0.75rem` mono

### 4.4 Layout and surfaces
- Container: max 1280px (wide sections 1440px), side gutter 16px mobile / 24px tablet / 32px desktop. No horizontal scroll at 360px.
- Section vertical padding: `clamp(5rem, 10vw, 9rem)`.
- Radius: cards 20px, inputs 12px, buttons full pill.
- **Glass card:** `bg rgb(255 255 255 / 0.03)`, 1px `--color-line` border, `backdrop-blur(16px)` (only where something sits behind it), inner top highlight `inset 0 1px 0 rgb(255 255 255 / 0.06)`.
- **Spotlight border:** radial gradient (accent at 40% opacity) that follows the cursor along the card border; desktop + fine pointer only.
- **Backgrounds:** faint 64px grid lines fading out with a radial mask; soft radial glows (primary at 12–18% opacity); global film-grain noise overlay at 3% opacity (one fixed pseudo-element, `pointer-events: none`).
- **Buttons:** Primary = pill, `--color-primary-strong` bg, white text, inner glow, magnetic on desktop, arrow icon slides 4px on hover, thin gold underline animates in. Ghost = pill, 1px line border, fg text, bg fills to `surface-2` on hover.

## 5. Motion system

Create `lib/motion.ts` with tokens and reusable variants. Wrap the app in `<MotionConfig reducedMotion="user">`.

**Tokens**
- Easing: `easeOut = [0.16, 1, 0.3, 1]`, `easeInOut = [0.65, 0, 0.35, 1]`
- Durations: `fast 0.25s`, `base 0.6s`, `slow 0.9s`, `hero 1.2s`
- Stagger: children `0.06s`, words `0.04s`
- Spring (magnetic, cursor): `{ stiffness: 150, damping: 15, mass: 0.1 }`

**Primitives** (in `components/motion/`)
- `<Reveal>` — on enter viewport (`once: true`, `amount: 0.3`): opacity 0→1, y 24→0. Optional `blur` prop (8px→0) — headings only.
- `<SplitText>` — splits headline into words wrapped in overflow-hidden masks; words rise from 110% y. Keeps text accessible (real text in DOM, `aria-label` on parent not needed if words are real text nodes).
- `<Magnetic>` — element pulls toward cursor within 80px, max 10px travel.
- `<SpotlightCard>` — cursor-tracked border/background glow + optional tilt (max 4°).
- `<Marquee>` — infinite CSS/Motion marquee, pauses on hover and when offscreen.
- `<Counter>` — counts up on enter viewport (1.6s, easeOut), tabular numbers.
- `<Parallax>` — `useScroll` + `useTransform` y offset, range ±10%.
- `<DrawIcon>` — SVG stroke-dashoffset draw on enter / hover.

**Rules**
- Animate only `transform` and `opacity` (plus `filter: blur` on headings only).
- The hero H1 is the LCP element: its entrance must start immediately and finish within 0.8s; never hold it at opacity 0 waiting for JS-heavy work.
- Max one scroll-scrubbed (pinned) effect per screen height.
- Hover effects only on `(hover: hover) and (pointer: fine)`.
- `prefers-reduced-motion: reduce` → no parallax, no pinning, no particles/3D animation (show posters), Lenis disabled, marquee static, reveals become simple 200ms fades.
- No animation should loop forever in view except subtle ambient ones (3D idle, marquee, glow pulse ≤ 4s cycle).

**Page transitions**
- `app/template.tsx`: enter animation for page content (opacity 0→1, y 16→0, 0.5s).
- Do not hack exit animations around the App Router. If the installed Next.js/React version supports View Transitions as stable, use them for the service-card → service-hero title morph; otherwise skip that effect.

**Smooth scroll**
- `<SmoothScroll>` client component using `ReactLenis` (root), `lerp ~0.1`. Disabled for reduced motion and on touch devices (native scroll on mobile).
- Anchor links and "back to top" go through Lenis `scrollTo`.

## 6. 3D system

### 6.1 CanvasGate (required wrapper for ALL 3D)
`components/three/CanvasGate.tsx` decides a tier on the client:
- `off` → render poster image (`next/image`, priority only if above the fold). Conditions: reduced motion, `navigator.connection.saveData`, no WebGL2, or `hardwareConcurrency <= 4` on mobile.
- `low` → mobile/tablet capable devices: fewer particles (≈2,500), DPR max 1.25, no mouse effects.
- `high` → desktop: ≈8,000 particles, DPR `[1, 1.75]`.
- Mount 3D only after first paint via `requestIdleCallback` (fallback `setTimeout 1200ms`) **and** when the container is near the viewport (IntersectionObserver, `rootMargin: 200px`).
- Pause rendering when offscreen (R3F `frameloop="never"` when not visible) and when the tab is hidden.
- Fade the canvas in over the poster (0.8s) once the first frame renders. Poster stays in DOM underneath → zero layout shift.
- 3D code is loaded with `next/dynamic(..., { ssr: false })` so it is never in the initial JS bundle.

### 6.2 Hero scene
`components/three/HeroScene.tsx`:
- If `public/3d/hero.splinecode` exists (checked on the server at build time and passed down as a prop) or `NEXT_PUBLIC_SPLINE_HERO_URL` is set → `<SplineHero>` (lazy). Prefer the self-hosted `.splinecode`. On load, grab objects by name (`Core`, `Shell`, `Ring`, `Nodes`) and drive: mouse look (≤ 8°, smoothed), scroll-linked rotation and slight scale-down as the hero scrolls out.
- Else → `<ParticleField shape="globe">` fallback (see 6.3): a sphere of glowing points with 6–10 animated arcs between points ("global network").
- Poster: `public/posters/hero.webp` (1920×1080 and 900×1200 mobile variant).

### 6.3 Particle engine (signature visual language)
`components/three/ParticleField.tsx` + `lib/three/shapes.ts`.
- One `THREE.Points` with custom `ShaderMaterial`. Attributes: `aFrom`, `aTo` (vec3), `aSeed` (float).
- Uniforms: `uProgress` (0→1 morph), `uTime`, `uNoise` (curl/simplex displacement strength), `uColorA`, `uColorB`, `uPointSize`, `uPixelRatio`, `uMouse`.
- Vertex: `mix(aFrom, aTo, ease(uProgress))` + noise displacement; size attenuation by depth.
- Fragment: soft round point (smoothstep falloff), additive blending, color mixes `uColorA→uColorB` by depth; ~3% of points sparkle gold.
- `setShape(next)`: copy current positions into `aFrom`, write target into `aTo`, animate `uProgress` 0→1 with Motion `animate()` (1.2s, easeInOut). Mid-morph `uNoise` bumps up then settles (looks like the particles "dissolve and reassemble").
- Mouse: gentle repel within a radius + whole-group parallax (≤ 6°). Desktop only.
- Shapes (each returns `Float32Array(count * 3)`, normalized to fit a unit sphere):
  - `globe` — Fibonacci sphere + points along arcs (hero fallback)
  - `grid` — 3 floating, slightly offset "sheets" of points in rows/columns that resolve into a dashboard layout (Smartsheet)
  - `shield` — filled shield silhouette with a check mark cut-out, slight depth (SafetyCulture)
  - `bars` — 5–7 columns of points of rising heights on a base plane (Power BI)
  - `stream` — 3 curved tubes of points converging into a dense core (Data Engineering)
  - `migrate` — cube surface; on loop morphs to a sphere and back every 6s (Data Migration)
  - `wave` — undulating noise wave plane, like a sound/thought wave (Agentic AI)
- Service pages render `<ParticleField shape={service.visual} accent={service.accent} />`.
- "Next service" link on each service page: on hover, the current particle shape starts morphing toward the next service's shape (desktop, high tier only).

## 7. Global layout

### 7.1 Navbar
- Floating glass pill, centered, max-width 1120px, 16px from top. Logo left, links center, primary CTA right ("Book a consultation").
- Links: Services (mega menu), About, Insights *(placeholder, can be hidden)*, Contact.
- Hide on scroll down, show on scroll up (after 120px). Background opacity increases after scrolling past hero.
- **Mega menu (Services):** 3×2 grid of the six services — mono number, animated icon, title, one-liner; right column: a featured card ("Not sure where to start? Book a free assessment →"). Opens on hover (desktop, 120ms intent delay) and click; fully keyboard accessible (Radix NavigationMenu).
- **Mobile:** full-screen overlay, background blur, links stagger in (0.05s), services as an accordion, CTA pinned at bottom. Focus trapped, `Esc` closes, body scroll locked.

### 7.2 Footer
- Top: CTA strip ("Have a complex problem? Let's simplify it." + button).
- Middle: 4 columns — Services (6 links), Company (About, Contact, Careers *(placeholder)*), Contact (email, phone, address — placeholders), Social (LinkedIn etc.).
- Bottom: giant outlined "BLUGIG" wordmark spanning full width; on enter viewport the outline fills with a blue→cyan gradient left to right (scroll-linked, 0→1 over the footer's height). Under it: © 2026 Blugig Global LLC · Privacy · Terms.

### 7.3 Extras
- Cursor glow: a 400px soft radial glow following the cursor on dark sections (desktop only, does NOT replace the system cursor).
- Scroll progress: 2px primary line at top of viewport on long pages (service pages).
- Back-to-top button appears after 2 screens.
- Skip-to-content link.

## 8. Sitemap and routes

```
/                                   Home
/services                           Services index
/services/smartsheet-consulting
/services/safetyculture
/services/power-bi-consulting
/services/data-engineering
/services/data-migration
/services/agentic-ai
/about
/contact
/privacy
/terms
404 (app/not-found.tsx)
```
Service routes use `app/services/[slug]/page.tsx` with `generateStaticParams()` from `content/services.ts` and `generateMetadata()` per service. Unknown slug → `notFound()`.

## 9. Home page (section by section)

**S1 — Hero** (`min-h-[100svh]`)
- Layout: text column left (≈55%), 3D scene right/behind. On mobile: text first, 3D (or poster) below at 60vh, centered.
- Background: `--color-bg` + top-right radial primary glow + fading grid + noise.
- Content *(draft)*:
  - Eyebrow (mono): `BLUGIG GLOBAL · WORKFLOW, DATA & AI CONSULTING`
  - H1: **Turn complexity into a competitive advantage.**
  - Sub: "We design the workflows, data pipelines, and AI agents that help teams move faster — on Smartsheet, SafetyCulture, Power BI, and the modern data stack."
  - CTAs: `Book a consultation` (primary → /contact) · `Explore services` (ghost → /services)
  - Trust line under CTAs (small, muted): `[PLACEHOLDER: partner badges — e.g., Smartsheet partner tier, Microsoft]`
- Choreography (≤ 1.4s total): eyebrow fade (0s) → H1 words rise (0.1s, stagger 0.04) → sub (0.5s) → CTAs (0.65s) → trust line (0.9s) → 3D fades in whenever ready.
- Scroll: text parallaxes up ~15% and fades out by 60% of hero scroll; 3D rotates/tilts with scroll and scales to 0.9.
- Scroll cue bottom-center: mono "SCROLL" + 1px animated line.

**S2 — Trust marquee**
- "Trusted by teams at" + logo marquee (grayscale, 50% opacity → full color on hover). `[PLACEHOLDER: client/partner logos]`. Two rows moving opposite directions on desktop, one row on mobile.

**S3 — Expertise grid** (matches the existing design, upgraded)
- Header row: left = eyebrow `EXPERTISE` + H2 "Focused expertise. Connected solutions."; right = small muted text "Built for the way your business works." with a 1px vertical line divider before it.
- Grid: 3×2 desktop, 2×3 tablet, 1×6 mobile. Each card (SpotlightCard, glass):
  - Mono number top-left in primary (`01`…`06`)
  - Animated line icon in primary (DrawIcon on enter; re-draws on hover)
  - Title (h3) + one-liner (muted)
  - Arrow bottom-right; on hover slides 4px and turns into accent color; card border lights up in the service accent; tilt ≤ 4°
  - Whole card is a link to the service page
- Cards reveal with stagger 0.06 as the grid enters.

**S4 — Approach (pinned)**
- Title: "How we work" *(draft)*. Four steps: **Discover** (map processes, data, and pain points) → **Design** (blueprint the solution and the outcomes) → **Build** (configure, integrate, automate, test) → **Adopt & Scale** (train teams, govern, improve).
- Desktop: section height ≈ 300vh; sticky inner panel. A vertical (or horizontal) progress line draws as you scroll; the active step's card brightens and its number glows; inactive steps dim to 40%.
- Mobile: no pinning — simple vertical timeline with Reveal.

**S5 — Agentic AI spotlight**
- Dark section with `ParticleField shape="wave"` filling the background (low opacity, behind content).
- Left: eyebrow `AGENTIC AI`, H2 "AI agents that work where your team already works." *(draft)*, short paragraph, link → /services/agentic-ai.
- Right: an animated "agent console" glass panel that types out a short illustrative run, line by line, when in view:
  ```
  > agent: weekly-portfolio-review
  ✓ Read 1,248 rows from "Project Intake"
  ✓ Flagged 3 projects at risk (budget > 90%, due < 14 days)
  ✓ Drafted status summary for leadership
  → Sent to #pmo-updates for approval
  ```
  (Clearly illustrative; monospace; blinking caret; respects reduced motion by showing final state.)

**S6 — Impact numbers**
- 4 counters in a row: `[PLACEHOLDER: e.g., 150+ implementations]`, `[PLACEHOLDER: hours saved]`, `[PLACEHOLDER: countries served]`, `[PLACEHOLDER: certified consultants]`. Labels muted below. Thin vertical dividers.
- Do not ship invented numbers — if no real numbers are provided, hide this section via a `content/site.ts` flag.

**S7 — Case studies**
- Horizontal drag/scroll carousel of 3 cards (image or abstract gradient, client industry, challenge → result one-liner, "Read story" link). `[PLACEHOLDER content]`. Section hidden if `caseStudies` is empty.

**S8 — Why Blugig** (bento)
- 4 tiles *(draft)*: **Platform depth** — specialists in the tools you already use · **Outcome-first** — we start from the result you need, not the feature list · **Connected thinking** — workflow, data, and AI from one partner · **Built to last** — training, documentation, and governance so your team owns it.
- One larger tile includes a small looping visual (mini particle globe or animated dotted world map with pulsing location dots).

**S9 — Testimonials** (optional, hidden if empty)
- Large quote, name/role/company, slider with fade/slide. `[PLACEHOLDER]`.

**S10 — Final CTA**
- Big statement *(draft)*: "Let's make your systems work as hard as your team." + magnetic primary button + secondary "or email us at [PLACEHOLDER email]". Radial glow intensifies as the section scrolls into center.

**S11 — Footer** (see 7.2)

## 10. Service page template

`app/services/[slug]/page.tsx` renders sections from the `Service` object. Section order:

1. **Hero** — breadcrumb (Home / Services / {title}); eyebrow mono `{number} / SERVICE`; H1 = `service.headline`; `service.summary`; CTAs (`Talk to a {shortName} specialist` → `/contact?service={slug}`, ghost `See capabilities` → anchor). Right side: `ParticleField shape={service.visual}` tinted with `service.accent`. Background glow uses the accent.
2. **Outcomes strip** — 4 outcomes, each with a small icon and one line; Reveal stagger.
3. **Capabilities** — bento grid of 6 SpotlightCards (title + 1–2 lines). One card spans 2 columns.
4. **How we deliver** — 4 steps (service override or default from Approach), compact horizontal stepper with drawing connector line.
5. **Use cases** — tab list (desktop: vertical tabs left, detail panel right with crossfade; mobile: accordion).
6. **Tools & integrations** — pill chips / logo cloud.
7. **Case study highlight** — single wide card (hidden if none).
8. **FAQ** — accordion (Radix), smooth height animation; also emitted as FAQPage JSON-LD.
9. **Related services** — 3 cards from `service.related`.
10. **CTA band** — "Ready to talk {shortName}?" + primary button.
11. **Next service** — full-width link: mono "NEXT" + huge title of next service; hover morphs particles toward the next shape (desktop high tier).

`/contact?service={slug}` pre-selects the service in the form.

## 11. Services content (`content/services.ts`)

```ts
export type Service = {
  slug: string;
  number: string;          // "01"
  title: string;           // card + nav title
  shortName: string;       // used in CTAs
  cardLine: string;        // one-liner on cards (from current site)
  headline: string;        // service hero H1
  summary: string;
  accent: string;          // hex
  visual: 'grid' | 'shield' | 'bars' | 'stream' | 'migrate' | 'wave';
  icon: string;            // custom SVG icon id
  outcomes: string[];      // 4
  capabilities: { title: string; body: string }[]; // 6
  process?: { title: string; body: string }[];     // optional override
  useCases: { title: string; body: string }[];     // 3–4
  tools: string[];
  faqs: { q: string; a: string }[];                // 3–5
  related: string[];       // slugs
  seo: { title: string; description: string };
};
```

All copy below is *(draft)* — owner reviews before launch.

### 01 — Smartsheet Consulting · `smartsheet-consulting` · visual `grid`
- Card line: Workflows, dashboards, and automation.
- Headline: Smartsheet, built around how your teams actually work.
- Summary: From a first workspace to an enterprise-wide PMO, we design Smartsheet solutions people adopt — structured sheets, automated workflows, and dashboards leadership trusts.
- Outcomes: One source of truth for every project · Less status-chasing, more doing · Real-time portfolio visibility · Governance that scales with you
- Capabilities: Solution architecture & workspace design · Workflow automation & approvals · Executive dashboards & reports · Portfolio / PMO setup (incl. Control Center) · Integrations (Microsoft 365, Jira, Salesforce, Data Shuttle, Bridge) · Training, admin & governance support
- Use cases: PMO portfolio management · Project intake & resource planning · Marketing & campaign operations · Field and construction project tracking
- Tools: Smartsheet, Control Center, Data Shuttle, Bridge, Dynamic View, Resource Management
- FAQs: Can you work with our existing Smartsheet setup? (Yes — we usually start with a health check and fix what's there before building new.) · Do you train our team? (Yes — role-based training and admin handover are part of every engagement.) · How long does an implementation take? (It depends on scope; focused workflows can go live in weeks, enterprise rollouts are phased.)

### 02 — Mitti by SafetyCulture · `safetyculture` · visual `shield`
> Service name copied from the current site — **owner to confirm exact naming/spelling.**
- Card line: Consulting for your operational needs.
- Headline: Safer, smarter operations — from the frontline up.
- Summary: We help operations teams roll out SafetyCulture so inspections, issues, and actions happen consistently — and leaders can finally see what's happening on the ground.
- Outcomes: Consistent inspections across sites · Faster corrective actions · Audit-ready records · Frontline visibility for leadership
- Capabilities: Platform rollout & configuration · Digital checklist & inspection template design · Issue and action workflows · Asset & maintenance tracking · Reporting and integrations (Power BI, Smartsheet, APIs) · Frontline training & adoption
- Use cases: Safety audits & compliance · Quality inspections · Facilities & asset maintenance · Multi-site operational checks
- Tools: SafetyCulture platform, Power BI, Smartsheet, API integrations
- FAQs: Can you convert our paper checklists? · Can SafetyCulture data flow into our dashboards? · How do you drive adoption with frontline teams?

### 03 — Power BI Consulting · `power-bi-consulting` · visual `bars`
- Card line: Clearer insights with focused Power BI reporting.
- Headline: Reports people read. Insights people act on.
- Summary: We turn scattered data into focused Power BI reporting — clean models, fast dashboards, and governed self-service your teams trust.
- Outcomes: One version of the truth · Faster, better-informed decisions · Dashboards that load fast · Governed self-service
- Capabilities: Dashboard & report design · Data modeling & DAX · Connectors (Smartsheet, SafetyCulture, ERP, CRM, SQL) · Performance tuning · Row-level security & governance · Embedded analytics & Microsoft Fabric readiness
- Use cases: Executive KPI scorecards · Project portfolio analytics · Operations & safety analytics · Finance and sales reporting
- Tools: Power BI, Microsoft Fabric, Power Query, DAX, SQL
- FAQs: Can you fix slow reports we already have? · Can Power BI read from Smartsheet? · Do you set up security so people only see their data?

### 04 — Data Engineering · `data-engineering` · visual `stream`
- Card line: Reliable pipelines. Connected data.
- Headline: Reliable pipelines. Connected data.
- Summary: We build the plumbing that keeps your business data moving — pipelines, integrations, and warehouses that are monitored, documented, and easy to extend.
- Outcomes: Data that arrives on time, every time · Systems that talk to each other · Fewer manual exports and copy-paste · Clear ownership and documentation
- Capabilities: ETL/ELT pipeline design & build · Warehouse / lakehouse architecture · API integrations between business apps · Data quality, monitoring & alerting · Orchestration & automation · Documentation & handover
- Use cases: Unifying project and finance data · Syncing operational tools with BI · Automating recurring data loads · Building a reporting-ready warehouse
- Tools: `[PLACEHOLDER: confirm stack — e.g., Azure Data Factory, Microsoft Fabric, SQL, Python, Power Automate, n8n]`
- FAQs: Do we need a data warehouse? · Can you work with our existing tools? · How do you monitor pipelines?

### 05 — Data Migration · `data-migration` · visual `migrate`
- Card line: A clear path to modern systems.
- Headline: A clear path to modern systems.
- Summary: Moving platforms shouldn't mean losing data or momentum. We plan, clean, map, and validate every migration so your team starts day one on clean, trusted data.
- Outcomes: No data left behind · Minimal disruption to the business · Clean data on day one · A documented, repeatable process
- Capabilities: Migration assessment & planning · Data mapping, cleansing & transformation · Platform-to-platform migrations (spreadsheets, MS Project and legacy PM tools → Smartsheet; legacy BI → Power BI) · Validation & reconciliation · Cutover planning · Post-migration support
- Use cases: Spreadsheets to Smartsheet · Legacy reporting to Power BI · Paper/legacy inspections to SafetyCulture · System consolidation after a merger
- Tools: Smartsheet, Power BI, SafetyCulture, SQL, Python, `[PLACEHOLDER: confirm]`
- FAQs: How do you make sure nothing is lost? · Will our teams have downtime? · Can you migrate in phases?

### 06 — Agentic AI & AI Agents · `agentic-ai` · visual `wave`
- Card line: Practical intelligence for everyday work.
- Headline: Practical intelligence for everyday work.
- Summary: We design AI agents that take real work off your team's plate — triaging requests, summarizing status, drafting reports — inside the tools you already use, with the right guardrails.
- Outcomes: Hours of manual work removed · Faster responses to requests · Knowledge available on demand · AI that's governed and auditable
- Capabilities: AI opportunity assessment · Custom agents for workflows (intake triage, status summaries, report drafting) · AI inside Smartsheet, Power BI & Microsoft 365 workflows · Knowledge assistants over your documents · Guardrails, security & human-in-the-loop design · Measurement & continuous improvement
- Use cases: Automated weekly status reports · Request intake triage and routing · Policy/SOP knowledge assistant · Data quality checks with AI
- Tools: `[PLACEHOLDER: confirm — e.g., Claude, Azure OpenAI, Copilot Studio, n8n, Power Automate]`
- FAQs: Where do we start with AI? · Is our data safe? · Will agents replace our team? (No — they remove repetitive work so people focus on judgment.)

Related services defaults: Smartsheet ↔ Power BI ↔ Data Migration; SafetyCulture ↔ Power BI ↔ Data Engineering; Data Engineering ↔ Power BI ↔ Agentic AI; Agentic AI ↔ Smartsheet ↔ Data Engineering.

## 12. Other pages

**/services (index)** — Hero: eyebrow `EXPERTISE`, H1 "Six capabilities. One connected partner." *(draft)*; large version of the Expertise grid (cards include 3 capability bullets each); "How we work" compact stepper; final CTA.

**/about** — Story *(placeholder)*; mission line; values (4 tiles); team grid `[PLACEHOLDER]`; partners & certifications `[PLACEHOLDER]`; "Global" section with an animated dotted world map (SVG dots, pulsing markers at office/client regions `[PLACEHOLDER]`); CTA.

**/contact** — Split layout. Left: H1 "Let's talk about your project." *(draft)*, email/phone/address `[PLACEHOLDER]`, "What happens next" 3 steps (We reply within 1 business day → 30-min discovery call → Proposal & plan) *(draft — confirm the reply time)*. Right: glass form card:
- Fields: Name*, Work email*, Company*, Service of interest (select: the 6 services + "Not sure yet"), Message*, optional "How did you hear about us?".
- Validation with zod (inline errors, accessible). Honeypot field + simple rate limit (per IP, in-memory or Upstash if configured).
- Server Action posts to `CONTACT_WEBHOOK_URL` and/or sends via Resend. Success state: animated check + message; failure: friendly error with email fallback.
- Optional Calendly embed below form if `NEXT_PUBLIC_CALENDLY_URL` is set (lazy loaded).

**/privacy, /terms** — Simple long-form typography pages, `[PLACEHOLDER legal text]`.

**404** — Particles in a scattered state slowly drifting; H1 "This page drifted off the grid." *(draft)*; buttons Home / Services.

## 13. Build phases and definition of done

Work strictly phase by phase. At the start of each phase: list files to create/change. At the end: `npm run lint` + `npm run build` must pass with zero errors and zero hydration warnings; then stop and summarize + tell the owner what to check in the browser.

| Phase | Scope | Done when |
|---|---|---|
| 0 | Read spec + references, plan, list content gaps | Plan approved |
| 1 | Packages, tokens, fonts, base UI (Button, Badge, Container, Section, SectionHeading, Logo), `/styleguide` dev page | Styleguide shows all tokens, type scale, buttons, cards |
| 2 | Layout shell: Navbar + mega menu + mobile menu, Footer, SmoothScroll, template transition, motion primitives, cursor glow | Navigation works with keyboard, mobile menu traps focus, reduced motion respected |
| 3 | 3D: CanvasGate, ParticleField + all 7 shapes, HeroScene (Spline + fallback), posters | `/styleguide/3d` shows every shape morphing; tiers verified; no 3D in initial bundle |
| 4 | Home page S1–S10 | Home matches spec on 375 / 768 / 1280 / 1440 px |
| 5 | Service template, `content/services.ts`, 6 service pages, /services index | All 6 pages statically generated, each with its own shape/accent |
| 6 | About, Contact (+ Server Action), legal, 404 | Form submits end-to-end to webhook (or logs in dev) |
| 7 | SEO: metadata, OG images, JSON-LD, sitemap, robots | Valid structured data, every page has unique title/description |
| 8 | Polish & QA: motion audit, responsive, a11y, performance | Targets in §14 met |
| 9 | Deploy to Vercel, env vars, domain | Live URL passes §14 on production |

## 14. Performance, accessibility, SEO requirements

**Performance (production, Lighthouse)**
- Mobile: Performance ≥ 85, Desktop ≥ 95.
- LCP ≤ 2.5s (mobile, 4G), CLS ≤ 0.05, INP ≤ 200ms.
- Initial JS for home (excluding lazy 3D chunks) ≤ ~200 KB gzip. Check with `@next/bundle-analyzer`.
- Images via `next/image`, AVIF/WebP, explicit sizes. Fonts via `next/font`. Spline file self-hosted and ≤ ~2 MB; particle engine chunk (three + R3F + shaders) ≤ ~250 KB gzip, loaded only after first paint — report actual sizes.

**Accessibility (WCAG 2.2 AA)**
- Text contrast ≥ 4.5:1 (large text ≥ 3:1) — check muted text and text over glows.
- Visible focus rings (2px cyan outline + offset) on every interactive element.
- Semantic landmarks, one H1 per page, logical heading order.
- Menus, tabs, accordions via Radix (correct ARIA). Carousels have buttons + keyboard support.
- 3D canvases are `aria-hidden` and decorative; all meaning is in text.
- Full reduced-motion support as defined in §5.

**SEO**
- `metadata` per route with title template `%s | Blugig Global`, description, canonical, Open Graph, Twitter card.
- Dynamic OG images with `next/og` (dark bg, service title, accent glow, logo).
- JSON-LD: `Organization` (name "Blugig Global LLC", logo, url, sameAs), `WebSite`, `Service` (per service page, provider = Organization), `FAQPage`, `BreadcrumbList`.
- `app/sitemap.ts`, `app/robots.ts`. Clean URLs, no duplicate content.

## 15. Folder structure

```
app/
  layout.tsx            fonts, MotionConfig, SmoothScroll, Navbar, Footer, noise overlay, analytics
  template.tsx          page enter transition
  page.tsx              Home
  services/page.tsx
  services/[slug]/page.tsx
  about/page.tsx
  contact/page.tsx  contact/actions.ts
  privacy/page.tsx  terms/page.tsx
  not-found.tsx  sitemap.ts  robots.ts  opengraph-image.tsx
  styleguide/…          dev-only (excluded from sitemap, noindex)
components/
  layout/   Navbar, MegaMenu, MobileMenu, Footer, SmoothScroll, CursorGlow, ScrollProgress, Logo
  motion/   Reveal, SplitText, Magnetic, SpotlightCard, Marquee, Counter, Parallax, DrawIcon
  three/    CanvasGate, HeroScene, SplineHero, ParticleField, shaders/
  sections/home/      Hero, TrustMarquee, ExpertiseGrid, Approach, AgentSpotlight, Impact, CaseStudies, WhyBlugig, Testimonials, FinalCta
  sections/service/   ServiceHero, Outcomes, Capabilities, Delivery, UseCases, Tools, CaseHighlight, Faq, Related, CtaBand, NextService
  icons/    service icons (animated SVG)
  ui/       shadcn components
content/    site.ts, navigation.ts, services.ts, caseStudies.ts, testimonials.ts
lib/        motion.ts, utils.ts, seo.ts (JSON-LD helpers), device.ts (tier detection), three/shapes.ts
public/     brand/, posters/, 3d/, og/, logos/
references/ motionsites/, stitch/, screens/, 21st-components.md   (inspiration only)
```

## 16. References and precedence

- `/references/motionsites/*.md` — prompts copied from motionsites.ai. Use for **mood, motion ideas, and composition**. Ignore any tech stack, colors, fonts, or copy in them that conflict with this spec.
- `/references/stitch/` — Stitch screens (PNG) + exported HTML. Use for **layout and spacing** reference only; do not paste Stitch HTML into the app — rebuild with our components and tokens.
- `/references/screens/` — screenshots of sites/sections the owner likes, with a note on what to take from each.
- `/references/21st-components.md` — list of 21st.dev components to use for specific sections (fetch via Magic MCP or paste). Re-theme everything to our tokens.
- Precedence: **owner's latest message > BUILD_SPEC.md > references > component defaults.**

## 17. Open items / placeholders (owner to provide)

- Logo as SVG (full + mark + white), exact brand hex colors
- Confirm "Mitti by SafetyCulture" naming
- Partner tiers / certifications and badge files
- Client logos (with permission), case studies, testimonials, real stats
- Tech stack to list for Data Engineering, Data Migration, Agentic AI
- Contact email, phone, address(es), social links, reply-time promise
- Legal text (privacy, terms)
- Spline scene (optional — fallback particle globe ships without it)
- Domain and the webhook / email destination for leads

Claude Code: keep a running `TODO.md` of every `[PLACEHOLDER]` you render, with file and line.