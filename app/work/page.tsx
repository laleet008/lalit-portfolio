import type { Metadata } from "next";
import { ProjectCard } from "@/components/work/ProjectCard";
import { ProjectFilters } from "@/components/work/ProjectFilters";
import { KineticHeading } from "@/components/ui/KineticHeading";
import { Rise } from "@/components/ui/Rise";
import { projects, site } from "@/content";

export const metadata: Metadata = {
  title: site.work.heading,
  description: site.work.intro,
  alternates: { canonical: "/work/" },
};

const GROUPS = ["personal", "work", "internship"] as const;

export default function WorkPage() {
  const items = projects.map((p) => ({ slug: p.slug, group: p.context, node: <ProjectCard project={p} headingLevel="h2" /> }));
  const options = GROUPS.map((g) => ({
    value: g,
    label: site.context[g],
    count: projects.filter((p) => p.context === g).length,
  })).filter((o) => o.count > 0);

  return (
    <main id="main" tabIndex={-1} className="px-gutter pb-32 pt-28 md:pt-36">
      <div className="mx-auto max-w-page">
        <KineticHeading text={site.work.heading} className="font-display text-hero" />
        <Rise delay={0.2} lcp>
          <p className="mt-8 max-w-prose text-lg text-dim">{site.work.intro}</p>
        </Rise>
        <Rise delay={0.3} className="mt-14">
          <ProjectFilters items={items} options={options} />
        </Rise>
      </div>
    </main>
  );
}
