"use client";

import {
  CalendarCheck,
  Check,
  CircleCheckBig,
  ClipboardCheck,
  FileText,
  Ticket,
  TriangleAlert,
  UserRound,
  UserRoundCheck,
  Workflow,
} from "lucide-react";
import { animate, cubicBezier, useMotionValue, useMotionValueEvent, type AnimationPlaybackControls } from "motion/react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { LogoMark } from "@/components/layout/Logo";
import { heroWheel } from "@/content/home";
import { useMediaQuery, useReducedMotionSafe } from "@/lib/hooks";
import { cn } from "@/lib/utils";

/*
 * Hero wheel — a code re-implementation of the zig.ai hero motion (their
 * Lottie, observed via REA): a hub sits off-screen right with hairline spokes
 * running left across the hero. Activity cards ride the spokes at a fixed
 * radius and stay level while the hub turns: they rise and fan out, converge
 * into a stack, the top card morphs into the "did" summary pair, the pair
 * separates, then sweeps out while the next loop's cards rise from below.
 * Avantra runs five cards (zig runs four) on spokes 16° apart, and the card
 * copy crossfades in place when the hero stage changes — the loop never restarts.
 *
 * Time is expressed in the original 24 fps frames (0–192). Playback follows
 * the page script: 0→48 (2 s), hold 1 s, 48→124.8 (3.2 s), hold 1 s,
 * 124.8→192 (2.8 s) — a 10 s loop. Geometry is in comp units relative to the
 * scene origin; each breakpoint places/scales the scene like the four
 * original renders (2500, 1280, 820 and 420 wide).
 */

type Ease = [number, number, number, number];
type Key = { t: number; v: number; e?: Ease };
const STD: Ease = [0.333, 0, 0.667, 1];

function track(keys: Key[]) {
  const eases = keys.map((k) => (k.e ? cubicBezier(...k.e) : (p: number) => p));
  return (f: number) => {
    if (f <= keys[0].t) return keys[0].v;
    for (let i = 0; i < keys.length - 1; i++) {
      const a = keys[i];
      const b = keys[i + 1];
      if (f < b.t) return a.v + (b.v - a.v) * eases[i]((f - a.t) / (b.t - a.t));
    }
    return keys[keys.length - 1].v;
  };
}

// Wheel + spoke rotations (degrees; positive lifts a card above the hub line).
const HUB = track([
  { t: 0, v: -53, e: [0.441, 0.83, 0.667, 1] },
  { t: 48, v: 0 },
  { t: 132, v: 0, e: [0.333, 0, 0.689, 0.694] },
  { t: 191, v: 124.404 },
]);
// Rest angles top → bottom: 32, 16, 0, -16, -32 (zig: 30, 10, -10, -30 for four cards).
const S_LAST = track([{ t: 60, v: -32, e: [0.333, 0, 0.34, 1] }, { t: 79, v: 0 }]);
const S_NEXT = track([{ t: 60, v: -16, e: STD }, { t: 79, v: 0 }]);
const S_CRM = track([{ t: 60, v: 0 }]);
const S_FOLLOW = track([{ t: 60, v: 16, e: STD }, { t: 79, v: 0 }, { t: 96, v: 0, e: STD }, { t: 120, v: -14 }]);
const S_MEET = track([{ t: 60, v: 32, e: STD }, { t: 79, v: 0 }, { t: 96, v: 0, e: STD }, { t: 120, v: 14 }]);
/** Spokes carrying the next loop's cards (relative to the hub): rest angle − 177.546°. */
const NEXT_LOOP = [-145.546, -161.546, -177.546, -193.546, -209.546];

