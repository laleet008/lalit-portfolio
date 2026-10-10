import { Arrow, Label, Svg, delay } from "./primitives";

export function LabelTexture({ title }: { title: string }) {
  const id = "label-texture";
  return (
    <Svg id={id} title={title}>
      <Label x={24} y={36} dim>1. profile points</Label>
      <path d="M60 300 L60 120 Q60 104 74 100 L96 96 L96 84" pathLength={1} data-draw="" className="fill-none stroke-accent" strokeWidth="2" />
      <line x1={40} y1={310} x2={40} y2={70} className="stroke-line" strokeDasharray="3 3" data-fade="" style={delay(0.1)} />
      <path d="M30 200 a12 6 0 1 0 20 0" pathLength={1} data-draw="" style={delay(0.4)} className="fill-none stroke-dim" markerEnd={`url(#${id}-arrow)`} />
      <Label x={24} y={340} d={0.5} dim>LatheGeometry(points, 96)</Label>

      <Arrow id={id} d="M130 200 H170" delay={0.6} />
      <Label x={190} y={36} d={0.6} dim>2. label on a 1024² canvas</Label>
      <g data-fade="" style={delay(0.7)}>
        <rect x={190} y={60} width={200} height={200} className="fill-surface stroke-line" />
        <rect x={204} y={92} width={172} height={136} rx="4" fill="#F4F0E8" />
        <text x={290} y={124} textAnchor="middle" fill="#1A1714" fontFamily="Georgia, serif" fontSize="15">Chai &amp; Co.</text>
        <line x1={250} y1={134} x2={330} y2={134} className="stroke-accent" strokeWidth="1.5" />
        <text x={290} y={166} textAnchor="middle" fill="#1A1714" fontFamily="Georgia, serif" fontSize="18" fontWeight="600">MIST</text>
        <path d="M290 178 c-7 5 -7 15 0 20 c7 -5 7 -15 0 -20z" className="fill-accent" />
        <text x={290} y={216} textAnchor="middle" fill="#1A1714" fontSize="6.5" letterSpacing="1.2">ILAM · NEPAL · 1,900 m</text>
      </g>
      <Label x={190} y={290} d={0.9} accent>new THREE.CanvasTexture(canvas)</Label>

      <Arrow id={id} d="M400 160 H440" delay={1} />
      <Label x={450} y={36} d={1} dim>3. projected as a Decal</Label>
      <g data-fade="" style={delay(1.15)}>
        <ellipse cx={530} cy={300} rx={62} ry={9} className="fill-line" />
        <rect x={470} y={84} width={120} height={214} rx="10" className="fill-accent" />
        <rect x={466} y={70} width={128} height={28} rx="7" className="fill-accent" opacity="0.75" />
        <rect x={486} y={140} width={88} height={90} rx="3" fill="#F4F0E8" />
        <text x={530} y={168} textAnchor="middle" fill="#1A1714" fontFamily="Georgia, serif" fontSize="10">Chai &amp; Co.</text>
        <text x={530} y={194} textAnchor="middle" fill="#1A1714" fontFamily="Georgia, serif" fontSize="13" fontWeight="600">MIST</text>
      </g>
      <Label x={616} y={340} d={1.3} anchor="end" dim>one function · four teas · no image files</Label>
    </Svg>
  );
}
