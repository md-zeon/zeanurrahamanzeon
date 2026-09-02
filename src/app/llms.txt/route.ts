import { siteMeta } from "@/data/site";

/**
 * Serves an `llms.txt` index at /llms.txt (text/plain). This gives LLMs and
 * AI agents a curated, task-shaped map of the site's most quotable pages —
 * not a sitemap dump. Keep it short and factual; refresh when the surface
 * changes.
 */
export function GET() {
  const base = siteMeta.siteUrl;
  const file = `# Zeanur Rahaman Zeon

> Zeanur Rahaman Zeon (md-zeon) is a computer science student and full-stack software engineer from Gazipur, Bangladesh building production web apps across developer tools, health marketplaces, real-time campus networks, and micro-task economies. Skilled in React, Next.js, Node.js, TypeScript, PostgreSQL, and modern motion/UI — portfolio and case studies at ${base}.

## Core pages

- [Home](${base}): Short portfolio landing page with an intro, a pinned 3D showcase of featured projects, and a CTA to get in touch.
- [About](${base}/about): Summary of Zeanur's background, education (BSc Computer Science & Engineering at Northern University Bangladesh), career story, principles, and fun facts.
- [Work & Projects](${base}/work): Index of Zeanur's real-world projects across a developer Q&A platform, medicine marketplace, campus network, and micro-task platform.
- [Experiments & Side Projects](${base}/experiments): Collection of side projects, open-source tools, and motion experiments (Kurosumi, Space Shooter, Taskero, HistoTrack, and more).
- [Contact](${base}/contact): How to reach Zeanur for internships, freelance work, open-source collaboration, or anything else.
- [Privacy Policy](${base}/privacy-policy): Privacy policy for zeanurrahamanzeon.vercel.app.

## Case studies

- [Smart NUB Campus](${base}/work/smart-nub-campus): A real-time academic network for campus collaboration.
- [DevQnA](${base}/work/devqna): A Q&A platform for developers to ask and answer programming questions.
- [Oshudpati](${base}/work/oshudpati-marketplace): A medicine marketplace for Bangladesh.
- [MicroEarn](${base}/work/microearn): A micro-task marketplace for earning online.

## Profiles

- [GitHub](https://github.com/md-zeon): Open-source repositories and code by Zeanur.
- [LinkedIn](https://www.linkedin.com/in/zeanur-rahaman-zeon/): Professional profile and experience.
- [X / Twitter](https://x.com/developer_zeon): Updates and posts from Zeanur.
`;
  return new Response(file, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
