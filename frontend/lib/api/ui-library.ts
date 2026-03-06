import { apiGet, apiPut } from "@/lib/api/client";

export type UiLibrary = {
  component_keys: string[];
};

export async function getUiLibrary(): Promise<UiLibrary> {
  return apiGet<UiLibrary>("/ui/library");
}

export async function upsertUiLibrary(component_keys: string[]): Promise<UiLibrary> {
  return apiPut<UiLibrary>("/ui/library", { component_keys });
}

