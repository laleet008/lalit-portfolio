import { CapabilitiesSchema } from "./schema";

/* Home "Capabilities" columns. Each claim points at the work that backs it. */
export const capabilities = CapabilitiesSchema.parse([
  {
    id: "interface-engineering",
    title: "Interface engineering",
    body: "Product UIs in React, TypeScript and Next.js, with real data behind them: server state through React Query, forms through React Hook Form, and real-time chat on top of LLM-based systems.",
    evidence: ["SWS at John Snow Labs", "World Bank-funded government project", "Next.js 14 real-time project"],
  },
  {
    id: "design-systems",
    title: "Design systems",
    body: "Component libraries that make the next feature faster to build than the last. I built and scaled one at John Snow Labs on Tailwind CSS and Ant Design, and use the same thinking in my own projects: a typed contract first, UI generated from it.",
    evidence: ["John Snow Labs component library", "Kinetic Type Lab's self-rendering parameter panel"],
  },
  {
    id: "motion-interaction",
    title: "Motion & interaction",
    body: "Animation that tells you something: GSAP timelines, Framer Motion layout transitions, physics with Matter.js, and variable-font axes driven by the cursor. Every effect gets a reduced-motion path and gets cleaned up on unmount.",
    evidence: ["Kinetic Type Lab", "Chai & Co. fly-to-cart"],
  },
  {
    id: "canvas-3d",
    title: "Canvas, 3D & real-time",
    body: "Rendering beyond the DOM: React Three Fiber scenes with procedurally generated geometry and textures, fixed-timestep canvas loops, and Socket.io for live updates.",
    evidence: ["Chai & Co. tea tin", "Pixel Pet", "Next.js 14 real-time project"],
  },
]);
