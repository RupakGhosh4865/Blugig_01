"use client";

import {
  CalendarCheck,
  Check,
  CircleCheckBig,
  ClipboardCheck,
  FileText,
  Ticket,
  TriangleAlert,
  UserRoundCheck,
  Workflow,
} from "lucide-react";
import { animate, useMotionValue, useMotionValueEvent } from "motion/react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { ParticleField } from "@/components/three/ParticleField";
import { heroWheel } from "@/content/home";
import { shade } from "@/lib/color";
import { useMediaQuery, useReducedMotionSafe } from "@/lib/hooks";
import { cn } from "@/lib/utils";

/*
 * Hero wheel — after the zig.ai hero motion: a hub sits off-screen right with
 * hairline spokes running left across the hero. Activity cards ride the spokes
 * at a fixed radius and stay level while the hub turns.
 * Each hero stage owns a set of five cards on spokes 16° apart. The wheel holds
 * still on the current set; a stage change turns it TURN degrees, carrying the
 * set up and out over the top while the next set rises from below into place
 * (scrolling back turns it back). The set fans apart slightly with the wheel's
 * speed, and cards fade and shrink towards the edge of the visible arc.
 * Geometry is in comp units relative to the scene origin; each breakpoint
 * places/scales the scene like the four original renders (2500, 1280, 820 and
 * 420 wide).
 */

// Geometry (comp units, relative to the scene origin).
const C = { x: 891, y: 0 }; // hub centre (the hub itself is a hidden pivot — only its spokes draw)
const R = 549.15; // card radius on the spokes
const SPOKE = 2376;
const ARC = { x: 965.06, y: 0, r: 550 };
const MASK = { x: 1335.68, y: 3, r: 550 };
/** Activity card box relative to its spoke point (centred on it). */
const BOX = { t: -52, w: 380, h: 104, r: 22 };

/** Rest angles top → bottom (degrees; positive lifts a card above the hub line). */
const REST = [32, 16, 0, -16, -32];
const MID = (REST.length - 1) / 2;
/** Wheel turn between stages: the next set waits this far below the current one. */
const TURN = 96;
/** Cards are fully shown within ±SHOW° and gone by ±HIDE°. */
const SHOW = 40;
const HIDE = 64;
/** Extra spread per card slot, per °/s of wheel speed — the set fans out while it moves. */
const FAN = 0.018;
const SPIN = { type: "spring", visualDuration: 1.15, bounce: 0.14 } as const;
/** Entrance: cards settle in top → bottom on first paint. */
const ENTER = { delay: 0.35, stagger: 0.08 };

const VARIANTS = {
  wide: { w: 2500, h: 887, nx: 1249.333, ny: 443.833, k: 1 },
  desk: { w: 1280, h: 900, nx: 661.654, ny: 450.481, k: 0.8 },
  tablet: { w: 820, h: 1200, nx: 24.741, ny: 860.432, k: 0.85 },
  mobile: { w: 420, h: 1200, nx: -93.086, ny: 870.967, k: 0.8 },
} as const;
type Variant = keyof typeof VARIANTS;

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
/** The outcome card (last in each set) sits on a faint green wash. */
const OUTCOME = {
  background: "#f3fbf5",
  boxShadow: "inset 0 0 0 1px #c4e8cf, 0 34px 50px -30px rgba(29,138,67,0.34), 0 14px 30px -18px rgba(29,138,67,0.16)",
};
const INK = "#041c42";
const MUTED = "#626d81";

