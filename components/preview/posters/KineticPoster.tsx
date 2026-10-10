/*
 * Recreation of Kinetic Type Lab's stage: the dark "lab bench", a preset rail,
 * and "Kinetic Type" frozen mid-Wave. Static: no JS, no images.
 */
const PRESETS = ["Wave", "Glitch", "Explode", "Gravity Drop", "Flip 3D", "Scramble", "Typewriter", "Variable Wave"];
const WORD = "Kinetic Type";

export function KineticPoster() {
  const letters = Array.from(WORD);
  return (
    <div aria-hidden className="absolute inset-0 flex bg-[#0B0B0D] text-[#E8E8EA]">
      <div className="hidden w-[22%] flex-col gap-2 border-r border-white/10 p-[3%] font-mono text-[clamp(0.45rem,0.9vw,0.65rem)] uppercase tracking-[0.12em] text-white/40 sm:flex">
        <span className="mb-2 text-white/25">Presets · 12</span>
        {PRESETS.map((p, i) => (
          <span key={p} className={i === 0 ? "text-[#C6FF4F]" : undefined}>
            {i === 0 ? "● " : "○ "}
            {p}
          </span>
        ))}
      </div>
      <div className="relative flex flex-1 items-center justify-center overflow-hidden">
        <span className="absolute left-[4%] top-[5%] font-mono text-[clamp(0.45rem,0.9vw,0.65rem)] uppercase tracking-[0.12em] text-white/30">
          Stage · 1920 × 1080
        </span>
        <span className="absolute inset-x-[6%] top-1/2 h-px bg-white/10" />
        <p className="flex font-display text-[clamp(1.5rem,6vw,4.5rem)] font-bold leading-none text-[#C6FF4F]">
          {letters.map((ch, i) => (
            <span
              key={i}
              className="inline-block"
              style={{ transform: `translateY(${Math.sin(i * 0.75) * 18}%)`, fontVariationSettings: `"wght" ${500 + Math.round(Math.cos(i * 0.75) * 250)}` }}
            >
              {ch === " " ? " " : ch}
            </span>
          ))}
        </p>
        <span className="absolute bottom-[5%] left-[4%] right-[4%] flex justify-between font-mono text-[clamp(0.45rem,0.9vw,0.65rem)] uppercase tracking-[0.12em] text-white/30">
          <span>▶ 00:01.24</span>
          <span>Export · GIF · WebM · TSX</span>
        </span>
      </div>
    </div>
  );
}
