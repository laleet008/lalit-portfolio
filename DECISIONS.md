# Decisions & assumptions

Everything on this site comes from the CV (`public/cv/Lalit-Puri-Resume.pdf`), the three flagship projects' own repos and READMEs, or the owner's answers. Anything assumed is listed here with where to change it.

## Confirmed by the owner (11 Oct 2026)

- Availability: **"Open to frontend roles"**: `content/profile.ts` → `availability`.
- Socials: **GitHub `laleet008`**, **LinkedIn `laleet08`**: `content/profile.ts` → `socials`.
- **Phone is public**: shown in the home contact block and on `/resume`.
- **Skill levels:** React, TypeScript, HTML and CSS are "strong"; everything else is "medium". JavaScript is also marked strong alongside TypeScript; move it to medium in `content/skills.ts` if that's wrong.
- **Previews link to the live projects:** every poster and fallback is a link to the live site, and every preview has an always-visible "Open in new tab".

## Still assumed (owner to confirm)

| Assumption | Where to change |
|---|---|
| Flagship year is 2026 for all three, from their first git commits. | `content/projects/*.ts` → `year` |
| Flagship role is "Design & engineering" (built solo). | same → `role` |
| CV projects use the year span of the role they happened in; the CV gives no per-project dates. | `content/projects/work.ts` |
| Job locations are left blank; the CV gives only a home location. | `content/experience.ts` |
| "Currently" fills in only *building*. *Learning* and *reading* are left empty rather than invented. | `content/profile.ts` → `currently` |
| Positioning line, intro and long bio are written in first person from CV facts. The tone is mine; the facts are the CV's. `/resume` uses the CV's own profile text verbatim. | `content/profile.ts` |

## Content rules applied

- **CV projects** are employer or client work with no public URL or code. Their write-ups say only what the CV says, and each carries a note saying so. Two have no stack (`stack: []`) because the CV names none.
- **Chai & Co. is presented as a fictional brand.** "Est. 1971", Ilam and the estate details are part of the brand story, and the summary says so.
- **Pixel Pet's offline catch-up is 72 hours.** Its README says 240h, but `src/game/constants.ts` sets `OFFLINE_MAX_HOURS = 72`.
- **Code excerpts** are trimmed (`// …`) from the real files named in `code.file` and link to them on GitHub; they're never rewritten.
- **Diagrams** illustrate the real mechanisms. Where a diagram simplifies (the fly-to-cart control point is shifted into view; the offline-catch-up threshold value is illustrative), a code comment says so.
- **Not included:** other folders in `~/lalit` (todo app, blog task, form task, user management, …) aren't in the CV or the brief.

## Live previews

- **Chai & Co. cannot be embedded**: `chai-and-co.vercel.app` sends `X-Frame-Options: SAMEORIGIN`. It's marked `embeddable: false`, so no iframe is ever attempted; the site shows a code-drawn recreation that links to the live site. To embed it live, remove that header from Chai & Co.'s `vercel.json`, add `Content-Security-Policy: frame-ancestors 'self' https://www.lalitpuri.com.np`, and set `embeddable: true` in `content/projects/chai-and-co.ts`.
- **Fallback chain:** a `no-cors` probe must succeed before a frame counts as ready, because an iframe fires `load` even for the browser's own error page. A refused connection, or anything not ready in 8 seconds, swaps back to the recreation with a message. Both paths were tested by blocking and hanging the hosts.
- Iframes auto-load only once 60% of the preview is in view, never with reduced motion or Save-Data. They're sandboxed (`allow-scripts allow-same-origin allow-popups`), `referrerpolicy="no-referrer"`, and inert to scrolling until clicked.
- Pixel Pet's live app shows its own XState debug panel in the embedded viewport. That's the deployed app's behaviour, not this site's.

## Technical decisions