const rad = (deg: number) => (deg * Math.PI) / 180;
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

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
  const [hub, setHub] = useState<HubSpot | null>(null);
  const turn = useMotionValue(stage * TURN);

  const spokes = useRef<(SVGLineElement | null)[]>([]);
  const cards = useRef<(HTMLElement | null)[]>([]);

  // Stage scale (the scene is authored at V.w × V.h comp px) and the Mitti badge's spot.
  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const stage = stageRef.current;
    if (!wrap || !stage) return;
    const measure = () => {
      const scale = stage.clientWidth / V.w;
      setU(scale);
      setHub(hubSpot(V, scale, stage.offsetLeft, stage.offsetTop, wrap.clientWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(stage);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [V]);

  /** Places every card (and its spoke) for wheel turn `t` moving at `velocity` °/s. */
  const render = useCallback((t: number, velocity: number) => {
    heroWheel.stages.forEach((set, s) => {
      set.forEach((_, k) => {
        const i = s * REST.length + k;
        const deg = REST[k] - s * TURN + t + (MID - k) * velocity * FAN;
        const off = Math.abs(deg);
        const shown = 1 - clamp01((off - SHOW) / (HIDE - SHOW));
        const visible = shown > 0.001;

        const spoke = spokes.current[i];
        if (spoke) {
          spoke.style.display = visible ? "" : "none";
          if (visible) {
            spoke.style.opacity = String(shown);
            spoke.setAttribute("x2", String(C.x - SPOKE * Math.cos(rad(deg))));
            spoke.setAttribute("y2", String(C.y - SPOKE * Math.sin(rad(deg))));
          }
        }

        const card = cards.current[i];
        if (!card) return;
        card.style.visibility = visible ? "visible" : "hidden";
        if (!visible) return;
        const scale = 1 - 0.1 * clamp01((off - REST[0]) / (HIDE - REST[0]));
        card.style.opacity = String(shown * shown);
        card.style.transform = `translate3d(${C.x - R * Math.cos(rad(deg))}px, ${C.y - R * Math.sin(rad(deg))}px, 0) scale(${scale})`;
      });
    });
  }, []);

  useMotionValueEvent(turn, "change", (t) => render(t, turn.getVelocity()));

  // Hold still on the current set; a stage change turns the wheel to the next one.
  useEffect(() => {
    if (!u) return;
    const target = stage * TURN;
    if (reduce || turn.get() === target) {
      turn.jump(target);
      render(target, 0);
      return;
    }
    const controls = animate(turn, target, { ...SPIN, onComplete: () => render(target, 0) });
    return () => controls.stop();
  }, [u, stage, reduce, turn, render]);

  const stacked = variant === "tablet" || variant === "mobile";
  const sets = heroWheel.stages;

  return (
    <div ref={wrapRef} className={cn("absolute inset-0 flex justify-center overflow-hidden", stacked ? "items-end" : "items-center")}>
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
                {sets.flatMap((set, s) =>
                  set.map((_, k) => (
                    <line
                      key={`${s}-${k}`}
                      ref={(node) => {
                        spokes.current[s * REST.length + k] = node;
                      }}
                      x1={C.x}
                      y1={C.y}
                      x2={C.x - SPOKE}
                      y2={C.y}
                      style={{ display: "none" }}
                    />
                  )),
                )}
                <circle cx={MASK.x} cy={MASK.y} r={MASK.r} fill="var(--color-canvas)" />
              </g>
            </svg>

            {sets.flatMap((set, s) =>
              set.map((item, k) => (
                <div
                  key={`${s}-${k}`}
                  ref={(node) => {
                    cards.current[s * REST.length + k] = node;
                  }}
                  className="absolute top-0 left-0 will-change-transform"
                  style={{ visibility: "hidden" }}
                >
                  <div className="enter-fade" style={{ "--d": `${ENTER.delay + k * ENTER.stagger}s` } as CSSProperties}>
                    <ActivityCard item={item} outcome={k === set.length - 1} />
                  </div>
                </div>
              )),
            )}
          </div>
        </div>
      </div>

      {hub ? (
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: hub.x, top: hub.y, width: hub.size, height: hub.size }}
        >
          {/* hub plate: a hairline ring in the spoke colour that clears the spokes, holding the particle Mitti mark */}
          <div
            className="enter-fade relative size-full overflow-hidden rounded-full border border-[#c3cbd8] bg-canvas"
            style={{ "--d": `${ENTER.delay + 0.2}s` } as CSSProperties}
          >
            <span className="absolute inset-0 bg-[radial-gradient(circle,rgba(10,128,251,0.12),transparent_70%)]" />
            <ParticleField
              shape="mitti"
              colorA={shade("#0a80fb", 0.22)}
              colorB="#041c42"
              sparkle="#29b9fa"
              density={0.32}
              pointSize={1.8}
              cameraZ={3.15}
              interactive={false}
              className="absolute inset-[5%]"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

type HubSpot = { x: number; y: number; size: number };
/** Hub circle diameter (px; below `min` the particle mark gets too small to read) and its clearance from the middle card and the right edge. */
const HUB_BADGE = { max: 170, min: 92, gap: 16 };

/**
 * Where the Mitti hub circle sits, in wrapper px: on the hub line, inside the
 * arc — centred in the room between the middle card and the right edge, or on
 * the hub itself when that is nearer. Null when the room is too tight.
 */
function hubSpot(V: (typeof VARIANTS)[Variant], scale: number, left: number, top: number, width: number): HubSpot | null {
  const x = (cx: number) => left + (V.nx + cx * V.k) * scale;
  const cardW = Math.max(...heroWheel.stages.map((set) => cardWidth(set[MID])));
  const cardRight = x(C.x - R + cardW / 2);
  const size = Math.min(HUB_BADGE.max, width - cardRight - 2 * HUB_BADGE.gap);
  if (size < HUB_BADGE.min) return null;
  return { x: Math.min((cardRight + width) / 2, x(C.x)), y: top + V.ny * scale, size };
}

type Activity = (typeof heroWheel.stages)[number][number];

const cardWidth = (item: Activity) => ("w" in item ? item.w : BOX.w);

/** 104px-tall activity card centred on its spoke point: tinted icon tile, time / title / detail, check badge. */
function ActivityCard({ item, outcome }: { item: Activity; outcome?: boolean }) {
  const tone = TONES[item.tone];
  const Glyph = ICONS[item.icon];
  const w = cardWidth(item);
  return (
    <div
      className="absolute bg-white"
      style={{ left: -w / 2, top: BOX.t, width: w, height: BOX.h, borderRadius: BOX.r, boxShadow: CARD_SHADOW, ...(outcome ? OUTCOME : null) }}
    >
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
    </div>
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

function text(left: number, top: number, size: number, tracking: number, lineHeight = 1.5): CSSProperties {
  return { left, top, fontSize: size, lineHeight, letterSpacing: `${tracking}em`, margin: 0 };
}
