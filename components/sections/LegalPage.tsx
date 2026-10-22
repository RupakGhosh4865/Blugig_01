import { FileText } from "lucide-react";
import { Chip } from "@/components/ui/Chip";

/** A paragraph, or a bulleted list when given an array. */
type Block = string | readonly string[];
export type LegalSection = { h: string; body: readonly Block[] };

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Long-form typography page for /privacy and /terms: numbered sections with an on-page index. */
export function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro?: readonly string[];
  sections: readonly LegalSection[];
}) {
  return (
    <section className="pt-32 pb-[clamp(4.5rem,8vw,6.25rem)]">
      <div className="shell grid gap-12 lg:grid-cols-[1fr_2fr]">
        <div className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
          <Chip icon={FileText}>Legal</Chip>
          <h1 className="title-l">{title}</h1>
          <p className="text-s text-gray-500">Last updated: {updated}</p>
          <nav aria-label="On this page" className="hidden lg:block">
            <ol className="flex flex-col gap-1.5 border-l border-gray-200 pl-4 text-sm">
              {sections.map((s, i) => (
                <li key={s.h}>
                  <a href={`#${slug(s.h)}`} className="text-gray-600 transition-colors duration-200 hover:text-blue-700">
                    {i + 1}. {s.h}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
        <article className="prose-legal max-w-[46rem] rounded-[1.5rem] bg-white p-6 sm:p-10">
          {intro?.length ? (
            <section>
              {intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </section>
          ) : null}
          {sections.map((s, i) => (
            <section key={s.h} id={slug(s.h)} className="scroll-mt-28">
              <h2>
                {i + 1}. {s.h}
              </h2>
              {s.body.map((b, j) =>
                typeof b === "string" ? (
                  <p key={j}>{b}</p>
                ) : (
                  <ul key={j}>
                    {b.map((li) => (
                      <li key={li}>{li}</li>
                    ))}
                  </ul>
                ),
              )}
            </section>
          ))}
        </article>
      </div>
    </section>
  );
}
