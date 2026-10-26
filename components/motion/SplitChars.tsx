import { Fragment, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * Letters for a headline that dissolves and re-forms letter by letter (see
 * .split-char in globals.css): the nearest [data-swap] ancestor picks the
 * state, `--c` orders the left-to-right wave. Words never break mid-word.
 * Visual only — render it aria-hidden next to the real text.
 * `gradient` slices one `text-grad` sweep across the letters, so the line keeps
 * a single gradient while each letter animates on its own.
 */
export function SplitChars({ text, offset = 0, gradient }: { text: string; offset?: number; gradient?: boolean }) {
  const words = text.split(/\s+/).filter(Boolean);
  const total = words.join("").length;
  const starts = words.map((_, i) => words.slice(0, i).join("").length);
  return (
    <>
      {words.map((w, wi) => (
        <Fragment key={`${w}-${wi}`}>
          <span className="whitespace-nowrap">
            {Array.from(w).map((ch, ci) => {
              const n = starts[wi] + ci;
              const style = { "--c": offset + n, ...(gradient ? { "--gn": total, "--g": n / Math.max(total - 1, 1) } : null) };
              return (
                <span key={ci} className={cn("split-char", gradient && "text-grad")} style={style as CSSProperties}>
                  {ch}
                </span>
              );
            })}
          </span>
          {wi < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}
