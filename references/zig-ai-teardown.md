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
1. **Hero** — chip → title-xl with gradient tail → text-l → 2 pills over a full-bleed Lottie (see *Hero wheel* below). Lottie stepped via GSAP: 0→25% → hold 1s → 65% → hold 1s → 100% (8 s of frames + 2 s of holds = 10 s loop).
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

## Hero wheel (re-captured 2026-10-21 with REA)

Observed: REA `capture_browser_scenario` (Evidence `ev_94658388d91bffdb4041358a494b65bb4711fb547e16c07c260bc1c795924e55`)
shows `.hero-animation_wrapp` (absolute, inset 0, behind the copy) holding four Webflow Lottie
players (`data-renderer="canvas"`, `data-duration="8"`, `data-loop`), one per breakpoint:
`Motion_2500` (≥1280, aspect 25/8.7, height 100%), `Motion_1280` (992–1279, 6.4/4.5),
`Motion_820` (≤991, width 100%, bottom) and `Motion_420` (<480, 7/20, absolute bottom). An inline
`hero-lottie-js` script drives the visible one with GSAP as described above.

From the public `.lottie` data (1280 comp: 1280×900, 24 fps, 192 frames):
- A hub (layer "22") centred off-screen right turns −53° → 0° (0–48f), holds, then → 124.4° (132–191f).
  The hub layer is hidden (`hd: true`) — it is only the pivot. Eight 2376-unit hairline spokes radiate
  left from it; one r 550 circle draws the single visible arc, and a second r 550 circle filled with
  the page colour (drawn on top) covers the spokes' far end on very wide screens.
- Four activity cards (380×104, radius 22, tinted 58px icon tile, time / title / detail, check
  badge) ride spokes at radius ≈549 and counter-rotate to stay level. Spokes sit at ±30°/±10° while
  the wheel fans them out, converge to 0° (60–79f) into a stack, the top card morphs to 325×153
  (90–100f) and becomes "Zig did" (content rises 50 units, avatars spread); "You did" separates to
  ±14° (96–120f), then the pair sweeps out with the hub while the next loop's cards rise (154–192f).
- Placement per render: scene origin (1249,444)·1.0 in 2500×887, (662,450)·0.8 in 1280×900,
  (25,860)·0.85 in 820×1200, (−93,871)·0.8 in 420×1200.

Re-implemented in code (no zig assets) in `components/sections/home/HeroWheel.tsx` with Avantra
content; keyframe values and easings are transcribed from the data above.
