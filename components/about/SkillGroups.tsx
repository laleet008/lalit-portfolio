import { site, type SkillGroup } from "@/content";
import { cn } from "@/lib/cn";

/** Grouped, ordered skills. No bars or percentages: strongest are marked, the rest listed plainly. */
export function SkillGroups({ groups }: { groups: SkillGroup[] }) {
  return (
    <div>
      <p className="flex items-center gap-2 font-mono text-meta uppercase text-dim">
        <span aria-hidden className="h-2 w-2 rounded-full bg-accent" />
        {site.about.strong}
      </p>
      <div className="mt-8 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((g) => {
          const sorted = [...g.skills].sort((a, b) => (a.level === b.level ? 0 : a.level === "strong" ? -1 : 1));
          return (
            <section key={g.id} aria-labelledby={`skills-${g.id}`} className="border-t border-line pt-4">
              <h3 id={`skills-${g.id}`} className="font-mono text-meta uppercase text-dim">
                {g.label}
              </h3>
              <ul className="mt-4 space-y-1.5">
                {sorted.map((s) => (
                  <li key={s.name} className={cn("flex items-center gap-2.5 text-lg", s.level === "strong" ? "text-fg" : "text-dim")}>
                    <span aria-hidden className={cn("h-1.5 w-1.5 rounded-full", s.level === "strong" ? "bg-accent" : "bg-line")} />
                    {s.name}
                    {s.level === "strong" && <span className="sr-only">({site.about.strong})</span>}
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
