export const PUBLIC_PATHS = {
  home: "/",
  catalog: "/nos-parfums",
  newArrivals: "/nouveautes",
  bestSellers: "/meilleures-ventes",
  quiz: "/test-personnalite-olfactif",
  search: "/recherche",
  perfume: (slug: string) => `/parfum/${slug}`,
  legal: "/mentions-legales",
  privacy: "/confidentialite",
  cookies: "/cookies",
} as const;
