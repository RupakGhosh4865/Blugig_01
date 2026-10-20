"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ParticleField } from "@/components/three/ParticleField";
import type { Service } from "@/content/services";
import { shade } from "@/lib/color";
import { FINE_POINTER_QUERY, useMediaQuery } from "@/lib/hooks";

/**
 * Full-width "NEXT" link. On desktop hover the current particle shape starts
 * morphing toward the next service's shape (BUILD_SPEC §6.3).
 */
export function NextService({ current, next }: { current: Service; next: Service }) {
  const [hover, setHover] = useState(false);
  const fine = useMediaQuery(FINE_POINTER_QUERY);

  return (
    <section className="border-t border-gray-200">
      <Link
        href={`/services/${next.slug}`}
        className="group block"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
      >
        <div className="shell grid items-center gap-8 py-16 lg:grid-cols-[1fr_22rem] lg:py-20">
          <div className="flex flex-col gap-4">
            <span className="eyebrow text-gray-500">Next · {next.number}</span>
            <span className="flex items-center gap-6 text-[clamp(2.75rem,7vw,6.5rem)] leading-[1] font-medium tracking-[-0.045em]">
              <span className="transition-colors duration-300 group-hover:text-blue-700">{next.title}</span>
              <ArrowRight
                aria-hidden
                className="hidden size-[0.6em] shrink-0 transition-transform duration-500 group-hover:translate-x-3 sm:block"
                strokeWidth={1.2}
              />
            </span>
            <span className="text-l text-gray-600">{next.cardLine}</span>
          </div>
          <ParticleField
            shape={current.visual}
            morphTo={fine && hover ? next.visual : null}
            colorA={shade(hover ? next.accent : current.accent, 0.22)}
            colorB="#13213d"
            density={0.45}
            pointSize={3}
            interactive={false}
            className="hidden aspect-square w-full lg:block"
          />
        </div>
      </Link>
    </section>
  );
}
