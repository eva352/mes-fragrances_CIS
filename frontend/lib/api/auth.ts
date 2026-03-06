import { apiGet, apiPost } from "./client";
import { getAuthToken, removeAuthToken, setAuthToken } from "@/lib/auth/token";
export { removeAuthToken } from "@/lib/auth/token";

const BASE_BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "/api/v1";

// Définition des types de base pour l'API
export type User = {
  id: string;
  email: string;
  is_active: boolean;
  created_at: string;
};

export type LoginResponse = {
  message: string;
  token: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

// --- Fonctions d'API ---

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const response = await apiPost<LoginResponse>("/auth/login", payload);
  setAuthToken(response.token);
  return response;
}

export async function logout(): Promise<{ message: string }> {
  const token = getAuthToken();
  if (!token) {
    return { message: "logged_out" };
  }

  // L'API backend utilise le header Authorization pour le logout
  const res = await fetch(`${BASE_BACKEND_URL}/auth/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  removeAuthToken();
  return res.json();
}

export async function getMe(): Promise<User> {
  const token = getAuthToken();
  if (!token) {
    throw new Error("Not authenticated");
  }

  return apiGet<User>("/users/me");
}
