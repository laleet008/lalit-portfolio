import { CursorProximity } from "./diagrams/CursorProximity";
import { DiagramFrame } from "./diagrams/DiagramFrame";
import { FixedTimestep } from "./diagrams/FixedTimestep";
import { FlyToCart } from "./diagrams/FlyToCart";
import { GraphemeSplit } from "./diagrams/GraphemeSplit";
import { LabelTexture } from "./diagrams/LabelTexture";
import { OfflineCatchup } from "./diagrams/OfflineCatchup";
import { ParamSpecFlow } from "./diagrams/ParamSpecFlow";
import { PetMachine } from "./diagrams/PetMachine";
import { RasterPipeline } from "./diagrams/RasterPipeline";
import { diagrams } from "@/content/diagrams";
import type { DiagramId } from "@/content";

const DIAGRAMS: Record<DiagramId, (p: { title: string }) => React.JSX.Element> = {
  "grapheme-split": GraphemeSplit,
  "raster-pipeline": RasterPipeline,
  "param-spec": ParamSpecFlow,
  "cursor-proximity": CursorProximity,
  "label-texture": LabelTexture,
  "fly-to-cart": FlyToCart,
  "pet-machine": PetMachine,
  "fixed-timestep": FixedTimestep,
  "offline-catchup": OfflineCatchup,
};

/** An inline, scroll-animated SVG diagram with a visible caption. */
export function DiagramFigure({ id }: { id: DiagramId }) {
  const Diagram = DIAGRAMS[id];
  const copy = diagrams[id];
  return (
    <figure className="border border-line bg-surface/60 p-4 md:p-6">
      <div className="overflow-x-auto" data-lenis-prevent>
        <div className="min-w-[520px]">
          <DiagramFrame>
            <Diagram title={copy.title} />
          </DiagramFrame>
        </div>
      </div>
      <figcaption className="mt-4 border-t border-line pt-4 text-sm text-dim">{copy.caption}</figcaption>
    </figure>
  );
}
