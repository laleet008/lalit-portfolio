"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

const ORDER = ["dark", "light", "system"] as const;
type Choice = (typeof ORDER)[number];

const subscribe = () => () => {};

/** Cycles dark → light → system. Renders a same-size placeholder until mounted. */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  const current: Choice = ORDER.includes(theme as Choice) ? (theme as Choice) : "dark";
  const next = ORDER[(ORDER.indexOf(current) + 1) % ORDER.length];

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`${site.theme.label}: ${site.theme[current]}. ${site.theme.switchTo} ${site.theme[next]}`}
      className={cn(
        "inline-flex h-9 items-center gap-2 font-mono text-meta uppercase text-dim transition-colors duration-200 hover:text-accent",
        className,
      )}
    >
      <span aria-hidden className="relative inline-block h-3 w-3 rounded-full border border-current">
        <span
          className={cn(
            "absolute inset-0 rounded-full bg-current transition-[clip-path] duration-300 ease-out-expo",
            current === "dark" && "[clip-path:inset(0_0_0_0)]",
            current === "light" && "[clip-path:inset(0_100%_0_0)]",
            current === "system" && "[clip-path:inset(0_50%_0_0)]",
          )}
        />
      </span>
      <span className="w-[6ch] text-left">{mounted ? site.theme[current] : site.theme.dark}</span>
    </button>
  );
}
