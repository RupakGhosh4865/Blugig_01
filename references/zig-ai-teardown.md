# zig.ai — UI/UX & motion teardown (reference)

Captured with REA (headless Chrome scenario at 1440×900, motion enabled) on 2026-10-20, plus the
site's public Webflow CSS, IX2 interaction config and inline GSAP scripts. **Inspiration only** — the
Blugig build re-implements the layout and motion language with its own copy, colours and code
(Motion + Lenis instead of GSAP; no zig assets, logos, images or text are used).

## Stack observed
Webflow · GSAP 3 + ScrollTrigger + SplitText · Lenis (driven from `gsap.ticker`) · Splide (testimonials) · Lottie (hero).

## Design tokens (zig → Blugig)
| zig | value | Blugig |
|---|---|---|
| page `gray-50` | `#f2f6f5` | `--color-base #f5f4ee` |
| `black` | `#15171a` | `--color-ink` (same) |
| brand `green-500` | `#08906c` | `--color-gold-500` yellow (logo) |
| `.text--grad` | `265deg, #08906c 38% → #34bf99 95%` | `265deg, gold-800 → gold-700` (AA) |
| CTA `coral-500` | `#ce3c2b` | `--color-blue-600 #1f5fe0` |
| `blue-700` sections | `#2b4d60` | `--color-navy #13213d` |
| font | Archivo (+ Switzer chips, Azeret Mono numbers) | Archivo + Azeret Mono |
| container | 85rem + 40px gutters | `shell` utility |
| type | title-xl 4.5rem/120% · title-l 3.625rem/110% −0.04em · title-m 2.25rem · title-s 1.75rem · text-l 1.125rem/150% | same, fluid `clamp()` |
| buttons | pill, 16×40px, medium, colour swap on hover (0.3s) | same |
| cards | radius 24px, padding 32px, 30.6rem tall bento | same |

## Section order & choreography
1. **Hero** — chip → title-xl with gradient tail → text-l → 2 pills; Lottie of floating "Zig did / You did" cards over hairline rays. Lottie stepped via GSAP: 0→25% → hold 1s → 65% → hold 1s → 100%, 8s loop.
2. **Execution gap** (white) — heading + Before (dark pill) / After (brand pill) lists in the right 2 of 3 columns.
3. **Statement** — SplitText words `opacity 0.2 → 1`, scrubbed `start: top 60%` → `end: bottom 40%`.
4. **Trusted by** — label | 1px divider | logo lists translating −100% in 10s linear loop, right-edge mask fade.
5. **Built different** — 2-col bento (white · coral · green · white · white · navy); IX2 a-22 card zoom `scale .95 → 1`, 300ms easeInOut at 10% in view, origin bottom.
6. **Impact** — 250vh track, sticky 100vh. IX2 a-17: 2×2 outlined circles hold (≤30%) → translate ±50% to centre while content fades (40–60%) → accent circle `scale 0 → 1` (70–80%) → its text fades in once scale ≥ 0.99. Circle hover fills with brand colour (desktop).
7. **Two wins** — body bg → black when track top hits centre. IX2 a-16: wrapper scale .2 → 1 (40–50%), circles separate (50–60%), titles + lens illustration fade (60–70%), tooltips fade (78–80%), then annotation SVG lines draw (stroke-dashoffset 0.5s, staggered 0.15s) with end dots.
8. **Steps** — body bg → green; IX2 a-18 track `x: 10% → −100%` across pinned scroll, hairline through the icons.
9. **Sales wheel** — 287.5rem wheel of 6 hairlines rotated by scroll (GSAP scrub); 5 cards ride rays starting −35°, step 30° (`x = wcx + Δy·cot θ`), ending with the CTA card at the left edge; revealed as the green steps panel scrolls off.
10. **Testimonials** (navy) — Splide loop, 2px pagination bars, circular arrows, dotted pattern.
11. **FAQ** — single-open accordion, 40px rows, plus/minus icon, max-height + opacity 0.3s.
12. **Footer** — brand gradient with oversized rounded line art, centred CTA, 3-col link grid.

Global: Lenis smoothing; `.animate-block_appear` = `from {opacity:0, y:40}`, 1.2s `power4.out` at `top 65%`; navbar background fades in after 200px; body `transition: background-color .4s`.

## Where it lives in this codebase
`components/sections/home/*` (one file per section above), `components/motion/*` (primitives),
`components/layout/PageBackground.tsx` (body colour zones), `lib/motion.ts` (tokens).
