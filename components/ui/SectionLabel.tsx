import { cn } from "@/lib/cn";
import { ScrambleText } from "./ScrambleText";

/** Mono label with an index and a hairline rule: the structural device of every section. */
export function SectionLabel({
  index,
  label,
  id,
  className,
}: {
  index: string;
  label: string;
  id?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-4 font-mono text-meta uppercase text-dim", className)}>
      <span className="text-accent transition-colors duration-700">{index}</span>
      <h2 id={id} className="shrink-0">
        <ScrambleText text={label} />
      </h2>
      <span aria-hidden className="h-px flex-1 bg-line" />
    </div>
  );
}
