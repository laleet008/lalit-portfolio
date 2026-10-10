import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { KineticHeading } from "@/components/ui/KineticHeading";
import { Rise } from "@/components/ui/Rise";
import { site } from "@/content";

export const metadata: Metadata = { title: site.notFound.code, robots: { index: false } };

export default function NotFound() {
  return (
    <main id="main" tabIndex={-1} className="relative flex min-h-svh items-end overflow-hidden px-gutter pb-20 pt-28">
      <p
        aria-hidden
        className="pointer-events-none absolute -right-[4vw] top-[8vh] select-none font-display text-[clamp(10rem,38vw,34rem)] leading-none tracking-[-0.06em] text-line"
      >
        {site.notFound.code}
      </p>
      <div className="relative mx-auto w-full max-w-page">
        <p className="font-mono text-meta uppercase text-accent">{site.notFound.code}</p>
        <KineticHeading text={site.notFound.heading} className="mt-4 max-w-[14ch] font-display text-display" />
        <Rise delay={0.3}>
          <p className="mt-6 max-w-prose text-lg text-dim">{site.notFound.body}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/">{site.cta.home}</Button>
            <Button href="/work" variant="ghost">
              {site.cta.allWork}
            </Button>
          </div>
        </Rise>
      </div>
    </main>
  );
}