// Opacities (0–1).
const O_FIRST_CONTENT = track([{ t: 82, v: 1, e: STD }, { t: 89, v: 0 }]);
const O_A_CARD = track([{ t: 181, v: 1 }, { t: 192, v: 0 }]);
const O_SECOND = track([{ t: 0, v: 0.6, e: [0.333, 0.008, 0.667, 1] }, { t: 11, v: 1 }, { t: 75.2, v: 1, e: STD }, { t: 79.2, v: 0 }]);
const O_SECOND_NEXT = track([{ t: 180, v: 0, e: STD }, { t: 190.4, v: 0.6 }]);
const O_THIRD = track([{ t: 9.6, v: 0.3, e: [0.333, 0.004, 0.667, 1] }, { t: 20.6, v: 1 }, { t: 85, v: 1, e: STD }, { t: 89, v: 0 }]);
const O_THIRD_NEXT = track([{ t: 170, v: 0, e: STD }, { t: 181, v: 0.4 }]);
const O_FOURTH = track([{ t: 11, v: 0, e: STD }, { t: 27, v: 1 }, { t: 85, v: 1, e: STD }, { t: 89, v: 0 }]);
const O_FIFTH = track([{ t: 16, v: 0, e: STD }, { t: 32, v: 1 }, { t: 85, v: 1, e: STD }, { t: 89, v: 0 }]);
const O_FIRST_NEXT = track([{ t: 154, v: 0, e: STD }, { t: 165, v: 1 }]);
const O_B_CARD = track([{ t: 180, v: 1 }, { t: 191, v: 0 }]);

// Summary cards.
const M_A = track([{ t: 90, v: 0, e: [0.48, 0, 0.52, 1] }, { t: 100, v: 1 }]);
const M_B = track([{ t: 90, v: 0, e: STD }, { t: 100, v: 1 }]);
const A_RISE = track([{ t: 89, v: 50, e: [0.261, 0, 0, 1] }, { t: 118, v: 0 }]);
const A_SCALE = track([{ t: 96, v: 1.03093, e: STD }, { t: 122, v: 1.11111, e: [0.333, 0, 0.701, 1] }, { t: 208, v: 1 }]);
const A_DETAIL = track([{ t: 171, v: 1, e: STD }, { t: 178, v: 0 }]);
const A_SPREAD = track([{ t: 101, v: 0, e: [0.261, 0, 0, 1] }, { t: 125, v: 1 }]);
const B_PHOTO = track([{ t: 106, v: 1.2, e: STD }, { t: 130, v: 1.03 }]);
const B_DETAIL = track([{ t: 172, v: 1, e: STD }, { t: 179, v: 0 }]);

// Geometry (comp units, relative to the scene origin).
const C = { x: 891, y: 0 }; // hub centre (the hub itself is a hidden pivot — only its spokes draw)
const R = 549.15; // card radius on the spokes
const SPOKE = 2376;
const ARC = { x: 965.06, y: 0, r: 550 };
const MASK = { x: 1335.68, y: 3, r: 550 };
/** Summary card box relative to its spoke point, before (activity) → after (summary). */
const BOX_FROM = { l: -190, t: -52, w: 380, h: 104, r: 22 };
const BOX_TO = { l: -148.48, t: -100.87, w: 325.1, h: 153, r: 24 };

const VARIANTS = {
  wide: { w: 2500, h: 887, nx: 1249.333, ny: 443.833, k: 1 },
  desk: { w: 1280, h: 900, nx: 661.654, ny: 450.481, k: 0.8 },
  tablet: { w: 820, h: 1200, nx: 24.741, ny: 860.432, k: 0.85 },
  mobile: { w: 420, h: 1200, nx: -93.086, ny: 870.967, k: 0.8 },
} as const;
type Variant = keyof typeof VARIANTS;

const REST_FRAME = 48;
const LOOP: { frames: number[]; times: number[] } = {
  frames: [0, 48, 48, 124.8, 124.8, 192],
  times: [0, 0.2, 0.3, 0.62, 0.72, 1],
};

