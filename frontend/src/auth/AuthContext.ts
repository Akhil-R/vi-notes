import { createContext } from "react";

// This is the user information we keep after login.
export type User = { id: string; name: string; email: string };

// This tells TypeScript what values our auth system will share.
export type AuthContextType = {
  user: User | null;
  token: string | null;
  loading: boolean;
  register: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

// This is where React stores the login data for the app.
export const AuthContext = createContext<AuthContextType | null>(null);
