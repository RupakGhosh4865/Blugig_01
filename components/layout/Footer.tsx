import Link from "next/link";
import { FooterWordmark } from "@/components/layout/FooterWordmark";
import { Logo } from "@/components/layout/Logo";
import { LinkedInIcon } from "@/components/icons/Brand";
import { ButtonLink } from "@/components/ui/Button";
import { footerNav } from "@/content/navigation";
import { services } from "@/content/services";
import { site } from "@/content/site";

const linkCls = "text-sm leading-[1.3] font-medium text-ink transition-colors duration-300 hover:text-blue-700";

/**
 * zig footer: brand-colour gradient with oversized line art, a centred CTA,
 * then a link grid. Blugig: yellow instead of green, ink text, plus the
 * spec's outlined wordmark.
 */
export function Footer() {
  return (
    <footer
      className="relative isolate overflow-hidden text-ink [--logo-mark:var(--color-ink)]"
      style={{
        backgroundImage:
          "radial-gradient(120% 90% at 50% 0%, rgba(255,255,255,0.35), transparent 60%), linear-gradient(248deg, #e9a810 10%, #f5c030 60%, #f7cf55)",
      }}
    >
      <FooterArt />

      {/* CTA strip */}
      <div className="shell flex flex-col items-center gap-10 py-[clamp(6rem,12vw,11.25rem)] text-center">
        <div className="flex max-w-[40rem] flex-col items-center gap-6">
          <h2 className="title-l">Have a complex problem? Let&apos;s simplify it.</h2>
          <p className="text-l text-gray-800">
            Tell us where work gets stuck. We&apos;ll show you what connected looks like.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href="/contact">Book a consultation</ButtonLink>
          <ButtonLink href="/services" variant="outline-ink">
            Explore services
          </ButtonLink>
        </div>
      </div>

      {/* Link grid */}
      <div className="shell grid gap-12 pt-4 pb-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-5">
          <Link href="/" aria-label="Blugig Global — home" className="w-fit">
            <Logo className="text-[1.625rem]" />
          </Link>
          <p className="text-s max-w-[18rem] text-gray-800">
            Consulting for workflow, data and AI — Smartsheet, SafetyCulture, Power BI and the modern data stack.
          </p>
        </div>

        <FooterCol title="Services">
          {services.map((s) => (
            <li key={s.slug}>
              <Link href={`/services/${s.slug}`} className={linkCls}>
                {s.shortName === "SafetyCulture" ? "SafetyCulture" : s.title}
              </Link>
            </li>
          ))}
        </FooterCol>

        <FooterCol title="Company">
          {footerNav.company.map((l) => (
            <li key={l.label}>
              <Link href={l.href} className={linkCls}>
                {l.label}
                {"placeholder" in l && l.placeholder ? <span className="sr-only"> (coming soon)</span> : null}
              </Link>
            </li>
          ))}
        </FooterCol>

        <FooterCol title="Contact">
          <li className="text-sm text-gray-800">{site.email}</li>
          <li className="text-sm text-gray-800">{site.phone}</li>
          <li className="text-sm text-gray-800">{site.address}</li>
        </FooterCol>

        <FooterCol title="Social">
          <li>
            <a
              href={site.social.linkedin}
              className="inline-flex size-10 items-center justify-center rounded-lg bg-ink text-white transition-colors duration-300 hover:bg-white hover:text-ink"
              aria-label="Blugig Global on LinkedIn"
            >
              <LinkedInIcon className="size-5" />
            </a>
          </li>
        </FooterCol>
      </div>

      <div className="shell-wide pb-4">
        <FooterWordmark />
      </div>

      <div className="shell flex flex-col gap-3 border-t border-ink/15 py-6 text-sm text-gray-800 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 {site.legalName}. All rights reserved.</p>
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
      <g stroke="rgba(21,23,26,0.09)" strokeWidth="1.5">
        <rect x="-220" y="160" width="1300" height="230" rx="115" transform="rotate(-18 430 275)" />
        <rect x="520" y="40" width="1300" height="230" rx="115" transform="rotate(-18 1170 155)" />
        <rect x="360" y="620" width="1500" height="260" rx="130" transform="rotate(32 1110 750)" />
        <rect x="-400" y="700" width="1200" height="230" rx="115" transform="rotate(32 200 815)" />
      </g>
    </svg>
  );
}
