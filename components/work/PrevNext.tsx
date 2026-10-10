import Link from "next/link";
import { site, type Project } from "@/content";
import { accentStyle } from "@/lib/accent";

function Side({ project, label, align }: { project: Project; label: string; align: "left" | "right" }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      style={accentStyle(project)}
      className={`group relative block overflow-hidden p-6 md:p-10 ${align === "right" ? "text-right" : ""}`}
      data-cursor="view"
    >
      <span
        aria-hidden
        className={`absolute inset-0 -z-10 scale-x-0 transition-transform duration-500 ease-out-expo group-hover:scale-x-100 ${align === "right" ? "origin-right" : "origin-left"}`}
        style={{ background: "color-mix(in srgb, var(--accent) 10%, transparent)" }}
      />
      <span className="font-mono text-meta uppercase text-dim">
        {align === "left" ? `← ${label}` : `${label} →`}
      </span>
      <span className="mt-3 block font-display text-[clamp(1.5rem,4vw,3rem)] leading-tight tracking-tight transition-colors group-hover:text-accent">
        {project.title}
      </span>
    </Link>
  );
}

export function PrevNext({ prev, next }: { prev: Project; next: Project }) {
  return (
    <nav aria-label={site.cta.allWork} className="grid grid-cols-1 border-t border-line md:grid-cols-2 md:divide-x md:divide-line">
      <Side project={prev} label={site.caseStudy.prev} align="left" />
      <Side project={next} label={site.caseStudy.nextProject} align="right" />
    </nav>
  );
}
