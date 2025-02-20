import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/reusable/button/Button";
import FormInput from "@/components/reusable/form/input/FormInput";
import GenericModal from "@/components/reusable/modal/generic/GenericModal";
import { createCharitySchema } from "./form-schemas/CreateCharitySchema";
import { CreateCharityFormData, CharityFormProps } from "./interfaces";
import FormDropdown from "@/components/reusable/form/dropdown/FormDropdown";
import { OrganizationType } from "../../services/interfaces";
import { mapEnumToOptions } from "@/lib/utils/helpers/mapEnumToOptions";

const CreateCharityFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  loading,
}: CharityFormProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCharityFormData>({
    resolver: yupResolver(createCharitySchema),
  });

  return (
    <GenericModal
      title="Register New Charity"
      isOpen={isOpen}
      onClose={onClose}
      bodyContent={
        <>
          <p className="text-sm text-gray-600 mb-4">
            The charity will receive an email with their credentials after
            registration.
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormInput<CreateCharityFormData>
              id="email"
              label="Email"
              error={errors.email?.message}
              register={register}
              disabled={loading}
              type="email"
            />
            <FormInput<CreateCharityFormData>
              id="password"
              label="Password"
              error={errors.password?.message}
              register={register}
              disabled={loading}
              type="password"
            />
            <FormInput<CreateCharityFormData>
              id="confirmPassword"
              label="Confirm Password"
              error={errors.confirmPassword?.message}
              register={register}
              disabled={loading}
              type="password"
            />
            <FormInput<CreateCharityFormData>
              id="companyName"
              label="Company Name"
              error={errors.companyName?.message}
              register={register}
              disabled={loading}
              type="text"
            />
            <FormInput<CreateCharityFormData>
              id="address"
              label="Address"
              error={errors.address?.message}
              register={register}
              disabled={loading}
              type="text"
            />
            <FormInput<CreateCharityFormData>
              id="taxCode"
              label="Tax Code"
              error={errors.taxCode?.message}
              register={register}
              disabled={loading}
              type="text"
            />
            <FormDropdown<CreateCharityFormData>
              name="organizationType"
              label="Organization Type"
              error={errors.organizationType?.message}
              control={control}
              disabled={loading}
              options={mapEnumToOptions(OrganizationType)}
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
            Register Charity
          </Button>
        </>
      }
    />
  );
};

export default CreateCharityFormModal;
