"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for existing session on initial load
    const checkAuth = async () => {
      try {
        // TODO: Replace with actual session check
        // const session = await checkSession();
        // setUser(session?.user || null);
        setIsLoading(false);
      } catch (error) {
        console.error("Auth check failed:", error);
        setUser(null);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async ({ email, password, rememberMe }) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual login API call
      // const { user } = await api.login({ email, password });
      // setUser(user);
      // if (rememberMe) {
      //   localStorage.setItem('rememberMe', 'true');
      // }
      return { success: true };
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error(error.message || "Неверный email или пароль");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // TODO: Replace with actual logout API call
      // await api.logout();
      setUser(null);
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
