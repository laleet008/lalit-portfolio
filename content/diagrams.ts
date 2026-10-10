import { z } from "zod";
import { DIAGRAM_IDS, type DiagramId } from "./schema";

/* Accessible title and visible caption for each case-study diagram. */
const DiagramCopySchema = z.record(z.enum(DIAGRAM_IDS), z.object({ title: z.string().min(1), caption: z.string().min(1) }));

export const diagrams: Record<DiagramId, { title: string; caption: string }> = DiagramCopySchema.parse({
  "grapheme-split": {
    title: "Splitting by code point versus by grapheme cluster",
    caption: "Array.from splits a family emoji into five pieces and a flag into two letters. Intl.Segmenter keeps each as one character, so nothing tears apart mid-animation.",
  },
  "raster-pipeline": {
    title: "The per-frame export pipeline",
    caption: "Each frame: the stage DOM is serialised into an SVG foreignObject with its fonts inlined as base64, drawn onto a canvas, and handed to the encoder. Fonts are fetched once and cached.",
  },
  "param-spec": {
    title: "From a typed ParamSpec array to a rendered control panel",
    caption: "A preset declares data, not UI. ParamControl switches on each spec's type and renders the matching control.",
  },
  "cursor-proximity": {
    title: "Cursor proximity driving a variable-font axis",
    caption: "Inside the radius, each glyph's axis value follows a falloff curve from the pointer. Writes are batched into one ticker callback and skipped when the change is under 0.05.",
  },
  "label-texture": {
    title: "Building the tea tin from a profile curve and a canvas label",
    caption: "A 2D profile is spun into a LatheGeometry, and a label drawn on a 1024×1024 canvas becomes a CanvasTexture projected onto it as a decal.",
  },
  "fly-to-cart": {
    title: "The fly-to-cart quadratic bezier",
    caption: "The control point sits above the midpoint, lifted further for wider flights, so the tin arcs instead of sliding. It shrinks and turns along the curve.",
  },
  "pet-machine": {
    title: "Pixel Pet's behaviour state machine",
    caption: "The egg hatches into an alive state with awake, asleep and sick in parallel. The machine reads and writes stats through a bridge to the Zustand store, and the canvas only reads the current animation.",
  },
  "fixed-timestep": {
    title: "Fixed-timestep simulation under variable frame times",
    caption: "Frames arrive unevenly; the simulation always advances in equal 1/60s steps. The leftover fraction becomes the render's interpolation alpha.",
  },
  "offline-catchup": {
    title: "Why offline catch-up steps minute by minute",
    caption: "Health only suffers once hunger falls past a threshold. Stepping through the gap applies the penalty to the right slice of time; multiplying the whole gap at once can't tell when the line was crossed.",
  },
});
