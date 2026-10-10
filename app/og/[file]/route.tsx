import { getProject, profile, projects, site } from "@/content";
import { renderOg } from "@/lib/og";
import { tokens } from "@/lib/theme";

/*
 * OG cards as real .png files (/og/home.png, /og/<slug>.png). A route handler
 * rather than opengraph-image.tsx because static export writes those without
 * an extension, which static hosts then serve with the wrong content type.
 */
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ file: "home.png" }, ...projects.map((p) => ({ file: `${p.slug}.png` }))];
}

const host = site.url.replace(/^https?:\/\//, "");

export async function GET(_req: Request, { params }: { params: Promise<{ file: string }> }) {
  const slug = (await params).file.replace(/\.png$/, "");
  const project = getProject(slug);

  if (!project) {
    return renderOg({
      eyebrow: `${profile.role} · ${profile.location.display}`,
      title: profile.name,
      subtitle: profile.positioning,
      accent: tokens.dark.fg,
      footer: host,
    });
  }
  return renderOg({
    eyebrow: `${project.year} · ${project.organisation ?? site.context[project.context]}`,
    title: project.title,
    subtitle: project.tagline,
    accent: project.accent,
    footer: `${site.name} · ${host}/work/${project.slug}`,
  });
}
