"use client";

import { ChevronDown } from "lucide-react";
import { useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavigationMenu } from "radix-ui";
import { useState } from "react";
import { DrawIcon, type IconName } from "@/components/icons/DrawIcon";
import { Logo } from "@/components/layout/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { ButtonLink } from "@/components/ui/Button";
import { integrationsMenu, mainNav, primaryCta } from "@/content/navigation";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { solutions } from "@/content/solutions";
import { cn } from "@/lib/utils";

const navlink =
  "text-sm leading-[1.3] font-medium tracking-[-0.03em] whitespace-nowrap text-ink transition-colors duration-300 hover:text-gray-400";

/**
 * zig navbar: logo left · white pill of links centred · two pill buttons right.
 * The `.nav_bg` layer fades in after 200px of scroll and follows the page colour.
 * Solutions / Services open their mega menu on hover and go to their page on click.
 */
export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  // Open mega menu (its trigger href, or ""). Closed on every route change, since the nav persists across pages.
  const [menu, setMenu] = useState("");
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setMenu("");
  }

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
        <Link href="/" aria-label={`${site.name} — home`} className="justify-self-start">
          <Logo eager height={32} className="h-7 w-auto lg:h-8" />
        </Link>

        <NavigationMenu.Root value={menu} onValueChange={setMenu} delayDuration={120} className="relative hidden lg:block">
          <NavigationMenu.List className="flex h-10 items-center gap-6 rounded-full bg-white px-7 xl:gap-[2.375rem] xl:px-8">
            <MenuItem label="Solutions" href="/solutions" open={menu === "/solutions"} onOpen={setMenu}>
              <MegaMenu
                items={solutions
                  .filter((s) => !s.integration)
                  .map((s, i) => ({
                    key: s.slug,
                    href: `/solutions#${s.slug}`,
                    number: String(i + 1).padStart(2, "0"),
                    icon: s.icon,
                    title: s.title,
                    line: s.body,
                  }))}
                aside={{ eyebrow: "Solutions with Mitti", title: "Which process should we improve first?", cta: "Discuss your use case", href: "/contact" }}
              />
            </MenuItem>
            <MenuItem label="Services" href="/services" open={menu === "/services"} onOpen={setMenu}>
              <MegaMenu
                items={[
                  ...services.map((s) => ({
                    key: s.slug,
                    href: `/services#${s.slug}`,
                    number: s.number,
                    icon: s.icon,
                    title: s.title,
                    line: s.deliverables.join(" · "),
                  })),
                  { key: "integrations", href: integrationsMenu.href, number: "", icon: "integrate", title: integrationsMenu.title, line: integrationsMenu.line, wide: true },
                ]}
                aside={{ eyebrow: "Mitti implementation", title: "Not sure where to start?", cta: "Talk to our team", href: "/contact" }}
              />
            </MenuItem>
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
            <NavigationMenu.Viewport className="h-[var(--radix-navigation-menu-viewport-height)] w-[var(--radix-navigation-menu-viewport-width)] origin-top overflow-hidden rounded-[1.5rem] bg-white shadow-[0_24px_60px_-12px_rgba(11,26,54,0.22)] transition-[width,height] duration-300 data-[state=closed]:animate-[fade-in_0.15s_reverse] data-[state=open]:animate-[fade-up_0.25s_var(--ease-out-expo)]" />
          </div>
        </NavigationMenu.Root>

        <div className="hidden items-center gap-3 justify-self-end lg:flex">
          <ButtonLink href={primaryCta.href} size="sm">
            {primaryCta.label}
          </ButtonLink>
        </div>

        <MobileMenu />
      </nav>
    </header>
  );
}

/**
 * Hover opens the mega menu; click navigates to `href` (Next's Link handles the
 * click first, so Radix skips its toggle). ArrowDown opens it from the keyboard.
 */
function MenuItem({
  label,
  href,
  open,
  onOpen,
  children,
}: {
  label: string;
  href: string;
  open: boolean;
  onOpen: (value: string) => void;
  children: React.ReactNode;
}) {
  return (
    <NavigationMenu.Item value={href}>
      <NavigationMenu.Trigger asChild>
        <Link
          href={href}
          className={cn(navlink, "group flex items-center gap-1 data-[state=open]:text-blue-600")}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown" && !open) {
              e.preventDefault();
              onOpen(href);
            }
          }}
        >
          {label}
          <ChevronDown aria-hidden className="size-3.5 transition-transform duration-300 group-data-[state=open]:rotate-180" />
        </Link>
      </NavigationMenu.Trigger>
      <NavigationMenu.Content className="w-[min(60rem,calc(100vw-5rem))] p-3">{children}</NavigationMenu.Content>
    </NavigationMenu.Item>
  );
}

type MenuEntry = { key: string; href: string; number: string; icon: IconName; title: string; line: string; wide?: boolean };

function MegaMenu({
  items,
  aside,
}: {
  items: MenuEntry[];
  aside: { eyebrow: string; title: string; cta: string; href: string };
}) {
  return (
    <div className="grid grid-cols-[1fr_15rem] gap-3">
      <ul className="grid grid-cols-3 gap-1">
        {items.map((s) => (
          <li key={s.key} className={cn(s.wide && "col-span-3")}>
            <NavigationMenu.Link asChild>
              {s.wide ? (
                <Link
                  href={s.href}
                  className="group flex items-center gap-4 rounded-2xl bg-canvas p-4 transition-colors duration-300 hover:bg-sky-50"
                >
                  {/* the featured row's mark sits on a logo-blue → sky tile */}
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(135deg,var(--color-blue-600),var(--color-sky-500))] text-white shadow-[0_10px_22px_-10px_rgba(0,109,224,0.7)] transition-transform duration-300 group-hover:scale-105">
                    <DrawIcon id={s.icon} className="size-6" />
                  </span>
                  <span className="flex flex-col gap-1">
                    <span className="text-[1.0625rem] leading-tight font-medium text-ink">{s.title}</span>
                    <span className="text-s text-gray-500">{s.line}</span>
                  </span>
                  <span aria-hidden className="ml-auto text-blue-600 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              ) : (
                <Link
                  href={s.href}
                  className="group flex h-full flex-col gap-3 rounded-2xl p-4 transition-colors duration-300 hover:bg-canvas"
                >
                  <span className="flex items-center justify-between">
                    <span className="text-mono text-sm text-sky-800">{s.number}</span>
                    <DrawIcon id={s.icon} className="size-7 text-blue-600" />
                  </span>
                  <span className="text-[1.0625rem] leading-tight font-medium text-ink">{s.title}</span>
                  <span className="text-s text-gray-500">{s.line}</span>
                </Link>
              )}
            </NavigationMenu.Link>
          </li>
        ))}
      </ul>
      <NavigationMenu.Link asChild>
        <Link
          href={aside.href}
          className="group flex flex-col justify-between rounded-2xl bg-sky-500 p-5 text-ink transition-colors duration-300 hover:bg-sky-400"
        >
          <span className="eyebrow text-gray-800">{aside.eyebrow}</span>
          <span className="title-xs">
            {aside.title}
            <span className="mt-2 block text-base text-gray-800">
              {aside.cta}{" "}
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
