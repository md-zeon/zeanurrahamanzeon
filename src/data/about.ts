/** Copy for the About page hero header. */
export const aboutHeader = {
  title1: "Hi, I'm",
  title2: "Zeanur Rahaman",
  paragraph:
    "I'm a software engineer who cares about solving problems, not just shipping code. I focus on clean architecture, solid fundamentals, and experiences that feel fast and intuitive — and I pick the right tool for each job rather than relying on a favorite stack.",
  button1: "Get in touch",
  button2: "See work",
  badge: "Open to Work",
  badgeLink: "https://github.com/md-zeon",
  video: "/assets/videos/hero-clip-vid.mp4",
  videoCaption: "ABOUT_ME",
};

/** Marquee strip label for the "Career story" divider. */
export const aboutDividerText = "Software Engineer";

/**
 * Career story content: the body paragraphs with inline link fragments
 * (`links` splice into the text by matching their `text`), the milestone
 * year sequence, and the left-column photos/quote stack.
 */
export const aboutStory = {
  year: "2023",
  body: [
    "I'm a Computer Science & Engineering student at Northern University Bangladesh, graduating in 2027 — and I've been building for the web since 2023.",
    "I learned by shipping complete products rather than just pages: a developer Q&A platform, a medicine marketplace for Bangladesh, and a real-time campus collaboration network.",
    "I don't tie myself to a single stack. Frameworks change, but fundamentals don't — data modeling, API design, authentication, and clean architecture transfer across tools. When I meet a new stack, I map its core concepts onto patterns I already know instead of starting from zero.",
    "I publish open source, and I'm always experimenting with motion, AI integrations, and whatever idea catches my interest.",
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
    { text: "open source", href: "https://github.com/md-zeon" },
  ],
  quote:
    "A dedicated builder who turns ideas into shipped products — clean code, real features, and attention to the details users actually notice.",
  quoteName: "Zeanur Rahaman Zeon",
  quoteRole: "Aspiring Software Engineer",
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
      caption: "MY APPROACH",
      title: "Tool-Agnostic",
      video: "/assets/videos/Videos/Experiments/pitch---new-thumbnail.mp4",
      videoCaption: "FUN_FCT_003",
      elementCaption: "FUN_FCT_003",
      ctaLabel: "See GitHub",
      ctaHref: "https://github.com/md-zeon",
      text: "I don't bind myself to a single stack. I pick the right tools for each problem, and when a new framework comes up I map it onto fundamentals I already know — so I'm productive fast in any codebase.",
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
