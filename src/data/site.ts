/** Site-wide SEO and root metadata. */
export const siteMeta = {
  siteUrl: "https://zeanurrahamanzeon.vercel.app",
  ogImage: "/og.png",
  title: {
    default: "Zeanur Rahaman Zeon | Software Engineer",
    template: "%s | Zeanur Rahaman Zeon",
  },
  description:
    "Software Engineer who solves real problems end-to-end with clean architecture and solid fundamentals — comfortable across stacks and quick to adapt. Explore projects, case studies, and open source.",
  keywords: [
    "Zeanur Rahaman Zeon",
    "Software Engineer",
    "Software Developer",
    "Full Stack Developer",
    "Problem Solver",
    "Web Developer",
    "Portfolio",
    "Open to Work",
    "JavaScript",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Tailwind CSS",
    "MongoDB",
    "PostgreSQL",
    "Prisma",
    "GSAP",
    "motion",
  ],
  author: "Zeanur Rahaman Zeon",
  creator: "Zeanur Rahaman Zeon",
  applicationName: "Zeanur Rahaman Zeon Portfolio",
};

/** Brand copy for the hero: name, title lines, and intro paragraph. */
export const brand = {
  name: "Zeanur Rahaman Zeon",
  logoStart: "zeanur",
  logoEnd: "rahamanzeon",
  heroName: "Hi, I'm Zeanur Rahaman Zeon",
  heroLine1: "Aspiring",
  heroLine2: "Software",
  heroLine3: "Engineer",
  heroIntro:
    "Full-stack software engineer building with TypeScript, React, Next.js, and Node.js. I start with the problem, pick the right tools to solve it, and build end-to-end products with clean architecture and solid fundamentals. When a new stack comes up, I don't relearn from scratch — I map its core concepts onto patterns I already know.",
  heroVideo: "/assets/videos/hero-clip-vid.mp4",
  heroVideoCaption: "HELLO_ZEON",
  credentialBadge: "Open to Work",
  heroCtaContact: "Get in touch",
  heroCtaWork: "See work",
};

/** Sound-effect URLs referenced by `data-audio` attributes site-wide. */
export const audio = {
  hover: "/assets/audio/Audio/button-hover.wav",
  scramble: "/assets/audio/Audio/buttons-scramble.wav",
  secondaryHover: "/assets/audio/Audio/secondary-hover-sound.wav",
  cardHover: "/assets/audio/Audio/Card-Hover.wav",
  closeMenu: "/assets/audio/Audio/close-menu.wav",
  backgroundMusic: "/assets/audio/Audio/background-music.mp3",
};

/** Sound toggle button labels. */
export const soundLabels = {
  turnOn: "Turn on sound",
  turnOff: "Turn off sound",
};

/** Lottie animation assets (e.g. the sound-waves loop). */
export const soundWaves = {
  light: "/assets/images/6894e65f6468ea9326628d4a_Sound-Waves.json",
};

/** Shared image assets referenced by content across the site. */
export const photos = {
  ellipseLight: "/assets/images/zeon.webp",
  ellipseBlack: "/assets/images/zeon.webp",
  about1: "/assets/images/about/zeon-1.webp",
  about2: "/assets/images/about/zeon-2.webp",
  about3: "/assets/images/about/zeon-3.webp",
};

/** Primary navigation links shown in the navbar and mobile menu. */
export const navLinks = [
  { label: "Work", href: "/work", index: "01" },
  { label: "experiments", href: "/experiments", index: "02" },
  { label: "About", href: "/about", index: "03" },
  { label: "Contact", href: "/contact", index: "04" },
];

/** External social/profile links used across headers and footer. */
export const socials = {
  linkedin: "https://www.linkedin.com/in/zeanur-rahaman-zeon/",
  github: "https://github.com/md-zeon",
  twitter: "https://x.com/developer_zeon",
  email: "mailto:zeon.cse@gmail.com",
};

/** Footer link groups: overview and connect lists. */
export const footer = {
  overviewTitle: "Overview",
  caseStudiesTitle: "Case Studies",
  connectTitle: "Connect",
  credentialText: "Open to Work",
  copyrightYear: 2026,
  copyrightText: "All rights reserved.",
  privacyPolicyLabel: "Privacy Policy",
  privacyPolicyHref: "/privacy-policy",
  overview: navLinks,
  caseStudies: [
    { label: "Smart NUB Campus", href: "/work/smart-nub-campus" },
    { label: "DevQnA", href: "/work/devqna" },
    { label: "Oshudpati Marketplace", href: "/work/oshudpati-marketplace" },
    { label: "MicroEarn", href: "/work/microearn" },
  ],
  connect: [
    { label: "linkedin", href: socials.linkedin },
    { label: "GitHub", href: socials.github },
    { label: "Twitter", href: socials.twitter },
    { label: "email", href: socials.email },
  ],
};

/** Per-page metadata shared by sub-pages: canonical URL, Open Graph, twitter card. */
export function pageMetadata(
  title: string,
  description: string,
  path: string,
  image: string = siteMeta.ogImage
) {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: `${siteMeta.siteUrl}${path}`,
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: siteMeta.author }],
    },
    twitter: { title, description, images: [image] },
  };
}
