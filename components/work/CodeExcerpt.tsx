import { site, type CodeExcerpt as Excerpt } from "@/content";
import { tokenize } from "@/lib/highlight";

/** Syntax-highlighted at build time; scrolls horizontally rather than wrapping. */
export function CodeExcerpt({ code, repoUrl }: { code: Excerpt; repoUrl?: string }) {
  const href = repoUrl ? `${repoUrl.replace(/\/$/, "")}/blob/main/${code.file}` : undefined;
  return (
    <figure className="border border-line bg-surface">
      <figcaption className="flex items-center justify-between gap-4 border-b border-line px-4 py-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-dim">
        <span>
          {site.caseStudy.code}{" "}
          {href ? (
            <a href={href} target="_blank" rel="noopener noreferrer" className="normal-case text-fg underline decoration-line underline-offset-4 hover:text-accent">
              {code.file}
            </a>
          ) : (
            <span className="normal-case text-fg">{code.file}</span>
          )}
        </span>
        <span aria-hidden>{code.lang}</span>
      </figcaption>
      <pre tabIndex={0} className="overflow-x-auto p-4 font-mono text-[0.8125rem] leading-relaxed md:p-6" data-lenis-prevent>
        <code>
          {tokenize(code.source).map((t, i) => (
            <span key={i} className={`tok-${t.kind}`}>
              {t.text}
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}
