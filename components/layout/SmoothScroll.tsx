"use client";

import { ReactLenis } from "lenis/react";
import { FINE_POINTER_QUERY, REDUCED_MOTION_QUERY, useMediaQuery } from "@/lib/hooks";

/**
 * Lenis smoothing like zig.ai (lerp ~0.1). Disabled for reduced motion and
 * touch devices — those keep native scroll (BUILD_SPEC §5).
 */
export function SmoothScroll() {
  const reduce = useMediaQuery(REDUCED_MOTION_QUERY);
  const fine = useMediaQuery(FINE_POINTER_QUERY);
  if (reduce || !fine) return null;
  return <ReactLenis root options={{ lerp: 0.1, anchors: { offset: -80 } }} />;
}
