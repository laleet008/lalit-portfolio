import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { tokens } from "./theme";

export const OG_SIZE = { width: 1200, height: 630 };

const font = (file: string) => readFile(join(process.cwd(), "assets/og", file));

/** The site's OG card: ink ground, display type, mono metadata, one accent rule. */
export async function renderOg({ eyebrow, title, subtitle, accent, footer }: { eyebrow: string; title: string; subtitle: string; accent: string; footer: string }) {
  const [display, mono] = await Promise.all([font("BricolageGrotesque-SemiBold.ttf"), font("GeistMono-Regular.ttf")]);
  const t = tokens.dark;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: t.bg, color: t.fg, padding: 72, position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 8, background: accent }} />
        <div style={{ display: "flex", fontFamily: "Mono", fontSize: 24, letterSpacing: 3, textTransform: "uppercase", color: accent }}>{eyebrow}</div>
        <div style={{ display: "flex", flex: 1, flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontFamily: "Display", fontSize: title.length > 22 ? 96 : 128, lineHeight: 0.95, letterSpacing: -4 }}>{title}</div>
          <div style={{ marginTop: 28, fontFamily: "Display", fontSize: 40, color: t.dim, maxWidth: 960 }}>{subtitle}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", borderTop: `1px solid ${t.line}`, paddingTop: 24, fontFamily: "Mono", fontSize: 22, color: t.dim }}>
          <span>{footer}</span>
          <span style={{ color: accent }}>●</span>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Display", data: display, weight: 600, style: "normal" },
        { name: "Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}
