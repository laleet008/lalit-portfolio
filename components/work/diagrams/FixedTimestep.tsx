import { Label, Svg, delay } from "./primitives";

/* Uneven frame times in ms; 192 ms total → 11 fixed steps + a leftover fraction. */
const FRAMES = [16, 17, 33, 8, 16, 24, 16, 9, 30, 23];
const STEP = 1000 / 60;
const PX = 3;
const OFFSETS = FRAMES.map((_, i) => 24 + FRAMES.slice(0, i).reduce((a, b) => a + b, 0) * PX);

export function FixedTimestep({ title }: { title: string }) {
  const total = FRAMES.reduce((a, b) => a + b, 0);
  const steps = Math.floor(total / STEP);
  return (
    <Svg id="fixed-timestep" title={title} h={300}>
      <Label x={24} y={36} dim>rAF frames (variable)</Label>
      {FRAMES.map((ms, i) => {
        const x = OFFSETS[i];
        return (
          <g key={i} data-fade="" style={delay(i * 0.06)}>
            <rect x={x} y={50} width={ms * PX - 3} height={34} rx="2" className={ms > 20 ? "fill-surface stroke-dim" : "fill-surface stroke-line"} strokeWidth="1.25" />
            <text x={x + (ms * PX - 3) / 2} y={71} textAnchor="middle" className="fill-dim text-[9px]">{ms}</text>
          </g>
        );
      })}
      <Label x={24} y={130} d={0.6} accent>simulation ticks (fixed 1/60 s)</Label>
      {Array.from({ length: steps }, (_, i) => (
        <rect key={i} x={24 + i * STEP * PX} y={144} width={STEP * PX - 3} height={34} rx="2" className="fill-accent" opacity="0.85" data-fade="" style={delay(0.7 + i * 0.04)} />
      ))}
      <g data-fade="" style={delay(1.4)}>
        <rect x={24 + steps * STEP * PX} y={144} width={(total - steps * STEP) * PX - 3} height={34} rx="2" className="fill-none stroke-accent" strokeDasharray="3 3" />
        <text x={24 + total * PX} y={200} textAnchor="end" className="fill-accent text-[10px]">leftover → alpha</text>
      </g>
      <Label x={24} y={240} d={1.5}>while (acc ≥ step) {"{ tick(step); acc −= step }"} · render(alpha)</Label>
      <Label x={24} y={266} d={1.6} dim>frames over 250 ms are clamped · loop pauses while the tab is hidden</Label>
    </Svg>
  );
}
