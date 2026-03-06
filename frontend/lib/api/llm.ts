import { apiGet, apiGetFile, apiPost, apiPut } from "@/lib/api/client";

export type LlmSettings = {
  hasOpenRouterApiKey: boolean;
  openRouterModel?: string | null;
};

export type OpenRouterModelItem = {
  id: string;
  name?: string | null;
};

export type OpenRouterProviderGroup = {
  provider: string;
  models: OpenRouterModelItem[];
};

export type OpenRouterModelsResponse = {
  providers: OpenRouterProviderGroup[];
};

export type GeneratedFile = {
  path: "PRD.md" | "QUESTIONS_RECOMMENDATIONS.md" | "SEO_GEO.md";
  content: string;
};

export type GeneratePreviewResponse = {
  files: GeneratedFile[];
};

export type LlmPackPrecheckResponse = {
  warnings: string[];
};

export type LlmPackGenerateResponse = {
  packId: string;
  downloadUrl: string;
  wroteDir: string;
  warnings: string[];
};

export async function getLlmSettings(): Promise<LlmSettings> {
  return apiGet<LlmSettings>("/llm/settings");
}

export async function upsertLlmSettings(payload: {
  openRouterApiKey?: string | null;
  openRouterModel?: string | null;
}): Promise<LlmSettings> {
  return apiPut<LlmSettings>("/llm/settings", payload);
}

export async function listOpenRouterModels(): Promise<OpenRouterModelsResponse> {
  return apiGet<OpenRouterModelsResponse>("/llm/openrouter/models");
}

export async function previewGeneratedDocs(model: string): Promise<GeneratePreviewResponse> {
  return apiPost<GeneratePreviewResponse>("/llm/generate/preview", { model });
}

export async function applyGeneratedDocs(files: GeneratedFile[]): Promise<void> {
  await apiPost<void>("/llm/generate/apply", { files });
}

export async function precheckLlmPack(): Promise<LlmPackPrecheckResponse> {
  return apiGet<LlmPackPrecheckResponse>("/llm/pack/precheck");
}

export async function generateLlmPack(): Promise<LlmPackGenerateResponse> {
  return apiPost<LlmPackGenerateResponse>("/llm/pack/generate", {});
}

export async function downloadLlmPack(downloadUrl: string): Promise<{ blob: Blob; filename: string }> {
  return apiGetFile(downloadUrl);
}
