import type { ReactNode } from "react";
import { site } from "@/content/site";

/**
 * A handheld shell in Pixel Pet's own idiom: a pastel egg-ish body, an inset
 * screen and three round buttons. Purely decorative around the real screen.
 */
export function DeviceChrome({ url, title, label, children }: { url: string; title: string; label: string; children: ReactNode }) {
  return (
    <figure className="mx-auto w-full max-w-[22rem]">
      <div className="rounded-[3rem] bg-accent p-5 pb-8 shadow-[inset_0_-10px_0_rgb(0_0_0/0.15),0_40px_80px_-40px_rgb(0_0_0/0.6)]">
        <p aria-hidden className="mb-3 text-center font-mono text-[0.625rem] uppercase tracking-[0.2em] text-bg/70">
          {label}
        </p>
        <div className="relative aspect-[390/600] overflow-hidden rounded-[1.25rem] border-4 border-bg/80 bg-bg">
          {children}
        </div>
        <div aria-hidden className="mt-5 flex justify-center gap-5">
          <span className="h-7 w-7 rounded-full bg-bg/25 shadow-[inset_0_-3px_0_rgb(0_0_0/0.2)]" />
          <span className="mt-3 h-7 w-7 rounded-full bg-bg/25 shadow-[inset_0_-3px_0_rgb(0_0_0/0.2)]" />
          <span className="h-7 w-7 rounded-full bg-bg/25 shadow-[inset_0_-3px_0_rgb(0_0_0/0.2)]" />
        </div>
      </div>
      <figcaption className="mt-4 text-center">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-meta uppercase text-dim transition-colors hover:text-accent"
          aria-label={`${site.preview.newTab}: ${title}`}
        >
          {site.preview.newTab} ↗
        </a>
      </figcaption>
    </figure>
  );
}
