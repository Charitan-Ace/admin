import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { apiClient } from "@/lib/api/Client";
import { AdminLoginFormData } from "./interfaces";
import { useLocation, useNavigate } from "react-router";
import { useState } from "react";
import AdminLoginForm from "./child-components/admin-login-form/AdminLoginForm";

const AdminLoginView = () => {
  const [loading, setLoading] = useState(false);
  const [loginSuccessful, setLoginSuccessful] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/projects";

  const handleLogin = async (data: AdminLoginFormData) => {
    try {
      setLoading(true);
      setLoginSuccessful(null);

      const response = await apiClient.auth.login(data.email, data.password);
      navigate(from);
      console.log("Login successful", response);

      setLoginSuccessful(true);
    } catch (error) {
      console.error("Login failed", error);
      setLoginSuccessful(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
        <CardDescription>
          Enter email and password to enter the admin dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loginSuccessful === false && (
          <p className="text-red-500 text-sm mb-4">
            Invalid credentials. Please try again.
          </p>
        )}
        <AdminLoginForm onSubmit={handleLogin} loading={loading} />
      </CardContent>
    </Card>
  );
};

export default AdminLoginView;
