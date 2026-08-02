export const workHeader = {
  title1: "Client",
  title2: "projects",
  paragraph:
    "A curated collection of web design and Webflow development projects crafted with strategy, design, and development in one process.",
  buttonLabel: "Book a call",
  badge: "Webflow Certified Partner",
  badgeLink: "https://webflow.com/@bjornflow",
};

export const workCta = {
  line1: "Let's build something",
  italicWord: "distinctive",
  caption: "CTA_BF_195",
  buttonLabel: "Book a call",
};

export const workLabSlides = [
  {
    caption: "Clonable_001",
    title: "Spaceman",
    href: "https://spaceman-gsap.webflow.io/",
    video: "/assets/videos/Videos/Experiments/spaceman-gsap---new-thumbnail.mp4",
  },
  {
    caption: "Clonable_002",
    title: "Noirve",
    href: "https://noirve.webflow.io/",
    video: "/assets/videos/Videos/Experiments/noirve---new-thumbnail.mp4",
  },
  {
    caption: "Clonable_003",
    title: "Pitch",
    href: "https://pitch-rebuild.webflow.io/",
    video: "/assets/videos/Videos/Experiments/pitch---new-thumbnail.mp4",
  },
  {
    caption: "Clonable_004",
    title: "Plink",
    href: "https://plink-rebuild.webflow.io/",
    video: "/assets/videos/Videos/Experiments/plink---new-thumbnail.mp4",
  },
  {
    caption: "Clonable_005",
    title: "Bertani",
    href: "https://bertani-rebuild.webflow.io/",
    video: "/assets/videos/Videos/Experiments/bertani---new-thumbnail.mp4",
  },
  {
    caption: "Clonable_006",
    title: "Battlefield 4",
    href: "https://battlefield-4-webflow-rebuild.webflow.io/",
    video: "/assets/videos/Videos/Experiments/battlefield-4---new-thumbnail.mp4",
  },
  {
    caption: "Clonable_007",
    title: "Scrambled Pizza Chaos",
    href: "https://scrambled-pizza-chaos.webflow.io/",
    video: "/assets/videos/Videos/Experiments/scramble-pizza-chaos---new-thumbnail.mp4",
  },
];

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

export const workProjects: WorkProject[] = [
  {
    index: "project_001",
    title: "Plus X Innovation",
    ariaLabel: "Plus X Innovation",
    tags: ["Innovation Hub", "Tech Incubator"],
    href: "/work/plus-x-innovation",
    poster: "/assets/videos/Videos/Work/plus-x/thumbnails/plus-x---new-thumbnail.webp",
    video: "/assets/videos/Videos/Work/plus-x/plus-x---new-thumb.mp4",
    result: "340%",
    resultLabel: "increase in website conversions",
  },
  {
    index: "project_002",
    title: "Pickaxe",
    ariaLabel: "Pickaxe",
    tags: ["Marketplace", "Mining & Construction"],
    href: "/work/pickaxe",
    poster: "/assets/videos/Videos/Work/pickaxe/thumbnails/pickaxe---new-thumbnail.webp",
    video: "/assets/videos/Videos/Work/pickaxe/pickaxe---new-thumb.mp4",
    result: "3–5×",
    resultLabel: "stronger performance and better-qualified leads over time",
  },
  {
    index: "project_003",
    title: "Appetite",
    ariaLabel: "Appetite",
    tags: ["Food & Hospitality Tech"],
    href: "/work/appetite",
    poster: "/assets/videos/Videos/Work/appetite/thumbnails/appetite---new-thumbnail.webp",
    video: "/assets/videos/Videos/Work/appetite/appetite---new-thumb.mp4",
    result: ">90",
    resultLabel: "Lighthouse performance score",
  },
  {
    index: "project_004",
    title: "Upkeep",
    ariaLabel: "Upkeep",
    tags: ["Beauty & Wellness"],
    href: "/work/upkeep",
    poster: "/assets/videos/Videos/Work/upkeep/thumbnails/upkeep---new-thumbnail.webp",
    video: "/assets/videos/Videos/Work/upkeep/upkeep---new-thumb.mp4",
    result: "$2M+",
    resultLabel: "raised after launch, with coverage in Glossy, The Economist, and WWD",
  },
  {
    index: "project_005",
    title: "Lendhub",
    ariaLabel: "Lendhub",
    tags: ["property finance"],
    href: "/work/lendhub",
    poster: "/assets/videos/Videos/Work/lendhub/thumbnails/lendhub---new-thumbnail.webp",
    video: "/assets/videos/Videos/Work/lendhub/lendhub---new-thumb.mp4",
    result: ">95",
    resultLabel: "Lighthouse performance score",
  },
  {
    index: "project_006",
    title: "Slip",
    ariaLabel: "Slip",
    tags: ["SaaS", "Fintech"],
    href: "/work/slip",
    poster: "/assets/videos/Videos/Work/slip/thumbnails/slip---new-thumbnail.webp",
    video: "/assets/videos/Videos/Work/slip/slip---new-thumb.mp4",
    result: "$3M",
    resultLabel: "raised in funding",
  },
  {
    index: "project_007",
    title: "Flooz",
    ariaLabel: "Flooz",
    tags: ["Web3"],
    href: "/work/flooz-link",
    poster: "/assets/videos/Videos/Work/flooz-link/thumbnails/flooz---new-thumbnail.webp",
    video: "/assets/videos/Videos/Work/flooz-link/flooz---new-thumb.mp4",
    result: "1",
    resultLabel: "week to develop an animated landing page",
  },
];
