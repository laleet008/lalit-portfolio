"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Renders children at a fixed native size and scales them (transform only) to fill the box. */
export function ScaledFrame({
  viewport,
  children,
  className,
}: {
  viewport: { width: number; height: number };
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / viewport.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, [viewport.width]);

  return (
    <div ref={ref} className={cn("absolute inset-0 overflow-hidden", className)}>
      <div
        style={{
          width: viewport.width,
          height: viewport.height,
          transform: `scale(${scale})`,
          transformOrigin: "0 0",
        }}
      >
        {children}
      </div>
    </div>
  );
}
