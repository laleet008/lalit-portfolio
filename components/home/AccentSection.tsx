"use client";

import { useRef, type ReactNode } from "react";
import { accentStyle, type AccentPair } from "@/lib/accent";
import { useAccentTakeover } from "@/lib/useAccentTakeover";

/** A section themed by its project accent that also lends that accent to the page while in view. */
export function AccentSection({
  pair,
  id,
  className,
  children,
  labelledBy,
}: {
  pair: AccentPair;
  id?: string;
  className?: string;
  children: ReactNode;
  labelledBy?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  useAccentTakeover(ref, pair);
  return (
    <section ref={ref} id={id} aria-labelledby={labelledBy} className={className} style={accentStyle(pair)}>
      {children}
    </section>
  );
}
