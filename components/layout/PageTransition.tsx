"use client";

import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

/*
 * Which navigations get the wipe:
 * - not the first page load (the loading screen and hero own that moment);
 * - not back/forward (popstate), which should land instantly;
 * - only once per navigation, although templates are nested (app/ and
 *   app/work/): an inner template skips if its parent is already wiping.
 * The decision is pure during render, because Suspense can discard and
 * re-run a render; the last committed path is only updated in a mount effect.
 */
let committedPath: string | null = null;
let poppedAt = Number.NEGATIVE_INFINITY;
if (typeof window !== "undefined") {
  /* Capture phase, so this runs before the router's own popstate listener. */
  window.addEventListener(
    "popstate",
    () => {
      poppedAt = performance.now();
    },
    { capture: true },
  );
}

const WipingFor = createContext<string | null>(null);

/** A themed wipe on route change (CSS keyframes, ~550ms): the cover lifts with an accent edge as the page rises in. */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const parentWiping = useContext(WipingFor);
  const [animate] = useState(
    () =>
      typeof window !== "undefined" &&
      committedPath !== null &&
      committedPath !== pathname &&
      parentWiping !== pathname &&
      performance.now() - poppedAt > 1000,
  );

  /*
   * Record the path this instance mounted for, not later ones: a parent
   * template that merely re-renders on a nested navigation must not mark the
   * new path committed before the child template mounts and decides.
   */
  const [mountedFor] = useState(pathname);
  useEffect(() => {
    committedPath = mountedFor;
  }, [mountedFor]);

  if (!animate) return <WipingFor.Provider value={parentWiping}>{children}</WipingFor.Provider>;

  return (
    <WipingFor.Provider value={pathname}>
      <div aria-hidden className="route-wipe print:hidden">
        <span className="absolute inset-x-0 bottom-0 h-[2px] bg-accent" />
      </div>
      <div className="route-enter">{children}</div>
    </WipingFor.Provider>
  );
}
