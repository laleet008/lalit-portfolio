import { describe, expect, it } from "vitest";
import { accentStyle, contrastRatio, hexToRgb, NEUTRAL_ACCENT } from "@/lib/accent";
import { tokens } from "@/lib/theme";
import { projects } from "@/content";

const AA = 4.5;

describe("colour maths", () => {
  it("parses hex", () => {
    expect(hexToRgb("#C6FF4F")).toEqual([198, 255, 79]);
    expect(() => hexToRgb("C6FF4F")).toThrow();
  });

  it("computes WCAG contrast", () => {
    expect(contrastRatio("#000000", "#FFFFFF")).toBeCloseTo(21, 5);
    expect(contrastRatio("#777777", "#777777")).toBe(1);
  });

  it("exposes both theme members as CSS variables", () => {
    expect(accentStyle({ accent: "#C6FF4F", accentOnLight: "#597324" })).toEqual({
      "--accent-dark": "#C6FF4F",
      "--accent-light": "#597324",
    });
  });
});

describe("contrast — WCAG AA in both themes", () => {
  for (const theme of ["dark", "light"] as const) {
    const t = tokens[theme];
    it(`${theme}: body and dim text pass on bg and surface`, () => {
      for (const bg of [t.bg, t.surface]) {
        expect(contrastRatio(t.fg, bg)).toBeGreaterThanOrEqual(AA);
        expect(contrastRatio(t.dim, bg)).toBeGreaterThanOrEqual(AA);
      }
    });
  }

  it("neutral accent passes in both themes", () => {
    expect(contrastRatio(NEUTRAL_ACCENT.accent, tokens.dark.bg)).toBeGreaterThanOrEqual(AA);
    expect(contrastRatio(NEUTRAL_ACCENT.accentOnLight, tokens.light.bg)).toBeGreaterThanOrEqual(AA);
  });

  it.each(projects.map((p) => [p.slug, p] as const))("%s accent passes on ink and paper", (_, p) => {
    expect(contrastRatio(p.accent, tokens.dark.bg)).toBeGreaterThanOrEqual(AA);
    expect(contrastRatio(p.accent, tokens.dark.surface)).toBeGreaterThanOrEqual(AA);
    expect(contrastRatio(p.accentOnLight, tokens.light.bg)).toBeGreaterThanOrEqual(AA);
    expect(contrastRatio(p.accentOnLight, tokens.light.surface)).toBeGreaterThanOrEqual(AA);
  });
});
