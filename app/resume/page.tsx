import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { education, experience, featuredProjects, profile, site, skills } from "@/content";
import { formatRange } from "@/lib/format";

export const metadata: Metadata = {
  title: site.resume.heading,
  description: `${profile.name}, ${profile.role}. ${profile.resumeSummary[0]}`,
  alternates: { canonical: "/resume/" },
};

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="resume-h2 mb-4 border-b border-fg pb-1.5 font-mono text-meta font-semibold uppercase tracking-[0.12em]">
      {children}
    </h2>
  );
}

export default function ResumePage() {
  const contact = [profile.email, profile.phone, profile.location.full];
  const links = [site.url, ...profile.socials.map((s) => s.url)].map((u) => u.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""));

  return (
    <main id="main" tabIndex={-1} className="px-gutter pb-32 pt-28 md:pt-36 print:p-0">
      <div className="mx-auto mb-12 flex max-w-3xl flex-wrap items-end justify-between gap-6 print:hidden">
        <p className="max-w-md text-dim">{site.resume.intro}</p>
        <Button href={profile.cv.href} download={profile.cv.filename}>
          {site.cta.cvPdf} ↓
        </Button>
      </div>

      <article className="resume mx-auto max-w-3xl border border-line bg-surface p-6 md:p-12 print:max-w-none print:border-0 print:bg-transparent print:p-0">
        <header className="mb-8">
          <h1 className="font-display text-5xl tracking-tight print:text-[26pt]">{profile.name}</h1>
          <p className="mt-1 text-xl print:text-[13pt]">{profile.role}</p>
          <p className="mt-3 font-mono text-[0.75rem] text-dim">{contact.join(" · ")}</p>
          <p className="font-mono text-[0.75rem] text-dim">{links.join(" · ")}</p>
        </header>

        <section className="mb-8 space-y-3">
          <H2>{site.resume.profile}</H2>
          {profile.resumeSummary.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
        </section>

        <section className="mb-8">
          <H2>{site.resume.experience}</H2>
          <div className="space-y-6">
            {experience.map((r) => (
              <div key={r.id}>
                <div className="resume-keep flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="font-semibold">
                    {r.title}, <span className="font-normal italic">{r.company}</span>
                  </h3>
                  <p className="font-mono text-[0.75rem] text-dim">{formatRange(r.start, r.end, site.home.present)}</p>
                </div>
                {r.groups.map((g, i) => (
                  <div key={i} className="resume-keep mt-2">
                    {g.heading && <h4 className="text-[0.9em] font-semibold">{g.heading}</h4>}
                    <ul className="list-disc space-y-0.5 pl-5">
                      {g.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section className="resume-keep mb-8">
          <H2>{site.resume.projects}</H2>
          <ul className="space-y-1.5">
            {featuredProjects.map((p) => (
              <li key={p.slug}>
                <span className="font-semibold">{p.title}</span> — {p.tagline}{" "}
                <span className="font-mono text-[0.75rem] text-dim">{p.liveUrl?.replace(/^https:\/\//, "").replace(/\/$/, "")}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="resume-keep mb-8">
          <H2>{site.resume.education}</H2>
          {education.map((e) => (
            <div key={e.institution} className="flex flex-wrap items-baseline justify-between gap-x-4">
              <p>
                <span className="font-semibold">
                  {e.degree} {e.field}
                </span>
                , <span className="italic">{e.institution}</span>
              </p>
              <p className="font-mono text-[0.75rem] text-dim">
                {e.start} – {e.end}
              </p>
            </div>
          ))}
        </section>

        <section className="resume-keep mb-8">
          <H2>{site.resume.skills}</H2>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
            {skills.map((g) => (
              <div key={g.id}>
                <dt className="font-semibold">{g.label}</dt>
                <dd className="text-dim">{g.skills.map((s) => s.name).join(", ")}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="resume-keep">
          <H2>{site.resume.softSkills}</H2>
          <ul className="list-disc space-y-0.5 pl-5">
            {profile.strengths.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>
      </article>
    </main>
  );
}
