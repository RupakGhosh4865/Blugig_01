"use client";

import { useEffect } from "react";

/**
 * Re-aligns a `#hash` target after load. Pinned sections only take their full
 * scroll height once hydrated (useScrollChoreography is false on the server),
 * which pushes anchors down after the browser has already jumped to them.
 */
export function HashScroll() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const timer = window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ block: "start" }), 150);
    return () => window.clearTimeout(timer);
  }, []);
  return null;
}
