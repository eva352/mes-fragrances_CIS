import type { MetadataRoute } from "next";

function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:19100";
}

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/nos-parfums", "/nouveautes", "/meilleures-ventes", "/test-personnalite-olfactif", "/parfum/"],
      disallow: ["/api/", "/login", "/builder/", "/app/", "/settings", "/support", "/documentation"],
    },
    sitemap: `${getSiteUrl().replace(/\/$/, "")}/sitemap.xml`,
  };
}
