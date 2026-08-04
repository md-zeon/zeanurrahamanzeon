import { photos } from "./site";

/** Text for the animated collaboration marquee. */
export const logosBannerText = "Collaborations & Brand Experience";

/** Featured projects shown in the home hero carousel. */
export const featuredProjects = [
  {
    index: "001",
    title: "Plus X Innovation",
    description:
      "Helped the marketing team migrate to Webflow, optimise SEO, and scale their site with a flexible CMS.",
    link: "/work/plus-x-innovation",
    video: "/assets/videos/Videos/Work/plus-x/plus-x---new-thumb.mp4",
    navVideo: "/assets/videos/Videos/Work/plus-x/plus-x---new-thumb.mp4",
  },
  {
    index: "002",
    title: "Appetite",
    description:
      "Migrated to Webflow and helped the marketing team scale with CMS setup, optimisation, and continued support.",
    link: "/work/appetite",
    video: "/assets/videos/Videos/Work/appetite/appetite---new-thumb.mp4",
    navVideo: "/assets/videos/Videos/Work/appetite/appetite---new-thumb.mp4",
  },
  {
    index: "003",
    title: "Lendhub",
    description:
      "Built a scalable website and supported marketing with integrations and continuous optimisation.",
    link: "/work/lendhub",
    video: "/assets/videos/Videos/Work/lendhub/lendhub---new-thumb.mp4",
    navVideo: "/assets/videos/Videos/Work/lendhub/lendhub---new-thumb.mp4",
  },
  {
    index: "004",
    title: "Upkeep",
    description:
      "Developed a scalable Webflow site and supported ongoing updates while integrating third-party tools.",
    link: "/work/upkeep",
    video: "/assets/videos/Videos/Work/upkeep/upkeep---new-thumb.mp4",
    navVideo: "/assets/videos/Videos/Work/upkeep/upkeep---new-thumb.mp4",
  },
];

/** "Why partner with me?" section heading and highlight copy. */
export const whyHeader = {
  line1: "Why partner",
  line2: "with me?",
  caption: "ABT_ME_188",
  highlight:
    "With a background in design and development, I craft structured, high-performing Webflow websites that drive results, scale easily, and maintain visual integrity over time.",
};

/** Credibility cards in the "Why partner with me?" section. */
export const whyCards = [
  {
    caption: "Why_ME_001",
    buttonLabel: "Webflow community educator",
    href: "https://www.youtube.com/@bjorn_flow",
    icon: true,
    video:
      "/assets/videos/Videos/Experiments/spaceman-gsap---new-thumbnail.mp4",
    webgl: false,
  },
  {
    caption: "Why_ME_002",
    buttonLabel: "Webflow partner",
    href: "https://webflow.com/@bjorn-encutescu",
    icon: true,
    webgl: true,
    usProject: "dwvNIGK9sc6kSmQFyc8T",
  },
  {
    caption: "Why_ME_003",
    buttonLabel: "Featured by Webflow",
    href: "https://youtu.be/2TYLsY-FhF8?si=QP3E4meUH8CMH711",
    icon: true,
    video: "/assets/videos/Videos/Experiments/noirve---new-thumbnail.mp4",
    webgl: false,
  },
  {
    caption: "Why_ME_004",
    buttonLabel: "Get to know me",
    href: "/about",
    icon: false,
    video: "/assets/videos/Videos/Experiments/pitch---new-thumbnail.mp4",
    webgl: false,
  },
];

