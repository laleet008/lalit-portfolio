import type { ProjectInput } from "../schema";

/* Source: github.com/laleet008/kinetic-type-lab. Code excerpts are trimmed, not rewritten. */
export const kineticTypeLab: ProjectInput = {
  slug: "kinetic-type-lab",
  title: "Kinetic Type Lab",
  tagline: "A foundry lab bench for typography in motion.",
  year: "2026",
  role: "Design & engineering",
  context: "personal",
  status: "live",
  liveUrl: "https://kinetic-type-lab-six.vercel.app/",
  repoUrl: "https://github.com/laleet008/kinetic-type-lab",
  stack: ["React", "TypeScript", "GSAP", "Matter.js", "Zustand", "Radix UI", "Tailwind CSS", "Vite", "Vitest"],
  summary:
    "A single-screen typography animation playground: type text, pick from 12 animation presets, tune parameters, and export GIF, WebM (or MP4 via WebCodecs), CSS + HTML, GSAP JS, React TSX or PNG. Everything is shareable through a URL hash that encodes the entire state.",
  problem:
    "One screen where you type, choose a motion, tune it, and leave with something usable: a GIF, a video, or production code. And a link that reproduces the exact setup for whoever opens it next.",
  approach:
    "Built as a \"foundry lab bench\" dark studio tool: monospace labels, hairline rules, a restrained palette, and all the personality on stage. Zustand holds the lab state, each of the 12 presets builds a GSAP timeline from the split text, and the whole state serialises into the URL hash, so sharing is copying a link.",
  highlights: [
    {
      title: "A splitter that never tears a glyph",
      body: [
        "Splitting text with `Array.from` or `split('')` breaks anything built from more than one code point: family emoji joined with zero-width joiners, flags made of two regional indicators, accented letters typed as base + combining mark. Animate those per character and half a flag flies off on its own.",
        "The splitter segments by grapheme cluster with `Intl.Segmenter`, falling back to `Array.from` where it's missing. Lines are detected after layout by grouping words on `offsetTop` with a ±2px tolerance. Every span is `aria-hidden` while the container keeps an `aria-label` with the original string, so screen readers read a sentence, not a list of letters. A ResizeObserver re-splits on resize, and teardown kills the GSAP tweens and restores plain text.",
      ],
      diagram: "grapheme-split",
      code: {
        lang: "ts",
        file: "src/lib/split.ts",
        source: `function splitGraphemes(text: string): string[] {
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    try {
      const IntlAny = Intl as any
      const segmenter = new IntlAny.Segmenter(undefined, { granularity: 'grapheme' })
      const segments = segmenter.segment(text)
      const result: string[] = []
      for (const seg of segments) {
        result.push(seg.segment)
      }
      return result
    } catch {
      return Array.from(text)
    }
  }
  return Array.from(text)
}`,
      },
    },
    {
      title: "Exporting the DOM, frame by frame",
      body: [
        "GIF and video export rasterise the live stage: DOM → SVG `foreignObject` → canvas, once per frame. The catch is fonts. A webfont referenced by URL either doesn't render inside the SVG image or taints the canvas so it can't be read back.",
        "Before each export the lab fetches the Google Fonts CSS for every family in use, downloads each WOFF2 file as binary, base64-encodes it, and rebuilds the `@font-face` rules as `data:` URLs inside the SVG's `<defs><style>`. Only the ~85 computed style properties that matter for typography, layout and transforms are inlined on each node rather than all 500-plus, which keeps the SVG small. Results are cached, so the second frame onward is fast enough for 30fps scrub captures on a 1080p stage.",
      ],
      diagram: "raster-pipeline",
    },
    {
      title: "A parameter panel that renders itself",
      body: [
        "Twelve presets with different knobs would normally mean twelve hand-built control panels. Instead, each preset exports a typed `ParamSpec[]`: a discriminated union of range, select, toggle, color, easing and string parameters.",
        "The right-hand panel renders itself from that spec with no per-preset UI code. A `ParamControl` switches on `spec.type`: ranges get a Radix slider with a number field and double-click-to-reset, easings get a curve editor, colours get a swatch popover with hex input. Adding a preset is one new file and one line in the registry.",
      ],
      diagram: "param-spec",
      code: {
        lang: "ts",
        file: "src/presets/index.ts",
        source: `export type RangeParam = {
  type: 'range';
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  default: number;
  unit?: string;
};

// … SelectParam, ToggleParam, ColorParam, EasingParam, StringParam

export type ParamSpec =
  | RangeParam
  | SelectParam
  | ToggleParam
  | ColorParam
  | EasingParam
  | StringParam;`,
      },
    },
    {
      title: "Variable-font axes at 60fps across 120 characters",
      body: [
        "Cursor weight mode drives a variable-font axis (weight, width, slant or optical size) from each character's distance to the pointer. Done naively, that's a listener per character and a style write per character per frame.",
        "All pointer and touch listeners live on `window`. A `gsap.quickSetter` is created once per character and kept in a Map. Every frame's writes are batched into a single `gsap.ticker` callback, a churn guard skips any write that would change the value by less than 0.05, and with no pointer on stage the loop is a single early return: zero DOM writes and zero allocations per frame.",
      ],
      diagram: "cursor-proximity",
      code: {
        lang: "ts",
        file: "src/modes/cursorWeight.ts",
        source: `function tickerLoop() {
  if (
    !currentContainer ||
    !currentOptions ||
    !currentGetSplitUnits ||
    pointerX === Infinity ||
    pointerY === Infinity
  ) {
    return;
  }
  // …
  for (let i = 0; i < limit; i++) {
    // …
    const rawValue =
      opts.minWeight + falloff * (opts.maxWeight - opts.minWeight);
    const value = Math.max(cache.axisMin, Math.min(cache.axisMax, rawValue));

    const lastWritten = lastWrittenValues.get(el);
    if (lastWritten !== undefined && Math.abs(value - lastWritten) < 0.05) {
      continue;
    }

    lastWrittenValues.set(el, value);
    const fvs = buildFvs(cache.baseParts, cache.axisTag, value);
    qs(fvs);
  }
}`,
      },
    },
    {
      title: "Glyph physics that cleans up after itself",
      body: [
        "Physics mode hands every character to Matter.js: letters fall, collide, and can be thrown around with the mouse. Toggling it twenty times in a row must not leak.",
        "Teardown runs in a fixed order: stop the runner, clear the engine, remove every body from the world, unbind every Matter event, disconnect the ResizeObserver and visibility handler, remove the mouse constraint, restore each span's transform, delete the body↔span cross-reference so both can be garbage-collected, then null every internal reference.",
      ],
    },
  ],
  next: "Move GIF encoding into a Web Worker so long exports don't block the main thread, and shrink share URLs by compressing the state before it's base64-encoded into the hash.",
  accent: "#C6FF4F",
  accentOnLight: "#577023",
  featured: true,
  preview: "browser",
};
