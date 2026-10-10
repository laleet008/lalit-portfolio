import { ProjectCard } from "@/components/work/ProjectCard";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { STAGGER } from "@/lib/motion";
import type { Project } from "@/content";

export function OtherWork({ intro, projects }: { intro: string; projects: Project[] }) {
  return (
    <>
      <Reveal>
        <p className="max-w-prose text-dim">{intro}</p>
      </Reveal>
      <Reveal as="ul" stagger={STAGGER.items} className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <li key={p.slug}>
            <RevealItem className="h-full">
              <ProjectCard project={p} />
            </RevealItem>
          </li>
        ))}
      </Reveal>
    </>
  );
}
