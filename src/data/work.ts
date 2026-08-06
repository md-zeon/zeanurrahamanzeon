/** Copy for the work page hero header. */
export const workHeader = {
  title1: "Selected",
  title2: "projects",
  paragraph:
    "Full-stack projects built with Next.js, React, TypeScript, and Node.js — from developer tools and health marketplaces to real-time campus networks.",
  buttonLabel: "Get in touch",
  badge: "Open to Work",
  badgeLink: "https://github.com/md-zeon",
};

/** Copy for the "Let's build something distinctive" CTA on the work page. */
export const workCta = {
  line1: "Let's build something",
  italicWord: "remarkable",
  caption: "CTA_ZN_195",
  buttonLabel: "Get in touch",
};

/** Side-project slides for the "From the labs" slider on the work page. */
export const workLabSlides = [
  {
    caption: "Project_001",
    title: "DevTrack",
    href: "https://devtrack-gamma.vercel.app",
    video: "/assets/videos/Videos/Experiments/spaceman-gsap---new-thumbnail.mp4",
  },
  {
    caption: "Project_002",
    title: "HistoTrack",
    href: "https://histo-track.web.app",
    video: "/assets/videos/Videos/Experiments/noirve---new-thumbnail.mp4",
  },
  {
    caption: "Project_003",
    title: "Taskero",
    href: "https://github.com/md-zeon",
    video: "/assets/videos/Videos/Experiments/pitch---new-thumbnail.mp4",
  },
  {
    caption: "Project_004",
    title: "MicroEarn",
    href: "https://micro-earn-7be08.web.app",
    video: "/assets/videos/Videos/Experiments/plink---new-thumbnail.mp4",
  },
  {
    caption: "Project_005",
    title: "GSAP Scroll Lab",
    href: "/experiments",
    video: "/assets/videos/Videos/Experiments/bertani---new-thumbnail.mp4",
  },
  {
    caption: "Project_006",
    title: "Motion Playground",
    href: "/experiments",
    video: "/assets/videos/Videos/Experiments/battlefield-4---new-thumbnail.mp4",
  },
  {
    caption: "Project_007",
    title: "Real-time Playground",
    href: "/experiments",
    video: "/assets/videos/Videos/Experiments/scramble-pizza-chaos---new-thumbnail.mp4",
  },
];

/** A work page project card: metadata, media paths, tags, and result stat. */
export type WorkProject = {
  index: string;
  title: string;
  ariaLabel: string;
  tags: string[];
  href: string;
  poster: string;
  video: string;
  result: string;
  resultLabel: string;
};

/** All work page projects, in display order. */
export const workProjects: WorkProject[] = [
  {
    index: "project_001",
    title: "Smart NUB Campus",
    ariaLabel: "Smart NUB Campus — real-time academic network",
    tags: ["Academic Network", "Real-time"],
    href: "/work/smart-nub-campus",
    poster: "/assets/images/projects/smart-nub/cover.webp",
    video: "/assets/videos/Videos/Work/smart-nub-campus/Smart-NUB-Campus.mp4",
    result: "195+",
    resultLabel: "API endpoints across 48 database models",
  },
  {
    index: "project_002",
    title: "DevQnA",
    ariaLabel: "DevQnA — developer Q&A platform",
    tags: ["Developer Q&A", "Next.js 15"],
    href: "/work/devqna",
    poster: "/assets/images/projects/devqna/cover.webp",
    video: "/assets/videos/Videos/Work/devqna/DevQnA.mp4",
    result: "100%",
    resultLabel: "custom platform — no third-party Q&A SaaS",
  },
  {
    index: "project_003",
    title: "Oshudpati",
    ariaLabel: "Oshudpati — medicine marketplace",
    tags: ["Health e-Commerce", "Express 5"],
    href: "/work/oshudpati-marketplace",
    poster: "/assets/images/projects/oshudpati/cover.webp",
    video: "/assets/videos/Videos/Work/oshudpati-marketplace/Oshudpati-Marketplace.mp4",
    result: "17+",
    resultLabel: "database models, 3-role RBAC, 4-step order lifecycle",
  },
  {
    index: "project_004",
    title: "MicroEarn",
    ariaLabel: "MicroEarn — micro-task marketplace",
    tags: ["Micro-tasks", "MERN"],
    href: "/work/microearn",
    poster: "/assets/images/projects/microearn/cover.webp",
    video: "/assets/videos/Videos/Work/microearn/MicroEarn.mp4",
    result: "3-in-1",
    resultLabel: "task feed, wallets, and rewards on the MERN stack",
  },
  {
    index: "project_005",
    title: "DevTrack",
    ariaLabel: "DevTrack — project tracker",
    tags: ["Productivity", "Next.js"],
    href: "https://devtrack-gamma.vercel.app",
    poster: "/assets/images/projects/devtrack/cover.webp",
    video: "/assets/videos/hero-clip-vid.mp4",
    result: "Live",
    resultLabel: "sprint boards with auth, subtasks, and progress",
  },
  {
    index: "project_006",
    title: "HistoTrack",
    ariaLabel: "HistoTrack — historical artifact tracker",
    tags: ["Heritage", "React"],
    href: "https://histo-track.web.app",
    poster: "/assets/images/projects/histotrack/cover.webp",
    video: "/assets/videos/hero-clip-vid.mp4",
    result: "Global",
    resultLabel: "artifact timelines — React, Firebase, and MongoDB",
  },
  {
    index: "project_007",
    title: "Taskero",
    ariaLabel: "Taskero — freelance task marketplace",
    tags: ["Freelance", "MERN"],
    href: "https://github.com/md-zeon",
    poster: "/assets/images/projects/taskero/cover.webp",
    video: "/assets/videos/hero-clip-vid.mp4",
    result: "Market",
    resultLabel: "role-based freelance task marketplace",
  },
];
