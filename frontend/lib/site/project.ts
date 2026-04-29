import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";

import { APP_NAME } from "@/lib/brand";

type ProjectBriefFile = {
  title?: string;
  oneLiner?: string;
};

const PROJECT_BRIEF_CANDIDATES = [
  "/llm_specs/project-brief.json",
  path.join(process.cwd(), "..", "llm_specs", "project-brief.json"),
  path.join(process.cwd(), "llm_specs", "project-brief.json"),
];

export async function getPublicProjectInfo(): Promise<{ title: string; oneLiner: string }> {
  for (const candidate of PROJECT_BRIEF_CANDIDATES) {
    try {
      const raw = await readFile(candidate, "utf-8");
      const parsed = JSON.parse(raw) as ProjectBriefFile;
      const title = parsed.title?.trim() || APP_NAME;
      const oneLiner = parsed.oneLiner?.trim() || "";
      return { title, oneLiner };
    } catch {
      // Try next candidate path.
    }
  }

  return { title: APP_NAME, oneLiner: "" };
}
