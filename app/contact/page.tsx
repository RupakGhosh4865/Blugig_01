import { Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { CalendlyEmbed } from "@/app/contact/CalendlyEmbed";
import { ContactForm } from "@/app/contact/ContactForm";
import { SplitWords } from "@/components/motion/SplitWords";
import { HeroRays } from "@/components/sections/home/HeroArt";
import { Chip } from "@/components/ui/Chip";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to Avantra Technologies about your Mitti rollout — new implementations, improving an existing setup, or supporting your next phase.",
  alternates: { canonical: "/contact" },
};

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

const nextSteps = [
  { title: `We reply within ${site.replyTime}`, body: "A real person reads every message." },
  { title: "Discovery conversation", body: "We talk through your processes, priority use cases and goals." },
  { title: "A practical plan", body: "An agreed scope and rollout roadmap for your first step." },
];

export default function ContactPage() {
  const details = [
    { icon: Mail, value: site.email, href: site.email ? `mailto:${site.email}` : undefined },
    { icon: Phone, value: site.phone, href: site.phone ? `tel:${site.phone.replace(/[^+\d]/g, "")}` : undefined },
    { icon: MapPin, value: site.address, href: undefined },
  ].filter((x) => x.value);

  return (
    <section className="relative isolate overflow-hidden">
      <HeroRays className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-70" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 -z-10 size-[44rem] rounded-full opacity-70 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(29,88,196,0.14), transparent 65%)" }}
      />
      <div className="shell grid gap-14 pt-32 pb-[clamp(4.5rem,8vw,6.25rem)] lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-6">
            <Chip className="enter-fade">Contact</Chip>
            <h1 className="title-xl">
              <SplitWords text="Let's talk about" /> <SplitWords text="your Mitti rollout." offset={3} wordClassName="text-grad" />
            </h1>
            <p className="enter-fade text-l max-w-[30rem] text-gray-700" style={d(0.5)}>
              Tell us about your operations and what you want to improve. We&apos;ll help you find the right starting
              point.
            </p>
          </div>

          {details.length > 0 ? (
            <ul className="enter-fade flex flex-col gap-3 text-base" style={d(0.6)}>
              {details.map(({ icon: Glyph, value, href }) => (
                <li key={value} className="flex items-center gap-3">
                  <Glyph aria-hidden className="size-5 text-blue-600" strokeWidth={1.5} />
                  {href ? (
                    <a href={href} className="transition-colors hover:text-blue-600">
                      {value}
                    </a>
                  ) : (
                    value
                  )}
                </li>
              ))}
            </ul>
          ) : null}

          <div className="enter-fade flex flex-col gap-6" style={d(0.7)}>
            <p className="text-[0.8125rem] font-semibold tracking-[0.14em] text-gray-600 uppercase">What happens next</p>
            <ol className="flex flex-col">
              {nextSteps.map((s, i) => (
                <li key={s.title} className="flex gap-5 border-b border-gray-200 py-5 first:pt-0 last:border-b-0">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-600 font-mono text-sm text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-1">
                    <span className="title-xs">{s.title}</span>
                    <span className="text-s text-gray-600">{s.body}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="enter-fade flex flex-col gap-6" style={d(0.4)}>
          <div className="relative rounded-[1.5rem] border border-white bg-white/85 p-6 shadow-[0_40px_80px_-40px_rgba(17,29,51,0.35)] backdrop-blur-xl sm:p-10">
            <h2 className="title-s mb-8">Talk to our team</h2>
            <ContactForm />
          </div>
          {site.calendlyUrl ? <CalendlyEmbed url={site.calendlyUrl} /> : null}
        </div>
      </div>
    </section>
  );
}
