/** A video asset used in a case study example block. */
export type CaseVideo = {
  kind: "video";
  caption: string;
  video: string;
  poster: string;
};

/** A static image asset used in a case study example block. */
export type CaseImage = {
  kind: "image";
  caption: string;
  image: string;
  alt: string;
};

/** Discriminated union of media a case study block can hold. */
export type CaseMedia = CaseVideo | CaseImage;

/**
 * A content block of a case study, discriminated by `type`:
 *  - "info": services + date + website link
 *  - "content": caption over paragraphs
 *  - "example": a showcase strip of media (full-bleed or second row)
 */
export type CaseBlock =
  | { type: "info" }
  | { type: "content"; caption: string; paragraphs: string[] }
  | { type: "example"; row: "full" | "second"; media: CaseMedia[] };

/** A full case study page: metadata, header, info row, and content blocks. */
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

/** Interim shared reel used until per-project media is provided. */
const reel = "/assets/videos/hero-clip-vid.mp4";

/** Real recorded walkthroughs (others pending). */
const devqnaVideo = "/assets/videos/Videos/Work/devqna/DevQnA.mp4";
const oshudpatiVideo = "/assets/videos/Videos/Work/oshudpati-marketplace/Oshudpati-Marketplace.mp4";
const smartNubVideo = "/assets/videos/Videos/Work/smart-nub-campus/Smart-NUB-Campus.mp4";
const microearnVideo = "/assets/videos/Videos/Work/microearn/MicroEarn.mp4";

