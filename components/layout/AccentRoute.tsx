"use client";

import { useEffect } from "react";
import { claimPageAccent, releasePageAccent, type AccentPair } from "@/lib/accent";

/** Route-driven takeover: a case study owns the page accent while mounted. */
export function AccentRoute({ accent, accentOnLight }: AccentPair) {
  useEffect(() => {
    const token = claimPageAccent({ accent, accentOnLight });
    return () => releasePageAccent(token);
  }, [accent, accentOnLight]);
  return null;
}
