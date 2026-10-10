/*
 * Colour tokens, the single source for CSS variables (injected by the root
 * layout), OG images and the contrast tests.
 */
export const tokens = {
  dark: {
    bg: "#0E0E10", // --ink
    surface: "#141417",
    line: "#26262B",
    fg: "#EDEDEF",
    dim: "#8C8C95",
  },
  light: {
    bg: "#F6F4EF", // --paper
    surface: "#EEEBE4",
    line: "#DAD6CD",
    fg: "#141417",
    dim: "#5F5E66",
  },
} as const;

export type ThemeName = keyof typeof tokens;
type TokenName = keyof (typeof tokens)["dark"];

const hexToChannels = (hex: string) =>
  [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(" ");

function block(theme: ThemeName): string {
  const t = tokens[theme];
  return (Object.keys(t) as TokenName[])
    .map((k) => `--${k}:${t[k]};--${k}-rgb:${hexToChannels(t[k])};`)
    .join("");
}

/** CSS for every theme token. Dark is the default before next-themes resolves. */
export function themeCss(): string {
  return `:root,[data-theme="dark"]{${block("dark")}color-scheme:dark}[data-theme="light"]{${block("light")}color-scheme:light}`;
}
