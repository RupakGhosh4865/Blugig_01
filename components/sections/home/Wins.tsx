"use client";

import { Tags } from "lucide-react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { LogoMark } from "@/components/layout/Logo";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { wins } from "@/content/home";
import { primaryCta } from "@/content/navigation";
import { useRange, useScrollChoreography } from "@/lib/hooks";
import { cn } from "@/lib/utils";

// Design canvas (SVG units). Final layout matches zig at 1440px: 500px circles, 350px apart.
const W = 1400;
const H = 640;
const CX = W / 2;
const CY = H / 2;
const R = 250;
const HALF_SEP = 175;
const SKY = "#86b4fd";
const SILVER = "#d4dae5";

type Tip = { title: string; body: string };

/** Annotation geometry for one side (zig win-circles-js: horizontal rule then a 30° leg to the circle). */
function annotations(side: "left" | "right") {
  const sign = side === "left" ? -1 : 1;
  const cx = CX + sign * HALF_SEP;
  const mirror = (x: number) => (side === "left" ? x : W - x);
  const legTo = (x1: number, y1: number, up: boolean) => {
    const dx = side === "left" ? Math.cos(Math.PI / 6) : -Math.cos(Math.PI / 6);
    const dy = up ? -Math.sin(Math.PI / 6) : Math.sin(Math.PI / 6);
    const ax = x1 - cx;
    const ay = y1 - CY;
    const b = 2 * (ax * dx + ay * dy);
    const c = ax * ax + ay * ay - R * R;
    const disc = Math.max(0, b * b - 4 * c);
    const t = (-b - Math.sqrt(disc)) / 2;
    return [x1 + t * dx, y1 + t * dy] as const;
  };
  const top = { x0: mirror(80), x1: mirror(300), y: 95 };
  const mid = { x0: mirror(0), y: CY, x1: cx + sign * R };
  const bot = { x0: mirror(80), x1: mirror(300), y: 545 };
  const [tx, ty] = legTo(top.x1, top.y, false);
  const [bx, by] = legTo(bot.x1, bot.y, true);
  return [
    { d: `M ${top.x0} ${top.y} L ${top.x1} ${top.y} L ${tx} ${ty}`, dot: [tx, ty], text: { x: top.x1, y: top.y } },
    { d: `M ${mid.x0} ${mid.y} L ${mid.x1} ${mid.y}`, dot: [mid.x1, mid.y], text: { x: mid.x0, y: mid.y } },
    { d: `M ${bot.x0} ${bot.y} L ${bot.x1} ${bot.y} L ${bx} ${by}`, dot: [bx, by], text: { x: bot.x1, y: bot.y } },
  ];
}

const LEFT = annotations("left");
const RIGHT = annotations("right");

/**
 * zig "One platform. Two wins" (IX2 a-16 + win-circles-js), on a black page:
 * circles scale 0.2 → 1 → separate into a Venn → titles + lens illustration
 * fade in → tooltips appear while their annotation lines draw.
 */
