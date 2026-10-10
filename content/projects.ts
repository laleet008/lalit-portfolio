import { ProjectsSchema, type Project } from "./schema";
import { kineticTypeLab } from "./projects/kinetic-type-lab";
import { chaiAndCo } from "./projects/chai-and-co";
import { pixelPet } from "./projects/pixel-pet";
import { workProjects } from "./projects/work";

/* Order here is display order: flagships first, then CV work, newest first. */
export const projects: Project[] = ProjectsSchema.parse([kineticTypeLab, chaiAndCo, pixelPet, ...workProjects]);

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Neighbours for prev/next navigation, wrapping at both ends. */
export function getAdjacentProjects(slug: string): { prev: Project; next: Project } {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) throw new Error(`Unknown project: ${slug}`);
  const n = projects.length;
  return { prev: projects[(i - 1 + n) % n], next: projects[(i + 1) % n] };
}
