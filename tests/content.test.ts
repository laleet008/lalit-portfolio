import { describe, expect, it } from "vitest";
import { ProjectSchema, ProjectsSchema, RoleSchema, type ProjectInput } from "@/content/schema";
import * as content from "@/content";
import { kineticTypeLab } from "@/content/projects/kinetic-type-lab";

describe("content parses", () => {
  it("loads every collection", () => {
    expect(content.profile.name).toBe("Lalit Puri");
    expect(content.projects.length).toBeGreaterThan(3);
    expect(content.experience).toHaveLength(3);
    expect(content.skills.length).toBeGreaterThan(0);
    expect(content.education).toHaveLength(1);
  });

  it("has exactly the three flagships, in order", () => {
    expect(content.featuredProjects.map((p) => p.slug)).toEqual(["kinetic-type-lab", "chai-and-co", "pixel-pet"]);
  });

  it("gives every featured highlight with a code excerpt a real source file", () => {
    for (const p of content.featuredProjects) {
      for (const h of p.highlights) {
        if (h.code) expect(h.code.file).toMatch(/^src\//);
      }
    }
  });

  it("wraps prev/next at both ends", () => {
    const first = content.projects[0];
    const last = content.projects[content.projects.length - 1];
    expect(content.getAdjacentProjects(first.slug).prev.slug).toBe(last.slug);
    expect(content.getAdjacentProjects(last.slug).next.slug).toBe(first.slug);
  });

  it("orders roles newest first", () => {
    const starts = content.experience.map((r) => r.start);
    expect([...starts].sort().reverse()).toEqual(starts);
  });
});

describe("honesty guard", () => {
  const all = JSON.stringify(content);
  it.each([/lorem ipsum/i, /\bTODO\b/, /trusted by/i, /\b\d+x (faster|better|more)\b/i, /passionate/i])(
    "contains no %s",
    (pattern) => expect(all).not.toMatch(pattern),
  );
});

describe("schema rejects bad entries", () => {
  const good: ProjectInput = kineticTypeLab;

  it("rejects a malformed accent", () => {
    expect(ProjectSchema.safeParse({ ...good, accent: "lime" }).success).toBe(false);
  });

  it("rejects a featured project with too few highlights", () => {
    expect(ProjectSchema.safeParse({ ...good, highlights: good.highlights.slice(0, 2) }).success).toBe(false);
  });

  it("rejects a live project without a URL", () => {
    expect(ProjectSchema.safeParse({ ...good, liveUrl: undefined }).success).toBe(false);
  });

  it("rejects work projects that don't name the organisation", () => {
    expect(ProjectSchema.safeParse({ ...good, featured: false, context: "work" }).success).toBe(false);
  });

  it("rejects duplicate slugs and the wrong number of flagships", () => {
    expect(ProjectsSchema.safeParse([good, good]).success).toBe(false);
  });

  it("rejects a role that ends before it starts", () => {
    const role = { id: "x", company: "X", title: "Y", start: "2024-05", end: "2023-01", summary: "s", groups: [{ bullets: ["b"] }] };
    expect(RoleSchema.safeParse(role).success).toBe(false);
  });
});
