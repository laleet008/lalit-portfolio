import { cn } from "@/lib/cn";

export function Chip({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center border border-line px-2.5 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-dim",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function ChipList({ items, className }: { items: readonly string[]; className?: string }) {
  if (items.length === 0) return null;
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)}>
      {items.map((item) => (
        <li key={item}>
          <Chip>{item}</Chip>
        </li>
      ))}
    </ul>
  );
}
