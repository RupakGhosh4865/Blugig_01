"use client";

import { useTransform, type MotionValue } from "motion/react";
import { useSyncExternalStore } from "react";
import { progressBetween } from "@/lib/utils";

/**
 * Clamped linear map of a scroll MotionValue. Uses a function transformer on
 * purpose: Motion only hardware-accelerates array-form transforms (native
 * ScrollTimeline), which proved unreliable inside our conditionally-mounted
 * sticky sections. This keeps the choreography on Motion's JS frame loop.
 */
export function useRange(value: MotionValue<number>, input: [number, number], output: [number, number]) {
  return useTransform(value, (v) => output[0] + (output[1] - output[0]) * progressBetween(v, input[0], input[1]));
}

const subscribers = new Map<string, (callback: () => void) => () => void>();

function subscribeMedia(query: string) {
  let subscribe = subscribers.get(query);
  if (!subscribe) {
    subscribe = (callback: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    };
    subscribers.set(query, subscribe);
  }
  return subscribe;
}

/** SSR-safe media query. Server (and first hydration pass) returns `fallback`. */
export function useMediaQuery(query: string, fallback = false) {
  return useSyncExternalStore(
    subscribeMedia(query),
    () => window.matchMedia(query).matches,
    () => fallback,
  );
}

export const DESKTOP_QUERY = "(min-width: 1024px)";
export const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";
export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/** Hydration-safe reduced-motion flag (false during SSR + hydration pass). */
export function useReducedMotionSafe() {
  return useMediaQuery(REDUCED_MOTION_QUERY);
}

/** True when pinned / scroll-scrubbed choreography should run. */
export function useScrollChoreography() {
  const desktop = useMediaQuery(DESKTOP_QUERY);
  const reduced = useMediaQuery(REDUCED_MOTION_QUERY);
  return desktop && !reduced;
}
