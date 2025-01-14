export type CreateAdminFormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type CreateAdminFormProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    data: Omit<CreateAdminFormData, "confirmPassword">,
  ) => Promise<void>;
  loading: boolean;
};
