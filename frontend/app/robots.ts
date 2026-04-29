import type { MetadataRoute } from "next";

function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:19100";
}

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/site", "/site/", "/site/recherche", "/site/quiz-parfum", "/site/parfum/"],
      disallow: ["/api/", "/login", "/builder/", "/app/", "/settings", "/support", "/documentation"],
    },
    sitemap: `${getSiteUrl().replace(/\/$/, "")}/sitemap.xml`,
  };
}
