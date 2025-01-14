import * as yup from "yup";
import { ProjectCategoryType } from "../../services/interfaces";

const ProjectCategoryTypeSchema = yup
  .mixed<ProjectCategoryType>()
  .oneOf(Object.values(ProjectCategoryType))
  .required("Category type is required");

const ProjectSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  goal: yup
    .number()
    .min(1, "Goal must be at least 1")
    .required("Goal is required"),
  categoryType: ProjectCategoryTypeSchema,
  countryIsoCode: yup
    .string()
    .length(2, "Country ISO code must be exactly 2 characters")
    .required("Country ISO code is required"),
});

export { ProjectSchema };
