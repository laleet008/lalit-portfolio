"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

type Label = keyof typeof site.cursor | null;
const INTERACTIVE = "a, button, [role='button'], [data-cursor]";

/**
 * A dot that tracks the pointer exactly and a ring that follows with lag,
 * tinted by the live accent. Over interactive elements the ring grows and
 * shows a label from `data-cursor`. Writes transforms straight to the DOM
 * from one rAF loop, so moving the mouse never re-renders React.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<Label>(null);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let raf = 0;

    const loop = () => {
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      if (dot.current) dot.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      target.x = e.clientX;
      target.y = e.clientY;
      setVisible(true);
    };
    const onOver = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>(INTERACTIVE);
      setActive(Boolean(el));
      const key = el?.dataset.cursor as Label | undefined;
      setLabel(key && key in site.cursor ? key : null);
    };
    const onLeave = () => setVisible(false);

    document.documentElement.classList.add("has-cursor");
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, []);

  return (
    <div aria-hidden className={cn("pointer-events-none fixed inset-0 z-[80] transition-opacity duration-300 print:hidden", visible ? "opacity-100" : "opacity-0")}>
      <div ref={dot} className="absolute left-0 top-0">
        <span className="absolute -left-[3px] -top-[3px] h-1.5 w-1.5 rounded-full bg-accent" />
      </div>
      <div ref={ring} className="absolute left-0 top-0">
        <span
          className={cn(
            "absolute flex items-center justify-center rounded-full border border-accent font-mono text-[0.625rem] uppercase tracking-[0.08em] text-accent transition-[transform,background-color] duration-300 ease-out-expo",
            "-left-5 -top-5 h-10 w-10",
            active ? (label ? "scale-[1.9] bg-bg/70 backdrop-blur-sm" : "scale-150") : "scale-100",
          )}
        >
          <span className={cn("scale-[0.55] transition-opacity duration-200", label ? "opacity-100" : "opacity-0")}>
            {label ? site.cursor[label] : ""}
          </span>
        </span>
      </div>
    </div>
  );
}
