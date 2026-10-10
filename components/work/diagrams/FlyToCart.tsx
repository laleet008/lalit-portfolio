import { Label, Svg, delay } from "./primitives";

const FROM = { x: 80, y: 262 };
const TO = { x: 560, y: 70 };
/* Real formula from FlyToCart.tsx; +150 only shifts the control point into this viewBox. */
const CTRL = { x: (FROM.x + TO.x) / 2, y: Math.min(FROM.y, TO.y) - Math.abs(TO.x - FROM.x) * 0.28 - 80 + 150 };
const bez = (t: number, a: number, c: number, b: number) => (1 - t) ** 2 * a + 2 * (1 - t) * t * c + t * t * b;
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

export function FlyToCart({ title }: { title: string }) {
  const samples = [0.12, 0.3, 0.5, 0.7, 0.88].map((t) => {
    const e = ease(t);
    return { x: bez(e, FROM.x, CTRL.x, TO.x), y: bez(e, FROM.y, CTRL.y, TO.y), s: 1 - 0.65 * e, r: (1 - e) * -16 + e * 8 };
  });
  return (
    <Svg id="fly-to-cart" title={title}>
      <g data-fade="" style={delay(0)}>
        <line x1={FROM.x} y1={FROM.y} x2={CTRL.x} y2={CTRL.y} className="stroke-line" strokeDasharray="4 4" />
        <line x1={CTRL.x} y1={CTRL.y} x2={TO.x} y2={TO.y} className="stroke-line" strokeDasharray="4 4" />
        <circle cx={CTRL.x} cy={CTRL.y} r={5} className="fill-none stroke-accent" strokeWidth="1.5" />
        <text x={CTRL.x + 12} y={CTRL.y + 4} className="fill-accent">ctrl</text>
      </g>
      <path d={`M${FROM.x} ${FROM.y} Q${CTRL.x} ${CTRL.y} ${TO.x} ${TO.y}`} pathLength={1} data-draw="" style={delay(0.3)} className="fill-none stroke-accent" strokeWidth="2" />
      {samples.map((p, i) => (
        <g key={i} data-fade="" style={delay(0.5 + i * 0.12)} transform={`translate(${p.x} ${p.y}) rotate(${p.r}) scale(${p.s})`}>
          <rect x={-14} y={-20} width={28} height={40} rx="3" className="fill-accent" opacity={0.35 + i * 0.12} />
        </g>
      ))}
      <g data-fade="" style={delay(0.1)}>
        <rect x={FROM.x - 46} y={FROM.y + 12} width={92} height={30} rx="2" className="fill-fg" />
        <text x={FROM.x} y={FROM.y + 31} textAnchor="middle" className="fill-bg text-[10px]">ADD TO CART</text>
      </g>
      <g data-fade="" style={delay(1.2)}>
        <circle cx={TO.x} cy={TO.y} r={20} className="fill-surface stroke-accent" strokeWidth="1.5" />
        <text x={TO.x} y={TO.y + 4} textAnchor="middle" className="fill-fg">cart</text>
      </g>
      <Label x={24} y={334} d={0.2} dim>ctrl.x = midpoint · ctrl.y = min(y₀, y₁) − 0.28·|Δx| − 80</Label>
      <Label x={24} y={354} d={1.3}>750 ms · easeInOutCubic · scale 1 → 0.35 · rotate −16° → 8°</Label>
    </Svg>
  );
}
