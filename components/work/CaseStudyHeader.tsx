import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ChipList } from "@/components/ui/Chip";
import { KineticHeading } from "@/components/ui/KineticHeading";
import { Rise } from "@/components/ui/Rise";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { site, type Project } from "@/content";

export function CaseStudyHeader({ project }: { project: Project }) {
  const meta = [
    [site.caseStudy.year, project.year],
    [site.caseStudy.role, project.role],
    ...(project.organisation ? [[site.caseStudy.organisation, project.organisation]] : []),
    [site.caseStudy.status, site.status[project.status]],
  ];

  return (
    <header className="relative overflow-hidden border-b border-line px-gutter pb-14 pt-28 md:pb-20 md:pt-36">
      <div aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-accent" />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[20vw] -top-[30vw] -z-10 h-[70vw] w-[70vw] rounded-full opacity-[0.12] [background:radial-gradient(circle,var(--accent)_0%,transparent_62%)]"
      />
      <div className="mx-auto max-w-page">
        <Link href="/work" className="font-mono text-meta uppercase text-dim transition-colors hover:text-accent">
          ← {site.cta.allWork}
        </Link>
        <KineticHeading text={project.title} className={`mt-10 font-display ${project.title.length > 18 ? "text-display" : "text-hero"}`} />
        <Rise delay={0.2} lcp>
          <p className="mt-6 max-w-[30ch] text-xl leading-snug md:text-3xl">{project.tagline}</p>
        </Rise>
        <Rise delay={0.3} className="mt-12 grid grid-cols-1 gap-8 border-t border-line pt-8 md:grid-cols-12">
          <dl className="grid grid-cols-2 gap-6 font-mono text-meta uppercase sm:grid-cols-4 md:col-span-8">
            {meta.map(([k, v]) => (
              <div key={k}>
                <dt className="text-dim">{k}</dt>
                <dd className="mt-1.5 text-fg">
                  <ScrambleText text={v} />
                </dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-wrap items-start gap-3 md:col-span-4 md:justify-end">
            {project.liveUrl && (
              <Button href={project.liveUrl} external>
                {site.cta.live} ↗
              </Button>
            )}
            {project.repoUrl && (
              <Button href={project.repoUrl} variant="ghost" external>
                {site.cta.repo}
              </Button>
            )}
          </div>
          {project.stack.length > 0 && (
            <div className="md:col-span-12">
              <p className="mb-3 font-mono text-meta uppercase text-dim">{site.caseStudy.stack}</p>
              <ChipList items={project.stack} />
            </div>
          )}
        </Rise>
      </div>
    </header>
  );
}
