"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { getLenis } from "@/lib/useLenis";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { isActive } from "./Nav";

/**
 * Full-screen menu on a native <dialog>: focus trapping, Escape to close and
 * focus return come from the platform.
 */
export function MobileMenu({ pathname, email }: { pathname: string; email: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      getLenis()?.stop();
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const onClose = () => {
      setOpen(false);
      getLenis()?.start();
    };
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="font-mono text-meta uppercase text-fg"
      >
        {site.menu.open}
      </button>
      <dialog
        ref={ref}
        aria-label={site.menu.label}
        className="mobile-menu m-0 h-svh max-h-none w-screen max-w-none bg-bg p-0 text-fg backdrop:bg-bg/60"
      >
        <div className="flex h-full flex-col px-gutter pb-[calc(2rem+env(safe-area-inset-bottom))] pt-[env(safe-area-inset-top)]">
          <div className="flex h-16 items-center justify-between">
            <span className="font-display text-lg font-semibold">{site.name}</span>
            <button type="button" onClick={() => setOpen(false)} className="font-mono text-meta uppercase" autoFocus>
              {site.menu.close}
            </button>
          </div>
          <nav className="mt-12 flex-1">
            <ul className="space-y-2">
              {[{ label: site.menu.home, href: "/" }, ...site.nav].map((item, i) => (
                <li key={item.href} className="mobile-menu-item" style={{ transitionDelay: `${80 + i * 50}ms` }}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={(item.href === "/" ? pathname === "/" : isActive(pathname, item.href)) ? "page" : undefined}
                    className={cn("font-display text-[clamp(2.5rem,12vw,4rem)] leading-tight", "aria-[current=page]:text-accent")}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-end justify-between border-t border-line pt-6">
            <a href={`mailto:${email}`} className="font-mono text-meta text-dim">
              {email}
            </a>
            <ThemeToggle />
          </div>
        </div>
      </dialog>
    </div>
  );
}
