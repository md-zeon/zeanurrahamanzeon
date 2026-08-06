/** Brand copy for the hero: name, title lines, and intro paragraph. */
export const brand = {
  name: "Zeanur Rahaman Zeon",
  logoStart: "zeanur",
  logoEnd: "rahaman",
  heroName: "Hi, I'm Zeanur Rahaman Zeon",
  heroLine1: "Full-Stack",
  heroLine2: "Software",
  heroLine3: "Engineer",
  heroIntro:
    "Full Stack Software Engineer specializing in React, Next.js, TypeScript, Node.js, and scalable web applications. I enjoy building performant products, solving real-world problems, and creating intuitive user experiences.",
  heroVideo: "/assets/videos/hero-clip-vid.mp4",
  heroVideoCaption: "HELLO_ZEON",
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

/** Lottie animation assets (e.g. the sound-waves loop). */
export const soundWaves = {
  light: "/assets/images/6894e65f6468ea9326628d4a_Sound-Waves.json",
};

/** Shared image assets referenced by content across the site. */
export const photos = {
  ellipseLight: "/assets/images/688cdf4c6797ca96923a1b7a_Ellipse-4.png",
  ellipseBlack: "/assets/images/67b5046fa617fafb44539f31_Ellipse-4.png",
  dscf: "/assets/images/68a45a760cd92325bdbe6e29_DSCF1373.webp",
  img6121: "/assets/images/68a45d04c04a2d5dfbf53d01_IMG_6121.webp",
  farSocial:
    "/assets/images/68a4558cc7d9b14451d2e8c6_4e9a496a616d6af1cb78d162097fe750_far-social.webp",
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
  youtube: "https://www.youtube.com/@",
  instagram: "https://www.instagram.com/",
  twitter: "https://x.com/developer_zeon",
  email: "mailto:zeon.cse@gmail.com",
  oldPortfolio: "https://zeon-portfolio.netlify.app/",
};

/** Footer link groups: overview, case studies, and connect lists. */
export const footer = {
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
  connectMore: [
    { label: "old portfolio", href: socials.oldPortfolio },
    { label: "YouTube", href: socials.youtube },
    { label: "instagram", href: socials.instagram },
  ],
};
