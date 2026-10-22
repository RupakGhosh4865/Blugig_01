"use client";

import { ArrowRight, CirclePlay, ShieldCheck } from "lucide-react";
import { useMotionValueEvent, useScroll } from "motion/react";
import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { SplitWords } from "@/components/motion/SplitWords";
import { HeroWheel } from "@/components/sections/home/HeroWheel";
import { ButtonLink } from "@/components/ui/Button";
import { hero } from "@/content/home";
import { useScrollChoreography } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import workatoBadge from "@/public/brand/workato-silver-partner.png";

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

/** Desktop hero height — the same clamp as the grid's h-screen / min-h / max-h. */
const HERO_H = "clamp(54.375rem, 100vh, 56.25rem)";
/** Extra scroll the desktop hero stays pinned for, so the second stage is seen before it leaves. */
const PIN = "60vh";
/** Scroll depth, as a fraction of the viewport, that switches to the integration stage. */
const SWITCH_AT = 0.12;
/** Entrance delay when a stage replaces another, so the outgoing copy fades first. */
const SWAP_LAG = 0.15;

const BUTTON_ICONS = { arrow: ArrowRight, play: CirclePlay } as const;

type Stage = (typeof hero.stages)[number];

/**
 * zig hero (`.hero_container-new`): copy column over a full-bleed animation
 * layer. Desktop: 100vh clamped to 54.375–56.25rem, columns 1fr 1fr (1.4fr 1fr
 * from 1280px). ≤991px: stacked and centred, min-height 75rem, the wheel sits
 * at the bottom under a top fade.
 * Two stages share the layout: a short scroll swaps the inspection copy for the
 * integration copy (and the wheel's cards with it); scrolling back swaps it
 * back. On desktop the hero pins for PIN of scroll so the swap plays in place.
 * Choreography (≤1.4s): chip 0s → words 0.1s (+0.04 each) → sub 0.5s → CTAs 0.65s.
 */
export function Hero() {
  const pinned = useScrollChoreography();
  const { scrollY } = useScroll();
  // runs[i] counts entries into stage i; it keys that stage's copy so every entry replays the rise-in.
  const [{ stage, runs }, setState] = useState({ stage: 0, runs: [0, 0] });

  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > window.innerHeight * SWITCH_AT ? 1 : 0;
    setState((prev) =>
      prev.stage === next ? prev : { stage: next, runs: prev.runs.map((r, i) => (i === next ? r + 1 : r)) },
    );
  });

  return (
    <section className="relative" style={pinned ? { height: `calc(${HERO_H} + ${PIN})` } : undefined}>
      <div
        className={cn("relative isolate overflow-hidden", pinned && "sticky")}
        style={pinned ? { top: `min(0px, calc(100vh - ${HERO_H}))` } : undefined}
      >
        <HeroWheel stage={stage} />
        <div className="shell relative z-10">
          <div className="grid items-center gap-5 min-[992px]:h-screen min-[992px]:max-h-[56.25rem] min-[992px]:min-h-[54.375rem] min-[992px]:grid-cols-2 min-[1280px]:grid-cols-[1.4fr_1fr] max-[991px]:flex max-[991px]:min-h-[75rem] max-[991px]:flex-col max-[991px]:pt-[8.625rem] max-[767px]:gap-15 max-[767px]:pb-[6.875rem] max-[479px]:block max-[479px]:pt-[9.75rem] max-[479px]:pb-0">
            <div className="grid w-full max-w-[46.5rem]">
              {hero.stages.map((copy, i) => (
                <HeroCopy
                  key={`${i}-${runs[i]}`}
                  copy={copy}
                  heading={i === 0 ? "h1" : "h2"}
                  active={i === stage}
                  lag={runs[i] > 0 ? SWAP_LAG : 0}
                />
              ))}
            </div>
          </div>
          {hero.stages.map((copy, i) =>
            copy.apps.length ? (
              <AppChips
                key={i}
                apps={copy.apps}
                visible={i === stage}
                className="absolute right-[var(--gutter)] bottom-8 justify-end max-[991px]:hidden"
              />
            ) : null,
          )}
        </div>
      </div>
    </section>
  );
}

