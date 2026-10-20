import { Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { ContactForm } from "@/app/contact/ContactForm";
import { CalendlyEmbed } from "@/app/contact/CalendlyEmbed";
import { SplitWords } from "@/components/motion/SplitWords";
import { HeroRays } from "@/components/sections/home/HeroArt";
import { Chip } from "@/components/ui/Chip";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a consultation with Blugig Global — workflow, data and AI consulting for Smartsheet, SafetyCulture, Power BI and more.",
  alternates: { canonical: "/contact" },
};

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

const nextSteps = [
  { title: `We reply within ${site.replyTime}`, body: "A real person reads every message." },
  { title: "30-minute discovery call", body: "We map your processes, data and the outcome you need." },
  { title: "Proposal & plan", body: "A clear scope, timeline and first step — no obligation." },
];

export default function ContactPage() {
  return (
    <section className="relative isolate overflow-hidden">
      <HeroRays className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-70" />
      <div className="shell grid gap-14 pt-32 pb-[clamp(4.5rem,8vw,6.25rem)] lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-6">
            <Chip icon={MessageSquare} className="enter-fade">
              Contact
            </Chip>
            <h1 className="title-xl">
              <SplitWords text="Let's talk about" /> <SplitWords text="your project." offset={3} wordClassName="text-grad" />
            </h1>
            <p className="enter-fade text-l max-w-[30rem]" style={d(0.5)}>
              Tell us what you&apos;re working on. We&apos;ll come back with ideas, not a sales script.
            </p>
          </div>

          <ul className="enter-fade flex flex-col gap-3 text-base" style={d(0.6)}>
            <li className="flex items-center gap-3">
              <Mail aria-hidden className="size-5 text-gold-800" strokeWidth={1.5} />
              {site.email}
            </li>
            <li className="flex items-center gap-3">
              <Phone aria-hidden className="size-5 text-gold-800" strokeWidth={1.5} />
              {site.phone}
            </li>
            <li className="flex items-center gap-3">
              <MapPin aria-hidden className="size-5 text-gold-800" strokeWidth={1.5} />
              {site.address}
            </li>
          </ul>

          <div className="enter-fade flex flex-col gap-6" style={d(0.7)}>
            <p className="eyebrow text-gray-600">What happens next</p>
            <ol className="flex flex-col">
              {nextSteps.map((s, i) => (
                <li key={s.title} className="flex gap-5 border-b border-gray-200 py-5 first:pt-0 last:border-b-0">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gold-500 font-mono text-sm">
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
          <div className="relative rounded-[1.5rem] border border-white bg-white/80 p-6 shadow-[0_40px_80px_-40px_rgba(19,33,61,0.35)] backdrop-blur-xl sm:p-10">
            <h2 className="title-s mb-8">Book a consultation</h2>
            <ContactForm />
          </div>
          {site.calendlyUrl ? <CalendlyEmbed url={site.calendlyUrl} /> : null}
        </div>
      </div>
    </section>
  );
}
