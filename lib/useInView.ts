"use client";

import { useEffect, useState, type RefObject } from "react";

type Options = { rootMargin?: string; threshold?: number; once?: boolean };

/** IntersectionObserver as a boolean. With `once`, it latches true. */
export function useInView(ref: RefObject<Element | null>, { rootMargin = "0px", threshold = 0, once = false }: Options = {}): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && once) io.disconnect();
      },
      { rootMargin, threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin, threshold, once]);

  return inView;
}
