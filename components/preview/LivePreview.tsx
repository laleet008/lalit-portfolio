"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { useInView } from "@/lib/useInView";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { ScaledFrame } from "./ScaledFrame";

type Phase = "poster" | "loading" | "ready" | "failed";

const TIMEOUT_MS = 8000;

type Props = {
  title: string;
  url: string;
  embeddable: boolean;
  /** Native viewport the site renders at before being scaled to fit. */
  viewport: { width: number; height: number };
  /** Static recreation: the poster before load, and the fallback after a failure. */
  poster: ReactNode;
};

function prefersSavingData(): boolean {
  const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
  return Boolean(nav.connection?.saveData);
}

/**
 * Poster → lazy iframe → interactive, with a fallback chain: sites that refuse
 * framing never get an iframe, and one that hasn't loaded in 8s is swapped
 * back to the recreation. The recreation always links to the live site.
 */
export function LivePreview({ title, url, embeddable, viewport, poster }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const nearby = useInView(ref, { threshold: 0.6, once: true });
  const reduced = useReducedMotion();
  const [chosen, setPhase] = useState<Phase>("poster");
  const [probe, setProbe] = useState<"pending" | "ok">("pending");
  const [frameLoaded, setFrameLoaded] = useState(false);
  const [interactive, setInteractive] = useState(false);

  /* Auto-load once it's well inside the viewport, unless motion or data should be saved. */
  const autoLoad = embeddable && nearby && !reduced && !prefersSavingData();
  const requested = chosen === "poster" && autoLoad ? "loading" : chosen;
  /* An iframe fires `load` even for the browser's own error page, so "ready" also needs the probe. */
  const phase: Phase = requested === "loading" && probe === "ok" && frameLoaded ? "ready" : requested;

  useEffect(() => {
    if (phase !== "loading") return;
    const controller = new AbortController();
    const fail = () => setPhase("failed");
    const id = window.setTimeout(() => {
      controller.abort();
      fail();
    }, TIMEOUT_MS);
    fetch(url, { mode: "no-cors", signal: controller.signal })
      .then(() => setProbe("ok"))
      .catch(() => {
        if (!controller.signal.aborted) fail();
      });
    return () => {
      window.clearTimeout(id);
      controller.abort();
    };
  }, [phase, url]);

  const showFrame = phase === "loading" || phase === "ready";
  const note = !embeddable ? site.preview.blocked : phase === "failed" ? site.preview.timedOut : null;

  return (
    <div ref={ref} className="relative h-full w-full" onPointerLeave={() => setInteractive(false)}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${title}: ${site.preview.posterHint}`}
        className={cn("absolute inset-0 block transition-opacity duration-700", phase === "ready" && "pointer-events-none opacity-0")}
        data-cursor="open"
        tabIndex={phase === "ready" ? -1 : undefined}
      >
        {poster}
      </a>

      {showFrame && (
        <ScaledFrame viewport={viewport} className={cn("transition-opacity duration-700", phase === "ready" ? "opacity-100" : "opacity-0")}>
          <iframe
            src={url}
            title={`${site.preview.frameTitle} ${title}`}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-popups"
            referrerPolicy="no-referrer"
            onLoad={() => setFrameLoaded(true)}
            className={cn("h-full w-full border-0 bg-bg", !interactive && "pointer-events-none")}
            tabIndex={interactive ? 0 : -1}
          />
        </ScaledFrame>
      )}

      {phase === "ready" && !interactive && (
        <button
          type="button"
          onClick={() => setInteractive(true)}
          className="absolute inset-0 flex items-end justify-center pb-5 font-mono text-meta uppercase text-transparent hover:text-fg focus-visible:text-fg"
          data-cursor="drag"
        >
          <span className="bg-bg/80 px-3 py-1.5 backdrop-blur">{site.preview.interact}</span>
        </button>
      )}

      {(phase === "poster" || phase === "loading") && embeddable && (
        <button
          type="button"
          onClick={() => setPhase("loading")}
          disabled={phase === "loading"}
          className="absolute bottom-4 left-4 bg-bg/85 px-3 py-2 font-mono text-meta uppercase text-fg backdrop-blur transition-colors hover:text-accent disabled:text-dim"
        >
          {phase === "loading" ? site.preview.loading : site.preview.load}
        </button>
      )}

      {note && (
        <p className="absolute inset-x-4 bottom-4 bg-bg/85 px-3 py-2 font-mono text-[0.6875rem] uppercase leading-relaxed tracking-[0.06em] text-dim backdrop-blur">
          {note}
        </p>
      )}
    </div>
  );
}
