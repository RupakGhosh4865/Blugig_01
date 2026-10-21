import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";

/**
 * Closing navy band used at the end of every page (mockup layout): title and
 * optional sub on the left, bright CTA on the right, the logo's rising-arrow
 * geometry repeated as line art behind.
 */
export function CtaBand({ title, sub, label, href }: { title: string; sub?: string; label: string; href: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-navy text-white">
      <CtaArt />
      <div className="shell flex flex-col gap-10 py-[clamp(4rem,7vw,6rem)] lg:flex-row lg:items-center lg:justify-between">
        <Reveal className="flex max-w-[44rem] flex-col gap-4">
          <h2 className="title-l">{title}</h2>
          {sub ? <p className="text-l text-gray-300">{sub}</p> : null}
        </Reveal>
        <Reveal delay={0.1} className="shrink-0">
          <ButtonLink href={href} variant="accent" className="group">
            {label}
            <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={1.8} />
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}

/** Nested chevrons echoing the logo's "A" and rising arrow, fading out to the left. */
function CtaArt() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-y-0 right-0 -z-10 h-full w-[min(48rem,90%)] [mask-image:linear-gradient(90deg,transparent,black_55%)]"
      viewBox="0 0 640 320"
      preserveAspectRatio="xMaxYMid slice"
      fill="none"
    >
      <path d="M470 -40 700 380H240Z" fill="rgba(0,63,169,0.35)" />
      <g stroke="rgba(140,200,255,0.22)" strokeWidth="1.2">
        <path d="M470 20 640 330" />
        <path d="M470 20 300 330" />
        <path d="M470 120 560 290 470 250 380 290Z" />
        <path d="M470 120V250" />
      </g>
      <path d="M600 210 640 290 600 272 560 290Z" fill="rgba(140,200,255,0.18)" />
    </svg>
  );
}
