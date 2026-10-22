"use client";

import { useState } from "react";
import { ParticleField } from "@/components/three/ParticleField";
import type { ShapeName } from "@/lib/three/shapes";
import { cn } from "@/lib/utils";

const shapes: ShapeName[] = ["globe", "grid", "shield", "bars", "stream", "migrate", "wave", "scatter"];

/** Morph one field through every shape to verify the engine (BUILD_SPEC phase 3). */
export function ShapeLab() {
  const [shape, setShape] = useState<ShapeName>("globe");
  const [dark, setDark] = useState(false);
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        {shapes.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setShape(s)}
            className={cn("rounded-full border px-4 py-2 text-sm", s === shape ? "border-ink bg-ink text-white" : "border-gray-300")}
          >
            {s}
          </button>
        ))}
        <button type="button" onClick={() => setDark((d) => !d)} className="rounded-full border border-blue-600 px-4 py-2 text-sm text-blue-600">
          {dark ? "Light bg" : "Dark bg"}
        </button>
      </div>
      <div className={cn("relative aspect-[16/10] overflow-hidden rounded-[1.5rem]", dark ? "bg-navy" : "bg-white")}>
        <ParticleField
          key={dark ? "dark" : "light"}
          shape="globe"
          morphTo={shape === "globe" ? null : shape}
          blending={dark ? "additive" : "normal"}
          colorA={dark ? "#0a80fb" : "#006de0"}
          colorB={dark ? "#7fd6fc" : "#041c42"}
          className="absolute inset-0"
        />
      </div>
    </div>
  );
}
