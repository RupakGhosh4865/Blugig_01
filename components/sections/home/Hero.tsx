import { Sparkles } from "lucide-react";
import type { CSSProperties } from "react";
import { SplitWords } from "@/components/motion/SplitWords";
import { HeroRays } from "@/components/sections/home/HeroArt";
import { HeroMotion } from "@/components/sections/home/HeroMotion";
import { HeroVisual } from "@/components/sections/home/HeroVisual";
import { ButtonLink } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { hero } from "@/content/home";

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

/**
 * zig hero: chip → title-xl with gradient tail → text-l → two pill buttons,
 * line art behind and the visual on the right (1.4fr / 1fr at ≥1280).
 * Choreography (≤1.4s): chip 0s → words 0.1s (+0.04 each) → sub 0.5s → CTAs 0.65s → trust 0.9s.
 */
export function Hero() {
  const leadCount = hero.titleLead.split(/\s+/).length;
  return (
    <HeroMotion
      gridClassName="min-h-[100svh] pt-28 pb-16 lg:min-h-[54rem] lg:max-h-[60rem] lg:pt-20 lg:pb-10"
      background={
        <>
          <HeroRays className="pointer-events-none absolute inset-0 -z-10 h-full w-full" />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 -right-40 -z-10 size-[44rem] rounded-full opacity-60 blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(245,192,48,0.28), transparent 65%)" }}
          />
        </>
      }
      copy={
        <div className="flex max-w-[46.5rem] flex-col gap-[2.625rem]">
          <div className="flex flex-col gap-6">
            <Chip icon={Sparkles} className="enter-fade" >
              {hero.chip}
            </Chip>
            <h1 className="title-xl">
              <SplitWords text={hero.titleLead} />{" "}
              <SplitWords text={hero.titleAccent} offset={leadCount} wordClassName="text-grad" />
            </h1>
            <p className="enter-fade text-l max-w-[33.75rem]" style={d(0.5)}>
              {hero.sub}
            </p>
          </div>
          <div className="enter-fade flex flex-wrap items-center gap-3" style={d(0.65)}>
            <ButtonLink href={hero.primary.href}>{hero.primary.label}</ButtonLink>
            <ButtonLink href={hero.secondary.href} variant="outline">
              {hero.secondary.label}
            </ButtonLink>
          </div>
          <p className="enter-fade text-s -mt-4 text-gray-500" style={d(0.9)}>
            {hero.trustLine}
          </p>
        </div>
      }
      visual={
        <div className="enter-fade" style={d(0.3)}>
          <HeroVisual cards={hero.cards} />
        </div>
      }
    />
  );
}
