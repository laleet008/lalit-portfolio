import { Arrow, Box, Label, Svg, delay } from "./primitives";

export function PetMachine({ title }: { title: string }) {
  const id = "pet-machine";
  return (
    <Svg id={id} title={title} h={380}>
      <Label x={24} y={30} dim>egg</Label>
      <Box x={24} y={42} w={90} h={36} label="wobble" d={0.05} />
      <Box x={24} y={98} w={90} h={36} label="crack" d={0.15} />
      <Box x={24} y={154} w={90} h={36} label="hatch" d={0.25} />
      <Arrow id={id} d="M69 78 V94" delay={0.1} />
      <Arrow id={id} d="M69 134 V150" delay={0.2} />
      <Arrow id={id} d="M114 172 H160" delay={0.35} accent />

      <g data-fade="" style={delay(0.4)}>
        <rect x={164} y={30} width={300} height={190} rx="6" className="fill-none stroke-accent" strokeWidth="1.25" />
        <text x={178} y={50} className="fill-accent">alive · parallel</text>
        <line x1={314} y1={60} x2={314} y2={210} className="stroke-line" strokeDasharray="3 3" />
      </g>
      <Box x={182} y={66} w={110} h={36} label="awake" d={0.5} />
      <Box x={182} y={160} w={110} h={36} label="asleep" d={0.6} />
      <Arrow id={id} d="M222 102 V156" delay={0.65} />
      <Arrow id={id} d="M252 156 V106" delay={0.7} />
      <Label x={186} y={134} d={0.75} dim>3 clicks / 1.2s</Label>
      <Box x={332} y={66} w={110} h={36} label="healthy" d={0.55} />
      <Box x={332} y={160} w={110} h={36} label="sick" d={0.65} />
      <Arrow id={id} d="M387 102 V156" delay={0.75} />
      <Label x={392} y={134} d={0.8} dim>medicine ↑</Label>

      <Box x={500} y={100} w={116} h={44} label="evolving" sub="next life stage" d={0.9} />
      <Arrow id={id} d="M464 122 H496" delay={0.85} />

      <Box x={164} y={268} w={160} h={52} label="StoreBridge" sub="readStats · feed · play…" d={1} accent />
      <Box x={24} y={268} w={110} h={52} label="Zustand" sub="persisted stats" d={1.1} />
      <Arrow id={id} d="M314 224 V264" delay={1.05} accent />
      <Arrow id={id} d="M164 294 H138" delay={1.15} />

      <Box x={400} y={268} w={216} h={52} label="ctx.currentAnim" sub="every transition + 9 s mood check" d={1.2} />
      <Arrow id={id} d="M440 224 V264" delay={1.2} />
      <Label x={400} y={350} d={1.35} accent>canvas renderer only reads currentAnim</Label>
    </Svg>
  );
}
