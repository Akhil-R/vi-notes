import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

// This component is used for pages that need login.
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  // Show loading while validating the token.
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there is no user (token validation failed), redirect to login.
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If the user exists, show the protected page.
  return <>{children}</>;
};

export default ProtectedRoute;
