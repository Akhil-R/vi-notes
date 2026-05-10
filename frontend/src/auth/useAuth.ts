import { useContext } from "react";
import { AuthContext } from "./AuthContext";

// This small hook lets any component get the current login data.
export const useAuth = () => {
  const ctx = useContext(AuthContext);

  // If this error happens, it means the component is outside AuthProvider.
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
