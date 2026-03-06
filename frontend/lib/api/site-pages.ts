import { apiDelete, apiGet, apiPost, apiPut } from "@/lib/api/client";

export type BlockInstance = {
  id: string;
  category: string;
  slug: string;
  title: string;
  content?: Record<string, unknown> | null;
  props?: Record<string, unknown> | null;
};

export type SitePage = {
  id: string;
  slug: string;
  title: string;
  blocks: BlockInstance[];
  parent_id: string | null;
  status: string;
  show_in_nav: boolean;
  nav_order: number;
  is_home: boolean;
  objective: string | null;
  expected_action: string | null;
  key_messages: string[];
  facts: string | null;
  created_at: string;
  updated_at: string;
};

export async function getSitePage(slug: string): Promise<SitePage> {
  return apiGet<SitePage>(`/site/pages/${encodeURIComponent(slug)}`);
}

export async function upsertSitePage(
  slug: string,
  payload: {
    title?: string;
    blocks?: BlockInstance[];
    parent_id?: string | null;
    status?: string;
    show_in_nav?: boolean;
    nav_order?: number;
    is_home?: boolean;
    objective?: string | null;
    expected_action?: string | null;
    key_messages?: string[];
    facts?: string | null;
  },
): Promise<SitePage> {
  return apiPut<SitePage>(`/site/pages/${encodeURIComponent(slug)}`, payload);
}

export async function listSitePages(): Promise<SitePage[]> {
  return apiGet<SitePage[]>("/site/pages");
}

export async function createSitePage(payload: {
  slug: string;
  title: string;
  parent_id?: string | null;
  status?: string;
  show_in_nav?: boolean;
  nav_order?: number;
  is_home?: boolean;
  objective?: string | null;
  expected_action?: string | null;
  key_messages?: string[];
  facts?: string | null;
}): Promise<SitePage> {
  return apiPost<SitePage>("/site/pages", payload);
}

export async function deleteSitePage(slug: string): Promise<void> {
  return apiDelete(`/site/pages/${encodeURIComponent(slug)}`);
}

export async function appendBlockToSitePage(
  slug: string,
  block: BlockInstance,
): Promise<SitePage> {
  return apiPost<SitePage>(
    `/site/pages/${encodeURIComponent(slug)}/blocks`,
    block,
  );
}
