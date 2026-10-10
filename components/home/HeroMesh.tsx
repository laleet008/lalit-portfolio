import type { CSSProperties } from "react";

/*
 * The hero's one generative idea: three soft light pools in the flagship
 * accents, drifting slowly. Pure CSS (radial gradients, transform-only
 * keyframes); paused for reduced motion.
 */
export function HeroMesh({ colors }: { colors: readonly string[] }) {
  return (
    <div aria-hidden className="hero-mesh pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {colors.map((c, i) => (
        <span key={c} className={`hero-mesh__pool hero-mesh__pool--${i}`} style={{ "--pool": c } as CSSProperties} />
      ))}
      <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-bg to-transparent" />
    </div>
  );
}
