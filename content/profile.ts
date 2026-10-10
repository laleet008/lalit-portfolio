import { ProfileSchema } from "./schema";

/*
 * Facts here come from Lalit-Puri-Resume.pdf (public/cv). The GitHub handle
 * comes from this repo's git remote and the site URL from CNAME.
 * Assumptions are listed in DECISIONS.md.
 */
export const profile = ProfileSchema.parse({
  name: "Lalit Puri",
  shortName: "Lalit",
  role: "Frontend Engineer",
  positioning:
    "Frontend engineer building the interfaces of AI products, and in my own time, things on the web that move.",
  intro:
    "I build interfaces for AI products at work, and in my own time, things that move: type, a tea tin in 3D, a pet made of pixels. I care about state that behaves, motion with some weight to it, and code the next person can read without me in the room.",
  bio: "I'm a frontend engineer in Lalitpur, Nepal. At John Snow Labs I lead frontend development for SWS, an AI-powered platform for real-time conversational and analytical workflows, and I built and scaled a custom component library in React, TypeScript, Tailwind CSS and Ant Design. Outside work I build small, carefully made projects about motion, typography and canvas.",
  longBio: [
    "I've been writing frontend code professionally since April 2022, when I joined Coding Mountain as a frontend intern. My first work there was landing pages for Chrome extensions and mobile launchers, a Laboratory Management System in React, TypeScript and Redux, and UI work on a CRM.",
    "Over the next three years at Coding Mountain I built the frontend for a World Bank-funded government project, led the frontend of a Next.js 14 App Router project with real-time features over Socket.io, and maintained employee and leave management systems in React and TypeScript. I also wrote Node.js authentication, built a Vue.js browser extension with its web platform, styled a Moodle e-learning platform in SASS, and mentored junior developers on clean code and debugging.",
    "Since May 2025 I've been a Senior Frontend Engineer at John Snow Labs. I lead frontend development for SWS, where I designed and built the real-time chat interfaces people use to work with LLM-based systems. I built and scaled a custom component library in React, TypeScript, Tailwind CSS and Ant Design, delivered modules including Patient Journey, Knowledge Base and the Vector Database integrations, and when a feature needs an endpoint, I write it in NestJS.",
    "In my own time I build projects that are mostly about feel: a kinetic typography lab, a tea brand whose 3D tin is generated entirely in code, and a pixel pet that lives in a browser tab. They're where I practise the parts of frontend I enjoy most: motion, rendering, and state that does what you expect.",
  ],
  resumeSummary: [
    "Frontend Developer with four years of experience building scalable, high-performance web applications. Specialized in React, TypeScript, and modern UI architecture, with hands-on experience in NestJS.",
    "Experienced in designing reusable component systems, including custom component libraries at John Snow Labs, enabling consistent and scalable UI development across complex AI-powered applications. Proven ability to deliver end-to-end features and collaborate across frontend, backend, and AI teams.",
  ],
  location: { display: "Lalitpur, Nepal", full: "Imadol, Lalitpur, Bagmati, Nepal" },
  email: "laleetpuree5768@gmail.com",
  phone: "+977 9805744163",
  socials: [
    { label: "GitHub", handle: "laleet008", url: "https://github.com/laleet008" },
    { label: "LinkedIn", handle: "laleet08", url: "https://www.linkedin.com/in/laleet08/" },
  ],
  site: "https://www.lalitpuri.com.np",
  availability: { open: true, label: "Open to frontend roles" },
  strengths: [
    "Collaborating across frontend, backend and AI teams",
    "Owning features end to end, from design to production",
    "Mentoring developers and holding a clean-code bar",
    "Untangling complex UI and state-management problems",
  ],
  currently: {
    building: "This portfolio, with live previews of my projects running inside it.",
  },
  cv: { href: "/cv/Lalit-Puri-Resume.pdf", filename: "Lalit-Puri-Resume.pdf" },
});
