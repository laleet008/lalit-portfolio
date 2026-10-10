import type { CSSProperties } from "react";
import { tokens } from "./theme";

export type RGB = readonly [number, number, number];

export function hexToRgb(hex: string): RGB {
  const m = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex);
  if (!m) throw new Error(`Invalid hex colour: ${hex}`);
  return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)];
}

/** WCAG 2.x relative luminance. */
export function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG contrast ratio between two colours, 1–21. */
export function contrastRatio(a: string, b: string): number {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

export type AccentPair = { accent: string; accentOnLight: string };

export const NEUTRAL_ACCENT: AccentPair = {
  accent: tokens.dark.fg,
  accentOnLight: tokens.light.fg,
};

/**
 * Inline style that themes a subtree with a project's accent. The CSS picks
 * the dark or light member based on the active theme (see globals.css).
 */
export function accentStyle({ accent, accentOnLight }: AccentPair): CSSProperties {
  return { "--accent-dark": accent, "--accent-light": accentOnLight } as CSSProperties;
}

/*
 * Page-level takeover. The variables live on <html>, which transitions them
 * (registered with @property in globals.css), so the cursor, links, focus
 * rings and rules all drift to the new colour together. The owner token
 * stops a section that scrolled out from resetting a newer section's accent.
 */
let owner: symbol | null = null;

export function claimPageAccent(pair: AccentPair): symbol {
  const token = Symbol("accent");
  owner = token;
  writePageAccent(pair);
  return token;
}

export function releasePageAccent(token: symbol): void {
  if (owner !== token) return;
  owner = null;
  writePageAccent(NEUTRAL_ACCENT);
}

function writePageAccent({ accent, accentOnLight }: AccentPair): void {
  if (typeof document === "undefined") return;
  const style = document.documentElement.style;
  style.setProperty("--accent-dark", accent);
  style.setProperty("--accent-light", accentOnLight);
}
