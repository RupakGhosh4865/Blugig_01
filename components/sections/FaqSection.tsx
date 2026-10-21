import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { FaqAccordion } from "@/components/ui/Accordion";
import { Chip } from "@/components/ui/Chip";
import { faqJsonLd, JsonLd } from "@/lib/seo";

/** zig FAQ: title column left (+ talk-to-us line), accordion right. Emits FAQPage JSON-LD. */
export function FaqSection({
  items,
  title = "Questions, answered.",
  className,
}: {
  items: { q: string; a: string }[];
  title?: string;
  className?: string;
}) {
  return (
    <section className={className ?? "py-[clamp(5rem,8vw,6.25rem)]"}>
      <div className="shell grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-10">
        <Reveal className="flex max-w-[24rem] flex-col gap-5">
          <Chip>FAQ</Chip>
          <h2 className="title-l">{title}</h2>
          <p className="text-l text-gray-700">
            Something we didn&apos;t cover?{" "}
            <Link
              href="/contact"
              className="text-blue-600 underline decoration-blue-200 decoration-2 underline-offset-4 transition-colors hover:decoration-blue-600"
            >
              Talk to our team.
            </Link>
          </p>
        </Reveal>
        <FaqAccordion items={items} />
      </div>
      <JsonLd data={faqJsonLd(items)} />
    </section>
  );
}
