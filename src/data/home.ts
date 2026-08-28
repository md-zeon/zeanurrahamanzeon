import { photos } from "./site";

/** Text for the animated collaboration marquee. */
export const logosBannerText = "Projects & Open Source";

/** Featured projects shown in the home hero carousel. */
export const featuredProjects = [
  {
    index: "001",
    title: "Smart NUB Campus",
    description:
      "A real-time academic collaboration network — messaging, study groups, gamified learning, and an AI assistant for campus life.",
    link: "/work/smart-nub-campus",
    video: "/assets/videos/Videos/Work/smart-nub-campus/Smart-NUB-Campus.mp4",
    navVideo:
      "/assets/videos/Videos/Work/smart-nub-campus/Smart-NUB-Campus.mp4",
  },
  {
    index: "002",
    title: "DevQnA",
    description:
      "A developer Q&A platform built from scratch — voting, rich authoring, and AI-assisted answers that help developers learn faster.",
    link: "/work/devqna",
    video: "/assets/videos/Videos/Work/devqna/DevQnA.mp4",
    navVideo: "/assets/videos/Videos/Work/devqna/DevQnA.mp4",
  },
  {
    index: "003",
    title: "Oshudpati Marketplace",
    description:
      "A medicine and healthcare marketplace for Bangladesh — product discovery, orders, and delivery built for the local market.",
    link: "/work/oshudpati-marketplace",
    video:
      "/assets/videos/Videos/Work/oshudpati-marketplace/Oshudpati-Marketplace.mp4",
    navVideo:
      "/assets/videos/Videos/Work/oshudpati-marketplace/Oshudpati-Marketplace.mp4",
  },
  {
    index: "004",
    title: "MicroEarn",
    description:
      "A micro-task marketplace with a real economy — users post tasks, complete them, and get paid through wallets and rewards.",
    link: "/work/microearn",
    video: "/assets/videos/Videos/Work/microearn/MicroEarn.mp4",
    navVideo: "/assets/videos/Videos/Work/microearn/MicroEarn.mp4",
  },
];

/** Labels for the featured projects carousel. */
export const homeProjectsLabels = {
  viewCaseStudy: "View case study",
  seeAllWork: "See all work",
};

/** "Why partner with me?" section heading and highlight copy. */
export const whyHeader = {
  line1: "Why work",
  line2: "with me?",
  caption: "ABOUT ME",
  highlight:
    "I'm a problem solver first: I focus on understanding what needs to be built, then choose the tools that fit — rather than forcing a favorite stack. Clean architecture, real-time features, and interfaces that feel fast and intuitive from the first click.",
};

/** Credibility cards in the "Why partner with me?" section. */
export const whyCards = [
  {
    caption: "WHY_ME_001",
    buttonLabel: "GitHub profile",
    href: "https://github.com/md-zeon",
    icon: true,
    video: "/assets/videos/Videos/Experiments/kurosumi.mp4",
    webgl: false,
  },
  {
    caption: "WHY_ME_002",
    buttonLabel: "LinkedIn",
    href: "https://www.linkedin.com/in/zeanur-rahaman-zeon/",
    icon: true,
    video: "/assets/videos/Videos/Experiments/space-shooter.mp4",
    webgl: false,
  },
  {
    caption: "WHY_ME_003",
    buttonLabel: "Open to work",
    href: "/contact",
    icon: true,
    video: "/assets/videos/Videos/Experiments/shortle.mp4",
    webgl: false,
  },
  {
    caption: "WHY_ME_004",
    buttonLabel: "Get to know me",
    href: "/about",
    icon: false,
    video: "/assets/videos/Videos/Experiments/brick-breaker.mp4",
    webgl: false,
  },
];

/** Header and caption for Services & Expertise. */
export const servicesHeader = {
  line1: "SERVICES &",
  line2: "EXPERTISE",
  caption: "SER_EXP_019",
};

/** Thumbnail videos cycled through the service cards, one per card (looping). */
export const serviceAssets = [
  "/assets/videos/Videos/Experiments/kurosumi.mp4",
  "/assets/videos/Videos/Experiments/space-shooter.mp4",
  "/assets/videos/Videos/Experiments/shortle.mp4",
];

/** The three service offerings (product, interface, systems). */
export const services = [
  {
    index: "01",
    title: "Product Engineering",
    description:
      "Turning a problem into a shipped product end-to-end — from data modeling and APIs to the interface users touch — with clean, maintainable architecture that scales as the product grows.",
    items: [
      "Problem Discovery",
      "Product Architecture",
      "API Design & Integration",
      "Database Modeling",
      "Authentication & Authorization",
      "Real-time Features",
      "Testing & Reliability",
      "Deployment & Monitoring",
      "TypeScript",
      "Next.js",
      "Node.js",
      "React",
      "PostgreSQL",
      "MongoDB",
    ],
  },
  {
    index: "02",
    title: "Interface Engineering & UI",
    description:
      "Crafting responsive, interactive interfaces where structure, motion, and usability work together — from component systems to buttery-smooth animations.",
    items: [
      "Responsive & Interactive UI",
      "Design Systems",
      "Component Architecture",
      "Motion & Interaction Design",
      "Accessibility",
      "Performance Optimization",
      "Dark Mode",
      "Micro-interactions",
      "Tailwind CSS",
      "GSAP",
      "Framer Motion",
    ],
  },
  {
    index: "03",
    title: "Backend, Auth & Infrastructure",
    description:
      "Designing robust APIs, authentication, and real-time systems — secure, observable, and deployed with confidence on modern cloud platforms.",
    items: [
      "API Design & Validation",
      "Auth & Role-Based Access",
      "Real-time Communication",
      "File Uploads & Media",
      "Secure & Observed Systems",
      "Payment Integration",
      "Testing & CI",
      "Cloud Deployment",
      "Express",
      "Socket.IO",
      "Prisma",
      "Vercel",
      "Firebase",
    ],
  },
];

