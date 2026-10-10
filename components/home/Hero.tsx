import type { CSSProperties } from "react";
import { HeroMesh } from "./HeroMesh";
import { Button } from "@/components/ui/Button";
import { KineticHeading } from "@/components/ui/KineticHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { featuredProjects, profile, site } from "@/content";

/* Above the fold, so every entrance here is CSS: it starts at first paint instead of waiting for hydration (LCP). */
export function Hero() {
  return (
    <section className="relative isolate min-h-svh px-gutter pb-12 pt-[max(8rem,30svh)] md:pb-16">
      <HeroMesh colors={featuredProjects.map((p) => p.accent)} />
      <div className="mx-auto w-full max-w-page">
        <p className="mb-6 font-mono text-meta uppercase text-dim">
          <ScrambleText text={`${profile.role} — ${profile.location.display}`} />
        </p>
        <KineticHeading text={profile.name} className="font-display text-hero" />
        <div className="mt-10 grid grid-cols-1 gap-10 border-t border-line pt-8 md:grid-cols-12">
          <div className="hero-rise hero-rise--lcp md:col-span-6" style={{ "--rise": "0.25s" } as CSSProperties}>
            <p className="max-w-[30ch] text-xl leading-snug md:text-2xl">{profile.positioning}</p>
          </div>
          <div className="hero-rise md:col-span-3" style={{ "--rise": "0.35s" } as CSSProperties}>
            <dl className="space-y-4 font-mono text-meta uppercase">
              <div>
                <dt className="text-dim">{site.home.availability}</dt>
                <dd className="mt-1 flex items-center gap-2">
                  <span aria-hidden className="h-2 w-2 rounded-full bg-[#5FD4B0] shadow-[0_0_0_4px_rgb(95_212_176/0.15)]" />
                  {profile.availability.label}
                </dd>
              </div>
              <div>
                <dt className="text-dim">{site.home.based}</dt>
                <dd className="mt-1">{profile.location.display}</dd>
              </div>
            </dl>
          </div>
          <div className="hero-rise flex flex-wrap items-start gap-3 md:col-span-3 md:justify-end" style={{ "--rise": "0.45s" } as CSSProperties}>
            <MagneticButton>
              <Button href="/work">{site.cta.work}</Button>
            </MagneticButton>
            <MagneticButton>
              <Button href={profile.cv.href} variant="ghost" download={profile.cv.filename}>
                {site.cta.cv}
              </Button>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
