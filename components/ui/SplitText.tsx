import { Fragment, type CSSProperties } from "react";
import { STAGGER } from "@/lib/motion";
import { splitGraphemes } from "@/lib/text";

const TAGS = { h1: "h1", h2: "h2", h3: "h3", p: "p", span: "span" } as const;

type Props = {
  text: string;
  as?: keyof typeof TAGS;
  /** Animate per grapheme or per word. */
  by?: "char" | "word";
  delay?: number;
  stagger?: number;
  className?: string;
};

/**
 * Kinetic text reveal on scroll: each unit rises out of a mask. A server
 * component; RevealObserver triggers it and CSS animates it. Screen readers
 * get the plain string; the animated spans are hidden from them.
 */
export function SplitText({ text, as = "span", by = "char", delay = 0, stagger, className }: Props) {
  const Tag = TAGS[as];
  const words = text.split(/\s+/).filter(Boolean).map((w) => (by === "char" ? splitGraphemes(w) : [w]));
  const step = stagger ?? (by === "char" ? STAGGER.chars : STAGGER.words);
  let i = 0;

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden data-observe="" data-split="" style={{ "--delay": `${delay}s`, "--stagger": `${step}s` } as CSSProperties}>
        {words.map((units, wi) => (
          <Fragment key={wi}>
            <span className="inline-block whitespace-nowrap">
              {units.map((u, ui) => (
                <span key={ui} className="split__mask">
                  <span className="split__unit" style={{ "--i": i++ } as CSSProperties}>
                    {u}
                  </span>
                </span>
              ))}
            </span>
            {wi < words.length - 1 && " "}
          </Fragment>
        ))}
      </span>
    </Tag>
  );
}
