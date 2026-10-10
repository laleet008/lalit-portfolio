# lalitpuri.com.np

The portfolio of Lalit Puri, frontend engineer. A statically exported Next.js site with live, embedded previews of three projects, written-up case studies with code excerpts and animated diagrams, an about page, and a printable web resume.

Every fact on the site lives in `content/` and is validated with Zod at build time. Assumptions are recorded in [DECISIONS.md](DECISIONS.md).

## Run it

```bash
pnpm install
pnpm dev         # http://localhost:3000
pnpm build       # static export to out/
pnpm preview     # serve out/ locally
pnpm test        # Vitest: content, contrast, highlighter
pnpm lint && pnpm typecheck
```

## Update content

All copy is data; components contain no sentences.

| What | File |
|---|---|
| Name, bio, contact, socials, availability, "currently" | `content/profile.ts` |
| Jobs and bullets | `content/experience.ts` |
| Skills (`strong` / `medium`) | `content/skills.ts` |
| Education, certifications | `content/education.ts` |
| Writing (optional) | `content/writing.ts` |
| Home "What I do" columns | `content/capabilities.ts` |
| Buttons, labels, section names, 404 text | `content/site.ts` |
| Diagram titles and captions | `content/diagrams.ts` |
| The CV PDF | replace `public/cv/Lalit-Puri-Resume.pdf` (same name) |

A malformed entry fails `pnpm build` with a message naming the field. For example, an accent that isn't uppercase hex gives "Use uppercase 6-digit hex".

## Add a project

1. Create `content/projects/<slug>.ts` exporting a `ProjectInput`; copy an existing one as a template.
2. Import it into `content/projects.ts`. Array order is display order.
3. Give it an `accent` (dark theme) and an `accentOnLight` that passes 4.5:1 on `#F6F4EF`; `pnpm test` checks both.
4. Optional: code excerpts (`highlights[].code`, trimmed from the real file) and diagrams (`highlights[].diagram`, a component in `components/work/diagrams/`).
5. To make it a flagship with a live preview, set `featured: true`, `liveUrl`, `preview: "browser" | "handheld"`, and add a static recreation to `components/preview/posters/`. Exactly three projects can be featured. If the site sends `X-Frame-Options`, set `embeddable: false`.

The case-study page, OG image (`/og/<slug>.png`), sitemap entry and JSON-LD are generated automatically.

## Deploy

The build is a plain static folder (`out/`).

- **Vercel:** import the repo; it detects Next.js and serves the static export. `vercel.json` adds cache and security headers.
- **GitHub Pages:** publish `out/` (for example with `actions/deploy-pages`). The custom domain lives in `public/CNAME`, so it's copied into every build.

After deploying, paste a URL into a link-preview debugger (e.g. opengraph.xyz) to confirm the OG cards, and run PageSpeed Insights against the live site.

## How it's built

- **Next.js 16 App Router**, TypeScript strict, Tailwind CSS, static export.
- **Motion** is CSS-first:
  - One IntersectionObserver drives every scroll reveal.
  - The hero's kinetic type reveal is pure CSS.
  - The work filters animate with the View Transitions API.
  - Lenis provides smooth scroll, loaded after first paint.
  - Every effect has a reduced-motion path.
- **Theming:** dark/light/system via `next-themes`. Each project's accent takes over the page while you're in its section or case study, and cross-fades through registered CSS custom properties.
- **Structure:** `app/` routes · `components/{layout,home,work,preview,about,ui}` · `content/` data + schema · `lib/` theme, accent maths, SEO, OG rendering, tokenizer, hooks · `tests/`.
