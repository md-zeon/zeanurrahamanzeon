export type CaseVideo = {
  kind: "video";
  caption: string;
  video: string;
  poster: string;
};

export type CaseImage = {
  kind: "image";
  caption: string;
  image: string;
  alt: string;
};

export type CaseMedia = CaseVideo | CaseImage;

export type CaseBlock =
  | { type: "info" }
  | { type: "content"; caption: string; paragraphs: string[] }
  | { type: "example"; row: "full" | "second"; media: CaseMedia[] };

export type CaseStudy = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  header: {
    title: string;
    result: string;
    resultLabel: string;
    tags: string[];
    paragraph: string;
    buttonLabel: string;
    buttonHref: string;
    badge: string;
    badgeLink: string;
  };
  info: {
    servicesCaption: string;
    services: string[];
    dateCaption: string;
    date: string;
    websiteLabel: string;
    websiteUrl: string;
  };
  blocks: CaseBlock[];
};

const workBase = "/assets/videos/Videos/Work/plus-x";

export const caseStudies: CaseStudy[] = [
  {
    slug: "plus-x-innovation",
    metaTitle: "Plus X Innovation Case Study",
    metaDescription:
      "Migrated Plus X Innovation to Webflow, improving performance, SEO, and content management — and saw a 340% increase in website conversions.",
    header: {
      title: "Creating a more scalable and high-performing experience for Plus X Innovation",
      result: "340%",
      resultLabel: "increase in website conversions",
      tags: ["Innovation Hub", "Tech Incubator"],
      paragraph:
        "Collaborated with Plus X Innovation to migrate their website to Webflow, creating a faster, more flexible platform that improved performance, streamlined content management, and supported long-term growth.",
      buttonLabel: "Book a call",
      buttonHref: "/contact",
      badge: "Webflow Certified Partner",
      badgeLink: "https://webflow.com/@bjornflow",
    },
    info: {
      servicesCaption: "Services",
      services: [
        "Webflow Development",
        "CMS",
        "Platform Migration",
        "SEO",
        "Integrations",
        "Performance Optimisation",
        "Animations",
        "Accessibility",
        "GDPR Setup",
        "Webflow Training",
        "Ongoing Support",
      ],
      dateCaption: "Date",
      date: "2023 - 2024",
      websiteLabel: "View website",
      websiteUrl: "https://www.plusxinnovation.com/",
    },
    blocks: [
      {
        type: "example",
        row: "full",
        media: [
          {
            kind: "video",
            caption: "Video_CS_001",
            video: `${workBase}/plus-x---1.mp4`,
            poster: `${workBase}/thumbnails/plus-x---thumb-3.webp`,
          },
        ],
      },
      { type: "info" },
      {
        type: "content",
        caption: "the challenge",
        paragraphs: [
          "Plus X Innovation needed a more flexible and scalable digital platform that their team could manage independently. Their previous setup made updates slow and limiting, while the new experience needed to balance performance, accessibility, SEO, and long-term usability without compromising on design quality.",
        ],
      },
      {
        type: "example",
        row: "full",
        media: [
          {
            kind: "video",
            caption: "Video_CS_002",
            video: `${workBase}/plus-x---4.mp4`,
            poster: `${workBase}/thumbnails/plus-x---thumb-6.webp`,
          },
        ],
      },
      {
        type: "example",
        row: "second",
        media: [
          {
            kind: "image",
            caption: "IMAGE_CS_001",
            image: "/assets/images/6a0c73e317dc859a91e0b428_8ed7e13a20a55ffafd5c1d8131de97cb_plus-x-2.webp",
            alt: "CMS dashboard showing blog post settings and a thumbnail of Kashish Agarwal holding Trailblazer award.",
          },
          {
            kind: "image",
            caption: "IMAGE_CS_002",
            image: "/assets/images/6a0c73e31bd48cbe47c03dfc_plus-x-1.webp",
            alt: "Two men working at desks in a modern office with plants and large windows.",
          },
        ],
      },
      {
        type: "example",
        row: "second",
        media: [
          {
            kind: "video",
            caption: "Video_CS_003",
            video: `${workBase}/plus-x---3.mp4`,
            poster: `${workBase}/thumbnails/plus-x---thumb-5.webp`,
          },
        ],
      },
      {
        type: "content",
        caption: "the solution",
        paragraphs: [
          "Their website was migrated to Webflow, translating the design direction into a scalable Webflow build. The new system gave their marketing team the ability to create new pages quickly, improve SEO and load times, and manage updates independently.",
          "Their team was supported post-launch with training, enhancements, and technical advice.",
        ],
      },
      {
        type: "example",
        row: "full",
        media: [
          {
            kind: "video",
            caption: "Video_CS_004",
            video: `${workBase}/plus-x---6.mp4`,
            poster: `${workBase}/thumbnails/plus-x---thumb-9.webp`,
          },
        ],
      },
      {
        type: "example",
        row: "second",
        media: [
          {
            kind: "image",
            caption: "IMAGE_CS_003",
            image: "/assets/images/6a0c73e3da4f3c334d5f37e2_plus-x-thumb-2.webp",
            alt: "Reception desk with a smiling woman working on a laptop under a Plus X Innovation sign.",
          },
        ],
      },
      {
        type: "example",
        row: "second",
        media: [
          {
            kind: "video",
            caption: "Video_CS_005",
            video: `${workBase}/plus-x---5.mp4`,
            poster: `${workBase}/thumbnails/plus-x---thumb-7.webp`,
          },
        ],
      },
      {
        type: "content",
        caption: "the result",
        paragraphs: [
          "After launch, Plus X Innovation saw a 340% increase in website conversions. Their team now runs the site confidently, with a structure that's built for growth.",
          "The new platform gave the team greater autonomy over content and future updates, while improving overall performance and conversion rates. Following launch, the website saw a 340% increase in conversions and established a more scalable foundation for future growth.",
        ],
      },
      {
        type: "example",
        row: "full",
        media: [
          {
            kind: "video",
            caption: "Video_CS_006",
            video: `${workBase}/plus-x---2.mp4`,
            poster: `${workBase}/thumbnails/plus-x---thumb-4.webp`,
          },
        ],
      },
      {
        type: "example",
        row: "second",
        media: [
          {
            kind: "image",
            caption: "IMAGE_CS_004",
            image: "/assets/images/6a0c73e37fe4c5496236502a_plus-x-thumb-1.webp",
            alt: "Workspace memberships webpage showing serviced and private office options with images of people working.",
          },
        ],
      },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}
