import type { ReactNode } from "react";

/** RevealObserver sets `data-inview` once; globals.css choreographs the SVG from there. */
export function DiagramFrame({ children }: { children: ReactNode }) {
  return (
    <div className="dg" data-observe="">
      {children}
    </div>
  );
}
