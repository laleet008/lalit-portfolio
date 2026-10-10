import { Arrow, Box, Label, Svg } from "./primitives";

export function RasterPipeline({ title }: { title: string }) {
  const id = "raster-pipeline";
  return (
    <Svg id={id} title={title} h={300}>
      <Box x={20} y={150} w={120} h={56} label="Stage DOM" sub="split spans" />
      <Box x={180} y={150} w={140} h={56} label="SVG" sub="foreignObject" d={0.25} accent />
      <Box x={360} y={150} w={110} h={56} label="<canvas>" sub="drawImage" d={0.5} />
      <Box x={510} y={150} w={110} h={56} label="Encoder" sub="GIF · WebM · MP4" d={0.75} />
      <Arrow id={id} d="M140 178 H176" delay={0.2} />
      <Arrow id={id} d="M320 178 H356" delay={0.45} />
      <Arrow id={id} d="M470 178 H506" delay={0.7} />
      <Box x={150} y={30} w={200} h={52} label="Google Fonts CSS → WOFF2" sub="fetched once, cached" d={0.9} />
      <Arrow id={id} d="M250 82 V146" delay={1.05} accent />
      <Label x={260} y={118} d={1.15} accent>@font-face src: data:font/woff2;base64</Label>
      <Label x={180} y={232} d={1.25} dim>~85 computed styles inlined per node</Label>
      <Arrow id={id} d="M565 210 C565 280 80 280 80 210" delay={1.4} dashed />
      <Label x={322} y={272} d={1.5} anchor="middle" dim>next frame</Label>
    </Svg>
  );
}
