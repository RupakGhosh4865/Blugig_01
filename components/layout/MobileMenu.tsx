"use client";

import { X } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { Accordion, Dialog, VisuallyHidden } from "radix-ui";
import { useState } from "react";
import { Logo } from "@/components/layout/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { mainNav, primaryCta } from "@/content/navigation";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { solutions } from "@/content/solutions";
import { easeOut } from "@/lib/motion";

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
};

/**
 * Full-screen overlay (BUILD_SPEC §7.1): blurred background, links stagger in
 * (0.05s), services as an accordion, CTA pinned to the bottom. Radix Dialog
 * provides the focus trap, Esc to close and body scroll lock.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const groups = [
    {
      value: "solutions",
      label: "Solutions",
      all: { label: "All solutions", href: "/solutions" },
      links: solutions.map((s, i) => ({ href: `/solutions#${s.slug}`, number: String(i + 1).padStart(2, "0"), label: s.title })),
    },
    {
      value: "services",
      label: "Services",
      all: { label: "All services", href: "/services" },
      links: services.map((s) => ({ href: `/services#${s.slug}`, number: s.number, label: s.title })),
    },
  ];

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        className="flex size-10 items-center justify-center justify-self-end rounded-full bg-white text-ink lg:hidden"
        aria-label="Open menu"
      >
        <span aria-hidden className="flex w-4 flex-col gap-1.5">
          <span className="h-px w-full bg-current" />
          <span className="h-px w-full bg-current" />
        </span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[70] bg-canvas/80 backdrop-blur-xl data-[state=open]:animate-[fade-in_0.25s_ease-out]" />
        <Dialog.Content
          data-lenis-prevent
          className="fixed inset-0 z-[71] flex flex-col overflow-y-auto px-[var(--gutter)] pb-6 text-ink data-[state=open]:animate-[fade-in_0.25s_ease-out]"
        >
          <VisuallyHidden.Root>
            <Dialog.Title>Menu</Dialog.Title>
            <Dialog.Description>Site navigation</Dialog.Description>
          </VisuallyHidden.Root>
          <div className="flex h-16 shrink-0 items-center justify-between">
            <Link href="/" onClick={close} aria-label={`${site.name} — home`}>
              <Logo variant="onLight" height={28} className="h-7 w-auto" />
            </Link>
            <Dialog.Close
              className="flex size-10 items-center justify-center rounded-full bg-white"
              aria-label="Close menu"
            >
              <X className="size-5" strokeWidth={1.5} />
            </Dialog.Close>
          </div>

          <motion.nav
            aria-label="Mobile"
            className="mt-6 flex flex-1 flex-col"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } } }}
          >
            <Accordion.Root type="single" collapsible>
              {groups.map((g) => (
                <motion.div key={g.value} variants={item}>
                  <Accordion.Item value={g.value} className="border-b border-gray-200">
                    <Accordion.Header>
                      <Accordion.Trigger className="group flex w-full items-center justify-between py-5 title-m">
                        {g.label}
                        <span aria-hidden className="relative size-5">
                          <span className="absolute top-1/2 left-0 h-px w-5 bg-current" />
                          <span className="absolute top-0 left-1/2 h-5 w-px bg-current transition-transform duration-300 group-data-[state=open]:scale-y-0" />
                        </span>
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="accordion-content overflow-hidden">
                      <ul className="flex flex-col gap-1 pb-5">
                        {g.links.map((l) => (
                          <li key={l.href}>
                            <Link href={l.href} onClick={close} className="flex items-baseline gap-3 rounded-xl py-2 text-lg">
                              <span className="text-mono text-sm text-sky-800">{l.number}</span>
                              {l.label}
                            </Link>
                          </li>
                        ))}
                        <li>
                          <Link href={g.all.href} onClick={close} className="block py-2 text-base text-blue-600">
                            {g.all.label} →
                          </Link>
                        </li>
                      </ul>
                    </Accordion.Content>
                  </Accordion.Item>
                </motion.div>
              ))}
            </Accordion.Root>
            {[...mainNav, { label: "Contact", href: "/contact" }].map((l) => (
              <motion.div key={l.href} variants={item} className="border-b border-gray-200">
                <Link href={l.href} onClick={close} className="block py-5 title-m">
                  {l.label}
                </Link>
              </motion.div>
            ))}
          </motion.nav>

          <div className="sticky bottom-0 mt-8 flex flex-col gap-3 bg-transparent pt-4">
            <ButtonLink href={primaryCta.href} onClick={close} className="w-full">
              {primaryCta.label}
            </ButtonLink>
            <ButtonLink href="/services" onClick={close} variant="outline" className="w-full">
              Explore services
            </ButtonLink>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
