"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * zig.ai switches `body` background as sections cross the viewport centre
 * (gray-50 → black → green → gray-50). Here any element with
 * `data-bg-zone="navy" | "brand"` claims the page colour while it spans the
 * centre line; CSS in globals.css maps the zone to --page-bg / --page-fg.
 */
export function PageBackground() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;
    let current = "";

    const update = () => {
      frame = 0;
      const mid = window.innerHeight * 0.5;
      let next = "base";
      document.querySelectorAll<HTMLElement>("[data-bg-zone]").forEach((zone) => {
        const r = zone.getBoundingClientRect();
        if (r.top <= mid && r.bottom > mid) next = zone.dataset.bgZone ?? "base";
      });
      if (next !== current) {
        current = next;
        if (next === "base") delete root.dataset.zone;
        else root.dataset.zone = next;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      delete root.dataset.zone;
    };
  }, [pathname]);

  return null;
}
