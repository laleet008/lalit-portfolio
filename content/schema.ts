import { z } from "zod";

/*
 * Every content file parses its data through these schemas at import time.
 * Pages import content during `next build`, so a malformed entry throws and
 * fails the build instead of rendering a blank section.
 */

const text = z.string().trim().min(1);
const hex = z.string().regex(/^#[0-9A-F]{6}$/, "Use uppercase 6-digit hex, e.g. #C6FF4F");
const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use kebab-case");
/** Year-month, e.g. "2025-05". */
const yearMonth = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, "Use YYYY-MM");

/* ------------------------------------------------------------------ profile */

export const SocialSchema = z.object({
  label: text,
  handle: text,
  url: z.url(),
});

export const ProfileSchema = z.object({
  name: text,
  shortName: text,
  role: text,
  positioning: text,
  intro: text,
  bio: text,
  longBio: z.array(text).min(1),
  /** The CV's own profile section, used verbatim on /resume. */
  resumeSummary: z.array(text).min(1),
  location: z.object({ display: text, full: text }),
  email: z.email(),
  phone: text,
  socials: z.array(SocialSchema),
  site: z.url(),
  availability: z.object({ open: z.boolean(), label: text }),
  strengths: z.array(text),
  currently: z.object({
    building: text,
    learning: text.optional(),
    reading: text.optional(),
  }),
  cv: z.object({ href: z.string().startsWith("/"), filename: text }),
});

/* ----------------------------------------------------------------- projects */

export const DIAGRAM_IDS = [
  "grapheme-split",
  "raster-pipeline",
  "param-spec",
  "cursor-proximity",
  "label-texture",
  "fly-to-cart",
  "pet-machine",
  "fixed-timestep",
  "offline-catchup",
] as const;

export const CodeExcerptSchema = z.object({
  lang: z.enum(["ts", "tsx"]),
  /** Path of the real source file the excerpt is taken from. */
  file: text,
  source: text,
});

export const HighlightSchema = z.object({
  title: text,
  body: z.array(text).min(1),
  code: CodeExcerptSchema.optional(),
  diagram: z.enum(DIAGRAM_IDS).optional(),
});

export const ProjectSchema = z
  .object({
    slug,
    title: text,
    tagline: text,
    year: z.string().regex(/^\d{4}(–(\d{4}|Present))?$/, "Use 2026 or 2022–2025 or 2025–Present"),
    role: text,
    context: z.enum(["personal", "work", "internship"]),
    organisation: text.optional(),
    status: z.enum(["live", "archived", "wip"]),
    liveUrl: z.url().optional(),
    repoUrl: z.url().optional(),
    stack: z.array(text),
    summary: text,
    problem: text.optional(),
    approach: text,
    highlights: z.array(HighlightSchema).min(1).max(5),
    next: text.optional(),
    accent: hex,
    /** Darker sibling of `accent` that passes WCAG AA on the light-theme paper. */
    accentOnLight: hex,
    featured: z.boolean(),
    preview: z.enum(["browser", "handheld"]).optional(),
    /** False when the live site refuses framing (X-Frame-Options / frame-ancestors). */
    embeddable: z.boolean().default(true),
  })
  .superRefine((p, ctx) => {
    const issue = (path: string, message: string) =>
      ctx.addIssue({ code: "custom", path: [path], message: `${p.slug}: ${message}` });

    if (p.status === "live" && !p.liveUrl) issue("liveUrl", "live projects need a liveUrl");
    if (p.featured) {
      if (p.highlights.length < 3) issue("highlights", "featured projects need 3–5 highlights");
      if (!p.problem) issue("problem", "featured projects need a problem statement");
      if (!p.next) issue("next", "featured projects need a 'what I'd do next'");
      if (!p.preview) issue("preview", "featured projects need a preview chrome");
      if (p.stack.length === 0) issue("stack", "featured projects need a stack");
    }
    if (p.context !== "personal" && !p.organisation) {
      issue("organisation", "work projects must name the organisation from the CV");
    }
  });

export const ProjectsSchema = z
  .array(ProjectSchema)
  .superRefine((list, ctx) => {
    const seen = new Set<string>();
    for (const p of list) {
      if (seen.has(p.slug)) ctx.addIssue({ code: "custom", message: `Duplicate slug: ${p.slug}` });
      seen.add(p.slug);
    }
    const featured = list.filter((p) => p.featured).length;
    if (featured !== 3) {
      ctx.addIssue({ code: "custom", message: `Expected exactly 3 featured projects, found ${featured}` });
    }
  });

/* --------------------------------------------------------------- experience */

export const RoleSchema = z
  .object({
    id: slug,
    company: text,
    title: text,
    start: yearMonth,
    /** `null` means current role. */
    end: yearMonth.nullable(),
    location: text.optional(),
    summary: text,
    groups: z.array(z.object({ heading: text.optional(), bullets: z.array(text).min(1) })).min(1),
  })
  .refine((r) => r.end === null || r.end >= r.start, {
    message: "Role ends before it starts",
    path: ["end"],
  });

export const ExperienceSchema = z.array(RoleSchema).min(1);

/* ------------------------------------------------------------------- skills */

export const FAMILIARITY = ["strong", "medium"] as const;

export const SkillGroupSchema = z.object({
  id: slug,
  label: text,
  skills: z.array(z.object({ name: text, level: z.enum(FAMILIARITY) })).min(1),
});

export const SkillsSchema = z.array(SkillGroupSchema).min(1);

/* -------------------------------------------------- education, writing, etc */

export const EducationSchema = z.array(
  z.object({
    degree: text,
    field: text,
    institution: text,
    start: z.number().int(),
    end: z.number().int(),
  }),
);

export const CertificationSchema = z.array(
  z.object({ name: text, issuer: text, year: z.number().int(), url: z.url().optional() }),
);

export const WritingSchema = z.array(
  z.object({ title: text, url: z.url(), date: z.iso.date(), summary: text }),
);

export const CapabilitiesSchema = z.array(
  z.object({ id: slug, title: text, body: text, evidence: z.array(text).min(1) }),
);

export type Profile = z.infer<typeof ProfileSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type ProjectInput = z.input<typeof ProjectSchema>;
export type Highlight = z.infer<typeof HighlightSchema>;
export type CodeExcerpt = z.infer<typeof CodeExcerptSchema>;
export type DiagramId = (typeof DIAGRAM_IDS)[number];
export type Role = z.infer<typeof RoleSchema>;
export type SkillGroup = z.infer<typeof SkillGroupSchema>;
export type Education = z.infer<typeof EducationSchema>[number];
export type Certification = z.infer<typeof CertificationSchema>[number];
export type Writing = z.infer<typeof WritingSchema>[number];
export type Capability = z.infer<typeof CapabilitiesSchema>[number];
