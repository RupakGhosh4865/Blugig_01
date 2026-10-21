import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";

/** zig `.sales-card.is--cta` scaled up into a full-width band. */
export function CtaBand({
  title,
  sub = "Tell us where your rollout stands. A short discovery conversation is enough to map the first step.",
  label = "Talk to our team",
  href = "/contact",
  secondary = { label: "All services", href: "/services" },
}: {
  title: string;
  sub?: string;
  label?: string;
  href?: string;
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="pb-[clamp(4.5rem,8vw,6.25rem)]">
      <div className="shell">
        <Reveal>
          <div className="relative isolate flex flex-col gap-10 overflow-hidden rounded-[1.5rem] bg-blue-600 px-6 py-14 text-white sm:px-12 sm:py-16 lg:flex-row lg:items-end lg:justify-between lg:px-16 lg:py-20">
            <svg aria-hidden className="absolute inset-0 -z-10 h-full w-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1200 400" fill="none">
              <g stroke="rgba(255,255,255,0.12)">
                {[0, 30, 60, 90, 120, 150].map((deg) => (
                  <line key={deg} x1="-200" y1="200" x2="1400" y2="200" transform={`rotate(${deg} 1050 -260)`} />
                ))}
              </g>
            </svg>
            <div className="flex max-w-[38rem] flex-col gap-5">
              <h2 className="title-l">{title}</h2>
              <p className="text-l text-blue-100">{sub}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={href} variant="white">
                {label}
              </ButtonLink>
              <ButtonLink href={secondary.href} variant="outline-light">
                {secondary.label}
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
