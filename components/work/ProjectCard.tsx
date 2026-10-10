import Link from "next/link";
import { ChipList } from "@/components/ui/Chip";
import { site, type Project } from "@/content";
import { accentStyle } from "@/lib/accent";
import { cn } from "@/lib/cn";

/** Card for the work grid and the home "also built" list. The whole card is one link. */
export function ProjectCard({ project, className, headingLevel = "h3" }: { project: Project; className?: string; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  const meta = [project.year, project.organisation ?? site.context[project.context], site.status[project.status]];

  return (
    <article
      style={accentStyle(project)}
      className={cn("group relative flex h-full flex-col border-t border-line pt-5 transition-colors duration-300 hover:border-accent", className)}
    >
      <span aria-hidden className="absolute inset-x-0 top-[-1px] h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out-expo group-hover:scale-x-100" />
      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-dim">{meta.join(" · ")}</p>
      <Heading className="mt-3 font-display text-2xl leading-tight tracking-tight md:text-[1.75rem]">
        <Link href={`/work/${project.slug}`} className="after:absolute after:inset-0 group-hover:text-accent" data-cursor="view">
          {project.title}
        </Link>
      </Heading>
      <p className="mt-2 text-dim">{project.tagline}</p>
      <ChipList items={project.stack.slice(0, 4)} className="mt-auto pt-6" />
    </article>
  );
}
