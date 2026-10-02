"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

type AuthContextType = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Mock authentication state (placeholder for NextAuth, Supabase Auth, etc.)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Redirect to login if not authenticated and not already on login page
    if (!isAuthenticated && pathname && !pathname.startsWith("/admin/login")) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, pathname, router]);

  const login = () => {
    setIsAuthenticated(true);
    router.push("/admin");
  };

  const logout = () => {
    setIsAuthenticated(false);
    router.push("/admin/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
