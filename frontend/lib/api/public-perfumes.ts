export type PerfumeGender = "femme" | "homme" | "unisex" | "enfant";

export type PerfumeCard = {
  slug: string;
  name: string;
  brand: string;
  imageUrl?: string | null;
  shortDescription?: string | null;
  gender?: PerfumeGender | string | null;
  olfactiveFamily?: string | null;
  keyNotes: string[];
  budgetTier?: string | null;
  lowestPrice?: number | null;
  currency?: string | null;
  isNewArrival: boolean;
  isBestSeller: boolean;
};

export type PerfumeOffer = {
  merchantName: string;
  price: number;
  currency: string;
  availability?: string | null;
  affiliateUrl: string;
};

export type PerfumeDetail = PerfumeCard & {
  description?: string | null;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  offers: PerfumeOffer[];
};

export type FeaturedPerfumes = {
  newArrivals: PerfumeCard[];
  bestSellers: PerfumeCard[];
};

export type PerfumeFilterValue = {
  value: string;
  label: string;
  count: number;
};

export type PerfumeFilterOptions = {
  genders: PerfumeFilterValue[];
  families: PerfumeFilterValue[];
  priceRange: {
    min: number | null;
    max: number | null;
  };
};

export type PublicPerfumeSearchOptions = {
  q?: string;
  limit?: number;
  genders?: string[];
  families?: string[];
  minPrice?: number | null;
  maxPrice?: number | null;
};

export type QuizAnswers = {
  target: string;
  frequency: string;
  occasion: string;
  seasonality: string;
  desiredEffect: string;
  instinctiveFamily: string;
  sensations: string[];
  trail: string;
  socialStyle: string;
  atmosphere: string;
  roomPresence: string;
  idealWeekend: string;
  coreQuality: string;
  desiredFragrance: string;
  desiredImage: string;
};

export type QuizProfile = {
  key: string;
  title: string;
  subtitle: string;
  description: string;
  olfactiveFamilies: string[];
  keywords: string[];
};

export type QuizRecommendation = {
  perfume: PerfumeCard;
  explanation: string;
};

export type QuizResult = {
  profile: QuizProfile;
  recommendations: QuizRecommendation[];
};

function getPublicApiBaseUrl() {
  if (typeof window === "undefined") {
    const backendOrigin = (process.env.NEXT_BACKEND_ORIGIN ?? "http://localhost:8000").replace(/\/$/, "");
    return `${backendOrigin}/api/v1`;
  }

  return (
    process.env.NEXT_PUBLIC_PILOT_BACKEND_URL ||
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    "/api/v1"
  ).replace(/\/$/, "");
}

async function publicFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${getPublicApiBaseUrl()}${path}`, {
    cache: "no-store",
    ...init,
    headers: {
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
      ...(init?.headers ?? {}),
    },
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({ detail: `API error: ${res.status}` }));
    throw new Error(errorBody.detail || `API error: ${res.status}`);
  }

  return res.json();
}

export async function getFeaturedPerfumes(): Promise<FeaturedPerfumes> {
  return publicFetch<FeaturedPerfumes>("/perfumes/featured");
}

export async function getPublicPerfumeFilters(): Promise<PerfumeFilterOptions> {
  return publicFetch<PerfumeFilterOptions>("/perfumes/filters");
}

export async function searchPublicPerfumes(
  queryOrOptions: string | PublicPerfumeSearchOptions = "",
  options: Omit<PublicPerfumeSearchOptions, "q"> = {},
): Promise<PerfumeCard[]> {
  const resolved = typeof queryOrOptions === "string" ? { q: queryOrOptions, ...options } : queryOrOptions;
  const params = new URLSearchParams();

  params.set("q", resolved.q?.trim() ?? "");

  if (resolved.limit != null) {
    params.set("limit", String(resolved.limit));
  }

  for (const gender of resolved.genders ?? []) {
    if (gender) {
      params.append("gender", gender);
    }
  }

  for (const family of resolved.families ?? []) {
    if (family) {
      params.append("family", family);
    }
  }

  if (resolved.minPrice != null) {
    params.set("minPrice", String(resolved.minPrice));
  }

  if (resolved.maxPrice != null) {
    params.set("maxPrice", String(resolved.maxPrice));
  }

  return publicFetch<PerfumeCard[]>(`/perfumes/search?${params.toString()}`);
}

export async function getPublicPerfume(slug: string): Promise<PerfumeDetail> {
  return publicFetch<PerfumeDetail>(`/perfumes/${encodeURIComponent(slug)}`);
}

export async function getQuizRecommendations(answers: QuizAnswers): Promise<QuizResult> {
  return publicFetch<QuizResult>("/quiz/recommendations", {
    method: "POST",
    body: JSON.stringify(answers),
  });
}
