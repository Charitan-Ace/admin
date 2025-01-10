import { Navigate, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api/Client";
import { ProtectedRouteProps } from "./interfaces";

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authStatus = await apiClient.auth.authenticated();
        setIsAuthenticated(authStatus);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/admin-login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
