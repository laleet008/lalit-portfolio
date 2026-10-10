import { Button } from "@/components/ui/Button";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { profile, site } from "@/content";

export function Contact() {
  return (
    <div className="grid grid-cols-1 gap-14 md:grid-cols-12">
      <div className="md:col-span-8">
        <SplitText as="p" text={site.home.contactHeading} by="char" className="font-display text-[clamp(3.5rem,13vw,10rem)] leading-[0.9] tracking-[-0.04em]" />
        <Reveal delay={0.2}>
          <p className="mt-8 max-w-prose text-lg text-dim">{site.home.contactBody}</p>
        </Reveal>
        <Reveal delay={0.3} className="mt-10">
          <CopyEmail email={profile.email} />
        </Reveal>
      </div>
      <Reveal delay={0.35} className="md:col-span-4 md:self-end">
        <dl className="space-y-6 font-mono text-meta uppercase">
          <div>
            <dt className="text-dim">{site.home.availability}</dt>
            <dd className="mt-1 normal-case tracking-normal text-fg">{profile.availability.label}</dd>
          </div>
          <div>
            <dt className="text-dim">{site.contact.phone}</dt>
            <dd className="mt-1">
              <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="hover:text-accent">
                {profile.phone}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-dim">{site.contact.elsewhere}</dt>
            <dd className="mt-1 flex gap-5">
              {profile.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer me" className="hover:text-accent">
                  {s.label} ↗
                </a>
              ))}
            </dd>
          </div>
        </dl>
        <MagneticButton className="mt-10 inline-block">
          <Button href={profile.cv.href} variant="ghost" download={profile.cv.filename}>
            {site.cta.cv}
          </Button>
        </MagneticButton>
      </Reveal>
    </div>
  );
}
