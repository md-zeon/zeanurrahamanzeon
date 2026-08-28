import type { MetadataRoute } from "next";
import { siteMeta } from "@/data/site";

/** Seeks the default allow-everything policy and points crawlers at the sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteMeta.siteUrl}/sitemap.xml`,
  };
}