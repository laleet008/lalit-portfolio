import type { Metadata } from "next";
import { Currently } from "@/components/about/Currently";
import { SkillGroups } from "@/components/about/SkillGroups";
import { Timeline } from "@/components/about/Timeline";
import { KineticHeading } from "@/components/ui/KineticHeading";
import { Rise } from "@/components/ui/Rise";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { certifications, education, experience, profile, site, skills, writing } from "@/content";
import { formatRange } from "@/lib/format";

export const metadata: Metadata = {
  title: site.about.heading,
  description: profile.bio,
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  const roles = experience.map((r) => ({
    id: r.id,
    title: r.title,
    company: r.company,
    dates: formatRange(r.start, r.end, site.home.present),
    summary: r.summary,
    groups: r.groups,
  }));
  let n = 0;
  const idx = () => String(++n).padStart(2, "0");

  return (
    <main id="main" tabIndex={-1} className="px-gutter pb-32 pt-28 md:pt-36">
      <div className="mx-auto max-w-page space-y-24 md:space-y-32">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-8">
            <KineticHeading text={site.about.heading} className="font-display text-hero" />
            <Rise delay={0.2} lcp className="mt-12 space-y-6 text-lg leading-relaxed md:text-xl">
              {profile.longBio.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </Rise>
          </div>
          <Rise delay={0.3} className="space-y-10 md:col-span-4 md:pt-40">
            <Currently currently={profile.currently} />
            <div>
              <h2 className="font-mono text-meta uppercase text-dim">{site.about.strengths}</h2>
              <ul className="mt-4 space-y-2">
                {profile.strengths.map((s) => (
                  <li key={s} className="border-t border-line pt-2">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </Rise>
        </div>

        <section aria-labelledby="experience">
          <SectionLabel index={idx()} label={site.about.experience} id="experience" className="mb-12" />
          <Timeline roles={roles} />
        </section>

        <section aria-labelledby="skills">
          <SectionLabel index={idx()} label={site.about.skills} id="skills" className="mb-6" />
          <p className="mb-8 max-w-prose text-dim">{site.about.skillsNote}</p>
          <SkillGroups groups={skills} />
        </section>

        <section aria-labelledby="education">
          <SectionLabel index={idx()} label={site.about.education} id="education" className="mb-10" />
          <ul className="space-y-6">
            {education.map((e) => (
              <li key={e.institution} className="grid grid-cols-1 gap-2 md:grid-cols-12">
                <p className="font-mono text-meta uppercase text-dim md:col-span-2 md:pt-2">
                  {e.start} – {e.end}
                </p>
                <div className="md:col-span-10">
                  <h3 className="font-display text-2xl tracking-tight">
                    {e.degree}, {e.field}
                  </h3>
                  <p className="text-dim">{e.institution}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {certifications.length > 0 && (
          <section aria-labelledby="certifications">
            <SectionLabel index={idx()} label={site.about.certifications} id="certifications" className="mb-10" />
            <ul className="space-y-3">
              {certifications.map((c) => (
                <li key={c.name}>
                  {c.name} <span className="text-dim">· {c.issuer} · {c.year}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {writing.length > 0 && (
          <section aria-labelledby="writing">
            <SectionLabel index={idx()} label={site.about.writing} id="writing" className="mb-10" />
            <ul className="space-y-6">
              {writing.map((w) => (
                <li key={w.url}>
                  <a href={w.url} className="font-display text-2xl hover:text-accent">
                    {w.title}
                  </a>
                  <p className="text-dim">{w.summary}</p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}