const TONES = {
  mint: { tile: "#cfeee2", time: "#0f8a63" },
  peach: { tile: "#f9ddd5", time: "#d0654b" },
  sky: { tile: "#d3e2f8", time: "#2f6ad0" },
  lilac: { tile: "#e8dcf7", time: "#8a58cf" },
  teal: { tile: "#cdeef0", time: "#0e7f86" },
  green: { tile: "#d3f0d9", time: "#1d8a43" },
} as const;
const ICONS = {
  inspect: ClipboardCheck,
  alert: TriangleAlert,
  person: UserRoundCheck,
  calendar: CalendarCheck,
  resolved: CircleCheckBig,
  recipe: Workflow,
  ticket: Ticket,
  order: FileText,
} as const;

const CARD_SHADOW = "0 34px 50px -30px rgba(6,69,148,0.32), 0 14px 30px -18px rgba(6,69,148,0.16)";
/** The outcome card (last on the wheel) sits on a faint green wash. */
const OUTCOME = {
  background: "#f3fbf5",
  boxShadow: "inset 0 0 0 1px #c4e8cf, 0 34px 50px -30px rgba(29,138,67,0.34), 0 14px 30px -18px rgba(29,138,67,0.16)",
};
/** Card copy swap: outgoing lifts away, incoming follows, staggered top → bottom. */
const SWAP = { duration: 0.45, stagger: 0.06, lag: 0.15, lift: 10 };
const INK = "#041c42";
const MUTED = "#626d81";

const rad = (deg: number) => (deg * Math.PI) / 180;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export function HeroWheel({ stage }: { stage: number }) {
  const wide = useMediaQuery("(min-width: 1280px)");
  const desk = useMediaQuery("(min-width: 992px)");
  const tablet = useMediaQuery("(min-width: 480px)");
  const mounted = useMediaQuery("(min-width: 0px)");
  const reduce = useReducedMotionSafe();
  const variant: Variant | null = !mounted ? null : wide ? "wide" : desk ? "desk" : tablet ? "tablet" : "mobile";

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 select-none">
      {variant ? <Scene key={variant} variant={variant} reduce={reduce} stage={stage} /> : null}
      {/* zig `.hero-animation_grad`: side fades on very wide screens, top fade when stacked */}
      <div className="absolute inset-y-0 left-0 hidden w-[30vw] bg-[linear-gradient(90deg,var(--color-canvas)_38%,transparent)] min-[1920px]:block" />
      <div className="absolute inset-y-0 right-0 hidden w-[10vw] bg-[linear-gradient(-90deg,var(--color-canvas),transparent)] min-[1920px]:block" />
      <div className="absolute inset-x-0 top-0 z-[1] h-1/2 bg-[linear-gradient(180deg,var(--color-canvas)_62%,transparent)] min-[992px]:hidden max-[479px]:h-[55%]" />
    </div>
  );
}

