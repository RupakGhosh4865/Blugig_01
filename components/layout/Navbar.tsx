"use client";

import { ChevronDown } from "lucide-react";
import { useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavigationMenu } from "radix-ui";
import { useState } from "react";
import { ServiceIcon } from "@/components/icons/ServiceIcon";
import { Logo } from "@/components/layout/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { ButtonLink } from "@/components/ui/Button";
import { mainNav } from "@/content/navigation";
import { services } from "@/content/services";
import { cn } from "@/lib/utils";

const navlink =
  "text-sm leading-[1.3] font-medium tracking-[-0.03em] whitespace-nowrap text-ink transition-colors duration-300 hover:text-gray-400";

/**
 * zig navbar: logo left · white pill of links centred · two pill buttons right.
 * The `.nav_bg` layer fades in after 200px of scroll and follows the page colour.
 */
export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y >= 200;
    setScrolled((prev) => (prev === next ? prev : next));
  });

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
        className="relative mx-auto grid h-16 max-w-[85rem] grid-cols-[1fr_auto] items-center gap-4 lg:grid-cols-[1fr_auto_1fr]"
      >
        <Link
          href="/"
          aria-label="Blugig Global — home"
          className="justify-self-start text-[color:var(--page-fg)] transition-colors duration-300"
        >
          <Logo />
        </Link>

        <NavigationMenu.Root delayDuration={120} className="relative hidden lg:block">
          <NavigationMenu.List className="flex h-10 items-center gap-[2.375rem] rounded-full bg-white px-8">
            <NavigationMenu.Item>
              <NavigationMenu.Trigger
                className={cn(navlink, "group flex items-center gap-1 data-[state=open]:text-blue-600")}
              >
                Services
                <ChevronDown
                  aria-hidden
                  className="size-3.5 transition-transform duration-300 group-data-[state=open]:rotate-180"
                />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="w-[min(60rem,calc(100vw-5rem))] p-3">
                <MegaMenu />
              </NavigationMenu.Content>
            </NavigationMenu.Item>
            {mainNav.map((item) => (
              <NavigationMenu.Item key={item.href}>
                <NavigationMenu.Link asChild active={pathname === item.href}>
                  <Link href={item.href} className={navlink}>
                    {item.label}
                  </Link>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            ))}
            <NavigationMenu.Item>
              <NavigationMenu.Link asChild active={pathname === "/contact"}>
                <Link href="/contact" className={navlink}>
                  Contact
                </Link>
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>

          <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3">
            <NavigationMenu.Viewport className="h-[var(--radix-navigation-menu-viewport-height)] w-[var(--radix-navigation-menu-viewport-width)] origin-top overflow-hidden rounded-[1.5rem] bg-white shadow-[0_24px_60px_-12px_rgba(21,23,26,0.22)] transition-[width,height] duration-300 data-[state=closed]:animate-[fade-in_0.15s_reverse] data-[state=open]:animate-[fade-up_0.25s_var(--ease-out-expo)]" />
          </div>
        </NavigationMenu.Root>

        <div className="hidden items-center gap-3 justify-self-end lg:flex">
          <ButtonLink href="/services" variant="outline-adaptive" size="sm">
            Explore services
          </ButtonLink>
          <ButtonLink href="/contact" size="sm">
            Book a consultation
          </ButtonLink>
        </div>

        <MobileMenu />
      </nav>
    </header>
  );
}

function MegaMenu() {
  return (
    <div className="grid grid-cols-[1fr_15rem] gap-3">
      <ul className="grid grid-cols-3 gap-1">
        {services.map((s) => (
          <li key={s.slug}>
            <NavigationMenu.Link asChild>
              <Link
                href={`/services/${s.slug}`}
                className="group flex h-full flex-col gap-3 rounded-2xl p-4 transition-colors duration-300 hover:bg-base"
              >
                <span className="flex items-center justify-between">
                  <span className="text-mono text-sm text-gold-800">{s.number}</span>
                  <ServiceIcon id={s.icon} className="size-7 text-blue-600" />
                </span>
                <span className="text-[1.0625rem] leading-tight font-medium text-ink">{s.title}</span>
                <span className="text-s text-gray-500">{s.cardLine}</span>
              </Link>
            </NavigationMenu.Link>
          </li>
        ))}
      </ul>
      <NavigationMenu.Link asChild>
        <Link
          href="/contact"
          className="group flex flex-col justify-between rounded-2xl bg-gold-500 p-5 text-ink transition-colors duration-300 hover:bg-gold-400"
        >
          <span className="eyebrow text-gray-800">Free assessment</span>
          <span className="title-xs">
            Not sure where to start?
            <span className="mt-2 block text-base text-gray-800">
              Book a free assessment{" "}
              <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </span>
          </span>
        </Link>
      </NavigationMenu.Link>
    </div>
  );
}
