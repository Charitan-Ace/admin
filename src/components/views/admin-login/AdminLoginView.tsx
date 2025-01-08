import { useForm } from "react-hook-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/api/Client";
import { AdminLoginFormData } from "./interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { adminLoginSchema } from "./form-schemas/LoginFormSchema";
import { useNavigate } from "react-router";
import WebSocketComponent from "@/components/ui/WebSocketStreaming";

const AdminLoginView = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLoginFormData>({
    resolver: yupResolver(adminLoginSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data: AdminLoginFormData) => {
    try {
      // TODO: remove when api ready
      // localStorage.setItem("isAuthenticated", "true");
      // TODO: implement to navigate where came from
      const response = await apiClient.login(data.email, data.password);
      navigate("/projects");
      console.log("Login successful", response);
    } catch (error) {
      console.error("Login failed", error);
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@admin.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register("password")} />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={Object.keys(errors).length > 0}
          >
            Login
          </Button>
        </form>
      </CardContent>

      <WebSocketComponent />
    </Card>
  );
};

export default AdminLoginView;
