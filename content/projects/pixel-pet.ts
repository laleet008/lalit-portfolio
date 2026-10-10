import type { ProjectInput } from "../schema";

/* Source: github.com/laleet008/pixel-pet. Code excerpts are trimmed, not rewritten. */
export const pixelPet: ProjectInput = {
  slug: "pixel-pet",
  title: "Pixel Pet",
  tagline: "MODEL PP-01. A pet that lives in a browser tab.",
  year: "2026",
  role: "Design & engineering",
  context: "personal",
  status: "live",
  liveUrl: "https://pixel-pet-nine.vercel.app/",
  repoUrl: "https://github.com/laleet008/pixel-pet",
  stack: ["React", "TypeScript", "XState", "Zustand", "Canvas 2D", "Web Audio API", "Framer Motion", "Tailwind CSS", "Vite", "Vitest"],
  summary:
    "A hand-held, pixel-art, Tamagotchi-style browser toy. Your pet hatches from an egg, grows through five life stages with three adult variants, and tells you exactly how it feels. Stats decay in real time (or through 72-hour offline catch-up), day/night cycles paint the scene, and a 60fps requestAnimationFrame canvas renders every pixel.",
  problem:
    "A virtual pet has to feel alive when nobody's watching. Its stats keep falling while the tab is closed, and every behaviour (eating, sulking, sleeping, getting sick) needs an animation that matches what's actually going on inside it.",
  approach:
    "An XState v5 machine owns behaviour; a persisted Zustand store owns the numbers. The canvas renderer reads the machine's current animation and draws sprites defined as pixel grids in TypeScript. Simulation runs on a fixed timestep decoupled from rendering, and on return the game replays up to 72 hours of absence before you see the pet.",
  highlights: [
    {
      title: "A state machine picks every animation",
      body: [
        "Behaviour lives in an XState v5 machine: egg states for wobble, crack and hatch, then parallel awake, asleep and sick states once the pet is alive. The machine doesn't own stats. It reads and changes them through a `StoreBridge` into the Zustand store, which keeps persistence in one place.",
        "Every transition, plus a mood re-check every nine seconds, sets `currentAnim` in the machine's context. The canvas just reads that value, so an animation can never disagree with the state that caused it.",
      ],
      diagram: "pet-machine",
      code: {
        lang: "ts",
        file: "src/machines/petMachine.ts",
        source: `export interface StoreBridge {
  readStats(): {
    hunger: number;
    happiness: number;
    energy: number;
    hygiene: number;
    health: number;
  };
  isAsleep(): boolean;
  isSick(): boolean;
  feed(kind: 'meal' | 'snack'): { ok: boolean; reason?: string };
  play(bonus?: number): { ok: boolean; reason?: string };
  // …
  deriveMood():
    | 'hungry' | 'sad' | 'tired' | 'dirty' | 'sick'
    | 'sleeping' | 'great' | 'good' | 'neutral';
}`,
      },
    },
    {
      title: "Sprites are TypeScript, not image files",
      body: [
        "Every frame of every life stage is an array of strings, one character per pixel, mapped through a 19-colour palette; `.` is transparent. Eyes are drawn as a separate layer at known slots so the pupils can follow your cursor.",
        "Drawing a 16×16 grid with `fillRect` every frame would waste work, so each frame is rendered once to an offscreen canvas, cached by its rows and palette, and from then on drawn with a single `drawImage` blit, with image smoothing off so it stays crisp at any scale.",
      ],
      code: {
        lang: "ts",
        file: "src/sprites/baby.ts",
        source: `// Idle (breathing bob) — frame 1: slightly compressed
export const babyIdle1: SpriteFrame = [
  '................',
  '.....k...k......',
  '...k.kSk.kSk....',
  '..kSSSSSSSSSSk..',
  '.kSSSSSSSSSSSSSk',
  '.kSwwSSSSSSwwSSk',
  '.kSSSSSSSSSSSSSk',
  '.kSSSSSSSSSSSSSk',
  '.kSddSSSSSSddSSk',
  '.kSSSSSSSSSSSSSk',
  '..kSSSSSSSSSSk..',
  '..kSSSk..kSSSk..',
  '...kSk....kSk...',
  '....k......k....',
  '................',
  '................',
];`,
      },
    },
    {
      title: "Simulation decoupled from rendering",
      body: [
        "Game logic shouldn't depend on how fast a device can paint. The loop accumulates real elapsed time and runs the simulation in fixed 1/60s steps, however many fit, then renders once with the leftover fraction as an interpolation alpha.",
        "A single slow frame is clamped to 250ms so the simulation can't spiral trying to catch up, and the loop pauses entirely while the tab is hidden. Offline catch-up handles that time instead.",
      ],
      diagram: "fixed-timestep",
      code: {
        lang: "ts",
        file: "src/hooks/useGameLoop.ts",
        source: `const step = (time: number) => {
  if (!running) return;

  if (!lastRef.current) lastRef.current = time;
  let frame = (time - lastRef.current) / 1000;
  lastRef.current = time;
  if (frame > maxFrameTime) frame = maxFrameTime;

  accRef.current += frame;
  while (accRef.current >= fixedTimestep) {
    onTickRef.current?.(fixedTimestep);
    accRef.current -= fixedTimestep;
  }

  const alpha = accRef.current / fixedTimestep;
  onRenderRef.current?.(ctx, alpha);

  rafRef.current = requestAnimationFrame(step);
};`,
      },
    },
    {
      title: "Seventy-two hours of absence, replayed on return",
      body: [
        "When you come back, the pet should have lived through the time you were away. Multiplying decay rates by elapsed hours is wrong, because health penalties depend on thresholds crossed during the gap: if hunger slid from 40 to 15 over four hours, the penalty only applies to the last part.",
        "So catch-up is a pure function that steps through the gap in one-minute quanta, capped at 72 hours (at most 4,320 steps, cheap enough to run on load), then writes a plain-language summary for the welcome-back toast, like \"Mochi slept for 7 hours and is hungry now.\" It's covered by unit tests alongside the stat and action logic.",
      ],
      diagram: "offline-catchup",
      code: {
        lang: "ts",
        file: "src/game/offline.ts",
        source: `let simMs = Math.max(0, Math.min(elapsedMs, maxHours * 60 * 60 * 1000));
const stepMs = stepMinutes * 60 * 1000;
const hoursPerStep = stepMs / (60 * 60 * 1000);
// …
let steps = 0;
while (simMs >= stepMs) {
  simMs -= stepMs;
  stats = decayStats(stats, hoursPerStep, opts);
  steps++;
}
// Remaining fractional step
if (simMs > 0) {
  const hoursFrac = simMs / (60 * 60 * 1000);
  stats = decayStats(stats, hoursFrac, opts);
  steps++;
}`,
      },
    },
  ],
  next: "Track when the pet fell asleep or woke while you were away instead of holding one sleep flag for the whole offline window, and move the 8-bit sound effects, currently synthesised with Web Audio oscillators, behind a single mixer with a volume setting.",
  accent: "#7EC8E3",
  accentOnLight: "#456D7C",
  featured: true,
  preview: "handheld",
};