function Scene({ variant, reduce, stage }: { variant: Variant; reduce: boolean; stage: number }) {
  const V = VARIANTS[variant];
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [u, setU] = useState(0);
  const frame = useMotionValue(REST_FRAME);

  const spokes = useRef<(SVGLineElement | null)[]>([]);
  const el = useRef<Record<string, HTMLElement | null>>({});
  const avatars = useRef<(HTMLElement | null)[]>([]);

  // Stage scale: the scene is authored at V.w × V.h comp px.
  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const measure = () => setU(stage.clientWidth / V.w);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(stage);
    return () => ro.disconnect();
  }, [V.w]);

  const render = useCallback((f: number) => {
    const hub = HUB(f);
    const e = el.current;

    const line = (i: number, deg: number, on: boolean) => {
      const node = spokes.current[i];
      if (!node) return;
      node.style.display = on ? "" : "none";
      if (!on) return;
      node.setAttribute("x2", String(C.x - SPOKE * Math.cos(rad(deg))));
      node.setAttribute("y2", String(C.y - SPOKE * Math.sin(rad(deg))));
    };
    const place = (node: HTMLElement | null | undefined, deg: number, opacity: number) => {
      if (!node) return;
      const visible = opacity > 0.001;
      node.style.visibility = visible ? "visible" : "hidden";
      if (!visible) return;
      node.style.opacity = String(opacity);
      node.style.transform = `translate3d(${C.x - R * Math.cos(rad(deg))}px, ${C.y - R * Math.sin(rad(deg))}px, 0)`;
    };
    const show = (node: HTMLElement | null | undefined, on: boolean) => {
      if (node) node.style.visibility = on ? "visible" : "hidden";
    };

    // Spokes: the five working spokes, then the next loop's spokes.
    line(0, hub + S_LAST(f), f < 94);
    line(1, hub + S_NEXT(f), f < 94);
    line(2, hub + S_CRM(f), f < 94);
    line(3, hub + S_FOLLOW(f), true);
    line(4, hub + S_MEET(f), true);
    NEXT_LOOP.forEach((off, i) => line(5 + i, hub + off, f >= 157));

    // Activity cards (each element also plays its copy in the next loop).
    place(e.fifth, hub + S_LAST(f), f < 89 ? O_FIFTH(f) : 0);
    place(e.fourth, hub + S_NEXT(f), f < 89 ? O_FOURTH(f) : 0);
    place(e.third, f < 89 ? hub + S_CRM(f) : hub + NEXT_LOOP[2], f < 89 ? O_THIRD(f) : f >= 170 ? O_THIRD_NEXT(f) : 0);
    place(e.second, f < 79.2 ? hub + S_FOLLOW(f) : hub + NEXT_LOOP[1], f < 79.2 ? O_SECOND(f) : f >= 180 ? O_SECOND_NEXT(f) : 0);
    place(e.firstNext, hub + NEXT_LOOP[0], f >= 154 ? O_FIRST_NEXT(f) : 0);

    // Card A: first activity card that morphs into the "Avantra did" summary.
    place(e.a, hub + S_MEET(f), O_A_CARD(f));
    morph(e.aBox, M_A(f));
    if (e.aActivity) {
      e.aActivity.style.visibility = f < 89 ? "visible" : "hidden";
      e.aActivity.style.opacity = String(O_FIRST_CONTENT(f));
    }
    if (e.aSummary) {
      show(e.aSummary, f >= 89);
      e.aSummary.style.transform = `translate3d(0, ${A_RISE(f)}px, 0) scale(${A_SCALE(f) / 1.11111})`;
    }
    if (e.aDetail) e.aDetail.style.opacity = String(A_DETAIL(f));
    const spread = A_SPREAD(f);
    avatars.current.forEach((node, i) => {
      if (node) node.style.transform = `translate3d(${-22.6 * (i + 1) * spread}px, 0, 0)`;
    });

    // Card B: the "You did" summary hidden under card A until the pair separates.
    place(e.b, hub + S_FOLLOW(f), f >= 93 ? O_B_CARD(f) : 0);
    morph(e.bBox, M_B(f));
    show(e.bContent, f >= 100);
    if (e.bPhoto) e.bPhoto.style.transform = `scale(${B_PHOTO(f) / 1.03})`;
    if (e.bDetail) e.bDetail.style.opacity = String(B_DETAIL(f));
  }, []);

  useMotionValueEvent(frame, "change", render);

  useEffect(() => {
    if (!u) return;
    render(frame.get());
    if (reduce) return;
    let controls: AnimationPlaybackControls | null = animate(frame, LOOP.frames, {
      duration: 10,
      times: LOOP.times,
      ease: "linear",
      repeat: Infinity,
    });
    const io = new IntersectionObserver(([entry]) => {
      if (!controls) return;
      if (entry.isIntersecting) controls.play();
      else controls.pause();
    });
    if (wrapRef.current) io.observe(wrapRef.current);
    return () => {
      io.disconnect();
      controls?.stop();
      controls = null;
    };
  }, [u, reduce, frame, render]);

  const stacked = variant === "tablet" || variant === "mobile";
  // Card k carries heroWheel.stages[s][k] for every stage s.
  const [first, second, third, fourth, fifth] = heroWheel.stages[0].map((_, k) => heroWheel.stages.map((s) => s[k]));

  return (
    <div
      ref={wrapRef}
      className={cn(
        "absolute inset-0 flex justify-center overflow-hidden",
        stacked ? "items-end" : "items-center",
      )}
    >
      <div
        ref={stageRef}
        className={cn("relative shrink-0", stacked ? "w-full" : "h-full", variant === "tablet" && "-mb-2")}
        style={{ aspectRatio: `${V.w} / ${V.h}` }}
      >
        <div
          className="absolute top-0 left-0 origin-top-left transition-opacity duration-700"
          style={{ width: V.w, height: V.h, transform: `scale(${u || 1})`, opacity: u ? 1 : 0 }}
        >
          <div className="absolute origin-top-left" style={{ left: V.nx, top: V.ny, transform: `scale(${V.k})` }}>
            <svg className="absolute top-0 left-0 overflow-visible" width="1" height="1" fill="none">
              <g stroke="#c3cbd8" strokeWidth="1">
                <circle cx={ARC.x} cy={ARC.y} r={ARC.r} />
                {Array.from({ length: 10 }, (_, i) => (
                  <line
                    key={i}
                    ref={(node) => {
                      spokes.current[i] = node;
                    }}
                    x1={C.x}
                    y1={C.y}
                    x2={C.x - SPOKE}
                    y2={C.y}
                  />
                ))}
                <circle cx={MASK.x} cy={MASK.y} r={MASK.r} fill="var(--color-canvas)" />
              </g>
            </svg>

            {/* Back → front: 5th, 4th, 3rd, 2nd, next-loop 1st, B ("You did"), A */}
            <Positioned ref={(node) => {
                el.current.fifth = node;
              }}>
              <ActivityCard items={fifth} stage={stage} order={4} outcome />
            </Positioned>
            <Positioned ref={(node) => {
                el.current.fourth = node;
              }}>
              <ActivityCard items={fourth} stage={stage} order={3} />
            </Positioned>
            <Positioned ref={(node) => {
                el.current.third = node;
              }}>
              <ActivityCard items={third} stage={stage} order={2} />
            </Positioned>
            <Positioned ref={(node) => {
                el.current.second = node;
              }}>
              <ActivityCard items={second} stage={stage} order={1} />
            </Positioned>
            <Positioned ref={(node) => {
                el.current.firstNext = node;
              }}>
              <ActivityCard items={first} stage={stage} order={0} />
            </Positioned>

            <Positioned ref={(node) => {
                el.current.b = node;
              }}>
              <div ref={(node) => {
                el.current.bBox = node;
              }} className="absolute bg-white" style={boxStyle(0)} />
              <div ref={(node) => {
                el.current.bContent = node;
              }} className="absolute" style={{ left: BOX_TO.l, top: BOX_TO.t, width: BOX_TO.w, height: BOX_TO.h }}>
                <span
                  ref={(node) => {
                el.current.bPhoto = node;
              }}
                  className="absolute flex items-center justify-center overflow-hidden bg-navy text-white"
                  style={{ left: 20.5, top: 24, width: 62, height: 62, borderRadius: 9 }}
                >
                  <UserRound style={{ width: 30, height: 30 }} strokeWidth={1.8} />
                </span>
                <SummaryTitle top={41.8}>{heroWheel.person.title}</SummaryTitle>
                <SummaryRow top={128.6} detailRef={(node) => {
                  el.current.bDetail = node;
                }}>
                  {heroWheel.person.detail}
                </SummaryRow>
              </div>
            </Positioned>

            <Positioned ref={(node) => {
                el.current.a = node;
              }}>
              <div ref={(node) => {
                el.current.aBox = node;
              }} className="absolute bg-white" style={boxStyle(0)} />
              <div ref={(node) => {
                el.current.aActivity = node;
              }} className="absolute" style={{ left: BOX_FROM.l, top: BOX_FROM.t, width: BOX_FROM.w, height: BOX_FROM.h }}>
                {first.map((item, s) => (
                  <SwapLayer key={s} active={s === stage} order={0}>
                    <ActivityContent item={item} />
                  </SwapLayer>
                ))}
              </div>
              <div
                ref={(node) => {
                el.current.aSummary = node;
              }}
                className="absolute"
                style={{ left: BOX_TO.l, top: BOX_TO.t, width: BOX_TO.w, height: BOX_TO.h, transformOrigin: "51px 51px", visibility: "hidden" }}
              >
                <span className="absolute overflow-hidden" style={{ left: 17, top: 17, width: 68, height: 68, borderRadius: 9 }}>
                  <LogoMark className="size-full" />
                </span>
                <SummaryTitle top={37.8}>{heroWheel.brand.title}</SummaryTitle>
                <SummaryRow top={126} detailRef={(node) => {
                  el.current.aDetail = node;
                }}>
                  {heroWheel.brand.detail}
                </SummaryRow>
                {[...heroWheel.brand.people].reverse().map((initials, idx) => {
                  const i = heroWheel.brand.people.length - 1 - idx;
                  return (
                    <span
                      key={initials}
                      ref={(node) => {
                        avatars.current[i] = node;
                      }}
                      className="absolute flex items-center justify-center rounded-full font-semibold"
                      style={{
                        left: 294.5 - 17,
                        top: 126 - 17,
                        width: 34,
                        height: 34,
                        fontSize: 11.5,
                        letterSpacing: "-0.02em",
                        border: "2.5px solid #fff",
                        background: ["#d9ebff", "#d9f3ff", "#e7ebf2"][i],
                        color: ["#0058b8", "#065aa8", "#3d4657"][i],
                      }}
                    >
                      {initials}
                    </span>
                  );
                })}
                <span
                  className="absolute flex items-center justify-center rounded-full bg-blue-600 font-semibold text-white"
                  style={{ left: 294.5 - 17, top: 126 - 17, width: 34, height: 34, fontSize: 12, border: "2.5px solid #fff" }}
                >
                  {heroWheel.brand.more}
                </span>
              </div>
            </Positioned>
          </div>
        </div>
      </div>
    </div>
  );
}

