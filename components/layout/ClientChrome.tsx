"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useLenis } from "@/lib/useLenis";

/**
 * Behaviour that belongs to the whole app rather than a page: smooth scroll,
 * and moving focus to the new page's heading after client-side navigation so
 * screen-reader and keyboard users aren't left on a link that no longer exists.
 */
export function ClientChrome() {
  useLenis();
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const heading = document.querySelector<HTMLElement>("main h1");
    if (!heading) return;
    heading.tabIndex = -1;
    heading.focus({ preventScroll: true });
  }, [pathname]);

  return null;
}
