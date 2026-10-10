import { Label, Svg, delay } from "./primitives";

/* Hunger sliding 40 → 15 over four hours; the threshold is illustrative. */
const X0 = 60;
const X1 = 600;
const Y = (v: number) => 300 - v * 5;
const THRESHOLD = 25;
const HOURS = 4;
const crossAt = (40 - THRESHOLD) / (40 - 15);

export function OfflineCatchup({ title }: { title: string }) {
  const cx = X0 + crossAt * (X1 - X0);
  const quanta = 24;
  return (
    <Svg id="offline-catchup" title={title}>
      <line x1={X0} y1={300} x2={X1} y2={300} className="stroke-line" />
      <line x1={X0} y1={60} x2={X0} y2={300} className="stroke-line" />
      {Array.from({ length: HOURS + 1 }, (_, h) => (
        <text key={h} x={X0 + (h / HOURS) * (X1 - X0)} y={320} textAnchor="middle" className="fill-dim text-[10px]">{h}h</text>
      ))}
      <Label x={X0} y={46} dim>hunger</Label>
      <g data-fade="" style={delay(0.1)}>
        <line x1={X0} y1={Y(THRESHOLD)} x2={X1} y2={Y(THRESHOLD)} className="stroke-dim" strokeDasharray="5 4" />
        <text x={X1} y={Y(THRESHOLD) - 8} textAnchor="end" className="fill-dim text-[10px]">health penalty threshold</text>
      </g>
      <rect x={cx} y={Y(THRESHOLD)} width={X1 - cx} height={300 - Y(THRESHOLD)} className="fill-accent" opacity="0.14" data-fade="" style={delay(1.2)} />
      {Array.from({ length: quanta }, (_, i) => {
        const t = i / quanta;
        const v = 40 - 25 * t;
        const w = (X1 - X0) / quanta;
        return (
          <rect key={i} x={X0 + t * (X1 - X0)} y={Y(v)} width={w - 2} height={300 - Y(v)} className={t >= crossAt ? "fill-accent" : "fill-dim"} opacity={t >= crossAt ? 0.55 : 0.22} data-fade="" style={delay(0.3 + i * 0.03)} />
        );
      })}
      <path d={`M${X0} ${Y(40)} L${X1} ${Y(15)}`} pathLength={1} data-draw="" style={delay(0.2)} className="fill-none stroke-fg" strokeWidth="1.5" />
      <Label x={cx + 8} y={Y(THRESHOLD) + 22} d={1.3} accent>penalty applies only from here</Label>
      <Label x={X0} y={350} d={1.4} dim>1-minute quanta · capped at 72 h (≤ 4,320 steps) · pure function, unit-tested</Label>
    </Svg>
  );
}
