"use client";

import { useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useReducedMotionSafe } from "@/lib/hooks";
import { cn } from "@/lib/utils";

type Line = { kind: string; text: string };

/**
 * Types an illustrative agent run line by line when in view (BUILD_SPEC §9 S5).
 * Reduced motion shows the final state. The full transcript is always in the
 * DOM for assistive tech; the typed copy is aria-hidden.
 */
export function AgentConsole({ lines }: { lines: Line[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotionSafe();
  const [typed, setTyped] = useState<{ line: number; chars: number }>({ line: 0, chars: 0 });

  useEffect(() => {
    if (!inView || reduce) return;
    let line = 0;
    let chars = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      if (line >= lines.length) return;
      chars += 2;
      if (chars >= lines[line].text.length) {
        setTyped({ line: line + 1, chars: 0 });
        line += 1;
        chars = 0;
        timer = setTimeout(tick, 420);
        return;
      }
      setTyped({ line, chars });
      timer = setTimeout(tick, 22);
    };
    timer = setTimeout(tick, 300);
    return () => clearTimeout(timer);
  }, [inView, reduce, lines]);

  const done = reduce || typed.line >= lines.length;

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-[1.5rem] border border-white/12 bg-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl"
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3.5">
        <span className="size-2.5 rounded-full bg-white/20" />
        <span className="size-2.5 rounded-full bg-white/20" />
        <span className="size-2.5 rounded-full bg-gold-500" />
        <span className="eyebrow ml-3 text-blue-200">agent console · illustrative</span>
      </div>
      <div className="min-h-[15rem] px-5 py-5 font-mono text-[0.8125rem] leading-[1.9] sm:text-sm">
        <ol className="sr-only">
          {lines.map((l) => (
            <li key={l.text}>{l.text}</li>
          ))}
        </ol>
        <div aria-hidden>
          {lines.map((l, i) => {
            const visible = done || i < typed.line || i === typed.line;
            if (!visible) return null;
            const text = done || i < typed.line ? l.text : l.text.slice(0, typed.chars);
            const isCurrent = !done && i === typed.line;
            return (
              <p
                key={l.text}
                className={cn(
                  l.kind === "cmd" && "text-white",
                  l.kind === "ok" && "text-blue-100",
                  l.kind === "send" && "text-gold-400",
                )}
              >
                {text}
                {isCurrent ? <span className="ml-0.5 inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] animate-caret bg-gold-400" /> : null}
              </p>
            );
          })}
          {done ? <span className="inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] animate-caret bg-gold-400" /> : null}
        </div>
      </div>
    </div>
  );
}
