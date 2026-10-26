import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { LinkedInIcon } from "@/components/icons/Brand";
import { FooterWordmark } from "@/components/layout/FooterWordmark";
import { Logo } from "@/components/layout/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { footerNav, primaryCta } from "@/content/navigation";
import { services } from "@/content/services";
import { contactDetails, site } from "@/content/site";
import { solutions } from "@/content/solutions";
import partnerBadge from "@/public/brand/workato-silver-partner.png";

const linkCls = "text-sm leading-[1.3] font-medium text-ink transition-colors duration-300 hover:text-blue-700";

/**
 * zig footer: brand-colour gradient with oversized line art, a centred CTA,
 * then a link grid. Avantra: light logo-blue gradient, ink text, plus the
 * outlined wordmark.
 */
const CONTACT_ICONS = { email: Mail, phone: Phone, address: MapPin } as const;

export function Footer() {
  const contact = contactDetails();

  return (
    <footer
      className="relative isolate overflow-hidden text-ink"
      style={{
        backgroundImage:
          "radial-gradient(120% 90% at 50% 0%, rgba(255,255,255,0.35), transparent 60%), linear-gradient(248deg, #0b9de3 10%, #29b9fa 60%, #7fd6fc)",
      }}
    >
      <FooterArt />

      {/* CTA strip */}
      <div className="shell flex flex-col items-center gap-10 py-[clamp(6rem,12vw,11.25rem)] text-center">
        <div className="flex max-w-[40rem] flex-col items-center gap-6">
          <h2 className="title-l">Make your next rollout your best rollout.</h2>
          <p className="text-l text-gray-800">Tell us about your operations and what you want to improve.</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href={primaryCta.href}>{primaryCta.label}</ButtonLink>
          <ButtonLink href="/services" variant="outline-ink">
            Explore services
          </ButtonLink>
        </div>
      </div>

      {/* Link grid */}
      <div className="shell grid gap-12 pt-4 pb-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1.1fr]">
        <div className="flex flex-col gap-5">
          <Link href="/" aria-label={`${site.name} — home`} className="w-fit">
            <Logo variant="onBrand" height={40} className="h-10 w-auto" />
          </Link>
          <p className="-mt-2.5 text-[0.5625rem] leading-none font-medium tracking-[0.2em] whitespace-nowrap text-slate uppercase">{site.slogan}</p>
          <p className="text-s max-w-[18rem] text-gray-800">
            {site.tagline} — implementation, enablement and ongoing support for Mitti by SafetyCulture.
          </p>
          {contact.length > 0 ? (
            <ul className="flex flex-col gap-2.5">
              {contact.map((c) => {
                const Glyph = CONTACT_ICONS[c.kind];
                return (
                  <li key={c.kind} className="flex items-center gap-2.5 text-sm text-gray-800">
                    <Glyph aria-hidden className="size-4 shrink-0 text-ink" strokeWidth={1.6} />
                    {c.href ? (
                      <a href={c.href} className="transition-colors duration-300 hover:text-ink">
                        {c.value}
                      </a>
                    ) : (
                      c.value
                    )}
                  </li>
                );
              })}
            </ul>
          ) : null}
          {site.social.linkedin ? (
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex size-10 items-center justify-center rounded-lg bg-ink text-white transition-colors duration-300 hover:bg-white hover:text-ink"
              aria-label={`${site.name} on LinkedIn (opens in a new tab)`}
            >
              <LinkedInIcon className="size-5" />
            </a>
          ) : null}
        </div>

        <FooterCol title="Solutions">
          {solutions.map((s) => (
            <li key={s.slug}>
              <Link href={`/solutions#${s.slug}`} className={linkCls}>
                {s.title}
              </Link>
            </li>
          ))}
        </FooterCol>

        <FooterCol title="Services">
          {services.map((s) => (
            <li key={s.slug}>
              <Link href={`/services#${s.slug}`} className={linkCls}>
                {s.title}
              </Link>
            </li>
          ))}
        </FooterCol>

        <FooterCol title="Company">
          {footerNav.company.map((l) => (
            <li key={l.label}>
              <Link href={l.href} className={linkCls}>
                {l.label}
              </Link>
            </li>
          ))}
        </FooterCol>

        <FooterCol title="Partner ecosystem">
          <li>
            <Image
              src={partnerBadge}
              alt={site.partner.name}
              width={112}
              height={112}
              className="size-28 drop-shadow-[0_12px_24px_rgba(4,28,66,0.18)]"
            />
          </li>
        </FooterCol>
      </div>

      <div className="shell-wide pb-4">
        <FooterWordmark />
      </div>

      <div className="shell flex flex-col gap-3 border-t border-ink/15 py-6 text-sm text-gray-800 sm:flex-row sm:items-center sm:justify-between">
        <p>{site.copyright}</p>
        <ul className="flex gap-6">
          {footerNav.legal.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className={linkCls}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="eyebrow text-gray-800">{title}</p>
      <ul className="flex flex-col gap-3">{children}</ul>
    </div>
  );
}

/** Oversized rounded line art (zig footer Vector.svg treatment). */
function FooterArt() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1440 1100"
      fill="none"
    >
      <g stroke="rgba(11,26,54,0.09)" strokeWidth="1.5">
        <rect x="-220" y="160" width="1300" height="230" rx="115" transform="rotate(-18 430 275)" />
        <rect x="520" y="40" width="1300" height="230" rx="115" transform="rotate(-18 1170 155)" />
        <rect x="360" y="620" width="1500" height="260" rx="130" transform="rotate(32 1110 750)" />
        <rect x="-400" y="700" width="1200" height="230" rx="115" transform="rotate(32 200 815)" />
      </g>
    </svg>
  );
}