/** The three service offerings (development, design, optimisation). */
export const services = [
  {
    index: "01",
    title: "Creative Webflow Development",
    description:
      "Building marketing and e-commerce websites with advanced interactions, clean architecture, and reliable performance, designed to scale and stay consistent as your brand grows.",
    items: [
      "Webflow Development",
      "Platform Migration to Webflow",
      "GSAP & Advanced Interactions",
      "CMS Architecture",
      "E-commerce Integration",
      "Style Guide System",
      "Accessibility",
      "SEO-Ready Structure",
      "API & Integrations",
    ],
    usProject: "H9hGn4sMY28E78k8piXw",
  },
  {
    index: "02",
    title: "Web & Interaction Design",
    description:
      "Crafting thoughtful, design-led interfaces where structure, motion, and usability work together to create memorable web experiences.",
    items: [
      "Wireframes",
      "Website Strategy",
      "UI/UX Design",
      "Prototyping",
      "Interaction Design",
      "Visual Design",
      "Design Systems",
      "Style Guide",
      "Brand Identity Design",
      "Art Direction",
      "Creative Direction",
    ],
    usProject: "xr6zzxkUu23oXAGNAOSx",
  },
  {
    index: "03",
    title: "Webflow Optimisation & Scalability",
    description:
      "Enhancing and scaling existing Webflow websites with clean structure, improved performance, and advanced analytics to support growing brands.",
    items: [
      "Webflow Enterprise Setup",
      "Webflow Localization Setup",
      "Webflow Optimize Setup",
      "Webflow Analytics Setup",
      "Webflow Ecommerce Setup",
      "Performance Optimisation",
      "GDPR-Compliant Configuration",
      "Webflow Training",
      "Ongoing Optimisation",
    ],
    usProject: "54PpK3hT4QRCjYuTRGya",
  },
];

/** Client testimonials shown on the home page. */
export const testimonials = [
  {
    quote:
      "I've worked with Bjorn on several projects over the years, and it's always been a positive experience. Building a website can get complicated, especially with multiple stakeholders involved, but Bjorn brings a steady, can-do approach that really helps keep things moving. He listens closely to what clients want and offers thoughtful, practical solutions—especially when the challenges aren't straightforward. If you need a Webflow developer, I'd definitely recommend Bjorn—I already have, more than once.",
    name: "Anni Haugan",
    role: "Product Designer - Appetite",
    image: photos.ellipseLight,
    logo: "/assets/images/677056164bccc35aba788abc_d9743b34182def9321b08034b660e0ae_altiverse.svg",
  },
  {
    quote: "Suspendisse varius enim in eros elementum tristique.",
    name: "Jane Smith",
    role: "CTO - Company B",
    image: photos.ellipseLight,
    logo: "/assets/images/677056168e060f50417adc2b_mindsum.svg",
  },
  {
    quote: "Duis cursus, mi quis viverra ornare, eros dolor interdum nulla.",
    name: "Alice Johnson",
    role: "Designer - Company C",
    image: photos.ellipseLight,
    logo: "/assets/images/677056168e060f50417adc2b_mindsum.svg",
  },
  {
    quote:
      "Ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet.",
    name: "Bob Brown",
    role: "Manager - Company D",
    image: photos.ellipseLight,
    logo: "/assets/images/677056168e060f50417adc2b_mindsum.svg",
  },
  {
    quote: "Curabitur dapibus nisl nec fringilla tempus.",
    name: "Charlie Green",
    role: "Director - Company E",
    image: photos.ellipseLight,
    logo: "/assets/images/677056168e060f50417adc2b_mindsum.svg",
  },
];

/** "From the labs" clonable slides for the home lab slider. */
export const labSlides = [
  {
    caption: "Clonable_001",
    title: "Spaceman",
    href: "https://spaceman-gsap.webflow.io/",
    video:
      "/assets/videos/Videos/Experiments/spaceman-gsap---new-thumbnail.mp4",
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
    video:
      "/assets/videos/Videos/Experiments/battlefield-4---new-thumbnail.mp4",
  },
  {
    caption: "Clonable_007",
    title: "Pizza Chaos",
    href: "/experiments",
    video:
      "/assets/videos/Videos/Experiments/scramble-pizza-chaos---new-thumbnail.mp4",
  },
  {
    caption: "Clonable_008",
    title: "Callisto",
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
  caption: "CTA_BF_195",
  buttonLabel: "Send a message",
  videoLoop: "/assets/videos/hero-clip-vid.mp4",
  videoClientCall: "/assets/videos/Videos/CTA/cta-client-call---new.mp4",
  videoFun: "/assets/videos/Videos/CTA/cta-fun---new.mp4",
  videoCaption: "VIDEO_628",
  chat: {
    name: "Bjorn Encuțescu",
    firstMessage: "What brings you here today?",
    partnerMessages: [
      "I'm ready to collaborate on something incredible with you!",
      "I'm here for all the creative and nerdy goodness!",
    ],
    myMessages: [
      "Awesome! Let's get started. Ready?",
      "Let's dive in! Webflow, GSAP, or gaming nostalgia, you're in the right place.",
    ],
    buttons: ["Build something amazing!", "Geek out with you!"],
  },
};
