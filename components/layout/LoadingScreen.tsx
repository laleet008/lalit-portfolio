"use client";

import { useEffect } from "react";

/*
 * First-visit intro. Whether it plays is decided before first paint by the
 * inline script in app/layout.tsx (sets html[data-intro="pending"] once per
 * session, never with reduced motion). The sequence itself is CSS keyframes
 * capped at 1.6s, so it can't hang even if this component never hydrates.
 * This component only adds the skip control and tidies up afterwards.
 */
export function LoadingScreen({ name, skipLabel }: { name: string; skipLabel: string }) {
  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.intro !== "pending") return;
    const id = window.setTimeout(() => {
      root.dataset.intro = "done";
    }, 1600);
    return () => window.clearTimeout(id);
  }, []);

  const skip = () => {
    document.documentElement.dataset.intro = "skipped";
  };

  return (
    <div className="intro" role="presentation">
      <p aria-hidden className="intro__name font-display">
        {name}
      </p>
      <span aria-hidden className="intro__rule" />
      <button type="button" onClick={skip} className="intro__skip font-mono text-meta uppercase">
        {skipLabel}
      </button>
    </div>
  );
}

/** Runs in <head> before paint. Kept tiny and dependency-free. */
export const INTRO_SCRIPT = `try{var d=document.documentElement;if(!sessionStorage.getItem("intro-seen")&&!matchMedia("(prefers-reduced-motion: reduce)").matches){d.dataset.intro="pending"}sessionStorage.setItem("intro-seen","1")}catch(e){}`;
