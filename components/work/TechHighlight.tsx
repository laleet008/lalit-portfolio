import { CodeExcerpt } from "./CodeExcerpt";
import { DiagramFigure } from "./DiagramFigure";
import { Reveal } from "@/components/ui/Reveal";
import { RichText } from "@/components/ui/RichText";
import type { Highlight } from "@/content";

export function TechHighlight({ highlight, index, repoUrl }: { highlight: Highlight; index: number; repoUrl?: string }) {
  return (
    <article className="grid grid-cols-1 gap-8 border-t border-line pt-10 md:grid-cols-12 md:gap-10">
      <Reveal className="md:col-span-5">
        <p className="font-mono text-meta text-accent">{String(index + 1).padStart(2, "0")}</p>
        <h3 className="mt-3 font-display text-[clamp(1.5rem,3vw,2.25rem)] leading-tight tracking-tight">{highlight.title}</h3>
        <div className="mt-6 space-y-4 text-dim">
          {highlight.body.map((p, i) => (
            <p key={i}>
              <RichText text={p} />
            </p>
          ))}
        </div>
      </Reveal>
      {(highlight.diagram || highlight.code) && (
        <div className="min-w-0 space-y-6 md:col-span-7">
          {highlight.diagram && <DiagramFigure id={highlight.diagram} />}
          {highlight.code && (
            <Reveal delay={0.1}>
              <CodeExcerpt code={highlight.code} repoUrl={repoUrl} />
            </Reveal>
          )}
        </div>
      )}
    </article>
  );
}
