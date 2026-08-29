import type { MetadataRoute } from "next";
import { siteMeta } from "@/data/site";
import { getAllCaseStudySlugs } from "@/data/caseStudies";

/** Static routes, updated here when new pages are added. */
const staticRoutes = [
  "",
  "/work",
  "/experiments",
  "/about",
  "/contact",
  "/privacy-policy",
] as const;

/** Generated at build time so search engines always see the live slug set. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteMeta.siteUrl;
  const page = (path: string, priority = 0.5, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly") => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  });

  const staticPages = staticRoutes.map((route) =>
    page(route, route === "" ? 1 : 0.7, route === "" ? "weekly" : "monthly")
  );

  const caseStudyPages = getAllCaseStudySlugs().map((study) =>
    page(`/work/${study.slug}`, 0.6)
  );

  return [...staticPages, ...caseStudyPages];
}