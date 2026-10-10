import type { CSSProperties, ReactNode } from "react";

/* Shared SVG vocabulary for the case-study diagrams. `d` is the reveal delay in seconds. */

export const delay = (d: number) => ({ "--d": d }) as CSSProperties;

export function Svg({ id, title, w = 640, h = 360, children }: { id: string; title: string; w?: number; h?: number; children: ReactNode }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-labelledby={`${id}-title`} className="h-auto w-full font-mono text-[11px]">
      <title id={`${id}-title`}>{title}</title>
      <defs>
        <marker id={`${id}-arrow`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10z" className="fill-dim" />
        </marker>
      </defs>
      {children}
    </svg>
  );
}

export function Box({
  x, y, w, h, label, sub, d = 0, accent = false,
}: { x: number; y: number; w: number; h: number; label: string; sub?: string; d?: number; accent?: boolean }) {
  return (
    <g data-fade="" style={delay(d)}>
      <rect x={x} y={y} width={w} height={h} rx="3" className={accent ? "fill-surface stroke-accent" : "fill-surface stroke-line"} strokeWidth="1.25" />
      <text x={x + w / 2} y={y + h / 2 + (sub ? -3 : 4)} textAnchor="middle" className={accent ? "fill-accent" : "fill-fg"}>
        {label}
      </text>
      {sub && (
        <text x={x + w / 2} y={y + h / 2 + 13} textAnchor="middle" className="fill-dim text-[9.5px]">
          {sub}
        </text>
      )}
    </g>
  );
}

export function Arrow({ id, d: path, delay: dl = 0, accent = false, dashed = false }: { id: string; d: string; delay?: number; accent?: boolean; dashed?: boolean }) {
  return (
    <path
      d={path}
      pathLength={1}
      data-draw={dashed ? undefined : ""}
      data-fade={dashed ? "" : undefined}
      style={delay(dl)}
      fill="none"
      className={accent ? "stroke-accent" : "stroke-dim"}
      strokeWidth="1.25"
      strokeDasharray={dashed ? "4 4" : undefined}
      markerEnd={`url(#${id}-arrow)`}
    />
  );
}

export function Label({ x, y, children, d = 0, accent = false, anchor = "start", dim = false }: { x: number; y: number; children: ReactNode; d?: number; accent?: boolean; anchor?: "start" | "middle" | "end"; dim?: boolean }) {
  return (
    <text x={x} y={y} textAnchor={anchor} data-fade="" style={delay(d)} className={accent ? "fill-accent" : dim ? "fill-dim" : "fill-fg"}>
      {children}
    </text>
  );
}
