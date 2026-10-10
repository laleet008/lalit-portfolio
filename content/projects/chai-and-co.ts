import type { ProjectInput } from "../schema";

/* Source: github.com/laleet008/Chai-and-Co. — a fictional brand built as a portfolio piece. */
export const chaiAndCo: ProjectInput = {
  slug: "chai-and-co",
  title: "Chai & Co.",
  tagline: "Grown in the clouds.",
  year: "2026",
  role: "Design & engineering",
  context: "personal",
  status: "live",
  liveUrl: "https://chai-and-co.vercel.app/",
  repoUrl: "https://github.com/laleet008/Chai-and-Co.",
  stack: ["Next.js 14", "TypeScript", "React Three Fiber", "three.js", "Framer Motion", "Lenis", "Zustand", "React Hook Form", "Zod", "Tailwind CSS", "Vitest"],
  summary:
    "Ilam · Eastern Nepal · Est. 1971. Single-estate loose-leaf tea from 1,900 metres above the Himalayan mist: small-batch, hand-plucked in April, sold in matte metal tins. A premium brand and commerce experience for a fictional tea estate, where every visual asset is generated in code.",
  problem:
    "Premium commerce leans on photography and 3D models. This site has neither: no images, no model files, no Lottie. The tin, the hills, the mist and the steam are all generated in code, so the work was making procedural assets feel crafted rather than programmatic.",
  approach:
    "Next.js 14 App Router with every route but the order page prerendered. The tea tin is a React Three Fiber scene built from geometry and runtime canvas textures. Scroll-driven storytelling runs on Lenis and Framer Motion. A Zustand cart persists to versioned, crash-safe storage, and a simulated three-step checkout validates with React Hook Form and Zod. No payment is ever taken.",
  highlights: [
    {
      title: "A tea tin with no model file",
      body: [
        "The tin's body is a `LatheGeometry`: a profile curve spun through 96 segments. Its label isn't an image either. At runtime the label is drawn onto a 1024×1024 2D canvas (brand mark, tea name, a hairline rule and a leaf glyph in the product's accent colour), wrapped in a `CanvasTexture`, and projected onto the tin as a decal.",
        "Each of the four teas gets its own label from the same function, so a new product is a name and a colour. The canvas only renders while on screen (an IntersectionObserver switches the frameloop to on-demand), and visitors with reduced motion or no WebGL get an SVG tin instead.",
      ],
      diagram: "label-texture",
      code: {
        lang: "ts",
        file: "src/components/three/TeaTin.tsx",
        source: `function makeLabelTexture(name: string, accent: string, sub = 'ILAM · NEPAL · 1,900 m'): LabelTex {
  // …
  const size = 1024;
  const c = document.createElement('canvas');
  c.width = size;
  c.height = size;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#F4F0E8';
  roundRect(ctx, 60, 160, size - 120, size - 320, 16);
  ctx.fill();
  ctx.textAlign = 'center';
  ctx.fillStyle = '#1A1714';
  ctx.font = "500 64px 'Fraunces', 'Playfair Display', Georgia, serif";
  ctx.fillText('Chai & Co.', size / 2, 300);
  // … rule, tea name, leaf glyph, origin line
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  t.needsUpdate = true;
  return { tex: t, key };
}`,
      },
    },
    {
      title: "Fly-to-cart on a quadratic bezier",
      body: [
        "Adding to cart spawns a small tin at the button and flies it to the cart icon in the nav. A straight line reads as mechanical, so the flight follows a quadratic bezier whose control point sits above the midpoint, lifted further the wider the horizontal distance. Along the curve the tin scales down, rotates and fades over 750ms with ease-in-out-cubic timing.",
        "Flights are queued with a short cooldown so rapid clicks don't pile up, and the animation is decoupled from the cart: it dispatches `cart:pulse` and `cart:fly-complete` window events, and the buy box never imports the cart drawer. With reduced motion the flight is skipped and only the pulse fires.",
      ],
      diagram: "fly-to-cart",
      code: {
        lang: "ts",
        file: "src/components/cart/FlyToCart.tsx",
        source: `function bezier(t: number, from: number, ctrl: number, to: number) {
  const u = 1 - t;
  return u * u * from + 2 * u * t * ctrl + t * t * to;
}

// inside FlightSprite
const ctrl = {
  x: (from.x + to.x) / 2,
  y: Math.min(from.y, to.y) - Math.abs(to.x - from.x) * 0.28 - 80,
};
const step = (now: number) => {
  const t = Math.min(1, Math.max(0, (now - start) / dur));
  const e = easeInOutCubic(t);
  const x = bezier(e, from.x, ctrl.x, to.x);
  const y = bezier(e, from.y, ctrl.y, to.y);
  const s = 1 - 0.65 * e;
  const rot = (1 - e) * -16 + e * 8;
  // …
};`,
      },
    },
    {
      title: "Scroll-driven product storytelling",
      body: [
        "The home page's sticky tin section is 320vh tall. As you scroll through it, the 3D tin rotates through 2.5π and the background warms from paper toward clay, while step-by-step captions scroll past beside it.",
        "Elsewhere, three ridgelines parallax at three depths, mist bands drift, and the story page draws its hills, timeline and estate map as you reach them. Lenis provides the smooth scroll from a single requestAnimationFrame loop.",
      ],
    },
    {
      title: "A checkout where the URL owns the step",
      body: [
        "The simulated three-step checkout keeps its step in the URL (`?step=1|2|3`), not in memory, so back, forward and refresh all land on the right step. Each step validates with React Hook Form and Zod.",
        "On the first failed submit, the first invalid field's label shakes once and the page scrolls to it and focuses it. The payment step formats card numbers in groups of four and flips a 3D card preview to its back when the CVC field is focused. Placing the order morphs the button from spinner to tick and redirects to a confirmation page.",
      ],
    },
  ],
  next: "Generate the four label textures once and pack them into a single atlas instead of one canvas per tin, and replace the simulated checkout with a real cart API so the commerce half holds up beyond a demo.",
  accent: "#C9A227",
  accentOnLight: "#7D6418",
  featured: true,
  preview: "browser",
  embeddable: false,
};
