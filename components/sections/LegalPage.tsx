import { FileText } from "lucide-react";
import { Chip } from "@/components/ui/Chip";

/** Long-form typography page for /privacy and /terms. */
export function LegalPage({ title, updated, sections }: { title: string; updated: string; sections: { h: string; p: string[] }[] }) {
  return (
    <section className="pt-32 pb-[clamp(4.5rem,8vw,6.25rem)]">
      <div className="shell grid gap-12 lg:grid-cols-[1fr_2fr]">
        <div className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
          <Chip icon={FileText}>Legal</Chip>
          <h1 className="title-l">{title}</h1>
          <p className="text-s text-gray-500">Last updated: {updated}</p>
        </div>
        <article className="prose-legal max-w-[46rem] rounded-[1.5rem] bg-white p-6 sm:p-10">
          {sections.map((s) => (
            <div key={s.h}>
              <h2 className="first:mt-0">{s.h}</h2>
              {s.p.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          ))}
        </article>
      </div>
    </section>
  );
}
