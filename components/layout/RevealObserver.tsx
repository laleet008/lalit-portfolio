"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/*
 * One IntersectionObserver for the whole site. Anything marked
 * `data-observe` gets `data-inview` the first time its top passes 85% of the
 * viewport; CSS in globals.css does the rest. Reveals therefore ship no
 * per-component JavaScript, and new nodes (filtered lists, new routes) are
 * picked up by a MutationObserver.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.setAttribute("data-inview", "");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -15% 0px", threshold: 0 },
    );
    const scan = () => document.querySelectorAll("[data-observe]:not([data-inview])").forEach((el) => io.observe(el));
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
