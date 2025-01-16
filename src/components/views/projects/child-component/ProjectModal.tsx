import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/reusable/button/Button";
import FormInput from "@/components/reusable/form/input/FormInput";
import FormDropdown from "@/components/reusable/form/dropdown/FormDropdown";
import GenericModal from "@/components/reusable/modal/generic/GenericModal";
import { ProjectSchema } from "./form-schemas/ProjectSchema";
import { Country, Project, ProjectCategoryType } from "../services/interfaces";
import { useEffect } from "react";
import FormDatePicker from "@/components/reusable/form/datepicker/FormDatepicker";
import { mapEnumToOptions } from "@/lib/utils/helpers/mapEnumToOptions";

type CreateProjectFormData = Omit<
  Project,
  "id" | "startTime" | "endTime" | "mediaDtoList" | "charityId" | "statusType"
> & {
  startTime: string;
  endTime: string;
};

interface CreateProjectFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateProjectFormData) => void;
  loading: boolean;
  title: string;
  projectData?: Project;
}

const ProjectFormModal = ({
  isOpen,
  title,
  onClose,
  onSubmit,
  loading,
  projectData, // Accept projectData prop
}: CreateProjectFormProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateProjectFormData>({
    resolver: yupResolver(ProjectSchema),
    defaultValues: projectData
      ? {
          title: projectData.title || "",
          description: projectData.description || "",
          goal: projectData.goal || 0,
          categoryType: projectData.categoryType || "",
          countryIsoCode: projectData.countryIsoCode || "",
          startTime: projectData.startTime
            ? new Date(projectData.startTime * 1000).toISOString().split("T")[0]
            : "",
          endTime: projectData.endTime
            ? new Date(projectData.endTime * 1000).toISOString().split("T")[0]
            : "",
        }
      : {},
  });

  useEffect(() => {
    if (projectData && isOpen) {
      reset({
        title: projectData.title || "",
        description: projectData.description || "",
        goal: projectData.goal || 0,
        categoryType: projectData.categoryType || "",
        countryIsoCode: projectData.countryIsoCode || "",
        startTime: projectData.startTime
          ? new Date(projectData.startTime * 1000).toISOString().split("T")[0]
          : "",
        endTime: projectData.endTime
          ? new Date(projectData.endTime * 1000).toISOString().split("T")[0]
          : "",
      });
    } else {
      reset({});
    }
  }, [projectData, reset, isOpen]);

  return (
    <GenericModal
      title={`${title} Project`}
      isOpen={isOpen}
      onClose={onClose}
      bodyContent={
        <>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormInput<CreateProjectFormData>
              id="title"
              label="Title"
              error={errors.title?.message}
              register={register}
              disabled={loading}
              type="text"
            />
            <FormInput<CreateProjectFormData>
              id="description"
              label="Description"
              error={errors.description?.message}
              register={register}
              disabled={loading}
              type="text"
            />
            <FormInput<CreateProjectFormData>
              id="goal"
              label="Goal"
              error={errors.goal?.message}
              register={register}
              disabled={loading}
              type="number"
            />
            <FormDatePicker<CreateProjectFormData>
              name="startTime"
              label="Start Date"
              error={errors.startTime?.message}
              control={control}
              disabled={loading}
            />
            <FormDatePicker<CreateProjectFormData>
              name="endTime"
              label="End Date"
              error={errors.endTime?.message}
              control={control}
              disabled={loading}
            />
            <FormDropdown<CreateProjectFormData>
              name="categoryType"
              label="Category Type"
              error={errors.categoryType?.message}
              control={control}
              disabled={loading}
              options={mapEnumToOptions(ProjectCategoryType)}
            />
            <FormDropdown<CreateProjectFormData>
              name="countryIsoCode"
              label="Country"
              error={errors.countryIsoCode?.message}
              control={control}
              disabled={loading}
              options={mapEnumToOptions(Country)}
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
            {title} Project
          </Button>
        </>
      }
    />
  );
};

export default ProjectFormModal;
