import { Mail, MapPin, MessageSquare, Phone, Send } from "lucide-react";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { ContactForm } from "@/app/(site)/contact/ContactForm";
import { CalendlyEmbed } from "@/app/(site)/contact/CalendlyEmbed";
import { SplitWords } from "@/components/motion/SplitWords";
import { HeroRays } from "@/components/sections/home/HeroArt";
import { Chip } from "@/components/ui/Chip";
import { contactDetails, site } from "@/content/site";
import { breadcrumbJsonLd, JsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact Avantra | Book a Mitti Rollout Consultation",
  description: `Talk to Avantra about your Mitti rollout: a new implementation, improving an existing setup, or Workato integrations. We reply within ${site.replyTime}.`,
  path: "/contact",
});

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

const CONTACT_ICONS = { email: Mail, phone: Phone, address: MapPin } as const;

const nextSteps = [
  { title: `We reply within ${site.replyTime}`, body: "A real person reads every message." },
  { title: "Discovery conversation", body: "We talk through your processes, priority use cases and goals." },
  { title: "A practical plan", body: "An agreed scope and rollout roadmap for your first step." },
];

export default function ContactPage() {
  const details = contactDetails();

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
              <SplitWords text="Let's talk about" /> <SplitWords text="your Mitti rollout." offset={3} wordClassName="text-grad" />
            </h1>
            <p className="enter-fade text-l max-w-[30rem]" style={d(0.5)}>
              Tell us about your operations and what you want to improve. We&apos;ll help you find the right starting point.
            </p>
          </div>

          <div className="enter-fade flex flex-col gap-6" style={d(0.7)}>
            <p className="eyebrow text-gray-600">What happens next</p>
            <ol className="flex flex-col">
              {nextSteps.map((s, i) => (
                <li key={s.title} className="flex gap-5 border-b border-gray-200 py-5 first:pt-0 last:border-b-0">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sky-500 font-mono text-sm">
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
          {site.calendlyUrl ? <CalendlyEmbed url={site.calendlyUrl} /> : null}

          <div className="relative rounded-[1.5rem] border border-white bg-white/80 p-6 shadow-[0_40px_80px_-40px_rgba(4,28,66,0.35)] backdrop-blur-xl sm:p-10">
            <div className="mb-8 flex items-start gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-800">
                <Send aria-hidden className="size-5" strokeWidth={1.8} />
              </span>
              <div className="flex flex-col gap-1">
                <h2 className="title-s">Prefer to write? Send us a message</h2>
                <p className="text-s text-gray-600">
                  Tell us about your sites and what you want to improve. We reply within {site.replyTime}.
                </p>
              </div>
            </div>
            <ContactForm />
            {details.length > 0 ? (
              // Email and address on the left, the phone numbers together on the right.
              <div className="mt-8 grid gap-x-6 gap-y-4 border-t border-gray-200 pt-6 sm:grid-cols-2">
                {[details.filter((c) => c.kind !== "phone"), details.filter((c) => c.kind === "phone")].map((group, i) => (
                  <ul key={i} className="flex flex-col gap-4">
                    {group.map((c) => {
                      const Glyph = CONTACT_ICONS[c.kind];
                      return (
                        <li key={c.value} className="flex items-center gap-3 text-base">
                          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sky-800">
                            <Glyph aria-hidden className="size-4" strokeWidth={1.7} />
                          </span>
                          {c.href ? (
                            <a href={c.href} className="break-all transition-colors duration-300 hover:text-blue-700">
                              {c.value}
                            </a>
                          ) : (
                            c.value
                          )}
                        </li>
                      );
                    })}
                  </ul>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
    </section>
  );
}
