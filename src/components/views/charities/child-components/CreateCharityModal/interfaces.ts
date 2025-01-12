export type CreateCharityFormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type CharityFormProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateCharityFormData) => Promise<void>;
  loading: boolean;
};
