/** Copy for the About page hero header. */
export const aboutHeader = {
  title1: "Hi, I'm",
  title2: "Zeanur",
  paragraph:
    "I'm a full-stack software engineer building with Next.js, React, TypeScript, and Node.js — focused on real-world products, clean architecture, and user experiences that feel fast and intuitive.",
  button1: "Get in touch",
  button2: "See work",
  badge: "Open to Work",
  badgeLink: "https://github.com/md-zeon",
  video: "/assets/videos/hero-clip-vid.mp4",
  videoCaption: "ABOUT_ME",
};

/** Marquee strip label for the "Career story" divider. */
export const aboutDividerText = "Full-Stack Software Engineer";

/**
 * Career story content: the body paragraphs with inline link fragments
 * (`links` splice into the text by matching their `text`), the milestone
 * year sequence, and the left-column photos/quote stack.
 */
export const aboutStory = {
  year: "2023",
  body: [
    "I'm a Computer Science & Engineering student at Northern University Bangladesh, graduating in 2027 — and I've been building for the web since 2023.",
    "My journey started with the MERN stack — React, Node.js, Express, and MongoDB — where I learned to ship complete products rather than just pages.",
    "Since then I've focused on the modern full-stack toolkit: Next.js, TypeScript, PostgreSQL with Prisma, real-time systems with Socket.IO, and authentication with NextAuth and Better-Auth.",
    "I've built products end-to-end — a developer Q&A platform, a medicine marketplace for Bangladesh, and a real-time campus collaboration network.",
    "I publish open source, and I'm always experimenting with GSAP, Framer Motion, and AI integrations.",
    "I'm currently open to internships, freelance work, and open-source collaboration.",
  ],
  links: [
    { text: "developer Q&A platform", href: "https://dev-qna.vercel.app" },
    {
      text: "medicine marketplace",
      href: "https://oshudpati-marketplace-client.vercel.app",
    },
    {
      text: "real-time campus collaboration network",
      href: "https://github.com/smart-nub-campus-client",
    },
    { text: "Next.js", href: "https://nextjs.org" },
    { text: "TypeScript", href: "https://www.typescriptlang.org" },
    { text: "open source", href: "https://github.com/md-zeon" },
  ],
  quote:
    "A dedicated builder who turns ideas into shipped products — clean code, real features, and attention to the details users actually notice.",
  quoteName: "Collaborator",
  quoteRole: "Open source community",
  images: [
    {
      src: "/assets/images/about/zeon-1.webp",
      alt: "Zeanur working on a full-stack project.",
    },
    {
      src: "/assets/images/about/zeon-2.webp",
      alt: "A screen of code from one of Zeanur's projects.",
    },
    { src: "/assets/images/about/zeon-3.webp", alt: "Zeanur's dev setup." },
  ],
  misc: "ABOUT_ZEON",
};

/** One card in the "FUN FACTS" deck (media is video, or image with a crop variant). */
export type FactSlide = {
  caption: string;
  title: string;
  elementCaption: string;
  text: string;
  video?: string;
  videoCaption?: string;
  ctaLabel?: string;
  ctaHref?: string;
  image?: string;
  imageClass?: string;
  misc?: string;
};

/** The "FUN FACTS" deck: a caption plus the stack of fact cards. */
export const aboutFacts: { caption: string; slides: FactSlide[] } = {
  caption: "FUN_FCT_005",
  slides: [
    {
      caption: "CURRENTLY STUDYING",
      title: "Computer Science",
      video:
        "/assets/videos/Videos/Experiments/spaceman-gsap---new-thumbnail.mp4",
      videoCaption: "FUN_FCT_001",
      elementCaption: "FUN_FCT_001",
      ctaLabel: "See my education",
      ctaHref: "https://github.com/md-zeon",
      text: "BSc in Computer Science & Engineering at Northern University Bangladesh, graduating in 2027 — where most of my projects were born.",
    },
    {
      caption: "BASED IN",
      title: "Bangladesh",
      video: "/assets/videos/Videos/Experiments/noirve---new-thumbnail.mp4",
      videoCaption: "FUN_FCT_002",
      elementCaption: "FUN_FCT_002",
      text: "I'm based in Tongi, Gazipur — building for teams and users around the world, working in UTC+06.",
    },
    {
      caption: "MY STACK",
      title: "Full-Stack",
      video: "/assets/videos/Videos/Experiments/pitch---new-thumbnail.mp4",
      videoCaption: "FUN_FCT_003",
      elementCaption: "FUN_FCT_003",
      ctaLabel: "See GitHub",
      ctaHref: "https://github.com/md-zeon",
      text: "Next.js, React, TypeScript, Node.js, Express, PostgreSQL + Prisma, MongoDB + Mongoose, and Tailwind — the tools I use to ship products end-to-end.",
    },
    {
      caption: "DRIVEN BY",
      title: "Real Problems",
      video: "/assets/videos/Videos/Experiments/bertani---new-thumbnail.mp4",
      videoCaption: "FUN_FCT_004",
      elementCaption: "FUN_FCT_004",
      text: "I like products that solve real problems — from developer Q&A and medicine delivery to campus collaboration.",
    },
    {
      caption: "ALWAYS",
      title: "Open to Work",
      video:
        "/assets/videos/Videos/Experiments/battlefield-4---new-thumbnail.mp4",
      videoCaption: "FUN_FCT_005",
      elementCaption: "FUN_FCT_005",
      ctaLabel: "Get in touch",
      ctaHref: "/contact",
      text: "Currently open to internships, freelance projects, and open-source collaboration. If you have a problem worth solving, let's talk.",
    },
  ],
};
