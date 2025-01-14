import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/reusable/button/Button";
import FormInput from "@/components/reusable/form/input/FormInput";
import FormDropdown from "@/components/reusable/form/dropdown/FormDropdown";
import GenericModal from "@/components/reusable/modal/generic/GenericModal";
import { ProjectSchema } from "./form-schemas/ProjectSchema";
import { Country, Project, ProjectCategoryType } from "../services/interfaces";
import { useEffect, useState } from "react";
import { ProjectsAPI } from "../services/ProjectsAPI";

type CreateProjectFormData = Omit<
  Project,
  "id" | "mediaDtoList" | "startTime" | "endTime" | "charityId" | "statusType"
>;

interface CreateProjectFormProps {
  projectId?: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateProjectFormData) => void;
  loading: boolean;
  title: string;
}

const ProjectFormModal = ({
  isOpen,
  title,
  onClose,
  onSubmit,
  loading,
  projectId,
}: CreateProjectFormProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateProjectFormData>({
    resolver: yupResolver(ProjectSchema),
    defaultValues: {},
  });

  const [projectData, setProjectData] = useState<Project | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (isOpen && projectId !== "") {
      setIsFetching(true);
      async function fetchData() {
        try {
          const data = await ProjectsAPI.getProjectById(
            projectId ?? "",
            () => {},
            () => {},
            () => setIsFetching(false),
          );
          setProjectData(data || null);
        } finally {
          setIsFetching(false);
        }
      }

      fetchData();
    }
  }, [isOpen, projectId]);

  useEffect(() => {
    if (projectData && projectId !== "") {
      reset({
        title: projectData.title || "",
        description: projectData.description || "",
        goal: projectData.goal || 0,
        categoryType: projectData.categoryType || "",
        countryIsoCode: projectData.countryIsoCode || "",
      });
    } else if (projectId === "") {
      reset({
        title: undefined,
        description: undefined,
        goal: undefined,
        categoryType: undefined,
        countryIsoCode: undefined,
      });
    }
  }, [projectData, reset, projectId, isOpen]);

  return (
    <GenericModal
      title={`${title} Project`}
      isOpen={isOpen}
      onClose={onClose}
      bodyContent={
        <>
          {isFetching ? (
            <p>Loading project data...</p>
          ) : (
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
              <FormDropdown<CreateProjectFormData>
                name="categoryType"
                label="Category Type"
                error={errors.categoryType?.message}
                control={control}
                disabled={loading}
                options={Object.values(ProjectCategoryType)}
              />
              <FormDropdown<CreateProjectFormData>
                name="countryIsoCode"
                label="Country ISO Code"
                error={errors.countryIsoCode?.message}
                control={control}
                disabled={loading}
                options={Object.keys(Country)}
              />
            </form>
          )}
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
            loading={loading || isFetching}
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
