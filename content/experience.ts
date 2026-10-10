import { ExperienceSchema } from "./schema";

/* Bullets are the CV's, tightened for the web. Nothing is added. */
export const experience = ExperienceSchema.parse([
  {
    id: "john-snow-labs",
    company: "John Snow Labs",
    title: "Senior Frontend Engineer",
    start: "2025-05",
    end: null,
    summary: "Leading frontend development for SWS, an AI-powered platform for real-time conversational and analytical workflows.",
    groups: [
      {
        heading: "AI product & frontend leadership",
        bullets: [
          "Lead frontend development for SWS, an AI-powered platform for real-time conversational and analytical workflows.",
          "Designed and built real-time AI chat interfaces for working with LLM-based systems.",
        ],
      },
      {
        heading: "Component architecture & UI systems",
        bullets: [
          "Built and scaled a custom component library in React, TypeScript, Tailwind CSS and Ant Design, improving UI consistency and development speed.",
          "Developed reusable, high-performance components with server state handled through React Query.",
        ],
      },
      {
        heading: "Product development",
        bullets: [
          "Delivered key modules including Patient Journey, Knowledge Base and Vector Database (VDB) integrations.",
          "Kept UX patterns consistent across product features and workflows.",
        ],
      },
      {
        heading: "Backend & integration",
        bullets: [
          "Contributed to backend services in NestJS, building REST APIs for chat workflows and knowledge retrieval.",
          "Integrated the frontend with those APIs, with attention to data contracts, error handling and performance.",
        ],
      },
      {
        heading: "Collaboration",
        bullets: [
          "Work closely with AI and backend teams to ship end-to-end features and improve system performance.",
        ],
      },
    ],
  },
  {
    id: "coding-mountain",
    company: "Coding Mountain",
    title: "Software Engineer I",
    start: "2022-10",
    end: "2025-05",
    summary: "Frontend for a World Bank-funded government project, a Next.js 14 real-time app I led, and internal systems in React and TypeScript.",
    groups: [
      {
        heading: "Frontend development",
        bullets: [
          "Built the frontend for a World Bank-funded government project with React, Tailwind CSS, Context API, React Hook Form and React Query.",
          "Led frontend development for a Next.js 14 (App Router) project using Context API, Socket.io, custom hooks and HOCs.",
        ],
      },
      {
        heading: "Full-stack contributions",
        bullets: [
          "Implemented Node.js-based authentication and secure API integrations.",
          "Developed and maintained employee and leave management systems in React and TypeScript.",
        ],
      },
      {
        heading: "Additional projects",
        bullets: [
          "Built a browser extension in Vue.js along with its supporting web platform.",
          "Contributed to an e-learning platform (Moodle), using SASS for scalable styling.",
        ],
      },
      {
        heading: "Mentorship",
        bullets: ["Mentored junior developers on clean code, debugging and frontend best practices."],
      },
    ],
  },
  {
    id: "coding-mountain-intern",
    company: "Coding Mountain",
    title: "Frontend Intern / Trainee",
    start: "2022-04",
    end: "2022-09",
    summary: "Landing pages, a Laboratory Management System and CRM interface work.",
    groups: [
      {
        bullets: [
          "Contributed to landing pages for Chrome extensions and mobile launcher applications.",
          "Worked on a Laboratory Management System using React, TypeScript and Redux best practices.",
          "Supported frontend development for a CRM application, focusing on UI implementation and usability.",
        ],
      },
    ],
  },
]);
