/*
 * Recreation of Pixel Pet's screen. The pet is the `babyIdle1` frame from the
 * project's src/sprites/baby.ts in its real palette, with the eyes (an overlay
 * layer in the original, so pupils can track the cursor) baked into row 6.
 */
const FRAME = [
  "................",
  ".....k...k......",
  "...k.kSk.kSk....",
  "..kSSSSSSSSSSk..",
  ".kSSSSSSSSSSSSSk",
  ".kSwwSSSSSSwwSSk",
  ".kSSkkSSSSkkSSSk",
  ".kSSSSSSSSSSSSSk",
  ".kSddSSSSSSddSSk",
  ".kSSSSSSSSSSSSSk",
  "..kSSSSSSSSSSk..",
  "..kSSSk..kSSSk..",
  "...kSk....kSk...",
  "....k......k....",
];
const PALETTE: Record<string, string> = { k: "#2b2138", w: "#ffffff", S: "#f7a8c4", d: "#e085a6" };
const STATS = [
  ["HUN", 0.72],
  ["JOY", 0.9],
  ["NRG", 0.55],
  ["CLN", 0.8],
] as const;

export function PixelPetPoster() {
  return (
    <div aria-hidden className="absolute inset-0 flex flex-col bg-gradient-to-b from-[#BFE6F5] via-[#E3F4FA] to-[#FFF4E0]">
      <svg viewBox="0 0 64 64" shapeRendering="crispEdges" className="mt-[6%] w-full">
        <rect x="46" y="4" width="8" height="8" fill="#FFD66B" />
        <rect x="6" y="10" width="12" height="3" fill="#ffffff" />
        <rect x="9" y="8" width="6" height="2" fill="#ffffff" />
        <rect x="0" y="52" width="64" height="12" fill="#9BD08A" />
        <rect x="0" y="52" width="64" height="1" fill="#7DB86C" />
        <g transform="translate(24 37)">
          {FRAME.flatMap((row, y) =>
            Array.from(row).map((ch, x) =>
              PALETTE[ch] ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={PALETTE[ch]} /> : null,
            ),
          )}
        </g>
      </svg>
      <div className="mx-[8%] mt-auto mb-[8%] grid grid-cols-2 gap-x-4 gap-y-2 font-mono text-[0.625rem] text-[#2b2138]">
        {STATS.map(([label, v]) => (
          <div key={label} className="flex items-center gap-2">
            <span className="w-7">{label}</span>
            <span className="h-2 flex-1 border border-[#2b2138] bg-white">
              <span className="block h-full origin-left bg-[#f7a8c4]" style={{ transform: `scaleX(${v})` }} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
