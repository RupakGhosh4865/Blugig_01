import { ScrollWords } from "@/components/motion/ScrollWords";
import { statement } from "@/content/home";

/** zig animated statement: centred title-l, words scrub from 0.2 → 1 opacity. */
export function Statement() {
  return (
    <section className="section-y">
      <div className="shell flex justify-center">
        <ScrollWords
          className="title-l max-w-[52rem] text-center"
          segments={[{ text: statement.accent, className: "text-blue-600" }, { text: statement.rest }]}
        />
      </div>
    </section>
  );
}
