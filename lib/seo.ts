import { education, experience, profile, site, type Project } from "@/content";

export function absoluteUrl(path: string): string {
  return new URL(path, site.url).toString();
}

export function personJsonLd(): Record<string, unknown> {
  const current = experience.find((r) => r.end === null);
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: current?.title ?? profile.role,
    description: profile.bio,
    url: site.url,
    email: `mailto:${profile.email}`,
    telephone: profile.phone,
    address: { "@type": "PostalAddress", addressLocality: "Lalitpur", addressCountry: "NP" },
    sameAs: profile.socials.map((s) => s.url),
    ...(current && { worksFor: { "@type": "Organization", name: current.company } }),
    alumniOf: education.map((e) => ({ "@type": "CollegeOrUniversity", name: e.institution })),
  };
}

export function creativeWorkJsonLd(project: Project): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.tagline,
    description: project.summary,
    url: absoluteUrl(`/work/${project.slug}/`),
    dateCreated: project.year.slice(0, 4),
    keywords: project.stack.join(", "),
    creator: { "@type": "Person", name: profile.name, url: site.url },
    ...(project.liveUrl && { sameAs: [project.liveUrl, ...(project.repoUrl ? [project.repoUrl] : [])] }),
  };
}

/**
 * OpenGraph + Twitter entries for a page. Next replaces (not merges) the
 * root `openGraph`, so the shared fields are repeated here.
 */
export function ogImages(file: string, alt: string, path: string) {
  const images = [{ url: `/og/${file}.png`, width: 1200, height: 630, alt }];
  return {
    openGraph: { type: "article" as const, siteName: site.name, locale: "en_GB", url: path, images },
    twitter: { card: "summary_large_image" as const, images },
  };
}