function boxStyle(m: number): React.CSSProperties {
  return {
    left: lerp(BOX_FROM.l, BOX_TO.l, m),
    top: lerp(BOX_FROM.t, BOX_TO.t, m),
    width: lerp(BOX_FROM.w, BOX_TO.w, m),
    height: lerp(BOX_FROM.h, BOX_TO.h, m),
    borderRadius: lerp(BOX_FROM.r, BOX_TO.r, m),
    boxShadow: CARD_SHADOW,
  };
}

function morph(node: HTMLElement | null | undefined, m: number) {
  if (!node) return;
  const s = boxStyle(m);
  node.style.left = `${s.left}px`;
  node.style.top = `${s.top}px`;
  node.style.width = `${s.width}px`;
  node.style.height = `${s.height}px`;
  node.style.borderRadius = `${s.borderRadius}px`;
}

function Positioned({ ref, children }: { ref: (node: HTMLElement | null) => void; children: React.ReactNode }) {
  return (
    <div ref={ref} className="absolute top-0 left-0 will-change-transform" style={{ visibility: "hidden" }}>
      {children}
    </div>
  );
}

type Activity = (typeof heroWheel.stages)[number][number];

const cardWidth = (item: Activity) => ("w" in item ? item.w : BOX_FROM.w);

/**
 * One activity card holding every stage's copy. The white box eases to the
 * active copy's width; each copy layer is laid out at its own width, centred
 * on the spoke point.
 */
