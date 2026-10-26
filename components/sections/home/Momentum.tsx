"use client";

import { Waves } from "lucide-react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { momentum } from "@/content/home";
import { useScrollChoreography } from "@/lib/hooks";
import { cn, progressBetween } from "@/lib/utils";

// zig sales-section-js: cards ride rays of a huge wheel; rays start at −35° and step 30°.
const LINE_START = -35;
const LINE_STEP = 30;
const CARD_COUNT = momentum.cards.length + 1;
const ANGLES = Array.from({ length: CARD_COUNT }, (_, i) => LINE_START + (CARD_COUNT - 1 - i) * LINE_STEP);
const WHEEL_BASE = "translate(10%, -20%)";
/**
 * The track (h-[320vh], pulled up 100vh under the steps panel) pins for 220vh.
 * The first 100vh is the steps panel sliding off, which uncovers this section
 * bottom-first; the cards wait just off-screen until the heading is in view
 * (the last 10% of that slide only clears the navbar strip), then ride in.
 */
const REVEALED = 100 / 220;
const CARDS_FROM = REVEALED * 0.9;
const CARDS_TO = 0.96;

/** `parked`: wheel turn that holds the first card just past the right edge, so it shows the moment the wheel moves. */
type Geometry = { wcx: number; meta: { naturalCx: number; deltaY: number }[]; total: number; parked: number };

function applyWheel(g: Geometry | null, wheel: HTMLDivElement | null, cards: (HTMLDivElement | null)[], q: number) {
  if (!g || !wheel) return;
  const r = g.parked + progressBetween(q, CARDS_FROM, CARDS_TO) * (g.total - g.parked);
  wheel.style.transform = `${WHEEL_BASE} rotate(${r}deg)`;
  cards.forEach((card, i) => {
    if (!card) return;
    const rad = ((ANGLES[i] + r) * Math.PI) / 180;
    const s = Math.sin(rad);
    const rx =
      s <= 0.05 ? g.wcx + Math.sign(Math.cos(rad)) * window.innerWidth * 2 : g.wcx + g.meta[i].deltaY * (Math.cos(rad) / s);
    card.style.transform = `translate3d(${rx - g.meta[i].naturalCx}px, 0, 0)`;
  });
}

/**
 * zig "Every month, the account record gets more complete": a pinned section
 * that the yellow steps panel slides off of. Once the heading is in view, a
 * giant wheel of hairlines rotates as you scroll and each card rides in from
 * the right along its ray, ending with the CTA card at the left edge.
 */
export function Momentum() {
  const track = useRef<HTMLDivElement>(null);
  const wheel = useRef<HTMLDivElement>(null);
  const row = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  const geom = useRef<Geometry | null>(null);
  const choreo = useScrollChoreography();
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });

  useEffect(() => {
    const cardEls = cards.current;
    if (!choreo) {
      geom.current = null;
      cardEls.forEach((c) => c && (c.style.transform = ""));
      return;
    }
    const measure = () => {
      const w = wheel.current;
      const r = row.current;
      if (!w || !r) return;
      cardEls.forEach((c) => c && (c.style.transform = ""));
      w.style.transform = WHEEL_BASE;
      const wr = w.getBoundingClientRect();
      const wcx = wr.left + wr.width / 2;
      const wcy = wr.top + wr.height / 2;
      const meta = cardEls.map((c) => {
        const cr = c?.getBoundingClientRect();
        return cr ? { naturalCx: cr.left + cr.width / 2, deltaY: cr.top + cr.height / 2 - wcy } : { naturalCx: 0, deltaY: 1 };
      });
      const last = cardEls[CARD_COUNT - 1]?.getBoundingClientRect();
      const targetCx = r.getBoundingClientRect().left + (last?.width ?? 0) / 2;
      const cot = (targetCx - wcx) / meta[CARD_COUNT - 1].deltaY;
      const finalAngle = (Math.atan2(1, cot) * 180) / Math.PI;
      // First card's ray angle when its left edge sits on the viewport's right edge (minus 1° of slack).
      const firstW = cardEls[0]?.getBoundingClientRect().width ?? 0;
      const edgeAngle = (Math.atan2(meta[0].deltaY, window.innerWidth + firstW / 2 - wcx) * 180) / Math.PI - 1;
      geom.current = { wcx, meta, total: Math.min(180, finalAngle - LINE_START), parked: edgeAngle - ANGLES[0] };
      applyWheel(geom.current, w, cardEls, scrollYProgress.get());
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [choreo, scrollYProgress]);

  useMotionValueEvent(scrollYProgress, "change", (q) => applyWheel(geom.current, wheel.current, cards.current, q));

  return (
    <div ref={track} className={cn("relative z-0", choreo && "-mt-[100vh] h-[320vh]")}>
      <section
        className={cn(
          "relative flex flex-col justify-around gap-12 overflow-hidden bg-canvas py-24 text-ink",
          choreo && "sticky top-0 h-screen pt-[clamp(4rem,10vh,6.25rem)] pb-[clamp(3rem,12vh,8.5rem)]",
        )}
      >
        {choreo ? (
          <div aria-hidden className="pointer-events-none absolute inset-0 mx-auto flex max-w-[85rem] items-center justify-center">
            <div ref={wheel} className="absolute flex size-[287.5rem] items-center justify-center" style={{ transform: WHEEL_BASE }}>
              {[0, 30, 60, 90, 120, 150].map((deg) => (
                <span
                  key={deg}
                  className="absolute h-0 w-full border-t border-gray-200"
                  style={{ transform: deg ? `rotate(${deg}deg) translateY(50%)` : undefined }}
                />
              ))}
            </div>
          </div>
        ) : null}

        <div className="shell relative z-10">
          <div className="flex max-w-[33.75rem] flex-col gap-6">
            <Chip icon={Waves}>{momentum.chip}</Chip>
            <h2 className="title-l">
              <span className="text-grad">{momentum.titleAccent}</span> {momentum.titleRest}
            </h2>
            <p className="text-l">{momentum.sub}</p>
          </div>
        </div>

        <div className="shell relative z-10">
          <div
            ref={row}
            className={cn(
              "flex gap-5",
              !choreo && "-mx-[var(--gutter)] snap-x snap-mandatory overflow-x-auto px-[var(--gutter)] pb-4",
            )}
          >
            {momentum.cards.map((c, i) => (
              <div
                key={c.label}
                ref={(el) => {
                  cards.current[i] = el;
                }}
                className="flex h-[15rem] w-[min(24.375rem,82vw)] shrink-0 snap-start flex-col justify-between rounded-[1.5rem] bg-white p-8 will-change-transform sm:p-10"
              >
                <p className="title-s text-sky-800">{c.label}</p>
                <p className="title-xs">{c.body}</p>
              </div>
            ))}
            <div
              ref={(el) => {
                cards.current[CARD_COUNT - 1] = el;
              }}
              className="flex min-h-[15rem] w-[min(38.75rem,88vw)] shrink-0 snap-start flex-col justify-between gap-8 rounded-[1.5rem] bg-blue-600 p-8 text-white will-change-transform sm:p-10"
            >
              <p className="title-s">{momentum.cta.text}</p>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href={momentum.cta.primary.href} variant="white">
                  {momentum.cta.primary.label}
                </ButtonLink>
                <ButtonLink href={momentum.cta.secondary.href} variant="outline-light">
                  {momentum.cta.secondary.label}
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
