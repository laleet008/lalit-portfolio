import Link from "next/link";
import { AccentSection } from "./AccentSection";
import { Button } from "@/components/ui/Button";
import { ChipList } from "@/components/ui/Chip";
import { Reveal } from "@/components/ui/Reveal";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { ProjectPreview } from "@/components/preview/ProjectPreview";
import { site, type Project } from "@/content";
import { cn } from "@/lib/cn";

/** One flagship panel. Odd panels mirror the layout so the scroll has rhythm. */
export function FeaturedProject({ project, index, total }: { project: Project; index: number; total: number }) {
  const mirrored = index % 2 === 1;
  const headingId = `featured-${project.slug}`;
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <AccentSection pair={project} labelledBy={headingId} className="border-t border-line px-gutter py-20 md:py-32">
      <div className="mx-auto grid grid-cols-1 max-w-page items-center gap-12 md:grid-cols-12 md:gap-10">
        <div className={cn("md:col-span-5", mirrored && "md:order-2 md:col-start-8")}>
          <p className="flex items-center gap-3 font-mono text-meta uppercase text-dim">
            <span className="text-accent">
              {pad(index + 1)} / {pad(total)}
            </span>
            <span aria-hidden className="h-px w-8 bg-accent" />
            <ScrambleText text={`${project.year} · ${site.status[project.status]}`} />
          </p>
          <Reveal variant="maskUp" className="mt-6">
            <h3 id={headingId} className="font-display text-display">
              <Link href={`/work/${project.slug}`} className="transition-colors duration-300 hover:text-accent" data-cursor="view">
                {project.title}
              </Link>
            </h3>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-xl leading-snug md:text-2xl">{project.tagline}</p>
            <p className="mt-5 max-w-prose text-dim">{project.summary}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <ChipList items={project.stack.slice(0, 6)} className="mt-8" />
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              <Button href={`/work/${project.slug}`} variant="text">
                {site.cta.caseStudy} →
              </Button>
              {project.liveUrl && (
                <Button href={project.liveUrl} variant="text" external>
                  {site.cta.live} ↗
                </Button>
              )}
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.15} className={cn("md:col-span-7", mirrored && "md:order-1 md:col-start-1 md:row-start-1")}>
          <ProjectPreview project={project} />
        </Reveal>
      </div>
    </AccentSection>
  );
}