function ActivityCard({ items, stage, order, outcome }: { items: Activity[]; stage: number; order: number; outcome?: boolean }) {
  const w = cardWidth(items[stage]);
  return (
    <>
      <div
        className="absolute bg-white transition-[left,width] duration-500 ease-out"
        style={{ ...boxStyle(0), left: -w / 2, width: w, ...(outcome ? OUTCOME : null) }}
      />
      {items.map((item, s) => {
        const iw = cardWidth(item);
        return (
          <div key={s} className="absolute" style={{ left: -iw / 2, top: BOX_FROM.t, width: iw, height: BOX_FROM.h }}>
            <SwapLayer active={s === stage} order={order}>
              <ActivityContent item={item} />
            </SwapLayer>
          </div>
        );
      })}
    </>
  );
}

/** Crossfades one stage's copy in (rising into place) or out (lifting away). */
function SwapLayer({ active, order, children }: { active: boolean; order: number; children: React.ReactNode }) {
  const delay = order * SWAP.stagger + (active ? SWAP.lag : 0);
  return (
    <div
      className="absolute inset-0"
      style={{
        opacity: active ? 1 : 0,
        transform: `translate3d(0, ${active ? 0 : -SWAP.lift}px, 0)`,
        transition: `opacity ${SWAP.duration}s ease ${delay}s, transform ${SWAP.duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/** 104px-tall activity card content: tinted icon tile, time / title / detail, check badge. */
function ActivityContent({ item }: { item: Activity }) {
  const tone = TONES[item.tone];
  const Glyph = ICONS[item.icon];
  const w = cardWidth(item);
  return (
    <>
      <span
        className="absolute flex items-center justify-center"
        style={{ left: 15, top: 22.85, width: 58.3, height: 58.3, borderRadius: 6.6, background: tone.tile, color: INK }}
      >
        <Glyph style={{ width: 24, height: 24 }} strokeWidth={2} />
      </span>
      <p className="absolute font-medium whitespace-nowrap" style={{ ...text(93.3, 12.5, 13.2, -0.054), color: tone.time }}>
        {item.time}
      </p>
      <p className="absolute font-semibold whitespace-nowrap" style={{ ...text(93.3, 36.1, 17.8, -0.058), color: INK }}>
        {item.title}
      </p>
      <p className="absolute font-medium whitespace-nowrap" style={{ ...text(93.3, 68.7, 13.2, -0.054), color: MUTED }}>
        {item.detail}
      </p>
      <CheckBadge left={w - 22 - 26.4} top={52 - 13.2} size={26.4} />
    </>
  );
}

function SummaryTitle({ top, children }: { top: number; children: React.ReactNode }) {
  return (
    <p className="absolute font-semibold whitespace-nowrap" style={{ ...text(101, top, 24, -0.056, 1.1), color: INK }}>
      {children}
    </p>
  );
}

function SummaryRow({ top, detailRef, children }: { top: number; detailRef: (n: HTMLElement | null) => void; children: React.ReactNode }) {
  return (
    <>
      <CheckBadge left={17} top={top - 9.5} size={19} />
      <p ref={detailRef} className="absolute font-medium whitespace-nowrap" style={{ ...text(47, top - 12.9, 17.2, -0.054), color: MUTED }}>
        {children}
      </p>
    </>
  );
}

function CheckBadge({ left, top, size }: { left: number; top: number; size: number }) {
  return (
    <span
      className="absolute flex items-center justify-center rounded-full bg-blue-600 text-white"
      style={{ left, top, width: size, height: size }}
    >
      <Check style={{ width: size * 0.52, height: size * 0.52 }} strokeWidth={3} />
    </span>
  );
}

function text(left: number, top: number, size: number, tracking: number, lineHeight = 1.5): React.CSSProperties {
  return { left, top, fontSize: size, lineHeight, letterSpacing: `${tracking}em`, margin: 0 };
}
