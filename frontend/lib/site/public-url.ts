const DEFAULT_PUBLIC_SITE_ORIGIN = "https://mes-fragrances.com";

export function getPublicSiteOrigin() {
  return (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_PUBLIC_SITE_ORIGIN).replace(/\/$/, "");
}

export function toPublicSiteUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getPublicSiteOrigin()}${normalizedPath}`;
}
