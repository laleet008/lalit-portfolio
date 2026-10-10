"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

type State = "idle" | "copied" | "failed";

/** The address is a real mailto link; the button beside it copies it, with a polite live confirmation. */
export function CopyEmail({ email, className }: { email: string; className?: string }) {
  const [state, setState] = useState<State>("idle");

  useEffect(() => {
    if (state === "idle") return;
    const id = window.setTimeout(() => setState("idle"), 2400);
    return () => window.clearTimeout(id);
  }, [state]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("failed");
    }
  };

  return (
    <div className={cn("flex flex-wrap items-baseline gap-x-6 gap-y-3", className)}>
      <a
        href={`mailto:${email}`}
        className="break-all font-display text-[clamp(1.5rem,5vw,3.75rem)] leading-none tracking-tight underline decoration-line decoration-1 underline-offset-[0.2em] transition-colors duration-300 hover:text-accent hover:decoration-accent"
        data-cursor="open"
      >
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        className="font-mono text-meta uppercase text-dim transition-colors duration-200 hover:text-accent"
      >
        {site.contact.copy}
      </button>
      <span role="status" aria-live="polite" className="font-mono text-meta uppercase text-accent">
        {state === "copied" ? site.contact.copied : state === "failed" ? site.contact.copyFailed : ""}
      </span>
    </div>
  );
}
