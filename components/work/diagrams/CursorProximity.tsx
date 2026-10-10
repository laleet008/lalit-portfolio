import { Label, Svg, delay } from "./primitives";

const WORD = "KINETIC";
const CURSOR = { x: 300, y: 150 };
const RADIUS = 150;

/* ease falloff from the real cursorWeight.ts: 1 - t²(3 - 2t) */
const falloff = (t: number) => 1 - t * t * (3 - 2 * t);

export function CursorProximity({ title }: { title: string }) {
  return (
    <Svg id="cursor-proximity" title={title}>
      <circle cx={CURSOR.x} cy={CURSOR.y} r={RADIUS} pathLength={1} data-draw="" className="fill-none stroke-accent" strokeDasharray="1" strokeWidth="1" opacity="0.6" />
      {Array.from(WORD).map((ch, i) => {
        const x = 70 + i * 78;
        const dist = Math.hypot(x - CURSOR.x, 150 - CURSOR.y);
        const t = Math.min(1, dist / RADIUS);
        const w = Math.round(200 + falloff(t) * 600);
        return (
          <g key={i} data-fade="" style={delay(0.2 + i * 0.07)}>
            <text x={x} y={170} textAnchor="middle" className="fill-fg font-display text-[64px]" style={{ fontVariationSettings: `"wght" ${w}` }}>
              {ch}
            </text>
            <text x={x} y={208} textAnchor="middle" className={t < 1 ? "fill-accent text-[10px]" : "fill-dim text-[10px]"}>
              {w}
            </text>
          </g>
        );
      })}
      <g data-fade="" style={delay(0.1)}>
        <path d={`M${CURSOR.x} ${CURSOR.y - 8} l12 30 l-12 -6 l-12 6z`} className="fill-accent" transform={`rotate(-20 ${CURSOR.x} ${CURSOR.y})`} />
      </g>
      <Label x={24} y={36} dim>wght per glyph = min + falloff(dist / radius) × (max − min)</Label>
      <Label x={24} y={262} d={0.8}>one gsap.ticker callback · quickSetter per glyph · listeners on window</Label>
      <Label x={24} y={286} d={0.95} accent>|value − lastWrite| &lt; 0.05 → skip the DOM write</Label>
      <Label x={24} y={310} d={1.1} dim>no pointer on stage → early return, 0 writes</Label>
    </Svg>
  );
}
