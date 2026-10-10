import { Fragment } from "react";

/** Renders `backtick` spans in content strings as inline code. Nothing else. */
export function RichText({ text }: { text: string }) {
  const parts = text.split("`");
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <code key={i} className="rounded-sm bg-surface px-1 py-0.5 font-mono text-[0.88em] text-fg">
            {part}
          </code>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
