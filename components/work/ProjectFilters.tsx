"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { flushSync } from "react-dom";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

export type FilterItem = { slug: string; group: string; node: ReactNode };
export type FilterOption = { value: string; label: string; count: number };

/**
 * Filter chips over pre-rendered cards. Cards reflow with the native View
 * Transitions API (each card has its own view-transition-name), so the layout
 * animation costs no JavaScript; browsers without it, and reduced motion,
 * simply update in place.
 */
export function ProjectFilters({ items, options }: { items: FilterItem[]; options: FilterOption[] }) {
  const [active, setActive] = useState("all");
  const visible = active === "all" ? items : items.filter((i) => i.group === active);
  const all: FilterOption = { value: "all", label: site.work.all, count: items.length };

  const select = (value: string) => {
    const update = () => flushSync(() => setActive(value));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduced) update();
    else document.startViewTransition(update);
  };

  return (
    <>
      <div role="group" aria-label={site.work.filterLabel} className="flex flex-wrap gap-2">
        {[all, ...options].map((o) => (
          <button
            key={o.value}
            type="button"
            aria-pressed={active === o.value}
            onClick={() => select(o.value)}
            className={cn(
              "border px-3.5 py-2 font-mono text-meta uppercase transition-colors duration-200",
              active === o.value ? "border-fg bg-fg text-bg" : "border-line text-dim hover:border-accent hover:text-accent",
            )}
          >
            {o.label} <span className="opacity-60">{o.count}</span>
          </button>
        ))}
      </div>
      <p role="status" className="sr-only">
        {visible.length} {site.work.count}
      </p>
      <ul className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item) => (
          <li key={item.slug} className="work-card" style={{ viewTransitionName: `card-${item.slug}` } as CSSProperties}>
            {item.node}
          </li>
        ))}
      </ul>
    </>
  );
}