/** Header and caption for Testimonials. */
export const testimonialsHeader = {
  line1: "Words From",
  line2: "collaborators",
  caption: "CLI_TES_104",
};

/** Client testimonials shown on the home page. */
export const testimonials = [
  {
    quote:
      "I treat every project as an end-to-end product problem — from data models and authentication to the pixels people actually touch. I choose the right tools for the job, ship clean code, and stay open to collaboration on anything that solves a real problem.",
    name: "Zeanur Rahaman Zeon",
    role: "Aspiring Software Engineer",
    image: photos.ellipseLight,
  },
  {
    quote:
      "Zeon and I built Smart NUB Campus together — real-time systems, clean architecture, and late nights we don't regret. Reliable peer, sharp engineer, and the kind of person you want on a hard project.",
    name: "Md Sajib",
    role: "Engineering Peer",
    image: photos.sajib,
  },
  {
    quote:
      "Zeon was our vice team lead on Project Quadra — real-time messages with Socket.io, typing indicators, delivery and read states — shipped from a rough spec to a feature that worked. We took first place, and that feature was a big part of it.",
    name: "Sumyta Bentey Habib",
    role: "Team Lead, Quadra",
    image: photos.sumyta,
  },
  {
    quote:
      "Zeon led our academic projects end to end — a hospital management system and a movie recommendation platform — and the plan, the structure, the working final demo were all his doing. Getting those two projects through together taught me how a real team lead works.",
    name: "Md. Kamal Hossain",
    role: "Academic Project Collaborator",
    image: photos.kamal,
  },
];

/** Header and configuration for the home lab slider. */
export const labHeader = {
  line1: "From",
  line2: "the lab",
  caption: "LAB_ZN_188",
  visitButtonLabel: "Visit experiments page",
  viewProjectLabel: "View project",
};

/** "From the labs" side-project slides for the home lab slider. */
export const labSlides = [
  {
    caption: "Project_001",
    title: "Space Shooter",
    href: "https://space-shooter-dun.vercel.app",
    video: "/assets/videos/Videos/Experiments/space-shooter.mp4",
  },
  {
    caption: "Project_002",
    title: "Taskero",
    href: "https://github.com/md-zeon",
    video: "/assets/videos/Videos/Experiments/taskero.mp4",
  },
  {
    caption: "Project_003",
    title: "HistoTrack",
    href: "https://histo-track.web.app",
    video: "/assets/videos/Videos/Experiments/histotrack.mp4",
  },
  {
    caption: "Project_004",
    title: "Brick Breaker",
    href: "https://brick-breaker-lac.vercel.app",
    video: "/assets/videos/Videos/Experiments/brick-breaker.mp4",
  },
  {
    caption: "Project_005",
    title: "Kurosumi",
    href: "https://kurosumi.vercel.app",
    video: "/assets/videos/Videos/Experiments/kurosumi.mp4",
  },
  {
    caption: "Project_006",
    title: "Shortle",
    href: "https://shortle-phi.vercel.app",
    video: "/assets/videos/Videos/Experiments/shortle.mp4",
  },
  {
    caption: "Project_007",
    title: "QR Generator",
    href: "https://qr-generator-omega-swart.vercel.app",
    video: "/assets/videos/Videos/Experiments/qr-generator.mp4",
  },
];

/** Bottom CTA: heading, caption, video assets, and the chat script. */
export const cta = {
  line1: "Interested in",
  line2: "working",
  line3: "together?",
  caption: "CTA_ZN_195",
  buttonLabel: "Send a message",
  videoLoop: "/assets/videos/hero-clip-vid.mp4",
  videoClientCall: "/assets/videos/Videos/CTA/cta-client-call---new.mp4",
  videoFun: "/assets/videos/Videos/CTA/cta-fun---new.mp4",
  videoCaption: "VIDEO_ZN_628",
  chat: {
    name: "Zeanur Rahaman Zeon",
    partnerName: "USER_1230",
    partnerAvatar: "U",
    firstMessage: "What are you building?",
    partnerMessages: [
      "I need help turning an idea into a working product.",
      "I have a problem and want to bring it to life.",
    ],
    myMessages: [
      "Awesome — let's talk about the problem and the goals.",
      "I'm in — let's find the right tools for what you're building.",
    ],
    buttons: ["Let's build together!", "Tell me about your idea!"],
  },
};
