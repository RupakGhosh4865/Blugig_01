import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { LinkedInIcon } from "@/components/icons/Brand";
import { FooterWordmark } from "@/components/layout/FooterWordmark";
import { Logo } from "@/components/layout/Logo";
import { footerNav } from "@/content/navigation";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { solutions } from "@/content/solutions";

const linkCls = "text-sm leading-[1.3] text-gray-600 transition-colors duration-300 hover:text-blue-600";

/**
 * Light footer: brand block, link columns (mockup order), partner ecosystem,
 * then the oversized outlined wordmark and the legal row. Each page ends with
 * its own CTA band, so the footer carries no CTA of its own.
 */
export function Footer() {
  const contact = [site.email, site.phone, site.address].filter(Boolean);

  return (
    <footer className="relative isolate overflow-hidden border-t border-gray-200 bg-white text-ink">
      <div className="shell grid gap-12 pt-16 pb-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_0.8fr_0.8fr_1.3fr] lg:gap-8 lg:pt-20">
        <div className="flex flex-col gap-5 sm:col-span-2 lg:col-span-1">
          <Link href="/" aria-label={`${site.name} — home`} className="w-fit">
            <Logo variant="onLight" height={40} className="h-9 w-auto lg:h-10" />
          </Link>
          <p className="text-s max-w-[18rem] text-gray-600">{site.tagline}</p>
          {contact.length > 0 || site.social.linkedin ? (
            <ul className="flex flex-col gap-2 text-sm text-gray-600">
              {contact.map((c) => (
                <li key={c}>{c}</li>
              ))}
              {site.social.linkedin ? (
                <li className="pt-2">
                  <a
                    href={site.social.linkedin}
                    className="inline-flex size-10 items-center justify-center rounded-lg bg-navy text-white transition-colors duration-300 hover:bg-blue-600"
                    aria-label={`${site.name} on LinkedIn`}
                  >
                    <LinkedInIcon className="size-5" />
                  </a>
                </li>
              ) : null}
            </ul>
          ) : null}
        </div>

        <FooterCol title="Solutions" href="/solutions">
          {solutions.map((s) => (
            <li key={s.slug}>
              <Link href={`/solutions#${s.slug}`} className={linkCls}>
                {s.title}
              </Link>
            </li>
          ))}
        </FooterCol>

        <FooterCol title="Services" href="/services">
          {services.map((s) => (
            <li key={s.slug}>
              <Link href={`/services#${s.slug}`} className={linkCls}>
                {s.title}
              </Link>
            </li>
          ))}
        </FooterCol>

        <FooterCol title="How we work" href="/how-we-work">
          {footerNav.howWeWork.map((l) => (
            <li key={l.label}>
              <Link href={l.href} className={linkCls}>
                {l.label}
              </Link>
            </li>
          ))}
        </FooterCol>

        <FooterCol title="About" href="/about">
          {footerNav.company.map((l) => (
            <li key={l.label}>
              <Link href={l.href} className={linkCls}>
                {l.label}
              </Link>
            </li>
          ))}
        </FooterCol>

        <div className="flex flex-col gap-4 lg:border-l lg:border-gray-200 lg:pl-8">
          <p className="text-sm font-semibold text-ink">Partner ecosystem</p>
          <a
            href={site.partner.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-1.5 rounded-2xl border border-gray-200 p-4 transition-colors duration-300 hover:border-blue-200 hover:bg-blue-50"
          >
            <span className="flex items-center justify-between gap-3 text-base font-semibold text-ink">
              {site.partner.name}
              <ArrowUpRight
                aria-hidden
                className="size-4 text-blue-600 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.8}
              />
            </span>
            <span className="text-s text-gray-500">{site.partner.descriptor}</span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
          <p className="text-s text-gray-500">Working together to put Mitti to work for operations teams.</p>
        </div>
      </div>

      <div className="shell-wide pb-4">
        <FooterWordmark />
      </div>

      <div className="shell flex flex-col gap-3 border-t border-gray-200 py-6 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © 2026 {site.legalName}. All rights reserved.
        </p>
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

function FooterCol({ title, href, children }: { title: string; href: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <Link href={href} className="w-fit text-sm font-semibold text-ink transition-colors duration-300 hover:text-blue-600">
        {title}
      </Link>
      <ul className="flex flex-col gap-3">{children}</ul>
    </div>
  );
}
