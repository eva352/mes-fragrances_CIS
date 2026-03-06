import { apiPost } from "@/lib/api/client";

export type AvailableBlock = {
  category: string;
  slug: string;
  title: string;
};

export type SuggestedBlock = {
  category: string;
  slug: string;
  title: string;
  content?: Record<string, unknown> | null;
  props?: Record<string, unknown> | null;
};

export type MaxUiHint = {
  query: string;
  pattern: { id: string; name: string; sections: string[] };
  notes: string[];
  designSystem?: {
    category: string;
    severity: string;
    patternName: string;
    patternSectionsText: string;
    ctaPlacement: string;
    colorStrategy: string;
    conversionFocus: string;
    styleName: string;
    styleKeywords: string;
    styleBestFor: string;
    styleEffects: string;
    stylePerformance: string;
    styleAccessibility: string;
    colors: Record<string, string>;
    typography: Record<string, string>;
    keyEffects: string;
    antiPatterns: string;
  } | null;
  designSystemMarkdown?: string | null;
};

export type WebsiteStructurePlan = {
  blocks: SuggestedBlock[];
  notes: string[];
};

export type SuggestWebsiteStructureResponse = {
  mode: "website";
  maxUi: MaxUiHint;
  plan: WebsiteStructurePlan;
};

export async function suggestWebsiteStructure(params: {
  pageSlug: string;
  availableBlocks: AvailableBlock[];
}): Promise<SuggestWebsiteStructureResponse> {
  return apiPost<SuggestWebsiteStructureResponse>("/structure/suggest", {
    mode: "website",
    pageSlug: params.pageSlug,
    availableBlocks: params.availableBlocks,
  });
}

export type AvailableTemplate = { id: string; title: string };

export type WebappStructurePagePlan = {
  id: string;
  title: string;
  path: string;
  enabled: boolean;
  templateId?: string | null;
  objective?: string | null;
  description?: string | null;
  successCriteria?: string[];
};

export type WebappStructurePlan = {
  navigationPageIds: string[];
  pages: WebappStructurePagePlan[];
  notes: string[];
};

export type SuggestWebappStructureResponse = {
  mode: "webapp";
  maxUi: MaxUiHint;
  plan: WebappStructurePlan;
};

export async function suggestWebappStructure(params: {
  availableTemplates: AvailableTemplate[];
}): Promise<SuggestWebappStructureResponse> {
  return apiPost<SuggestWebappStructureResponse>("/structure/suggest", {
    mode: "webapp",
    availableTemplates: params.availableTemplates,
  });
}
