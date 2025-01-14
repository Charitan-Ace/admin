import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/reusable/button/Button";
import FormInput from "@/components/reusable/form/input/FormInput";
import GenericModal from "@/components/reusable/modal/generic/GenericModal";
import { createAdminSchema } from "./form-schemas/AdminCreateSchema";
import { CreateAdminFormData, CreateAdminFormProps } from "./interfaces";
const AdminCreateModal = ({
  isOpen,
  onClose,
  onSubmit,
  loading,
}: CreateAdminFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAdminFormData>({
    resolver: yupResolver(createAdminSchema),
  });

  return (
    <GenericModal
      title="Register New Admin"
      isOpen={isOpen}
      onClose={onClose}
      bodyContent={
        <>
          <p className="text-sm text-gray-600 mb-4">
            The new admin will receive an email with their credentials after
            registration.
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormInput<CreateAdminFormData>
              id="email"
              label="Email"
              error={errors.email?.message}
              register={register}
              disabled={loading}
              type="email"
            />
            <FormInput<CreateAdminFormData>
              id="password"
              label="Password"
              error={errors.password?.message}
              register={register}
              disabled={loading}
              type="password"
            />
            <FormInput<CreateAdminFormData>
              id="confirmPassword"
              label="Confirm Password"
              error={errors.confirmPassword?.message}
              register={register}
              disabled={loading}
              type="password"
            />
          </form>
        </>
      }
      footerContent={
        <>
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={handleSubmit(onSubmit)}
            loading={loading}
            disabled={Object.keys(errors).length > 0}
          >
            Register Admin
          </Button>
        </>
      }
    />
  );
};

export default AdminCreateModal;
