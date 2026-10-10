import type { ReactNode } from "react";
import { site } from "@/content/site";

/** A quiet browser window: traffic lights, the real URL, and an always-visible new-tab link. */
export function BrowserChrome({ url, title, children }: { url: string; title: string; children: ReactNode }) {
  const display = url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return (
    <figure className="overflow-hidden border border-line bg-surface shadow-[0_40px_80px_-40px_rgb(0_0_0/0.6)]">
      <div className="flex h-10 items-center gap-3 border-b border-line px-3">
        <span aria-hidden className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
        </span>
        <span className="min-w-0 flex-1 truncate rounded-sm bg-bg px-3 py-1 text-center font-mono text-[0.6875rem] text-dim">
          {display}
        </span>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-dim transition-colors hover:text-accent"
          aria-label={`${site.preview.newTab}: ${title}`}
        >
          {site.preview.newTab} ↗
        </a>
      </div>
      <div className="relative aspect-[16/10] w-full">{children}</div>
    </figure>
  );
}
