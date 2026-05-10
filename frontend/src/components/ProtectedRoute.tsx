import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

// This component is used for pages that need login.
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token, logout } = useAuth();
 
  // If there is no token, the user has not logged in.
  if (!token) return <Navigate to="/login" />;
 
  // A normal JWT token has three parts separated by dots.
  const parts = token.split('.');
  if (parts.length !== 3) {
    logout();
    return <Navigate to="/login" />;
  }
 
  // If the token exists, show the protected page.
  return <>{children}</>;
};
 
export default ProtectedRoute;
