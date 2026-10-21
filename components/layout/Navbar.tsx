"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import { useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavigationMenu } from "radix-ui";
import { useState } from "react";
import { IconBadge } from "@/components/icons/Icon";
import { Logo } from "@/components/layout/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { ButtonLink } from "@/components/ui/Button";
import { mainNav, primaryCta } from "@/content/navigation";
import { services, supportOptions } from "@/content/services";
import { site } from "@/content/site";
import { solutions } from "@/content/solutions";
import { cn } from "@/lib/utils";

const navlink =
  "text-sm leading-[1.3] font-medium tracking-[-0.02em] whitespace-nowrap text-ink transition-colors duration-300 hover:text-blue-600 data-[active]:text-blue-600";

/**
 * zig navbar: logo left · white pill of links centred · CTA right.
 * The background layer fades in after 200px of scroll and follows the page colour;
 * the logo and CTA swap to their light versions on navy / brand scroll zones.
 */
export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y >= 200;
    setScrolled((prev) => (prev === next ? prev : next));
  });

  const inSection = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-[var(--gutter)]">
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 bg-[var(--page-bg)] transition-[opacity,background-color] duration-300",
          scrolled ? "opacity-100" : "opacity-0",
        )}
      />
      <nav
        aria-label="Main"
        className="relative mx-auto grid h-16 max-w-[85rem] grid-cols-[1fr_auto] items-center gap-4 lg:h-[4.5rem] lg:grid-cols-[1fr_auto_1fr]"
      >
        <Link href="/" aria-label={`${site.name} — home`} className="justify-self-start">
          <Logo eager height={42} className="h-8 w-auto lg:h-10.5" />
        </Link>

        <NavigationMenu.Root delayDuration={120} className="relative hidden lg:block">
          <NavigationMenu.List className="flex h-11 items-center gap-[2.25rem] rounded-full bg-white px-8 shadow-[0_8px_24px_-16px_rgba(17,29,51,0.35)]">
            <NavigationMenu.Item>
              <NavigationMenu.Trigger
                data-active={inSection("/solutions") || undefined}
                className={cn(navlink, "group flex items-center gap-1 data-[state=open]:text-blue-600")}
              >
                Solutions
                <ChevronDown
                  aria-hidden
                  className="size-3.5 transition-transform duration-300 group-data-[state=open]:rotate-180"
                />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="w-[min(56rem,calc(100vw-5rem))] p-3">
                <SolutionsMenu />
              </NavigationMenu.Content>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenu.Trigger
                data-active={inSection("/services") || undefined}
                className={cn(navlink, "group flex items-center gap-1 data-[state=open]:text-blue-600")}
              >
                Services
                <ChevronDown
                  aria-hidden
                  className="size-3.5 transition-transform duration-300 group-data-[state=open]:rotate-180"
                />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="w-[min(56rem,calc(100vw-5rem))] p-3">
                <ServicesMenu />
              </NavigationMenu.Content>
            </NavigationMenu.Item>
            {mainNav.map((item) => (
              <NavigationMenu.Item key={item.href}>
                <NavigationMenu.Link asChild active={inSection(item.href)}>
                  <Link href={item.href} className={navlink}>
                    {item.label}
                  </Link>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            ))}
          </NavigationMenu.List>

          <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3">
            <NavigationMenu.Viewport className="h-[var(--radix-navigation-menu-viewport-height)] w-[var(--radix-navigation-menu-viewport-width)] origin-top overflow-hidden rounded-[1.5rem] bg-white shadow-[0_24px_60px_-12px_rgba(17,29,51,0.25)] transition-[width,height] duration-300 data-[state=closed]:animate-[fade-in_0.15s_reverse] data-[state=open]:animate-[fade-up_0.25s_var(--ease-out-expo)]" />
          </div>
        </NavigationMenu.Root>

        <div className="hidden items-center justify-self-end lg:flex">
          <ButtonLink href={primaryCta.href} variant="zone" size="sm" className="group">
            {primaryCta.label}
            <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={1.8} />
          </ButtonLink>
        </div>

        <MobileMenu />
      </nav>
    </header>
  );
}

function SolutionsMenu() {
  return (
    <div className="grid grid-cols-[1fr_15rem] gap-3">
      <ul className="grid grid-cols-2 gap-1">
        {solutions.map((s) => (
          <li key={s.slug}>
            <NavigationMenu.Link asChild>
              <Link
                href={`/solutions#${s.slug}`}
                className="group flex h-full items-start gap-4 rounded-2xl p-4 transition-colors duration-300 hover:bg-canvas"
              >
                <IconBadge name={s.icon} size="sm" className="group-hover:bg-blue-600 group-hover:text-white" />
                <span className="flex flex-col gap-1">
                  <span className="text-[1.0625rem] leading-tight font-medium text-ink">{s.title}</span>
                  <span className="text-s text-gray-500">{s.body}</span>
                </span>
              </Link>
            </NavigationMenu.Link>
          </li>
        ))}
      </ul>
      <NavigationMenu.Link asChild>
        <Link
          href="/solutions"
          className="group flex flex-col justify-between gap-8 rounded-2xl bg-blue-600 p-5 text-white transition-colors duration-300 hover:bg-blue-700"
        >
          <span className="text-[0.75rem] font-semibold tracking-[0.14em] text-blue-100 uppercase">Solutions with Mitti</span>
          <span className="title-xs">
            Not sure where to start?
            <span className="mt-2 flex items-center gap-1.5 text-base text-blue-100">
              Find your starting point
              <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.8} />
            </span>
          </span>
        </Link>
      </NavigationMenu.Link>
    </div>
  );
}

function ServicesMenu() {
  return (
    <div className="grid grid-cols-[1fr_17rem] gap-3">
      <ul className="grid grid-cols-2 gap-1">
        {services.map((s) => (
          <li key={s.slug}>
            <NavigationMenu.Link asChild>
              <Link
                href={`/services#${s.slug}`}
                className="group flex h-full items-baseline gap-4 rounded-2xl p-4 transition-colors duration-300 hover:bg-canvas"
              >
                <span className="text-mono text-sm text-blue-600">{s.number}</span>
                <span className="flex flex-col gap-1">
                  <span className="text-[1.0625rem] leading-tight font-medium text-ink">{s.title}</span>
                  <span className="text-s text-gray-500">{s.deliverables.join(" · ")}</span>
                </span>
              </Link>
            </NavigationMenu.Link>
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-1 rounded-2xl bg-navy p-3 text-white">
        <p className="px-2 pt-2 pb-1 text-[0.75rem] font-semibold tracking-[0.14em] text-sky-300 uppercase">
          {supportOptions.title.replace(/\.$/, "")}
        </p>
        {supportOptions.items.map((o) => (
          <NavigationMenu.Link asChild key={o.slug}>
            <Link
              href="/services#support"
              className="group flex items-center gap-3 rounded-xl p-2 transition-colors duration-300 hover:bg-white/10"
            >
              <IconBadge name={o.icon} tone="dark" size="sm" className="size-9" />
              <span className="text-[0.9375rem] leading-tight font-medium">{o.title}</span>
            </Link>
          </NavigationMenu.Link>
        ))}
      </div>
    </div>
  );
}
