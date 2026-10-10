import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Above-the-fold entrance in pure CSS (see .hero-rise in globals.css): starts
 * at first paint, needs no hydration, so it never delays LCP. Use `Reveal`
 * for anything that enters on scroll. `lcp` drops the fade for the element
 * most likely to be the page's largest paint.
 */
export function Rise({ delay = 0, lcp = false, className, children }: { delay?: number; lcp?: boolean; className?: string; children: ReactNode }) {
  return (
    <div className={cn("hero-rise", lcp && "hero-rise--lcp", className)} style={{ "--rise": `${delay}s` } as CSSProperties}>
      {children}
    </div>
  );
}