- **Next 13.4 → 16.4, React 19.** The old `next export` script no longer exists. Kept: App Router, strict TypeScript, Tailwind (v3 LTS), `next-themes`, the `@/*` alias and **static export**, which deploys unchanged to GitHub Pages (the repo's `CNAME`) or Vercel.
- **Deleted:** the starter Navbar, ThemeSwitcher, `provider.tsx` (it caused a theme flash), the default favicon and SVGs, and the old nav CSS. The new favicon is three dots in the flagship accents (`app/icon.svg`).
- **Framer Motion and GSAP are not used.** Framer Motion was built in, then measured: it was 43 KB gzipped on every page, mostly to run scroll reveals. Motion is now CSS driven by one shared IntersectionObserver (`components/layout/RevealObserver.tsx`). The work filters use the native View Transitions API, and the magnetic button and intro line use small rAF loops. GSAP was never needed. This is what brought initial JS from ~210 KB to under 150 KB.
- **tailwind-merge removed** (8.7 KB on every page); `cn()` is plain `clsx`, and no component passes conflicting utilities.
- **CSS-first above the fold.** The hero name, the case-study titles and their first lines animate with CSS keyframes, so they paint before hydration (LCP). The hero glyphs' weight settles 800 → 560 without reflow: an invisible copy at the final weight reserves each glyph's slot (CLS).
- **Hero anchored from the top.** Bottom-anchored, a web-font swap re-wrapped the paragraph and moved everything above it (CLS 0.06 → 0.01).
- **Accent system:** each project has `accent` (dark theme) and `accentOnLight` (darker sibling, ≥ 4.5:1 on paper and surface, enforced by `tests/accent.test.ts`). `--accent-dark`/`--accent-light` are registered with `@property`, so the page accent cross-fades in CSS. `--accent` is re-declared on every element so themed subtrees resolve it against their own pair.
- **One layout animation:** the experience timeline opens with a `grid-template-rows` transition. It's the only place the site animates layout, because an accordion can't open with transforms alone.
- **Theme:** dark by default; the toggle cycles dark → light → system. To follow the OS on first visit instead, set `defaultTheme="system"` in `components/layout/Providers.tsx`.
- **Type:** Bricolage Grotesque (variable `wght`/`wdth`/`opsz`) for display, Geist for body, Geist Mono for metadata, all via `next/font`. The OG images use static TTF cuts of Bricolage Grotesque and Geist Mono, committed in `assets/og/` (both SIL Open Font License).
- **OG images** are a static route handler writing real `.png` files (`/og/home.png`, `/og/<slug>.png`). Static export writes `opengraph-image` files without an extension, which hosts serve with the wrong content type.
- **Syntax highlighting** is a ~50-line build-time tokenizer (`lib/highlight.ts`) rather than a dependency; it ships no JS and is tested to round-trip every excerpt losslessly.
- **Page transitions** wipe only on forward client navigation, not on first load or back/forward. They're decided purely during render (Suspense can discard renders) and deduplicated across the nested `app/` and `app/work/` templates.

## Verification (11 Oct 2026, local static build)

- **Lighthouse, DevTools throttling:**
  - Mobile: Performance 98–100, Accessibility 100, Best Practices 100, SEO 100; LCP 1.5–1.6s, CLS ≤ 0.014, TBT ≤ 20ms.
  - Desktop: 98–100 / 100 / 100 / 100.
- **Lighthouse, simulated throttling (the default):** Performance 90–91 on mobile, but it *estimates* LCP at ~3.5s. A trace in throttled Chromium measured LCP at ~0.7s. Re-check against the deployed site in PageSpeed Insights.
- **JS at load:** 146–150 KB gzipped per route, of which ~118 KB is React + the Next runtime. Lenis and the cursor load afterwards (~10 KB).
- All 17 routes at 360px: no horizontal overflow and no console messages. A reduced-motion pass and a keyboard walkthrough were done, and `/resume` printed to a clean two-page A4 PDF.
- **Not yet done:** a check on a physical phone, and a check with a public link-preview debugger. Both need the deployed URL.
