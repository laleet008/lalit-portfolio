import { Fragment, type CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { splitGraphemes } from "@/lib/text";

/*
 * The hero's kinetic type reveal, in CSS so it starts at first paint and
 * needs no JavaScript. Each glyph rises out of a mask while its weight settles
 * from heavy to regular. An invisible copy at the final weight reserves the
 * slot, and the moving glyph is absolutely positioned over it, so the weight
 * change never reflows the line (no layout shift). Timing lives in globals.css.
 */
export function KineticHeading({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  let index = 0;

  return (
    <h1 className={cn("kinetic", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="select-none">
        {words.map((word, wi) => (
          <Fragment key={wi}>
            <span className="inline-block whitespace-nowrap">
              {splitGraphemes(word).map((ch, ci) => (
                <span key={ci} className="kinetic__slot">
                  <span className="kinetic__ghost">{ch}</span>
                  <span className="kinetic__glyph" style={{ "--i": index++ } as CSSProperties}>
                    {ch}
                  </span>
                </span>
              ))}
            </span>
            {wi < words.length - 1 && " "}
          </Fragment>
        ))}
      </span>
    </h1>
  );
}
