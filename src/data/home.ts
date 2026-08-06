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
    navVideo: "/assets/videos/Videos/Work/smart-nub-campus/Smart-NUB-Campus.mp4",
  },
  {
    index: "002",
    title: "DevQnA",
    description:
      "A full-featured developer Q&A platform built from scratch — voting, rich MDX authoring, and AI-assisted answers on Next.js and MongoDB.",
    link: "/work/devqna",
    video: "/assets/videos/Videos/Work/devqna/DevQnA.mp4",
    navVideo: "/assets/videos/Videos/Work/devqna/DevQnA.mp4",
  },
  {
    index: "003",
    title: "Oshudpati Marketplace",
    description:
      "A medicine and healthcare marketplace for Bangladesh — Next.js storefront with a dedicated Express and PostgreSQL API.",
    link: "/work/oshudpati-marketplace",
    video: "/assets/videos/Videos/Work/oshudpati-marketplace/Oshudpati-Marketplace.mp4",
    navVideo: "/assets/videos/Videos/Work/oshudpati-marketplace/Oshudpati-Marketplace.mp4",
  },
  {
    index: "004",
    title: "MicroEarn",
    description:
      "A micro-task marketplace where users complete tasks and earn digital coins — real-time feeds, wallets, and rewards on the MERN stack.",
    link: "/work/microearn",
    video: "/assets/videos/Videos/Work/microearn/MicroEarn.mp4",
    navVideo: "/assets/videos/Videos/Work/microearn/MicroEarn.mp4",
  },
];

/** "Why partner with me?" section heading and highlight copy. */
export const whyHeader = {
  line1: "Why work",
  line2: "with me?",
  caption: "ABOUT ME",
  highlight:
    "I build full-stack web applications with Next.js, React, TypeScript, and Node.js — focused on clean architecture, real-time features, and interfaces that feel fast and intuitive from the first click.",
};

/** Credibility cards in the "Why partner with me?" section. */
export const whyCards = [
  {
    caption: "WHY_ME_001",
    buttonLabel: "GitHub profile",
    href: "https://github.com/md-zeon",
    icon: true,
    video:
      "/assets/videos/Videos/Experiments/spaceman-gsap---new-thumbnail.mp4",
    webgl: false,
  },
  {
    caption: "WHY_ME_002",
    buttonLabel: "LinkedIn",
    href: "https://www.linkedin.com/in/zeanur-rahaman-zeon/",
    icon: true,
    video: "/assets/videos/Videos/Experiments/noirve---new-thumbnail.mp4",
    webgl: false,
  },
  {
    caption: "WHY_ME_003",
    buttonLabel: "Open to work",
    href: "/contact",
    icon: true,
    video: "/assets/videos/Videos/Experiments/pitch---new-thumbnail.mp4",
    webgl: false,
  },
  {
    caption: "WHY_ME_004",
    buttonLabel: "Get to know me",
    href: "/about",
    icon: false,
    video: "/assets/videos/Videos/Experiments/bertani---new-thumbnail.mp4",
    webgl: false,
  },
];

/** The three service offerings (development, frontend, backend/infrastructure). */
export const services = [
  {
    index: "01",
    title: "Full-Stack Web Development",
    description:
      "Building complete web applications end-to-end — from database schema and APIs to the user interface — with modern, type-safe tooling that scales as the product grows.",
    items: [
      "Next.js App Router",
      "React & TypeScript",
      "Node.js / Express",
      "REST API Design",
      "PostgreSQL & Prisma",
      "MongoDB & Mongoose",
      "Tailwind CSS",
      "shadcn/ui",
      "SEO-Ready Structure",
    ],
  },
  {
    index: "02",
    title: "Frontend Engineering & UI",
    description:
      "Crafting responsive, interactive interfaces where structure, motion, and usability work together — from component systems to buttery-smooth animations.",
    items: [
      "Responsive & Interactive UI",
      "GSAP & Framer Motion",
      "Design Systems",
      "Component Architecture",
      "Accessibility",
      "Performance Optimization",
      "Dark Mode",
      "Micro-interactions",
    ],
  },
  {
    index: "03",
    title: "Backend, Auth & Infrastructure",
    description:
      "Designing robust APIs, authentication, and real-time systems — secure, observable, and deployed with confidence on modern cloud platforms.",
    items: [
      "API Design & Validation",
      "NextAuth / Better-Auth",
      "JWT & RBAC",
      "Real-time with Socket.IO",
      "File Uploads (Cloudinary)",
      "Payment Integration",
      "Testing & CI",
      "Deployment (Vercel, Netlify, Firebase)",
    ],
  },
];

/** Client testimonials shown on the home page. */
export const testimonials = [
  {
    quote:
      "I treat every project as an end-to-end product problem — from data models and authentication to the pixels people actually touch. I build full-stack, ship clean code, and stay open to collaboration on anything that solves a real problem.",
    name: "Zeanur Rahaman Zeon",
    role: "Full-Stack Software Engineer",
    image: photos.ellipseLight,
    logo: "/assets/images/about/zeon-monogram.svg",
  },
];

/** "From the labs" side-project slides for the home lab slider. */
export const labSlides = [
  {
    caption: "Project_001",
    title: "DevTrack",
    href: "https://devtrack-gamma.vercel.app",
    video:
      "/assets/videos/Videos/Experiments/spaceman-gsap---new-thumbnail.mp4",
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
    video:
      "/assets/videos/Videos/Experiments/scramble-pizza-chaos---new-thumbnail.mp4",
  },
  {
    caption: "Project_008",
    title: "UI Motion Library",
    href: "/experiments",
    video:
      "/assets/videos/Videos/Experiments/thumbnails/callisto---new-thumbnail.webp",
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
    firstMessage: "What are you building?",
    partnerMessages: [
      "I need a full-stack developer for a web app.",
      "I have an idea and want to bring it to life.",
    ],
    myMessages: [
      "Awesome — let's talk stack and scope.",
      "I'm in! Next.js, Node, or the MERN stack — let's build.",
    ],
    buttons: ["Let's build together!", "Tell me about your idea!"],
  },
};
