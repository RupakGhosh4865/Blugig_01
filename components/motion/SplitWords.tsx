import { Fragment, type CSSProperties } from "react";

/**
 * Words rise from 110% inside overflow masks (BUILD_SPEC `<SplitText>`).
 * Pure CSS (see .split-word in globals.css) so it starts at first paint.
 * Words stay real text nodes, so screen readers read the sentence normally.
 */
export function SplitWords({
  text,
  offset = 0,
  wordClassName,
}: {
  text: string;
  offset?: number;
  wordClassName?: string;
}) {
  const words = text.split(/\s+/).filter(Boolean);
  return (
    <>
      {words.map((w, i) => (
        <Fragment key={`${w}-${i}`}>
          <span className="split-word">
            <span className={wordClassName} style={{ "--i": offset + i } as CSSProperties}>
              {w}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}
