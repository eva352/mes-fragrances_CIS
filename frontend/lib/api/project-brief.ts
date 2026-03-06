import { apiGet, apiPut } from "@/lib/api/client";

export type ProjectType = "website" | "webapp" | "both";

export type ProjectEntity = {
  name: string;
  description?: string | null;
};

export type ProjectBrief = {
  version: string;
  kind: "aurora.projectBrief";

  title: string;
  oneLiner: string;
  projectType: ProjectType;

  targetUsers: string;
  primaryGoal: string;
  tone: string;
  facts: string;
  siteType: string;

  authRequired: boolean;
  roles: string[];

  mustHave: string[];
  niceToHave: string[];
  nonGoals: string[];

  entities: ProjectEntity[];
  integrations: string[];

  notes: string;
  openQuestions: string[];
};

export type ProjectBriefEnvelope = {
  id: string;
  slug: string;
  brief: ProjectBrief;
  created_at: string;
  updated_at: string;
};

export async function getProjectBrief(): Promise<ProjectBriefEnvelope> {
  return apiGet<ProjectBriefEnvelope>("/project/brief");
}

export async function upsertProjectBrief(brief: ProjectBrief): Promise<ProjectBriefEnvelope> {
  return apiPut<ProjectBriefEnvelope>("/project/brief", { brief });
}
