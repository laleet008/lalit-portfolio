import { SkillsSchema } from "./schema";

/*
 * Groups follow the CV's technical-skills section; "Animation & graphics"
 * and the tooling beyond Git come from the three flagship projects' source.
 * Levels set by the owner: React, TypeScript, JavaScript, HTML and CSS are
 * strongest; everything else is medium.
 */
export const skills = SkillsSchema.parse([
  {
    id: "languages",
    label: "Languages",
    skills: [
      { name: "TypeScript", level: "strong" },
      { name: "JavaScript", level: "strong" },
      { name: "HTML", level: "strong" },
      { name: "CSS", level: "strong" },
      { name: "Python", level: "medium" },
    ],
  },
  {
    id: "frameworks",
    label: "Frameworks & UI",
    skills: [
      { name: "React", level: "strong" },
      { name: "Next.js", level: "medium" },
      { name: "Tailwind CSS", level: "medium" },
      { name: "Ant Design", level: "medium" },
      { name: "SASS", level: "medium" },
      { name: "Vue.js", level: "medium" },
    ],
  },
  {
    id: "state-data",
    label: "State & data",
    skills: [
      { name: "React Query", level: "medium" },
      { name: "Context API", level: "medium" },
      { name: "Redux", level: "medium" },
      { name: "Zustand", level: "medium" },
      { name: "XState", level: "medium" },
      { name: "React Hook Form", level: "medium" },
      { name: "Zod", level: "medium" },
    ],
  },
  {
    id: "animation-graphics",
    label: "Animation & graphics",
    skills: [
      { name: "Framer Motion", level: "medium" },
      { name: "GSAP", level: "medium" },
      { name: "Canvas 2D", level: "medium" },
      { name: "React Three Fiber / three.js", level: "medium" },
      { name: "Matter.js", level: "medium" },
      { name: "SVG", level: "medium" },
    ],
  },
  {
    id: "backend-realtime",
    label: "Backend & real-time",
    skills: [
      { name: "Node.js", level: "medium" },
      { name: "NestJS", level: "medium" },
      { name: "REST APIs", level: "medium" },
      { name: "Authentication", level: "medium" },
      { name: "Socket.io", level: "medium" },
      { name: "WebSockets", level: "medium" },
    ],
  },
  {
    id: "tooling",
    label: "Tooling",
    skills: [
      { name: "Git", level: "medium" },
      { name: "GitHub", level: "medium" },
      { name: "GitLab", level: "medium" },
      { name: "Vite", level: "medium" },
      { name: "Vitest", level: "medium" },
    ],
  },
]);
