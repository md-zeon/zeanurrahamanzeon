import { photos } from "./site";

export const aboutHeader = {
  title1: "Please",
  title2: "call me Bjorn",
  paragraph:
    "I'm an independent web designer and creative developer with years of experience building scalable, interactive web experiences, giving individuals and teams full control over their sites.",
  button1: "Get in touch",
  button2: "See work",
  badge: "Webflow Certified Partner",
  video: "/assets/videos/Videos/Experiments/spaceman-gsap---new-thumbnail.mp4",
  videoCaption: "VIDEO_041",
};

export const aboutDividerText = "Webflow & Creative Developer";

export const aboutStory = {
  year: "2018",
  body: [
    "After earning my degree in graphic design, I founded Brandenstein, a studio focused on branding and Webflow development.",
    "I was drawn to working with purpose-driven companies. One of the most meaningful collaborations was with Mindsum, a UK-based mental health non-profit.",
    "After a few years, I closed my studio and shifted my focus fully to Webflow development. I began partnering with teams like Flooz and Upkeep, and later joined a digital agency I helped achieve Webflow Partner status, working on projects for companies like Shop Circle and Plus X Innovation.",
    "This journey also led me to become an Official Webflow Partner.",
    "Outside client work, I collaborate with Webflow on feature launches (including being featured in the GSAP-powered interactions release), content creation, and the development of new exams like the Practitioner Certification.",
    "I also teach Webflow to creatives and teams through my growing YouTube channel and social media.",
  ],
  links: [
    { text: "Mindsum", href: "https://www.mindsum.org/" },
    { text: "Flooz", href: "https://flooz.xyz/" },
    { text: "Upkeep", href: "https://www.upkeepbeauty.com/" },
    { text: "Shop Circle", href: "https://shopcircle.co/" },
    { text: "Plus X Innovation", href: "https://www.plusxinnovation.com/" },
    { text: "Official Webflow Partner", href: "https://webflow.com/@bjorn-encutescu" },
    { text: "interactions release", href: "https://youtu.be/2TYLsY-FhF8?si=hWMhWffja8tetnuW" },
    { text: "the Practitioner Certification", href: "https://www.credential.net/93f14a78-69a7-44e0-b30b-3463783d533b" },
    { text: "YouTube channel", href: "https://www.youtube.com/@bjorn_flow" },
  ],
  quote: "If you want to get the job to the highest standard of quality, with 10 times less hassle or pain, and 10 times faster, go and talk to Brandenstein.",
  quoteName: "Fareed Baloch",
  quoteRole: "Management - Mindsum",
  images: [
    { src: "/assets/images/68a4679c41de25071bed5245_brandenstein.webp", alt: "Brandenstein" },
    { src: "/assets/images/68a467ad9cb5817976d878b6_plus-x.webp", alt: "Plus X Innovation's website on a laptop." },
    { src: "/assets/images/68a467be9c4a2fa8b724aa18_webflow-partner.webp", alt: "Webflow Partner Certification" },
  ],
  misc: "Image_356",
};

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

export const aboutFacts: { caption: string; slides: FactSlide[] } = {
  caption: "FUN_FCT_005",
  slides: [
    {
      caption: "FIRST GAME PLAYED AT",
      title: "5 years old",
      video: "/assets/videos/Videos/Experiments/spaceman-gsap---new-thumbnail.mp4",
      videoCaption: "VIDEO_407",
      elementCaption: "FUN_FCT_001",
      ctaLabel: "See gaming channel",
      ctaHref: "https://www.youtube.com/@uauizaui",
      text: "My gaming journey started when I was 5 years old on a PC and a PlayStation 2. At 14, I started a YouTube gaming channel, which a few years later helped me earn my first income as content creator.",
    },
    {
      caption: "BACKGROUND IN",
      title: "Fine Arts",
      image: photos.farSocial,
      misc: "Image_362",
      elementCaption: "FUN_FCT_002",
      ctaLabel: "See illustrations portfolio",
      ctaHref: "https://www.behance.net/bjorn_encutescu",
      text: "I started with fine arts before studying graphic design, and I won a contest at 6 for my kindergarten. I later built a skateboard illustration portfolio and designed my own tattoo.",
    },
    {
      caption: "One of my hobbies includes",
      title: "photography",
      image: photos.dscf,
      imageClass: "is-photo",
      misc: "IMAGE_857",
      elementCaption: "FUN_FCT_003",
      text: "At first my wish was to study photography instead of graphic design. I was always fascinated about capturing moments in time and showing others the way I see the world.",
    },
    {
      caption: "PROUD PLANT PARENT OF",
      title: "18 plants",
      image: photos.img6121,
      imageClass: "is-plants",
      misc: "IMAGE_619",
      elementCaption: "FUN_FCT_004",
      text: "Currently raising 18 plants (and counting) that are growing faster than my video games collection, and that is scary. Luckily, my cat had something to say about it once she entered my life.",
    },
    {
      caption: "CITY HOPPER",
      title: "4 cities",
      image: "/assets/images/6713ba0d300a1099644dddd8_Frame-84.png",
      misc: "IMAGE_827",
      elementCaption: "FUN_FCT_005",
      text: "I've lived in 4 different cities in Romania in the last decade. I'm currently living in Bucharest, but Cluj-Napoca is forever living in my heart. And yes, we do have vampires!",
    },
  ],
};
