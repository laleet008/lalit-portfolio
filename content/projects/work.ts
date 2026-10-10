import type { ProjectInput } from "../schema";

/*
 * Projects from the CV. These are employer or client work: no public URLs or
 * code, and every statement is limited to what the CV says. Explanations
 * describe the role a tool plays, not invented outcomes. Years span the role
 * the work happened in (see DECISIONS.md).
 */

export const workProjects: ProjectInput[] = [
  {
    featured: false,
    slug: "sws",
    title: "SWS",
    tagline: "An AI-powered platform for real-time conversational and analytical workflows.",
    year: "2025–Present",
    role: "Frontend lead",
    context: "work",
    organisation: "John Snow Labs",
    status: "wip",
    stack: ["React", "TypeScript", "Tailwind CSS", "Ant Design", "React Query", "NestJS"],
    summary:
      "I lead frontend development for SWS at John Snow Labs: real-time AI chat interfaces, the component library underneath them, and product modules including Patient Journey, Knowledge Base and Vector Database integrations.",
    approach:
      "A custom component library in React, TypeScript, Tailwind CSS and Ant Design keeps the UI consistent across modules. Server state goes through React Query. On the backend I contribute NestJS REST APIs for chat workflows and knowledge retrieval, working closely with the AI and backend teams to ship features end to end.",
    highlights: [
      {
        title: "Real-time chat with LLM-based systems",
        body: ["Designed and built the real-time chat interfaces people use to work with SWS's LLM-based systems."],
      },
      {
        title: "A component library that scales with the product",
        body: [
          "Built and scaled a custom component library on Tailwind CSS and Ant Design, improving UI consistency and development speed, with reusable components whose server state is handled through React Query.",
        ],
      },
      {
        title: "Patient Journey, Knowledge Base and VDB",
        body: [
          "Delivered key modules including Patient Journey, Knowledge Base and Vector Database integrations, and kept UX patterns consistent across them.",
        ],
      },
      {
        title: "Both sides of the API",
        body: [
          "Contributed NestJS REST APIs for chat workflows and knowledge retrieval, then integrated them on the frontend with attention to data contracts, error handling and performance.",
        ],
      },
    ],
    accent: "#A99CFF",
    accentOnLight: "#68609D",
  },
  {
    featured: false,
    slug: "world-bank-government-project",
    title: "World Bank-funded government project",
    tagline: "Frontend for a public-sector project, built at Coding Mountain.",
    year: "2022–2025",
    role: "Frontend developer",
    context: "work",
    organisation: "Coding Mountain",
    status: "archived",
    stack: ["React", "Tailwind CSS", "Context API", "React Hook Form", "React Query"],
    summary: "Built the frontend for a World Bank-funded government project at Coding Mountain.",
    approach:
      "React with Tailwind CSS for the interface, Context API for shared client state, React Hook Form for forms and React Query for server state.",
    highlights: [
      {
        title: "Client state and server state, kept apart",
        body: [
          "Shared UI state lives in Context; data from the server goes through React Query, which owns caching and refetching so components don't track loading and error flags by hand. Forms run on React Hook Form.",
        ],
      },
    ],
    accent: "#E3A857",
    accentOnLight: "#846132",
  },
  {
    featured: false,
    slug: "nextjs-realtime-project",
    title: "Next.js 14 real-time project",
    tagline: "An App Router project with live updates over Socket.io.",
    year: "2022–2025",
    role: "Frontend lead",
    context: "work",
    organisation: "Coding Mountain",
    status: "archived",
    stack: ["Next.js 14", "React", "Context API", "Socket.io"],
    summary: "Led frontend development for a Next.js 14 App Router project at Coding Mountain.",
    approach:
      "Built on the Next.js 14 App Router, with Context API for shared state, Socket.io for real-time communication, and logic shared through custom hooks and higher-order components.",
    highlights: [
      {
        title: "Hooks, HOCs and Socket.io",
        body: [
          "Led the frontend, built with custom hooks and higher-order components, Context API for shared state, and Socket.io for real-time communication.",
        ],
      },
    ],
    accent: "#5FD4B0",
    accentOnLight: "#33725F",
  },
  {
    featured: false,
    slug: "employee-leave-management",
    title: "Employee & leave management systems",
    tagline: "Internal systems for people and leave, in React and TypeScript.",
    year: "2022–2025",
    role: "Frontend developer",
    context: "work",
    organisation: "Coding Mountain",
    status: "archived",
    stack: ["React", "TypeScript"],
    summary: "Developed and maintained employee and leave management systems in React and TypeScript at Coding Mountain.",
    approach: "React and TypeScript, developed and then maintained over time.",
    highlights: [
      {
        title: "Built, then maintained",
        body: ["Developed these systems and kept maintaining them afterwards."],
      },
    ],
    accent: "#F0917A",
    accentOnLight: "#92584A",
  },
  {
    featured: false,
    slug: "vue-browser-extension",
    title: "Browser extension & web platform",
    tagline: "A Vue.js browser extension and the web platform that supports it.",
    year: "2022–2025",
    role: "Developer",
    context: "work",
    organisation: "Coding Mountain",
    status: "archived",
    stack: ["Vue.js"],
    summary: "Built a browser extension in Vue.js along with its supporting web platform at Coding Mountain.",
    approach: "Vue.js for both the extension and its companion web platform.",
    highlights: [
      {
        title: "Two surfaces, one product",
        body: ["Built both the browser extension and the web platform that supports it."],
      },
    ],
    accent: "#6CB8FF",
    accentOnLight: "#3F6B94",
  },
  {
    featured: false,
    slug: "moodle-e-learning",
    title: "E-learning platform (Moodle)",
    tagline: "Styling a Moodle-based e-learning platform with SASS.",
    year: "2022–2025",
    role: "Contributor (styling)",
    context: "work",
    organisation: "Coding Mountain",
    status: "archived",
    stack: ["Moodle", "SASS"],
    summary: "Contributed to an e-learning platform built on Moodle, using SASS for scalable styling.",
    approach: "SASS for styling that scales across the platform.",
    highlights: [
      {
        title: "Styling that scales",
        body: ["Used SASS for scalable styling across the platform."],
      },
    ],
    accent: "#D98FD0",
    accentOnLight: "#855880",
  },
  {
    featured: false,
    slug: "laboratory-management-system",
    title: "Laboratory Management System",
    tagline: "A lab management system in React, TypeScript and Redux.",
    year: "2022",
    role: "Frontend intern",
    context: "internship",
    organisation: "Coding Mountain",
    status: "archived",
    stack: ["React", "TypeScript", "Redux"],
    summary: "Worked on a Laboratory Management System during my internship at Coding Mountain.",
    approach: "React and TypeScript, with state managed in Redux following its best practices.",
    highlights: [
      {
        title: "Redux, done by the book",
        body: ["Worked on the system using React, TypeScript and Redux best practices."],
      },
    ],
    accent: "#8EC5C0",
    accentOnLight: "#4F6D6B",
  },
  {
    featured: false,
    slug: "crm-application",
    title: "CRM application",
    tagline: "UI implementation and usability work on a CRM.",
    year: "2022",
    role: "Frontend intern",
    context: "internship",
    organisation: "Coding Mountain",
    status: "archived",
    stack: [],
    summary: "Supported frontend development for a CRM application during my internship, focusing on UI implementation and usability.",
    approach: "UI implementation with a focus on usability improvements.",
    highlights: [
      {
        title: "Usability first",
        body: ["Implemented UI and made usability improvements across the application."],
      },
    ],
    accent: "#C7B59A",
    accentOnLight: "#706657",
  },
  {
    featured: false,
    slug: "extension-launcher-landing-pages",
    title: "Extension & launcher landing pages",
    tagline: "Landing pages for Chrome extensions and mobile launcher apps.",
    year: "2022",
    role: "Frontend intern",
    context: "internship",
    organisation: "Coding Mountain",
    status: "archived",
    stack: [],
    summary: "Contributed to landing pages for Chrome extensions and mobile launcher applications during my internship.",
    approach: "Marketing pages for browser extensions and mobile launcher apps.",
    highlights: [
      {
        title: "From the internship",
        body: ["Contributed to landing pages for Chrome extensions and mobile launcher applications."],
      },
    ],
    accent: "#F2A0B4",
    accentOnLight: "#895A66",
  },
];
