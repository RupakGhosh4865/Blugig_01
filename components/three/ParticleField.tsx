"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { ParticlePoster } from "@/components/three/ParticlePoster";
import { detectTier, type RenderTier } from "@/lib/device";
import type { ShapeName } from "@/lib/three/shapes";
import { cn } from "@/lib/utils";

/** three + R3F + shaders live in their own chunk, never in the initial bundle. */
const ParticleCanvas = dynamic(() => import("@/components/three/ParticleCanvas"), { ssr: false });

type Props = {
  shape: ShapeName;
  morphTo?: ShapeName | null;
  /** Near colour (mixed by depth into colorB). */
  colorA?: string;
  colorB?: string;
  sparkle?: string;
  blending?: "additive" | "normal";
  /** Multiplier on tier particle counts (high ≈ 8000, low ≈ 2500). */
  density?: number;
  pointSize?: number;
  opacity?: number;
  cameraZ?: number;
  spin?: number;
  interactive?: boolean;
  className?: string;
  posterClassName?: string;
};

/**
 * CanvasGate (BUILD_SPEC §6.1): picks a tier on the client, mounts after first
 * paint (idle callback) once the container is near the viewport, pauses when
 * off-screen, and fades the canvas in over a static poster (no layout shift).
 */
export function ParticleField({
  shape,
  morphTo = null,
  colorA = "#003fa9",
  colorB = "#72a6fa",
  sparkle = "#72a6fa",
  blending = "normal",
  density = 1,
  pointSize = 3.2,
  opacity = 1,
  cameraZ = 3.4,
  spin = 0.06,
  interactive = true,
  className,
  posterClassName,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [tier, setTier] = useState<RenderTier | null>(null);
  const [near, setNear] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let decided = false;
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const io = new IntersectionObserver(
      ([entry]) => {
        setNear(entry.isIntersecting);
        if (entry.isIntersecting && !decided) {
          decided = true;
          const run = () => setTier(detectTier());
          if ("requestIdleCallback" in window) idleId = window.requestIdleCallback(run, { timeout: 2000 });
          else timeoutId = setTimeout(run, 1200);
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, []);

  const live = tier === "low" || tier === "high";
  const count = Math.round((tier === "high" ? 8000 : 2500) * density);

  return (
    <div ref={ref} aria-hidden className={cn("relative", className)}>
      <ParticlePoster
        shape={shape}
        color={colorA}
        className={cn("transition-opacity duration-700", ready ? "opacity-0" : "opacity-100", posterClassName)}
      />
      {live ? (
        <div className="absolute inset-0 transition-opacity duration-[800ms]" style={{ opacity: ready ? 1 : 0 }}>
          <ParticleCanvas
            shape={shape}
            morphTo={morphTo}
            colorA={colorA}
            colorB={colorB}
            sparkle={sparkle}
            blending={blending}
            count={count}
            dpr={tier === "high" ? [1, 1.75] : [1, 1.25]}
            interactive={interactive && tier === "high"}
            active={near}
            pointSize={pointSize}
            opacity={opacity}
            cameraZ={cameraZ}
            spin={spin}
            onReady={() => setReady(true)}
          />
        </div>
      ) : null}
    </div>
  );
}
