import * as yup from "yup";

const createCharitySchema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  companyName: yup.string().nullable(),
  address: yup.string().nullable(),
  taxCode: yup.string().nullable(),
  organizationType: yup.string().nullable(),
});

export { createCharitySchema };
