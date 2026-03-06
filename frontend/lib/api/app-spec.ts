import { apiGet, apiPut } from "@/lib/api/client";

export type AppSpecTheme = {
  mode: "system" | "light" | "dark";
  palette: string;
};

export type AppSpecProject = {
  id: string;
  title: string;
  theme: AppSpecTheme;
};

export type AppSpecShellNavItem = {
  id: string;
  title: string;
  path: string;
};

export type AppSpecShell = {
  layout: "sidebar";
  navigation: AppSpecShellNavItem[];
};

export type CustomBlockLayout = {
  kind: "stack" | "split" | "grid" | "tabs";
  options: Record<string, unknown>;
};

export type CustomBlockNode = {
  id: string;
  componentKey: string;
  props: Record<string, unknown>;
  bindings?: Record<string, unknown>;
};

export type CustomBlock = {
  id: string;
  type: "custom";
  title: string;
  layout: CustomBlockLayout;
  nodes: CustomBlockNode[];
};

export type AppDataSource = {
  id: string;
  kind: "http";
  endpoint: string;
  notes?: string;
};

export type AppPage = {
  id: string;
  path: string;
  title: string;
  enabled?: boolean;
  templateId?: string | null;
  objective?: string | null;
  description?: string | null;
  successCriteria?: string[];
  sections: CustomBlock[];
  dataSources?: AppDataSource[];
};

export type AppSpec = {
  version: string;
  kind: "aurora.app";
  project: AppSpecProject;
  shell: AppSpecShell;
  pages: AppPage[];
};

export type AppSpecEnvelope = {
  id: string;
  slug: string;
  spec: AppSpec;
  created_at: string;
  updated_at: string;
};

export async function getAppSpec(): Promise<AppSpecEnvelope> {
  return apiGet<AppSpecEnvelope>("/app/spec");
}

export async function upsertAppSpec(spec: AppSpec): Promise<AppSpecEnvelope> {
  return apiPut<AppSpecEnvelope>("/app/spec", { spec });
}