/** All case studies in the site (looked up by slug in the detail page). */
export const caseStudies: CaseStudy[] = [
  {
    slug: "devqna",
    metaTitle: "DevQnA Case Study",
    metaDescription:
      "Building DevQnA — a full-featured developer Q&A platform with voting, MDX authoring, and AI-assisted answers, on Next.js, MongoDB, and the AI SDK.",
    header: {
      title: "Building a modern developer Q&A platform from scratch",
      result: "100%",
      resultLabel: "custom platform — no third-party Q&A SaaS",
      tags: ["Developer Q&A", "Next.js 15", "AI SDK"],
      paragraph:
        "DevQnA is a Stack Overflow–style platform for developers, built end-to-end with Next.js, MongoDB, and an AI-assisted answer experience. The goal was a fast, focused place for developers to ask, answer, and learn.",
      buttonLabel: "Get in touch",
      buttonHref: "/contact",
      badge: "Open to Work",
      badgeLink: "https://github.com/md-zeon",
    },
    info: {
      servicesCaption: "Services",
      services: [
        "Product Design",
        "Frontend Engineering",
        "Backend Engineering",
        "Database Design",
        "Authentication",
        "AI Integration",
        "Content Authoring (MDX)",
      ],
      dateCaption: "Date",
      date: "2025",
      websiteLabel: "View live",
      websiteUrl: "https://dev-qna.vercel.app",
    },
    blocks: [
      {
        type: "example",
        row: "full",
        media: [
          {
            kind: "video",
            caption: "Video_CS_001",
            video: devqnaVideo,
            poster: "/assets/images/projects/devqna/cover.webp",
          },
        ],
      },
      { type: "info" },
      {
        type: "content",
        caption: "the challenge",
        paragraphs: [
          "General Q&A platforms have grown noisy and hard to break into, and for a developer building a portfolio product there wasn't a focused alternative worth pointing at. I wanted to prove I could take a product idea from empty repository to deployed platform: real users, real auth, real content — and an AI assistant that actually helps.",
          "The build had to cover the whole surface of a modern web product: accounts, question and answer flows, voting, rich authoring, search, and a smart answer assistant.",
        ],
      },
      {
        type: "example",
        row: "full",
        media: [
          {
            kind: "video",
            caption: "Video_CS_002",
            video: reel,
            poster: "/assets/images/projects/devqna/cover.webp",
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
            image: "/assets/images/projects/devqna/shot-1.webp",
            alt: "DevQnA question list with tags and vote counts.",
          },
          {
            kind: "image",
            caption: "IMAGE_CS_002",
            image: "/assets/images/projects/devqna/shot-2.webp",
            alt: "DevQnA answer composer with MDX editor.",
          },
        ],
      },
      {
        type: "content",
        caption: "the solution",
        paragraphs: [
          "DevQnA runs on Next.js 15.5 with React 19 and TypeScript, backed by MongoDB via Mongoose, and built with Turbopack. Authentication uses NextAuth v5 (beta) with OAuth providers, so signing in is frictionless.",
          "Questions and answers are authored in a rich MDX editor and rendered with next-mdx-remote — giving answers real code blocks, syntax highlighting, and structure instead of plain text.",
          "The AI layer uses the Vercel AI SDK with an OpenAI model to suggest answers and help users frame better questions, making the platform genuinely faster to use rather than just another forum.",
        ],
      },
      {
        type: "example",
        row: "full",
        media: [
          {
            kind: "video",
            caption: "Video_CS_003",
            video: reel,
            poster: "/assets/images/projects/devqna/cover.webp",
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
            image: "/assets/images/projects/devqna/shot-3.webp",
            alt: "DevQnA AI-assisted answer suggestion.",
          },
        ],
      },
      {
        type: "content",
        caption: "the result",
        paragraphs: [
          "A complete, production-ready developer Q&A platform in a single codebase — OAuth authentication, rich content authoring, voting, and AI-assisted answers working together.",
          "More than a case study, it's proof of end-to-end product skill: turning a real product concept into shipped, deployable software with a modern full-stack toolchain.",
        ],
      },
    ],
  },
  {
    slug: "oshudpati-marketplace",
    metaTitle: "Oshudpati Marketplace Case Study",
    metaDescription:
      "Building Oshudpati — a medicine and healthcare marketplace for Bangladesh with a Next.js storefront and a dedicated Express, PostgreSQL, and Prisma API.",
    header: {
      title: "A medicine marketplace built for Bangladesh",
      result: "17+",
      resultLabel: "database models, 3-role RBAC, 4-step order lifecycle",
      tags: ["Health e-Commerce", "Next.js 16", "Express 5"],
      paragraph:
        "Oshudpati is a medicine and healthcare marketplace with a Next.js storefront and a dedicated Express + PostgreSQL API — product discovery, ordering, and secure delivery workflows built from the ground up.",
      buttonLabel: "Get in touch",
      buttonHref: "/contact",
      badge: "Open to Work",
      badgeLink: "https://github.com/md-zeon",
    },
    info: {
      servicesCaption: "Services",
      services: [
        "Product Design",
        "Frontend Engineering",
        "REST API Design",
        "Database Schema",
        "Authentication (Better-Auth)",
        "File Uploads (Cloudinary)",
        "Validation (Zod)",
      ],
      dateCaption: "Date",
      date: "2025",
      websiteLabel: "View live",
      websiteUrl: "https://oshudpati-marketplace-client.vercel.app",
    },
    blocks: [
      {
        type: "example",
        row: "full",
        media: [
          {
            kind: "video",
            caption: "Video_CS_001",
            video: oshudpatiVideo,
            poster: "/assets/images/projects/oshudpati/cover.webp",
          },
        ],
      },
      { type: "info" },
      {
        type: "content",
        caption: "the challenge",
        paragraphs: [
          "Buying medicine online in Bangladesh is underserved — product discovery is scattered, and order flows aren't built for the local market. I set out to build a marketplace with a real e-commerce architecture: a polished storefront and a separate, well-structured API.",
          "Two codebases meant one consistent product: the client had to feel like a modern shop while the server had to stay a clean, testable, role-aware API.",
        ],
      },
      {
        type: "example",
        row: "full",
        media: [
          {
            kind: "video",
            caption: "Video_CS_002",
            video: reel,
            poster: "/assets/images/projects/oshudpati/cover.webp",
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
            image: "/assets/images/projects/oshudpati/shot-1.webp",
            alt: "Oshudpati storefront product grid.",
          },
          {
            kind: "image",
            caption: "IMAGE_CS_002",
            image: "/assets/images/projects/oshudpati/shot-2.webp",
            alt: "Oshudpati checkout and order lifecycle.",
          },
        ],
      },
      {
        type: "content",
        caption: "the solution",
        paragraphs: [
          "The storefront is Next.js 16 with React 19 and Tailwind, talking to an Express 5.2 API backed by PostgreSQL and Prisma — a schema of 17+ models covering users, products, categories, carts, orders, and reviews.",
          "Authentication uses Better-Auth with email flows and role-based access control across three roles — admin, vendor, and customer — so every part of the marketplace is protected and permissioned.",
          "Everything is validated with Zod and typed environment handling via @t3-oss/env, product images are uploaded to Cloudinary, and the API ships as a serverless lambda on Vercel. The order lifecycle runs through four clear states from cart to delivery.",
        ],
      },
      {
        type: "example",
        row: "full",
        media: [
          {
            kind: "video",
            caption: "Video_CS_003",
            video: reel,
            poster: "/assets/images/projects/oshudpati/cover.webp",
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
            image: "/assets/images/projects/oshudpati/shot-3.webp",
            alt: "Oshudpati admin dashboard for managing orders.",
          },
        ],
      },
      {
        type: "content",
        caption: "the result",
        paragraphs: [
          "A production-ready two-tier e-commerce architecture: a fast Next.js storefront backed by a secure, role-aware Express API with a deliberately designed database.",
          "The project demonstrates the full marketplace stack — schema design, RBAC, order workflows, file uploads, validation, and serverless deployment — ready to grow into a real regional product.",
        ],
      },
    ],
  },
  {
    slug: "smart-nub-campus",
    metaTitle: "Smart NUB Campus Case Study",
    metaDescription:
      "Building Smart NUB Campus — a real-time academic collaboration network with messaging, study groups, gamified learning, and an AI assistant, on Next.js, Express, and Prisma.",
    header: {
      title: "A real-time campus collaboration network",
      result: "195+",
      resultLabel: "API endpoints across 48 database models",
      tags: ["Academic Network", "Real-time", "AI Chat"],
      paragraph:
        "Smart NUB Campus connects students and faculty with real-time messaging, collaboration spaces, gamified learning, and an AI study assistant — an ambitious full-stack platform engineered to scale.",
      buttonLabel: "Get in touch",
      buttonHref: "/contact",
      badge: "Open to Work",
      badgeLink: "https://github.com/md-zeon",
    },
    info: {
      servicesCaption: "Services",
      services: [
        "Product Design",
        "Frontend Engineering",
        "REST API Design",
        "Real-time (Socket.IO)",
        "Database Schema (48 models)",
        "AI Integration",
        "Testing & Observability",
      ],
      dateCaption: "Date",
      date: "2025",
      websiteLabel: "View source",
      websiteUrl: "https://github.com/md-zeon",
    },
    blocks: [
      {
        type: "example",
        row: "full",
        media: [
          {
            kind: "video",
            caption: "Video_CS_001",
            video: smartNubVideo,
            poster: "/assets/images/projects/smart-nub/cover.webp",
          },
        ],
      },
      { type: "info" },
      {
        type: "content",
        caption: "the challenge",
        paragraphs: [
          "Campus life is scattered — course materials, notices, events, and communication live across different channels, and students lose track. I wanted one platform where a campus community could share, message, and study together in real time.",
          "The scope was deliberately big: messaging, study groups, gamification, an AI assistant, and dozens of data models — a stress test of architecture, real-time engineering, and API design.",
        ],
      },
      {
        type: "example",
        row: "full",
        media: [
          {
            kind: "video",
            caption: "Video_CS_002",
            video: reel,
            poster: "/assets/images/projects/smart-nub/cover.webp",
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
            image: "/assets/images/projects/smart-nub/shot-1.webp",
            alt: "Smart NUB Campus real-time messaging view.",
          },
          {
            kind: "image",
            caption: "IMAGE_CS_002",
            image: "/assets/images/projects/smart-nub/shot-2.webp",
            alt: "Smart NUB Campus gamified learning dashboard.",
          },
        ],
      },
      {
        type: "content",
        caption: "the solution",
        paragraphs: [
          "A Next.js 16.2 client on top of an Express 5.2 server with Prisma and PostgreSQL — 48 database models covering users, groups, messages, courses, events, achievements, and more, exposed through roughly 195 REST endpoints.",
          "Real-time messaging and notifications run on Socket.IO with a Redis adapter, so presence and delivery stay fast and horizontal. Authentication uses Better Auth with email OTP, keeping campus access simple and secure.",
          "The AI study assistant integrates both Gemini and Groq, so students get contextual help on demand. The server is instrumented with pino for structured logging, and covered by Vitest, Supertest, and Playwright suites.",
        ],
      },
      {
        type: "example",
        row: "full",
        media: [
          {
            kind: "video",
            caption: "Video_CS_003",
            video: reel,
            poster: "/assets/images/projects/smart-nub/cover.webp",
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
            image: "/assets/images/projects/smart-nub/shot-3.webp",
            alt: "Smart NUB Campus AI study assistant.",
          },
        ],
      },
      {
        type: "content",
        caption: "the result",
        paragraphs: [
          "A comprehensive campus platform — real-time chat, collaboration spaces, gamified learning, and AI help — engineered like a production system with 48 data models, ~195 endpoints, and real test coverage.",
          "It's the clearest example yet of building at system scale: careful schema design, disciplined API boundaries, real-time infrastructure, and AI features shipped together.",
        ],
      },
    ],
  },
  {
    slug: "microearn",
    metaTitle: "MicroEarn Case Study",
    metaDescription:
      "Building MicroEarn — a micro-task marketplace with a server-authoritative coin economy, real Stripe payments, worker payouts, and three-role dashboards on React, Express, and MongoDB.",
    header: {
      title: "A micro-task marketplace with a real money economy",
      result: "55",
      resultLabel: "API endpoints across 6 collections and 3 roles",
      tags: ["Micro-tasks", "MERN", "Stripe"],
      paragraph:
        "MicroEarn connects buyers posting paid tasks with workers who complete them for digital coins — coins that are bought with real Stripe payments and withdrawn as real money. It's a solo build where money correctness had to be perfect.",
      buttonLabel: "Get in touch",
      buttonHref: "/contact",
      badge: "Open to Work",
      badgeLink: "https://github.com/md-zeon",
    },
    info: {
      servicesCaption: "Services",
      services: [
        "Product Design",
        "Frontend Engineering (React 19)",
        "Backend Engineering (Express 5)",
        "Database Design (MongoDB)",
        "Authentication (Firebase)",
        "Payments (Stripe)",
        "Roles & Permissions",
      ],
      dateCaption: "Date",
      date: "2025 — 2026",
      websiteLabel: "View live",
      websiteUrl: "https://micro-earn-7be08.web.app",
    },
    blocks: [
      {
        type: "example",
        row: "full",
        media: [
          {
            kind: "video",
            caption: "Video_CS_001",
            video: microearnVideo,
            poster: "/assets/images/projects/microearn/cover.webp",
          },
        ],
      },
      { type: "info" },
      {
        type: "content",
        caption: "the challenge",
        paragraphs: [
          "Micro-task marketplaces are simple to describe and hard to build well: buyers post paid tasks, workers complete them for money, and a platform takes its cut. The hard parts are financial — coins must be bought with real money, workers must be paid out, and no balance can ever go negative or be credited twice.",
          "As a solo student project, the scope was a full product: three roles (buyer, worker, admin), a virtual coin economy backed by real Stripe payments, worker withdrawals, and a polished multi-dashboard experience across 30 client routes.",
        ],
      },
      {
        type: "example",
        row: "full",
        media: [
          {
            kind: "video",
            caption: "Video_CS_002",
            video: microearnVideo,
            poster: "/assets/images/projects/microearn/cover.webp",
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
            image: "/assets/images/projects/microearn/shot-1.webp",
            alt: "MicroEarn task marketplace landing page.",
          },
          {
            kind: "image",
            caption: "IMAGE_CS_002",
            image: "/assets/images/projects/microearn/shot-2.webp",
            alt: "MicroEarn buyer dashboard and coin purchase flow.",
          },
        ],
      },
      {
        type: "content",
        caption: "the solution",
        paragraphs: [
          "The architecture is deliberately split: a React 19 + Vite single-page app served by Firebase Hosting, and an Express 5 + MongoDB API deployed to Vercel — 55 endpoints across user, task, payment, submission, withdrawal, statistic, notification, and admin modules.",
          "The economy is server-authoritative. Creating a task deducts its full budget atomically and refunds unfilled slots on deletion; approving a submission credits a worker exactly once; approving a withdrawal uses a conditional update that can never push a balance below zero. Stripe runs on two paths — client confirmation and a signature-verified raw-body webhook — both credited idempotently against Stripe event and payment-intent IDs so money is never double-counted.",
          "Security was treated as core, not afterthought: sanitize-html allowlists for rich task content, javascript-URI stripping, regex-escaped search, and Firebase ID-token verification with dedicated role guards on every protected route. The client delivers the full surface — rich text editor, image upload with Cloudinary→ImgBB fallback, 30-second-polled notifications, Recharts analytics for all three roles, light/dark theme, skeletons, and accessibility support.",
        ],
      },
      {
        type: "example",
        row: "full",
        media: [
          {
            kind: "video",
            caption: "Video_CS_003",
            video: microearnVideo,
            poster: "/assets/images/projects/microearn/cover.webp",
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
            image: "/assets/images/projects/microearn/shot-3.webp",
            alt: "MicroEarn admin dashboard with platform KPIs.",
          },
        ],
      },
      {
        type: "content",
        caption: "the result",
        paragraphs: [
          "A production-deployed marketplace written over roughly a year — 265 commits across client and server, ~21,000 lines of application code, 55 endpoints, 30 client routes, and 89 components. Both apps are live, and the server's README documents the verification pass: lint with 0 errors, successful production builds, and the security fixes that matter most.",
          "The project proves the full commerce stack on a solo build — atomic money moves, idempotent payments, role-based access, and a product that looks and feels finished.",
        ],
      },
    ],
  },
];

/** Looks up a case study by its slug, or undefined when not found. */
export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}
