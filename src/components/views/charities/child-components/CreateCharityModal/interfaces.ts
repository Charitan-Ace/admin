export type CreateCharityFormData = {
  email: string;
  password: string;
  confirmPassword: string;
  companyName?: string | null;
  address?: string | null;
  taxCode?: string | null;
  organizationType?: string | null;
};

export type CharityFormProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateCharityFormData) => Promise<void>;
  loading: boolean;
};
