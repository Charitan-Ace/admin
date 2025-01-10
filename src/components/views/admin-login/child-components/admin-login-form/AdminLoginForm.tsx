import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AdminLoginFormData } from "../../interfaces";
import { adminLoginSchema } from "./form-schemas/LoginFormSchema";
import { Button } from "@/components/reusable/button/Button";
import FormInput from "@/components/reusable/form/input/FormInput";
import { AdminLoginFormProps } from "./interfaces";

const AdminLoginForm = ({ onSubmit, loading }: AdminLoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLoginFormData>({
    resolver: yupResolver(adminLoginSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormInput<AdminLoginFormData>
        id="email"
        type="email"
        placeholder="admin@admin.com"
        label="Email"
        error={errors.email?.message}
        register={register}
        disabled={loading}
      />
      <FormInput<AdminLoginFormData>
        id="password"
        type="password"
        label="Password"
        error={errors.password?.message}
        register={register}
        disabled={loading}
      />
      <Button
        type="submit"
        loading={loading}
        className="w-full"
        disabled={Object.keys(errors).length > 0}
      >
        Login
      </Button>
    </form>
  );
};

export default AdminLoginForm;
