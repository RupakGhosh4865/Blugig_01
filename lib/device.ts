export type RenderTier = "off" | "low" | "high";

type NavigatorWithConnection = Navigator & {
  connection?: { saveData?: boolean };
};

/** BUILD_SPEC §6.1 — decide how much 3D this device gets. Client only. */
export function detectTier(): RenderTier {
  if (typeof window === "undefined") return "off";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "off";

  const nav = navigator as NavigatorWithConnection;
  if (nav.connection?.saveData) return "off";

  try {
    const canvas = document.createElement("canvas");
    if (!canvas.getContext("webgl2")) return "off";
  } catch {
    return "off";
  }

  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const narrow = window.matchMedia("(max-width: 1023px)").matches;
  const cores = nav.hardwareConcurrency ?? 4;

  if (coarse && cores <= 4) return "off";
  if (coarse || narrow) return "low";
  return "high";
}
