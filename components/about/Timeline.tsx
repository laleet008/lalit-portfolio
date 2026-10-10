"use client";

import { useId, useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

export type TimelineRole = {
  id: string;
  title: string;
  company: string;
  dates: string;
  summary: string;
  groups: { heading?: string; bullets: string[] }[];
};

/*
 * Expanding experience timeline. The height change uses a grid-template-rows
 * 0fr → 1fr transition: the one place the site animates layout, because an
 * accordion can't open with transforms alone (see DECISIONS.md).
 */
export function Timeline({ roles }: { roles: TimelineRole[] }) {
  const [open, setOpen] = useState<Set<string>>(() => new Set(roles.slice(0, 1).map((r) => r.id)));
  const base = useId();

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <ol className="relative border-l border-line">
      {roles.map((r) => {
        const expanded = open.has(r.id);
        const panel = `${base}-${r.id}`;
        return (
          <li key={r.id} className="relative pb-10 pl-8 last:pb-0 md:pl-12">
            <span
              aria-hidden
              className={cn(
                "absolute -left-[5px] top-2 h-[9px] w-[9px] rounded-full border border-accent transition-colors duration-300",
                expanded ? "bg-accent" : "bg-bg",
              )}
            />
            <p className="font-mono text-meta uppercase text-dim">{r.dates}</p>
            <h3 className="mt-2 font-display text-2xl tracking-tight md:text-3xl">
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={panel}
                onClick={() => toggle(r.id)}
                className="group text-left transition-colors hover:text-accent"
              >
                {r.title}
                <span className="text-dim">, {r.company}</span>
                <span aria-hidden className={cn("ml-3 inline-block font-mono text-base text-accent transition-transform duration-300", expanded && "rotate-45")}>
                  +
                </span>
                <span className="sr-only">{expanded ? site.about.collapse : site.about.expand}</span>
              </button>
            </h3>
            <p className="mt-2 max-w-prose text-dim">{r.summary}</p>
            <div
              id={panel}
              className="grid transition-[grid-template-rows] duration-500 ease-out-expo motion-reduce:transition-none"
              style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden" inert={!expanded}>
                <div className={cn("space-y-6 pt-6 transition-opacity duration-500", expanded ? "opacity-100" : "opacity-0")}>
                  {r.groups.map((g, i) => (
                    <div key={i}>
                      {g.heading && <h4 className="font-mono text-meta uppercase text-accent">{g.heading}</h4>}
                      <ul className="mt-2 space-y-2">
                        {g.bullets.map((b) => (
                          <li key={b} className="relative max-w-prose pl-4 before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2 before:bg-dim">
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
