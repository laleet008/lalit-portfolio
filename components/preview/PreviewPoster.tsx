import { ChaiPoster } from "./posters/ChaiPoster";
import { KineticPoster } from "./posters/KineticPoster";
import { PixelPetPoster } from "./posters/PixelPetPoster";

const POSTERS: Record<string, () => React.JSX.Element> = {
  "kinetic-type-lab": KineticPoster,
  "chai-and-co": ChaiPoster,
  "pixel-pet": PixelPetPoster,
};

/** The static recreation for a project, or nothing if it has none. */
export function PreviewPoster({ slug }: { slug: string }) {
  const Poster = POSTERS[slug];
  return Poster ? <Poster /> : null;
}
