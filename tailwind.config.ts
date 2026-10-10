import type { Config } from "tailwindcss";

const channel = (name: string) => `rgb(var(--${name}-rgb) / <alpha-value>)`;

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.ts", "./lib/**/*.ts"],
  theme: {
    extend: {
      colors: {
        bg: channel("bg"),
        surface: channel("surface"),
        line: channel("line"),
        fg: channel("fg"),
        dim: channel("dim"),
        accent: "var(--accent)",
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        hero: ["clamp(3.5rem, 15vw, 9rem)", { lineHeight: "0.92", letterSpacing: "-0.035em" }],
        display: ["clamp(2.25rem, 6vw, 5rem)", { lineHeight: "0.98", letterSpacing: "-0.025em" }],
        meta: ["0.75rem", { lineHeight: "1rem", letterSpacing: "0.08em" }],
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      spacing: {
        gutter: "clamp(1rem, 4vw, 3.5rem)",
      },
      maxWidth: {
        page: "96rem",
        prose: "38rem",
      },
    },
  },
  plugins: [],
};

export default config;
