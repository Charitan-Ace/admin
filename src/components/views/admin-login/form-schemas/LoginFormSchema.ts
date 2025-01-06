import * as yup from "yup";

const adminLoginSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password must be at max 32 characters")
    .required("Password is required"),
});

export { adminLoginSchema };
