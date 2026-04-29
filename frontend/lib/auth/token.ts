const AUTH_TOKEN_KEY = "auth_token";
let memoryAuthToken: string | null = null;

function safeLocalStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function safeSessionStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

export function setAuthToken(token: string) {
  memoryAuthToken = token;
  safeLocalStorage()?.setItem(AUTH_TOKEN_KEY, token);
  safeSessionStorage()?.setItem(AUTH_TOKEN_KEY, token);
}

export function getAuthToken(): string | null {
  return (
    safeLocalStorage()?.getItem(AUTH_TOKEN_KEY) ??
    safeSessionStorage()?.getItem(AUTH_TOKEN_KEY) ??
    memoryAuthToken
  );
}

export function removeAuthToken() {
  memoryAuthToken = null;
  safeLocalStorage()?.removeItem(AUTH_TOKEN_KEY);
  safeSessionStorage()?.removeItem(AUTH_TOKEN_KEY);
}
