import type { MetadataRoute } from "next";
import { projects } from "@/content";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/work/", "/about/", "/resume/"].map((p) => ({ url: absoluteUrl(p), changeFrequency: "monthly" as const, priority: p === "/" ? 1 : 0.8 }));
  const work = projects.map((p) => ({ url: absoluteUrl(`/work/${p.slug}/`), changeFrequency: "yearly" as const, priority: p.featured ? 0.9 : 0.5 }));
  return [...pages, ...work];
}
