import { Arrow, Box, Label, Svg, delay } from "./primitives";

const SPECS = [
  ["range", "speed 0.2–4"],
  ["select", "axis: wght"],
  ["color", "fill #C6FF4F"],
  ["toggle", "loop: on"],
] as const;

export function ParamSpecFlow({ title }: { title: string }) {
  const id = "param-spec";
  return (
    <Svg id={id} title={title}>
      <Label x={24} y={40} dim>preset.params: ParamSpec[]</Label>
      {SPECS.map(([type, value], i) => (
        <g key={type} data-fade="" style={delay(0.1 + i * 0.08)}>
          <rect x={24} y={56 + i * 66} width={168} height={50} rx="3" className="fill-surface stroke-line" strokeWidth="1.25" />
          <text x={38} y={78 + i * 66} className="fill-accent">type: &apos;{type}&apos;</text>
          <text x={38} y={95 + i * 66} className="fill-dim text-[9.5px]">{value}</text>
        </g>
      ))}
      <Box x={250} y={150} w={130} h={56} label="ParamControl" sub="switch (spec.type)" d={0.55} accent />
      {SPECS.map((_, i) => (
        <Arrow key={i} id={id} d={`M192 ${81 + i * 66} C220 ${81 + i * 66} 220 178 246 178`} delay={0.45 + i * 0.05} />
      ))}
      {SPECS.map((_, i) => (
        <Arrow key={i} id={id} d={`M380 178 C410 178 410 ${81 + i * 66} 436 ${81 + i * 66}`} delay={0.8 + i * 0.05} accent />
      ))}
      <g data-fade="" style={delay(1)}>
        <line x1={446} y1={81} x2={610} y2={81} className="stroke-line" strokeWidth="3" />
        <line x1={446} y1={81} x2={530} y2={81} className="stroke-accent" strokeWidth="3" />
        <circle cx={530} cy={81} r={7} className="fill-fg" />
      </g>
      <g data-fade="" style={delay(1.08)}>
        <rect x={446} y={130} width={164} height={34} rx="3" className="fill-surface stroke-line" />
        <text x={458} y={151} className="fill-fg">wght ▾</text>
      </g>
      <g data-fade="" style={delay(1.16)}>
        <rect x={446} y={200} width={28} height={28} rx="3" fill="#C6FF4F" />
        <text x={484} y={219} className="fill-fg">#C6FF4F</text>
      </g>
      <g data-fade="" style={delay(1.24)}>
        <rect x={446} y={266} width={52} height={26} rx="13" className="fill-accent" />
        <circle cx={485} cy={279} r={9} className="fill-bg" />
      </g>
      <Label x={446} y={330} d={1.3} dim>no per-preset UI code</Label>
    </Svg>
  );
}
