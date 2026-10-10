import { Children, cloneElement, isValidElement, type CSSProperties, type ReactElement, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { RevealVariant } from "@/lib/motion";

type Tag = "div" | "section" | "header" | "figure" | "p" | "li" | "ul" | "ol" | "span";

type Props = {
  children: ReactNode;
  as?: Tag;
  variant?: RevealVariant;
  /** Seconds before this element (or the first staggered child) starts. */
  delay?: number;
  /** When set, direct children reveal in sequence, `stagger` seconds apart. */
  stagger?: number;
  className?: string;
};

/**
 * The one scroll-reveal primitive. A server component: it only sets data
 * attributes. RevealObserver marks it in view, CSS animates it (fade-up,
 * fade or mask-up), and reduced motion turns every variant into a fade.
 */
export function Reveal({ children, as: Tag = "div", variant = "fadeUp", delay = 0, stagger, className }: Props) {
  const style = { "--delay": `${delay}s`, ...(stagger !== undefined && { "--stagger": `${stagger}s` }) } as CSSProperties;

  if (stagger !== undefined) {
    const items = Children.map(children, (child, i) =>
      isValidElement<{ style?: CSSProperties }>(child)
        ? cloneElement(child as ReactElement<{ style?: CSSProperties }>, { style: { ...child.props.style, "--i": i } as CSSProperties })
        : child,
    );
    return (
      <Tag data-observe="" data-reveal-group="" className={className} style={style}>
        {items}
      </Tag>
    );
  }

  if (variant === "maskUp") {
    return (
      <Tag data-observe="" data-reveal="maskUp" className={cn("block overflow-hidden", className)} style={style}>
        <span className="block">{children}</span>
      </Tag>
    );
  }

  return (
    <Tag data-observe="" data-reveal={variant} className={className} style={style}>
      {children}
    </Tag>
  );
}

/** A child of a staggered `Reveal`; its position comes from the parent's `--i`. */
export function RevealItem({ children, variant = "fadeUp", className }: { children: ReactNode; variant?: RevealVariant; className?: string }) {
  return (
    <div data-reveal-item={variant} className={className}>
      {children}
    </div>
  );
}
