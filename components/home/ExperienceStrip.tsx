import { Button } from "@/components/ui/Button";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { site, type Role } from "@/content";
import { formatYears } from "@/lib/format";
import { STAGGER } from "@/lib/motion";

export function ExperienceStrip({ roles }: { roles: Role[] }) {
  return (
    <>
      <Reveal as="ol" stagger={STAGGER.items} className="border-b border-line">
        {roles.map((r) => (
          <li key={r.id} className="border-t border-line">
            <RevealItem className="grid grid-cols-1 gap-2 py-6 md:grid-cols-12 md:gap-8">
              <p className="font-mono text-meta uppercase text-dim md:col-span-2 md:pt-1.5">
                {formatYears(r.start, r.end, site.home.present)}
              </p>
              <h3 className="font-display text-xl tracking-tight md:col-span-4 md:text-2xl">
                {r.title}
                <span className="text-dim">, {r.company}</span>
              </h3>
              <p className="text-dim md:col-span-6">{r.summary}</p>
            </RevealItem>
          </li>
        ))}
      </Reveal>
      <div className="mt-8">
        <Button href="/about" variant="text">
          {site.cta.about} →
        </Button>
      </div>
    </>
  );
}
