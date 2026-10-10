import type { Project } from "@/content/schema";
import { BrowserChrome } from "./BrowserChrome";
import { DeviceChrome } from "./DeviceChrome";
import { LivePreview } from "./LivePreview";
import { PreviewPoster } from "./PreviewPoster";

const VIEWPORTS = {
  browser: { width: 1280, height: 800 },
  handheld: { width: 390, height: 600 },
} as const;

/** Picks the chrome for a project and mounts the live preview inside it. */
export function ProjectPreview({ project }: { project: Project }) {
  if (!project.liveUrl || !project.preview) return null;
  const kind = project.preview;
  const live = (
    <LivePreview
      title={project.title}
      url={project.liveUrl}
      embeddable={project.embeddable}
      viewport={VIEWPORTS[kind]}
      poster={<PreviewPoster slug={project.slug} />}
    />
  );

  return kind === "handheld" ? (
    <DeviceChrome url={project.liveUrl} title={project.title} label={project.title}>
      {live}
    </DeviceChrome>
  ) : (
    <BrowserChrome url={project.liveUrl} title={project.title}>
      {live}
    </BrowserChrome>
  );
}
