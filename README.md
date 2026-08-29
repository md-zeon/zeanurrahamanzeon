# zeanurrahamanzeon

The personal portfolio of **Zeanur Rahaman Zeon** (Software Engineer) — experiments, case studies, and labs, with a heavy laboratory-technical visual identity.

Built with **Next.js (App Router) + TypeScript + Tailwind CSS**, and GSAP (`@gsap/react`) for scroll/motion work with `ScrollTrigger` and `SplitText`.

## Commands

```bash
npm install   # install dependencies
npm run dev   # start the development server (http://localhost:3000)
npm run lint  # lint with ESLint
npm run build # production build (uses Turbopack)
```

## Stack and structure

- `src/app/` — pages (`/`, `/work`, `/work/[slug]`, `/experiments`, `/about`, `/contact`, `/privacy-policy`) plus the contact API route (`/api/contact`).
- `src/components/` — layout, sections, media, and shared UI pieces.
- `src/data/` — all copy, project metadata, and slide data (no hardcoded content in components).
- `src/lib/` — routers/hooks: `useLabSlider`, `useHeaderReveal`, `lenis`, `sound`, `gsap`.
- `src/app/sitemap.ts` — generates the sitemap from the site + case-study data.

## Notes

- `.env.local` holds the secrets used by the contact API route (it is git-ignored).
- Case-study pages are statically generated (`generateStaticParams`) from `src/data/caseStudies.ts`.
- Ambient/background videos are `decorative` for screen readers; content videos carry descriptive labels.