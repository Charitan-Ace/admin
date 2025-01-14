import { Navigate, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { useAuthStore } from "./stores/useAuthStore";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated, checkAuth } = useAuthStore();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authenticate = async () => {
      await checkAuth();
      setLoading(false);
    };

    if (isAuthenticated === null) {
      authenticate();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, checkAuth]);

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
