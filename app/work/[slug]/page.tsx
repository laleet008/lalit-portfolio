import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AccentRoute } from "@/components/layout/AccentRoute";
import { JsonLd } from "@/components/layout/JsonLd";
import { ProjectPreview } from "@/components/preview/ProjectPreview";
import { CaseStudyHeader } from "@/components/work/CaseStudyHeader";
import { PrevNext } from "@/components/work/PrevNext";
import { TechHighlight } from "@/components/work/TechHighlight";
import { Reveal } from "@/components/ui/Reveal";
import { RichText } from "@/components/ui/RichText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { getAdjacentProjects, getProject, projects, site } from "@/content";
import { accentStyle } from "@/lib/accent";
import { creativeWorkJsonLd, ogImages } from "@/lib/seo";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.tagline,
    alternates: { canonical: `/work/${project.slug}/` },
    ...ogImages(project.slug, `${project.title}: ${project.tagline}`, `/work/${project.slug}/`),
  };
}

function Prose({ index, label, id, text }: { index: string; label: string; id: string; text: string }) {
  return (
    <section aria-labelledby={id} className="grid grid-cols-1 gap-6 md:grid-cols-12">
      <SectionLabel index={index} label={label} id={id} className="md:col-span-12" />
      <Reveal className="md:col-span-8 md:col-start-5">
        <p className="text-xl leading-relaxed md:text-2xl">
          <RichText text={text} />
        </p>
      </Reveal>
    </section>
  );
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const { prev, next } = getAdjacentProjects(project.slug);
  const sections = [
    { label: site.caseStudy.brief, text: project.summary, id: "brief" },
    ...(project.problem ? [{ label: site.caseStudy.problem, text: project.problem, id: "problem" }] : []),
    { label: site.caseStudy.approach, text: project.approach, id: "approach" },
  ];
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <main id="main" tabIndex={-1} style={accentStyle(project)}>
      <AccentRoute accent={project.accent} accentOnLight={project.accentOnLight} />
      <JsonLd data={creativeWorkJsonLd(project)} />
      <CaseStudyHeader project={project} />

      {project.liveUrl && project.preview && (
        <div className="px-gutter pt-14 md:pt-20">
          <Reveal className={project.preview === "handheld" ? "mx-auto max-w-md" : "mx-auto max-w-page"}>
            <ProjectPreview project={project} />
          </Reveal>
        </div>
      )}

      <div className="mx-auto max-w-page space-y-24 px-gutter py-20 md:space-y-32 md:py-28">
        {!project.repoUrl && !project.liveUrl && (
          <p className="max-w-prose border-l-2 border-accent pl-4 font-mono text-meta uppercase leading-relaxed text-dim">
            {site.caseStudy.noPublicCode}
          </p>
        )}
        {sections.map((s, i) => (
          <Prose key={s.id} index={pad(i + 1)} label={s.label} id={s.id} text={s.text} />
        ))}

        <section aria-labelledby="interesting" className="space-y-14">
          <SectionLabel index={pad(sections.length + 1)} label={site.caseStudy.interesting} id="interesting" />
          {project.highlights.map((h, i) => (
            <TechHighlight key={h.title} highlight={h} index={i} repoUrl={project.repoUrl} />
          ))}
        </section>

        {project.next && <Prose index={pad(sections.length + 2)} label={site.caseStudy.next} id="next" text={project.next} />}
      </div>

      <PrevNext prev={prev} next={next} />
    </main>
  );
}
