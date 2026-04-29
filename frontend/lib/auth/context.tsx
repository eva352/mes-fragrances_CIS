"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";

import {
  getMe,
  login as apiLogin,
  logout as apiLogout,
  removeAuthToken,
  type LoginPayload,
  type User,
} from "@/lib/api/auth";
import { getAuthToken } from "@/lib/auth/token";

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadUser() {
      if (!getAuthToken()) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      try {
        const userData = await getMe();
        setUser(userData);
      } catch {
        removeAuthToken();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    loadUser();
  }, []);

  const login = async (payload: LoginPayload) => {
    setIsLoading(true);
    try {
      await apiLogin(payload);
      router.push("/");

      try {
        const userData = await getMe();
        setUser(userData);
      } catch {
        // Token is already stored; do not block navigation on profile fetch.
        setUser(null);
      }
    } catch (error) {
      removeAuthToken();
      setUser(null);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    apiLogout();
    setUser(null);
    router.push("/login");
  };

  const isAuthenticated = !!user || !!getAuthToken();

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
