import type { Metadata } from "next";
import { Capabilities } from "@/components/home/Capabilities";
import { Contact } from "@/components/home/Contact";
import { ExperienceStrip } from "@/components/home/ExperienceStrip";
import { FeaturedProject } from "@/components/home/FeaturedProject";
import { Hero } from "@/components/home/Hero";
import { IntroLine } from "@/components/home/IntroLine";
import { OtherWork } from "@/components/home/OtherWork";
import { JsonLd } from "@/components/layout/JsonLd";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { capabilities, experience, featuredProjects, otherProjects, profile, site } from "@/content";
import { personJsonLd } from "@/lib/seo";

export const metadata: Metadata = { alternates: { canonical: "/" } };

function Block({ index, label, id, children }: { index: string; label: string; id: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="px-gutter py-20 md:py-32">
      <div className="mx-auto max-w-page">
        <SectionLabel index={index} label={label} id={id} className="mb-12 md:mb-16" />
        {children}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main id="main" tabIndex={-1}>
      <JsonLd data={personJsonLd()} />
      <Hero />
      <div className="px-gutter py-24 md:py-40">
        <div className="mx-auto max-w-page">
          <IntroLine text={profile.intro} />
        </div>
      </div>
      <div className="px-gutter">
        <SectionLabel index="01" label={site.home.featured} id="featured" className="mx-auto max-w-page pb-10" />
      </div>
      {featuredProjects.map((p, i) => (
        <FeaturedProject key={p.slug} project={p} index={i} total={featuredProjects.length} />
      ))}
      <Block index="02" label={site.home.other} id="other">
        <OtherWork intro={site.home.otherIntro} projects={otherProjects} />
      </Block>
      <Block index="03" label={site.home.capabilities} id="capabilities">
        <Capabilities items={capabilities} />
      </Block>
      <Block index="04" label={site.home.experience} id="experience">
        <ExperienceStrip roles={experience} />
      </Block>
      <Block index="05" label={site.home.contact} id="contact">
        <Contact />
      </Block>
    </main>
  );
}
