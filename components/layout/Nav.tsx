"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { MobileMenu } from "./MobileMenu";

export function isActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Nav({ email }: { email: string }) {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line/70 bg-bg/80 pt-[env(safe-area-inset-top)] backdrop-blur-md print:hidden">
      <div className="mx-auto flex h-16 max-w-page items-center justify-between gap-6 px-gutter">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight transition-colors duration-200 hover:text-accent"
          data-cursor="home"
        >
          {site.name}
        </Link>
        <nav aria-label={site.menu.label} className="hidden md:block">
          <ul className="flex items-center gap-8">
            {site.nav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative font-mono text-meta uppercase transition-colors duration-200 hover:text-accent",
                      active ? "text-fg" : "text-dim",
                    )}
                  >
                    {active && (
                      <span aria-hidden className="absolute -left-3 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-accent" />
                    )}
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <ThemeToggle />
            </li>
          </ul>
        </nav>
        <MobileMenu pathname={pathname} email={email} />
      </div>
    </header>
  );
}
