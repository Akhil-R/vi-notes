import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import type { User } from "./AuthContext";
import { registerAPI, loginAPI, meAPI } from "../api/authApi";

// This component keeps all login information in one place.
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // First we check localStorage so the user stays logged in after refresh.
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("vi-user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // The token proves that the user has logged in.
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("vi-token");
  });

  // This helps us show loading text while login or register is running.
  const [loading, setLoading] = useState(false);

  // This helps us show loading while validating the stored token on app mount.
  const [validating, setValidating] = useState(true);

  // This validates the stored token when the app loads.
  useEffect(() => {
    const validateToken = async () => {
      const storedToken = localStorage.getItem("vi-token");

      if (!storedToken) {
        setValidating(false);
        return;
      }

      try {
        const { data } = await meAPI(storedToken);
        setUser(data.user);
        setToken(storedToken);
      } catch {
        // Token is invalid or expired, clear stored data
        localStorage.removeItem("vi-token");
        localStorage.removeItem("vi-user");
        setUser(null);
        setToken(null);
      } finally {
        setValidating(false);
      }
    };

    validateToken();
  }, []);

  // This creates a new account by calling the backend.
  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const { data } = await registerAPI(name, email, password);
      setUser(data.user);
      setToken(data.token);

      // Save the user and token so refresh does not log them out.
      localStorage.setItem("vi-user", JSON.stringify(data.user));
      localStorage.setItem("vi-token", data.token);
    } finally {
      setLoading(false);
    }
  };

  // This logs in an existing user by checking email and password.
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data } = await loginAPI(email, password);
      setUser(data.user);
      setToken(data.token);

      // Store login details in the browser for the next page refresh.
      localStorage.setItem("vi-user", JSON.stringify(data.user));
      localStorage.setItem("vi-token", data.token);
    } finally {
      setLoading(false);
    }
  };

  // This removes login data when the user clicks logout.
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("vi-token");
    localStorage.removeItem("vi-user");
  };

  // All pages inside this provider can use user, token, login, register, and logout.
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading: loading || validating,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
