import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "text";
type Size = "md" | "lg";

type Common = { variant?: Variant; size?: Size; className?: string; children: ReactNode };

type LinkProps = Common &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children" | "href"> & {
    href: string;
    /** Opens in a new tab with safe rel attributes. */
    external?: boolean;
  };

type NativeButtonProps = Common &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & { href?: undefined };

export type ButtonProps = LinkProps | NativeButtonProps;

const base =
  "group/button inline-flex items-center justify-center gap-2 font-mono text-[0.8125rem] uppercase tracking-[0.08em] " +
  "transition-[background-color,color,border-color,opacity] duration-200 ease-out-expo " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent " +
  "disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-fg text-bg hover:bg-accent hover:text-bg",
  ghost: "border border-line text-fg hover:border-accent hover:text-accent",
  text: "text-fg underline decoration-line underline-offset-[0.35em] hover:text-accent hover:decoration-accent",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5",
  lg: "h-14 px-7",
};

export function buttonClasses({ variant = "primary", size = "md", className }: Omit<Common, "children">) {
  return cn(base, variants[variant], variant !== "text" && sizes[size], className);
}

/** Link or button with the site's button styling. Internal hrefs use next/link. */
export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const { variant, size, className, children, href, external, ...rest } = props;
    const classes = buttonClasses({ variant, size, className });
    const isExternal = external || /^(https?:|mailto:|tel:)/.test(href);
    if (isExternal || rest.download !== undefined || href.endsWith(".pdf")) {
      return (
        <a
          href={href}
          className={classes}
          {...(external && { target: "_blank", rel: "noopener noreferrer" })}
          {...rest}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }
  const { variant, size, className, children, type = "button", ...rest } = props;
  return (
    <button type={type} className={buttonClasses({ variant, size, className })} {...rest}>
      {children}
    </button>
  );
}
