"use client";

import { useEffect, useRef, type ReactNode } from "react";

const PULL = 6;
const LERP = 0.18;

/** Pulls its child up to 6px toward the cursor. Fine pointers only, never with reduced motion. */
export function MagneticButton({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;

    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    let raf = 0;

    const tick = () => {
      pos.x += (target.x - pos.x) * LERP;
      pos.y += (target.y - pos.y) * LERP;
      el.style.transform = `translate3d(${pos.x.toFixed(2)}px, ${pos.y.toFixed(2)}px, 0)`;
      const settled = Math.abs(target.x - pos.x) < 0.05 && Math.abs(target.y - pos.y) < 0.05;
      raf = settled ? 0 : requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      target.x = ((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * PULL;
      target.y = ((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * PULL;
      kick();
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
      kick();
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      el.style.transform = "";
    };
  }, []);

  return (
    <div ref={ref} className={className ?? "inline-block"}>
      {children}
    </div>
  );
}
