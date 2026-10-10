import { site, type Profile } from "@/content";

/** The owner edits this in one place: content/profile.ts → currently. */
export function Currently({ currently }: { currently: Profile["currently"] }) {
  const all: [string, string | undefined][] = [
    [site.about.building, currently.building],
    [site.about.learning, currently.learning],
    [site.about.reading, currently.reading],
  ];
  const rows = all.filter((r): r is [string, string] => Boolean(r[1]));

  return (
    <aside aria-labelledby="currently" className="border border-line bg-surface p-6">
      <h2 id="currently" className="flex items-center gap-2 font-mono text-meta uppercase text-dim">
        <span aria-hidden className="h-2 w-2 animate-pulse rounded-full bg-accent motion-reduce:animate-none" />
        {site.about.currently}
      </h2>
      <dl className="mt-5 space-y-4">
        {rows.map(([k, v]) => (
          <div key={k}>
            <dt className="font-mono text-meta uppercase text-dim">{k}</dt>
            <dd className="mt-1">{v}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
