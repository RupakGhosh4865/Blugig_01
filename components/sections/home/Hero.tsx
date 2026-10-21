import { Sparkles } from "lucide-react";
import type { CSSProperties } from "react";
import { SplitWords } from "@/components/motion/SplitWords";
import { HeroWheel } from "@/components/sections/home/HeroWheel";
import { ButtonLink } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { hero } from "@/content/home";

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

/**
 * zig hero (`.hero_container-new`): copy column over a full-bleed animation
 * layer. Desktop: 100vh clamped to 54.375–56.25rem, columns 1fr 1fr (1.4fr 1fr
 * from 1280px). ≤991px: stacked and centred, min-height 75rem, the wheel sits
 * at the bottom under a top fade.
 * Choreography (≤1.4s): chip 0s → words 0.1s (+0.04 each) → sub 0.5s → CTAs 0.65s.
 */
export function Hero() {
  const leadCount = hero.titleLead.split(/\s+/).length;
  return (
    <section className="relative isolate overflow-hidden">
      <HeroWheel />
      <div className="shell relative z-10">
        <div className="grid items-center gap-5 min-[992px]:h-screen min-[992px]:max-h-[56.25rem] min-[992px]:min-h-[54.375rem] min-[992px]:grid-cols-2 min-[1280px]:grid-cols-[1.4fr_1fr] max-[991px]:flex max-[991px]:min-h-[75rem] max-[991px]:flex-col max-[991px]:pt-[8.625rem] max-[767px]:gap-15 max-[767px]:pb-[6.875rem] max-[479px]:block max-[479px]:pt-[9.75rem] max-[479px]:pb-0">
          <div className="flex w-full max-w-[46.5rem] flex-col gap-[2.625rem] max-[991px]:items-center max-[991px]:text-center">
            <div className="flex flex-col gap-6 max-[991px]:items-center max-[767px]:max-w-[24rem]">
              <Chip icon={Sparkles} className="enter-fade">
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
            <div
              className="enter-fade flex flex-wrap items-center gap-3 max-[479px]:w-full max-[479px]:flex-col max-[479px]:items-stretch"
              style={d(0.65)}
            >
              <ButtonLink href={hero.primary.href}>{hero.primary.label}</ButtonLink>
              <ButtonLink href={hero.secondary.href} variant="outline">
                {hero.secondary.label}
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
