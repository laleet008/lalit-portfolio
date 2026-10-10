"use client";

import { useEffect, useRef } from "react";

const FLOOR = 0.5;

/**
 * A single paragraph that resolves word by word as it scrolls through the
 * viewport. Unread words rest at 50% opacity, which still passes WCAG AA for
 * large text in both themes. Opacity is written straight to each span from a
 * passive scroll listener, so scrolling never re-renders React.
 */
export function IntroLine({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const p = ref.current;
    if (!p || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const spans = Array.from(p.querySelectorAll<HTMLSpanElement>("[data-word]"));
    let raf = 0;

    const update = () => {
      raf = 0;
      const r = p.getBoundingClientRect();
      const start = innerHeight * 0.85;
      const end = innerHeight * 0.5;
      const progress = Math.min(1, Math.max(0, (start - r.top) / (start - end + r.height)));
      spans.forEach((s, i) => {
        const local = Math.min(1, Math.max(0, progress * spans.length - i));
        s.style.opacity = String(FLOOR + (1 - FLOOR) * local);
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <p ref={ref} className="max-w-[24ch] font-display text-[clamp(1.75rem,4.6vw,3.75rem)] leading-[1.08] tracking-tight">
      {words.map((w, i) => (
        <span key={i} data-word="">
          {w}{" "}
        </span>
      ))}
    </p>
  );
}
