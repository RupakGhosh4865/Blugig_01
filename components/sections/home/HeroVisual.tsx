"use client";

import { Check } from "lucide-react";
import { useAnimate } from "motion/react";
import { useEffect } from "react";
import { LogoMark } from "@/components/layout/Logo";
import { ParticleField } from "@/components/three/ParticleField";
import { useReducedMotionSafe } from "@/lib/hooks";
import { easeOut } from "@/lib/motion";
import { cn } from "@/lib/utils";

type CardData = { title: string; meta: string; kind: "brand" | "person" };

/**
 * Right side of the hero: the particle globe (3D, lazy) with zig's two
 * floating "did" cards on top. zig drives its Lottie in three segments with
 * 1s holds (0 → 25% → 65% → 100%, 8s loop); the cards follow the same rhythm.
 */
export function HeroVisual({ cards }: { cards: CardData[] }) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const reduce = useReducedMotionSafe();

  useEffect(() => {
    if (reduce) return;
    const controls = animate(
      [
        [".hero-card-0", { opacity: [0, 1], y: [28, 0] }, { duration: 0.9, ease: easeOut }],
        [".hero-card-0 .tick", { scale: [0, 1] }, { duration: 0.4, at: "-0.3" }],
        [".hero-card-1", { opacity: [0, 1], y: [28, 0] }, { duration: 0.9, ease: easeOut, at: "+1" }],
        [".hero-card-1 .tick", { scale: [0, 1] }, { duration: 0.4, at: "-0.3" }],
        [".hero-card-0, .hero-card-1", { opacity: 0, y: -16 }, { duration: 0.7, ease: easeOut, at: "+3.2" }],
      ],
      { repeat: Infinity, repeatDelay: 0.8 },
    );
    return () => controls.stop();
  }, [animate, reduce]);

  return (
    <div ref={scope} className="relative mx-auto aspect-square w-full max-w-[40rem]">
      <ParticleField shape="globe" className="absolute inset-[4%]" pointSize={3.4} density={0.85} />
      <div className="pointer-events-none absolute inset-0">
        {cards.map((card, i) => (
          <HeroCard
            key={card.title}
            card={card}
            className={cn(
              `hero-card-${i}`,
              reduce ? "opacity-100" : "opacity-0",
              i === 0 ? "top-[14%] left-[2%] sm:left-[6%]" : "right-[0%] bottom-[16%] sm:right-[2%]",
            )}
          />
        ))}
      </div>
    </div>
  );
}

function HeroCard({ card, className }: { card: CardData; className?: string }) {
  return (
    <div
      className={cn(
        "absolute w-[min(20.5rem,70vw)] rounded-[1.25rem] bg-white p-4 shadow-[0_30px_60px_-20px_rgba(19,33,61,0.28)] sm:p-[1.125rem]",
        className,
      )}
    >
      <div className="flex items-center gap-4">
        {card.kind === "brand" ? (
          <LogoMark className="size-14 rounded-xl text-2xl sm:size-[4.25rem]" />
        ) : (
          <span className="flex size-14 items-center justify-center rounded-xl bg-navy text-lg font-medium text-white sm:size-[4.25rem]">
            You
          </span>
        )}
        <p className="title-s text-navy">{card.title}</p>
      </div>
      <div className="mt-5 flex items-center justify-between">
        <p className="flex items-center gap-2 text-base text-gray-500">
          <span className="tick flex size-5 items-center justify-center rounded-full bg-gold-500 text-ink">
            <Check className="size-3" strokeWidth={3} />
          </span>
          {card.meta}
        </p>
        {card.kind === "brand" ? (
          <span className="flex -space-x-2">
            {["AM", "JR", "SK"].map((n, i) => (
              <span
                key={n}
                className={cn(
                  "flex size-8 items-center justify-center rounded-full border-2 border-white text-[0.625rem] font-medium",
                  i === 0 ? "bg-blue-100 text-blue-800" : i === 1 ? "bg-gold-100 text-gold-900" : "bg-gray-100 text-gray-700",
                )}
              >
                {n}
              </span>
            ))}
            <span className="flex size-8 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-[0.625rem] font-medium text-white">
              +12
            </span>
          </span>
        ) : null}
      </div>
    </div>
  );
}
