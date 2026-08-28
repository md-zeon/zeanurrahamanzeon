/** Metadata for the Work page. */
export const workMeta = {
  title: "Work",
  description:
    "I build real world applications that solve real problems — from a developer Q&A platform and a medicine marketplace to a real-time campus network and a micro-task economy.",
};

/** Copy for the work page hero header. */
export const workHeader = {
  title1: "Selected",
  title2: "projects",
  paragraph:
    "Projects built to solve real problems — from developer tools and health marketplaces to real-time campus networks and a micro-task economy.",
  buttonLabel: "Get in touch",
  badge: "Open to Work",
  badgeLink: "https://github.com/md-zeon",
};

/** Header configuration for the Featured client projects slider. */
export const workFeaturedHeader = {
  title1: "Featured",
  title2: "client projects",
  caption: "WRK_CS_267",
  visitButtonLabel: "Visit work page",
  viewCaseStudyLabel: "View case study",
};

/** Header configuration for the From the labs slider on the work page. */
export const workLabHeader = {
  title1: "From the",
  italicWord: "labs",
  caption: "LAB_ZN_188",
  visitButtonLabel: "See experiments",
  viewProjectLabel: "View project",
};

/** Navigation switcher tabs for the work page. */
export const workNavTabs = {
  portfolio: "Portfolio",
  labs: "[See Labs]",
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
    title: "Kurosumi",
    href: "https://kurosumi.vercel.app",
    video: "/assets/videos/Videos/Experiments/kurosumi.mp4",
  },
  {
    caption: "Project_002",
    title: "Space Shooter",
    href: "https://space-shooter-dun.vercel.app",
    video: "/assets/videos/Videos/Experiments/space-shooter.mp4",
  },
  {
    caption: "Project_003",
    title: "Brick Breaker",
    href: "https://brick-breaker-lac.vercel.app",
    video: "/assets/videos/Videos/Experiments/brick-breaker.mp4",
  },
  {
    caption: "Project_004",
    title: "HistoTrack",
    href: "https://histo-track.web.app",
    video: "/assets/videos/Videos/Experiments/histotrack.mp4",
  },
  {
    caption: "Project_005",
    title: "Shortle",
    href: "https://shortle-phi.vercel.app",
    video: "/assets/videos/Videos/Experiments/shortle.mp4",
  },
  {
    caption: "Project_006",
    title: "QR Generator",
    href: "https://qr-generator-omega-swart.vercel.app",
    video: "/assets/videos/Videos/Experiments/qr-generator.mp4",
  },
  {
    caption: "Project_007",
    title: "Taskero",
    href: "https://github.com/md-zeon",
    video: "/assets/videos/Videos/Experiments/taskero.mp4",
  },
];

/** A work page project card: metadata, media paths, tags, and result stat. */
export type WorkProject = {
  index: string;
  title: string;
  ariaLabel: string;
  tags: string[];
  href: string;
  hasCaseStudy: boolean;
  poster?: string;
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
    hasCaseStudy: true,
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
    hasCaseStudy: true,
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
    hasCaseStudy: true,
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
    hasCaseStudy: true,
    poster: "/assets/images/projects/microearn/cover.webp",
    video: "/assets/videos/Videos/Work/microearn/MicroEarn.mp4",
    result: "3-in-1",
    resultLabel: "task feed, wallets, and rewards on the MERN stack",
  },
];
