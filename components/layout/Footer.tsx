import Link from "next/link";
import { profile, site } from "@/content";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line print:hidden">
      <div className="mx-auto grid grid-cols-1 max-w-page gap-10 px-gutter py-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Link href="/" className="font-display text-2xl font-semibold tracking-tight hover:text-accent">
            {site.name}
          </Link>
          <p className="mt-3 max-w-sm text-sm text-dim">{site.footer.colophon}</p>
        </div>
        <nav aria-label={site.menu.label} className="md:col-span-3">
          <ul className="space-y-2 font-mono text-meta uppercase">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-dim transition-colors hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="space-y-2 font-mono text-meta uppercase md:col-span-4 md:text-right">
          {profile.socials.map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noopener noreferrer me" className="text-dim transition-colors hover:text-accent">
                {s.label}
              </a>
            </li>
          ))}
          <li>
            <a href={site.repo} target="_blank" rel="noopener noreferrer" className="text-dim transition-colors hover:text-accent">
              {site.footer.source}
            </a>
          </li>
        </ul>
        <p className="font-mono text-meta uppercase text-dim md:col-span-12">
          © {year} {profile.name} · {profile.location.display}
        </p>
      </div>
    </footer>
  );
}
