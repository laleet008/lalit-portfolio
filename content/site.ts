/*
 * Site-wide microcopy: navigation, section labels, buttons, states.
 * Components read every sentence from here. `assertCopy` fails the build on an
 * empty string, the same way the Zod schemas guard the other content files.
 */

function assertCopy(value: unknown, path = "site"): void {
  if (typeof value === "string") {
    if (!value.trim()) throw new Error(`Empty copy at ${path}`);
  } else if (Array.isArray(value)) {
    value.forEach((v, i) => assertCopy(v, `${path}[${i}]`));
  } else if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) assertCopy(v, `${path}.${k}`);
  }
}

export const site = {
  title: "Lalit Puri — Frontend Engineer",
  name: "Lalit Puri",
  description:
    "Frontend engineer in Lalitpur, Nepal. AI product interfaces at John Snow Labs; motion, type and canvas work in my own time.",
  url: "https://www.lalitpuri.com.np",
  repo: "https://github.com/laleet008/lalit-portfolio",
  nav: [
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Resume", href: "/resume" },
  ],
  skipLink: "Skip to content",
  menu: { open: "Menu", close: "Close", label: "Site navigation", home: "Home" },
  theme: { dark: "Dark", light: "Light", system: "System", label: "Colour theme", switchTo: "Switch to" },
  cta: {
    work: "See the work",
    cv: "Download CV",
    cvPdf: "Download PDF",
    caseStudy: "Read the case study",
    live: "Open live site",
    repo: "View source",
    allWork: "All work",
    about: "More about me",
    backToTop: "Back to top",
    home: "Back home",
  },
  status: { live: "Live", archived: "Archived", wip: "In progress" },
  context: { personal: "Personal", work: "Work", internship: "Internship" },
  home: {
    availability: "Availability",
    based: "Based in",
    featured: "Selected work",
    other: "Also built",
    otherIntro: "Work from my roles at John Snow Labs and Coding Mountain. It's client and product work, so there's no public code; each links to what I can say about it.",
    capabilities: "What I do",
    experience: "Experience",
    contact: "Contact",
    contactHeading: "Let's talk.",
    contactBody: "If you're hiring for a frontend role, or have something that needs to feel right in the hand, email is the quickest way to reach me.",
    present: "Present",
  },
  preview: {
    load: "Load live preview",
    loading: "Loading live site",
    interact: "Click to interact",
    newTab: "Open in new tab",
    unavailable: "Live preview unavailable here",
    blocked: "This site doesn't allow embedding, so here's a recreation. The real thing is one click away.",
    timedOut: "The live site couldn't load here, so here's a recreation instead.",
    posterHint: "Opens the live site",
    frameTitle: "Live preview of",
  },
  work: {
    heading: "Work",
    intro: "Three projects I built end to end, and the product and client work from my CV. Every project has a write-up.",
    filterLabel: "Filter projects",
    all: "All",
    count: "projects",
  },
  caseStudy: {
    brief: "The brief",
    problem: "The problem",
    approach: "The approach",
    interesting: "The interesting part",
    next: "What I'd do next",
    stack: "Stack",
    role: "Role",
    year: "Year",
    status: "Status",
    organisation: "At",
    code: "From",
    prev: "Previous",
    nextProject: "Next",
    noPublicCode: "Client or employer work. There's no public code or live link, so this write-up sticks to what's on my CV.",
  },
  about: {
    heading: "About",
    experience: "Experience",
    skills: "Skills",
    skillsNote: "Grouped by area. Highlighted skills are my strongest.",
    strong: "Strongest",
    education: "Education",
    certifications: "Certifications",
    writing: "Writing",
    currently: "Currently",
    building: "Building",
    learning: "Learning",
    reading: "Reading",
    strengths: "How I work",
    expand: "Show details",
    collapse: "Hide details",
  },
  resume: {
    heading: "Resume",
    intro: "The same CV as the PDF, as a web page. Print it and you'll get a clean A4 copy.",
    profile: "Profile",
    experience: "Work experience",
    projects: "Selected projects",
    education: "Education",
    skills: "Technical skills",
    softSkills: "Soft skills",
  },
  contact: {
    email: "Email",
    phone: "Phone",
    elsewhere: "Elsewhere",
    copy: "Copy email",
    copied: "Copied",
    copyFailed: "Couldn't copy. Select the address instead",
  },
  notFound: {
    code: "404",
    heading: "Nothing hatched here.",
    body: "This page doesn't exist, or it wandered off while nobody was watching. The work is still where I left it.",
  },
  loading: { skip: "Skip intro" },
  cursor: { view: "View", open: "Open", drag: "Drag", home: "Home" },
  footer: {
    colophon: "Built with Next.js, Framer Motion and Lenis. Set in Bricolage Grotesque, Geist and Geist Mono.",
    source: "Source on GitHub",
  },
} as const;

assertCopy(site);

export type Site = typeof site;
