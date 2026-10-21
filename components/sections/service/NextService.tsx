"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ParticleField } from "@/components/three/ParticleField";
import { FINE_POINTER_QUERY, useMediaQuery } from "@/lib/hooks";
import type { ShapeName } from "@/lib/three/shapes";

/**
 * Full-width "NEXT" link to the next page. On desktop hover the current
 * particle shape starts morphing toward the next page's shape (BUILD_SPEC §6.3).
 */
export function NextService({
  href,
  eyebrow,
  title,
  line,
  shape,
  nextShape,
}: {
  href: string;
  eyebrow: string;
  title: string;
  line: string;
  shape: ShapeName;
  nextShape: ShapeName;
}) {
  const [hover, setHover] = useState(false);
  const fine = useMediaQuery(FINE_POINTER_QUERY);

  return (
    <section className="border-t border-gray-200">
      <Link
        href={href}
        className="group block"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
      >
        <div className="shell grid items-center gap-8 py-16 lg:grid-cols-[1fr_22rem] lg:py-20">
          <div className="flex flex-col gap-4">
            <span className="eyebrow text-gray-500">Next · {eyebrow}</span>
            <span className="flex items-center gap-6 text-[clamp(2.75rem,7vw,6.5rem)] leading-[1] font-medium tracking-[-0.045em]">
              <span className="transition-colors duration-300 group-hover:text-blue-700">{title}</span>
              <ArrowRight
                aria-hidden
                className="hidden size-[0.6em] shrink-0 transition-transform duration-500 group-hover:translate-x-3 sm:block"
                strokeWidth={1.2}
              />
            </span>
            <span className="text-l text-gray-600">{line}</span>
          </div>
          <ParticleField
            shape={shape}
            morphTo={fine && hover ? nextShape : null}
            colorA={hover ? "#003fa9" : "#2563c9"}
            colorB="#111d33"
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
