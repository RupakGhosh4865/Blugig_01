import { Fragment } from "react";
import { mittiStrip } from "@/content/home";

/** Platform strip under the hero (mockup): "Mitti (by SafetyCulture) | Implementation / Enablement / Ongoing support". */
export function MittiStrip() {
  return (
    <section aria-label="Platform" className="border-y border-gray-200 bg-white text-ink">
      <div className="shell flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-10 lg:py-7">
        <p className="flex items-baseline gap-2">
          <span className="text-[1.75rem] leading-none font-semibold tracking-[-0.04em] text-ink">{mittiStrip.product}</span>
          <span className="text-base text-gray-600">{mittiStrip.maker}</span>
        </p>
        <ul className="flex flex-wrap items-center gap-x-3 gap-y-2 text-base text-gray-700 sm:border-l sm:border-gray-200 sm:pl-10">
          {mittiStrip.pillars.map((p, i) => (
            <Fragment key={p}>
              {i > 0 ? (
                <li aria-hidden className="text-gray-300">
                  /
                </li>
              ) : null}
              <li>{p}</li>
            </Fragment>
          ))}
        </ul>
      </div>
    </section>
  );
}
