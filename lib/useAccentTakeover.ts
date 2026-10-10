"use client";

import { useEffect, type RefObject } from "react";
import { claimPageAccent, releasePageAccent, type AccentPair } from "./accent";
import { useInView } from "./useInView";

/** While `ref` crosses the middle of the viewport, the page takes on its accent. */
export function useAccentTakeover(ref: RefObject<HTMLElement | null>, pair: AccentPair): void {
  const inView = useInView(ref, { rootMargin: "-45% 0px -45% 0px" });
  const { accent, accentOnLight } = pair;

  useEffect(() => {
    if (!inView) return;
    const token = claimPageAccent({ accent, accentOnLight });
    return () => releasePageAccent(token);
  }, [inView, accent, accentOnLight]);
}