/** One stage's copy. Stages stack in a single grid cell so swapping never shifts the layout. */
function HeroCopy({ copy, heading: Heading, active, lag }: { copy: Stage; heading: "h1" | "h2"; active: boolean; lag: number }) {
  // SplitWords staggers 0.04s per word index, so the lag becomes a word offset.
  const lagWords = Math.round(lag / 0.04);
  const leadCount = copy.titleLead.split(/\s+/).length;
  return (
    <div
      inert={!active}
      className={cn(
        "flex flex-col gap-[2.625rem] transition-[opacity,visibility] duration-300 [grid-area:1/1] max-[991px]:items-center max-[991px]:text-center",
        !active && "invisible opacity-0",
      )}
    >
      <div className="flex flex-col gap-6 max-[991px]:items-center max-[767px]:max-w-[24rem]">
        <div className="enter-fade" style={d(lag)}>
          <Badges badges={copy.badges} />
        </div>
        {/* Lead and accent each own a line (balanced when the accent wraps), as in the mockups. */}
        <Heading className="title-xl">
          <span className="block text-balance">
            <SplitWords text={copy.titleLead} offset={lagWords} />
          </span>{" "}
          <span className="block text-balance">
            <SplitWords text={copy.titleAccent} offset={lagWords + leadCount} wordClassName="text-grad" />
          </span>
        </Heading>
        <p className="enter-fade text-l max-w-[33.75rem]" style={d(0.5 + lag)}>
          {copy.sub}
        </p>
      </div>
      <div
        className="enter-fade flex flex-wrap items-center gap-3 max-[991px]:justify-center max-[479px]:w-full max-[479px]:flex-col max-[479px]:items-stretch"
        style={d(0.65 + lag)}
      >
        <ButtonLink href={copy.primary.href}>
          {copy.primary.label}
          <ButtonIcon name={"icon" in copy.primary ? copy.primary.icon : undefined} />
        </ButtonLink>
        <ButtonLink href={copy.secondary.href} variant="outline">
          {copy.secondary.label}
          <ButtonIcon name={"icon" in copy.secondary ? copy.secondary.icon : undefined} />
        </ButtonLink>
      </div>
      {copy.apps.length ? (
        <div className="enter-fade" style={d(0.8 + lag)}>
          <AppChips apps={copy.apps} className="justify-center min-[992px]:hidden" />
        </div>
      ) : null}
    </div>
  );
}

function ButtonIcon({ name }: { name?: keyof typeof BUTTON_ICONS }) {
  if (!name) return null;
  const Icon = BUTTON_ICONS[name];
  return <Icon aria-hidden className="size-5 shrink-0" strokeWidth={1.8} />;
}

/** Partner credentials as small cards (Workato shows its badge). */
function Badges({ badges }: { badges: Stage["badges"] }) {
  return (
    <ul className="flex flex-wrap gap-3 max-[991px]:justify-center">
      {badges.map((badge) => (
        <li
          key={badge.name}
          className="flex items-center gap-3 rounded-2xl bg-white py-2.5 pr-5 pl-3 shadow-[0_14px_30px_-18px_rgba(6,69,148,0.28)]"
        >
          {badge.kind === "workato" ? (
            <Image src={workatoBadge} alt="" width={44} height={44} className="size-11" />
          ) : (
            <span className="flex size-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
              <ShieldCheck aria-hidden className="size-6" strokeWidth={1.8} />
            </span>
          )}
          <span className="flex flex-col text-left">
            <span className="text-base leading-[1.2] font-semibold text-ink">{badge.name}</span>
            <span className="text-sm leading-[1.3] text-gray-600">{badge.line}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Systems the integration stage connects to (names only — no third-party logos). */
function AppChips({ apps, visible = true, className }: { apps: readonly string[]; visible?: boolean; className?: string }) {
  return (
    <ul
      aria-label="Connects with"
      className={cn(
        "flex flex-wrap gap-2.5 transition-[opacity,translate,visibility] duration-500",
        visible ? "delay-500" : "invisible translate-y-3 opacity-0",
        className,
      )}
    >
      {apps.map((app, i) => (
        <li
          key={app}
          className={cn(
            "rounded-xl bg-white px-4 py-2.5 text-sm leading-[1.3] font-medium tracking-[-0.02em] shadow-[0_10px_24px_-16px_rgba(6,69,148,0.3)]",
            i === apps.length - 1 ? "text-gray-600" : "text-ink",
          )}
        >
          {app}
        </li>
      ))}
    </ul>
  );
}