export function Wins() {
  const track = useRef<HTMLDivElement>(null);
  const choreo = useScrollChoreography();
  const { scrollYProgress: p } = useScroll({ target: track, offset: ["start end", "end end"] });

  const scale = useRange(p, [0.12, 0.38], [0.2, 1]);
  const sep = useRange(p, [0.42, 0.58], [0, 1]);
  const content = useRange(p, [0.58, 0.68], [0, 1]);
  const tips = useRange(p, [0.72, 0.78], [0, 1]);
  const draw = useRange(p, [0.73, 0.84], [0, 1]);
  const dots = useRange(p, [0.82, 0.86], [0, 1]);
  const lx = useTransform(sep, (v) => CX - HALF_SEP * v);
  const rx = useTransform(sep, (v) => CX + HALF_SEP * v);

  return (
    <div data-bg-zone="ink">
      <section className="section-y">
        <div className="shell flex flex-col gap-[2.625rem]">
          <Reveal className="flex max-w-[30rem] flex-col gap-6">
            <Chip icon={Tags} tone="zone">
              {wins.chip}
            </Chip>
            <h2 className="title-l">
              {wins.titleA} {wins.titleB}
            </h2>
            <p className="text-l max-w-[20rem] text-[color:var(--page-muted)]">{wins.sub}</p>
          </Reveal>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={primaryCta.href}>{primaryCta.label}</ButtonLink>
            <ButtonLink href="/services" variant="outline-zone">
              Explore services
            </ButtonLink>
          </div>
        </div>
      </section>

      <div ref={track} className={choreo ? "relative h-[260vh]" : "relative"}>
      {choreo ? (
          <div className="sticky top-0 flex h-screen items-center overflow-hidden">
            <div className="shell">
              <div className="relative mx-auto aspect-[1400/640] w-full max-w-[87.5rem] text-white">
                <motion.svg
                  viewBox={`0 0 ${W} ${H}`}
                  className="absolute inset-0 h-full w-full overflow-visible"
                  fill="none"
                  aria-hidden
                >
                  <defs>
                    <pattern id="wins-dots" width="9" height="9" patternUnits="userSpaceOnUse">
                      <circle cx="4.5" cy="4.5" r="1.1" fill={SKY} opacity="0.55" />
                    </pattern>
                    <clipPath id="wins-clip-right">
                      <motion.circle cx={rx} cy={CY} r={R} />
                    </clipPath>
                  </defs>
                  <motion.g style={{ scale, originX: "50%", originY: "50%" }}>
                    <motion.circle
                      cx={lx}
                      cy={CY}
                      r={R}
                      fill="url(#wins-dots)"
                      clipPath="url(#wins-clip-right)"
                      style={{ opacity: content }}
                    />
                    <motion.circle cx={lx} cy={CY} r={R} stroke={SKY} strokeWidth="1.2" />
                    <motion.circle cx={rx} cy={CY} r={R} stroke={SILVER} strokeWidth="1.2" />
                  </motion.g>
                  <Lines items={LEFT} color={SKY} draw={draw} dots={dots} />
                  <Lines items={RIGHT} color={SILVER} draw={draw} dots={dots} />
                </motion.svg>

                <motion.div className="pointer-events-none absolute inset-0" style={{ opacity: content }}>
                  <CircleTitle x={CX - HALF_SEP - 30}>{wins.left.title}</CircleTitle>
                  <CircleTitle x={CX + HALF_SEP + 30}>{wins.right.title}</CircleTitle>
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <LogoMark className="size-[clamp(2.75rem,4.6vw,4rem)] shadow-[0_0_60px_rgba(114,166,250,0.45)]" />
                  </span>
                </motion.div>

                <motion.div className="absolute inset-0" style={{ opacity: tips }}>
                  {wins.left.tips.map((t, i) => (
                    <TipLabel key={t.title} tip={t} pos={LEFT[i].text} side="left" middle={i === 1} tone="sky" />
                  ))}
                  {wins.right.tips.map((t, i) => (
                    <TipLabel key={t.title} tip={t} pos={RIGHT[i].text} side="right" middle={i === 1} tone="silver" />
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
      ) : (
        <StackedWins />
      )}
      </div>
    </div>
  );
}

function Lines({
  items,
  color,
  draw,
  dots,
}: {
  items: ReturnType<typeof annotations>;
  color: string;
  draw: MotionValue<number>;
  dots: MotionValue<number>;
}) {
  return (
    <g>
      {items.map((a) => (
        <g key={a.d}>
          <motion.path d={a.d} stroke={color} strokeWidth="1" style={{ pathLength: draw }} />
          <motion.circle cx={a.dot[0]} cy={a.dot[1]} r="3.2" fill={color} style={{ opacity: dots }} />
        </g>
      ))}
    </g>
  );
}

function CircleTitle({ x, children }: { x: number; children: string }) {
  return (
    <p
      className="title-m absolute top-1/2 w-[15%] -translate-x-1/2 -translate-y-1/2 text-center text-[clamp(1.25rem,2.4vw,2.25rem)]"
      style={{ left: `${(x / W) * 100}%` }}
    >
      {children}
    </p>
  );
}

function TipLabel({
  tip,
  pos,
  side,
  middle,
  tone,
}: {
  tip: Tip;
  pos: { x: number; y: number };
  side: "left" | "right";
  middle: boolean;
  tone: "sky" | "silver";
}) {
  const alignRight = side === "left" && !middle;
  const style =
    side === "left"
      ? middle
        ? { left: 0, top: `${(pos.y / H) * 100}%` }
        : { right: `${100 - (pos.x / W) * 100}%`, top: `${(pos.y / H) * 100}%` }
      : middle
        ? { right: 0, top: `${(pos.y / H) * 100}%` }
        : { left: `${(pos.x / W) * 100}%`, top: `${(pos.y / H) * 100}%` };
  return (
    <div
      className={cn(
        "absolute flex w-[17%] -translate-y-full flex-col gap-1 pb-2.5",
        alignRight ? "items-end text-right" : "items-start text-left",
        side === "right" && middle && "items-end text-right",
        tone === "sky" ? "text-sky-300" : "text-gray-200",
      )}
      style={style}
    >
      <p className="text-[clamp(0.95rem,1.25vw,1.125rem)] leading-snug font-medium">{tip.title}</p>
      <p className="text-[clamp(0.75rem,0.95vw,0.875rem)] opacity-80">{tip.body}</p>
    </div>
  );
}

/** Tablet / mobile / reduced motion: zig stacks the two circles with their notes listed. */
function StackedWins() {
  return (
    <section className="pb-24">
      <div className="shell grid gap-14 md:grid-cols-2">
        {[
          { data: wins.left, color: "border-sky-500", text: "text-sky-300" },
          { data: wins.right, color: "border-gray-200", text: "text-gray-200" },
        ].map(({ data, color, text }) => (
          <Reveal key={data.title} className="flex flex-col items-center gap-10">
            <div className={cn("flex aspect-square w-full max-w-[22.5rem] items-center justify-center rounded-full border p-12 text-center", color)}>
              <p className="title-m">{data.title}</p>
            </div>
            <ul className="flex w-full max-w-[22.5rem] flex-col gap-6">
              {data.tips.map((t) => (
                <li key={t.title} className={cn("flex flex-col gap-1 border-b border-white/15 pb-4", text)}>
                  <span className="text-l font-medium">{t.title}</span>
                  <span className="text-s opacity-80">{t.body}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
