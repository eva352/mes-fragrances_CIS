import { getAuthToken } from "@/lib/auth/token";

const BASE_BACKEND_URL = (
  process.env.NEXT_PUBLIC_PILOT_BACKEND_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "/api/v1"
).replace(/\/$/, "");

function buildAuthHeaders(): HeadersInit {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_BACKEND_URL}${path}`, {
    method: "GET",
    headers: buildAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}

export async function apiGetFile(path: string): Promise<{ blob: Blob; filename: string }> {
  const res = await fetch(`${BASE_BACKEND_URL}${path}`, {
    method: "GET",
    headers: buildAuthHeaders(),
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({ detail: `API error: ${res.status}` }));
    throw new Error(errorBody.detail || `API error: ${res.status}`);
  }

  const blob = await res.blob();
  const cd = res.headers.get("content-disposition") ?? "";
  const match = /filename=\"?([^\";]+)\"?/i.exec(cd);
  const filename = match?.[1] ?? "aurora-agent-pack.zip";
  return { blob, filename };
}

export async function apiPost<T>(path: string, data: any): Promise<T> {
  const res = await fetch(`${BASE_BACKEND_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...buildAuthHeaders(),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({ detail: `API error: ${res.status}` }));
    throw new Error(errorBody.detail || `API error: ${res.status}`);
  }

  return res.json();
}

export async function apiPut<T>(path: string, data: any): Promise<T> {
  const res = await fetch(`${BASE_BACKEND_URL}${path}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...buildAuthHeaders(),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({ detail: `API error: ${res.status}` }));
    throw new Error(errorBody.detail || `API error: ${res.status}`);
  }

  return res.json();
}

export async function apiDelete(path: string): Promise<void> {
  const res = await fetch(`${BASE_BACKEND_URL}${path}`, {
    method: "DELETE",
    headers: buildAuthHeaders(),
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({ detail: `API error: ${res.status}` }));
    throw new Error(errorBody.detail || `API error: ${res.status}`);
  }
}
