"use client";

import { useEffect } from "react";
import type Lenis from "lenis";

let instance: Lenis | null = null;

/** The live Lenis instance, or null (reduced motion, or not mounted yet). */
export function getLenis(): Lenis | null {
  return instance;
}

/**
 * Smooth scroll, loaded lazily so it never blocks first paint. Skipped for
 * reduced motion and touch-first devices, which keep native scrolling.
 */
export function useLenis(): void {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) return;

    let cancelled = false;
    import("lenis").then(({ default: LenisCtor }) => {
      if (cancelled) return;
      instance = new LenisCtor({ autoRaf: true, anchors: true, lerp: 0.12 });
    });

    return () => {
      cancelled = true;
      instance?.destroy();
      instance = null;
    };
  }, []);
}
