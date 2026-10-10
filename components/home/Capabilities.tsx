import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { STAGGER } from "@/lib/motion";
import type { Capability } from "@/content";

export function Capabilities({ items }: { items: Capability[] }) {
  return (
    <Reveal as="ul" stagger={STAGGER.items} className="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4 xl:gap-8">
      {items.map((c, i) => (
        <li key={c.id}>
          <RevealItem>
            <p className="font-mono text-meta text-dim">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="mt-4 font-display text-2xl tracking-tight">{c.title}</h3>
            <p className="mt-4 text-dim">{c.body}</p>
            <ul className="mt-6 space-y-1 border-t border-line pt-4 font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-dim">
              {c.evidence.map((e) => (
                <li key={e}>↳ {e}</li>
              ))}
            </ul>
          </RevealItem>
        </li>
      ))}
    </Reveal>
  );
}
