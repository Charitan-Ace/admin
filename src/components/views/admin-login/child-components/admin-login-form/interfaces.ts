import { AdminLoginFormData } from "../../interfaces";

export interface AdminLoginFormProps {
  onSubmit: (data: AdminLoginFormData) => Promise<void>;
  loading: boolean;
}
