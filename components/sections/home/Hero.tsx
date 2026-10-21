import { ArrowRight, ArrowUpRight } from "lucide-react";
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
 * zig hero: eyebrow → title-xl with gradient tail → text-l → two buttons,
 * line art behind and the inspection-tablet visual on the right.
 * Choreography (≤1.4s): eyebrow 0s → words 0.1s (+0.04 each) → sub 0.5s → CTAs 0.65s.
 */
export function Hero() {
  const leadCount = hero.titleLead.split(/\s+/).length;
  return (
    <HeroMotion
      gridClassName="min-h-[100svh] pt-28 pb-16 lg:min-h-[52rem] lg:max-h-[60rem] lg:grid-cols-[1.15fr_1fr] lg:gap-10 lg:pt-24 lg:pb-10"
      background={
        <>
          <HeroRays className="pointer-events-none absolute inset-0 -z-10 h-full w-full" />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 -right-40 -z-10 size-[48rem] rounded-full opacity-80 blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(29,88,196,0.2), transparent 65%)" }}
          />
        </>
      }
      copy={
        <div className="flex max-w-[44rem] flex-col gap-[2.625rem]">
          <div className="flex flex-col gap-6">
            <Chip className="enter-fade">{hero.chip}</Chip>
            <h1 className="title-xl">
              <SplitWords text={hero.titleLead} />{" "}
              <SplitWords text={hero.titleAccent} offset={leadCount} wordClassName="text-grad" />
            </h1>
            <p className="enter-fade text-l max-w-[32rem] text-gray-700" style={d(0.5)}>
              {hero.sub}
            </p>
          </div>
          <div className="enter-fade flex flex-wrap items-center gap-3" style={d(0.65)}>
            <ButtonLink href={hero.primary.href} className="group">
              {hero.primary.label}
              <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={1.8} />
            </ButtonLink>
            <ButtonLink href={hero.secondary.href} variant="outline" className="group">
              {hero.secondary.label}
              <ArrowUpRight
                aria-hidden
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.8}
              />
            </ButtonLink>
          </div>
        </div>
      }
      visual={
        <div className="enter-fade" style={d(0.3)}>
          <HeroVisual badge={hero.badge} />
        </div>
      }
    />
  );
}
