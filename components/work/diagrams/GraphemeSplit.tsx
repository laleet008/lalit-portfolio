import { Label, Svg, delay } from "./primitives";

const NAIVE = ["👨", "ZWJ", "👩", "ZWJ", "👧", "🇳", "🇵"];
const SAFE = ["👨‍👩‍👧", "🇳🇵"];

function Cell({ x, y, w, text, d, broken }: { x: number; y: number; w: number; text: string; d: number; broken?: boolean }) {
  return (
    <g data-fade="" style={delay(d)}>
      <rect x={x} y={y} width={w} height="44" rx="3" className={broken ? "fill-surface stroke-line" : "fill-surface stroke-accent"} strokeWidth="1.25" strokeDasharray={broken ? "3 3" : undefined} />
      <text x={x + w / 2} y={y + 28} textAnchor="middle" className={text === "ZWJ" ? "fill-dim text-[9px]" : "fill-fg text-[18px]"}>
        {text}
      </text>
    </g>
  );
}

export function GraphemeSplit({ title }: { title: string }) {
  return (
    <Svg id="grapheme-split" title={title} h={300}>
      <Label x={24} y={36} dim>input</Label>
      <text x={24} y={66} className="fill-fg text-[22px]" data-fade="" style={delay(0)}>
        👨‍👩‍👧 🇳🇵
      </text>
      <Label x={24} y={122} d={0.2} dim>Array.from(text) → 7 units, two of them invisible joiners</Label>
      {NAIVE.map((t, i) => (
        <Cell key={i} x={24 + i * 62} y={134} w={54} text={t} d={0.3 + i * 0.06} broken />
      ))}
      <Label x={24} y={222} d={0.8} accent>Intl.Segmenter granularity:&apos;grapheme&apos; → 2 units</Label>
      {SAFE.map((t, i) => (
        <Cell key={i} x={24 + i * 110} y={234} w={96} text={t} d={0.95 + i * 0.1} />
      ))}
    </Svg>
  );
}
