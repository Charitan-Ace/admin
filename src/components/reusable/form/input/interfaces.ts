import { FieldValues, Path, UseFormRegister } from "react-hook-form";

export interface FormInputProps<T extends FieldValues> {
  id: Path<T>;
  type: string;
  placeholder?: string;
  label: string;
  error?: string;
  register: UseFormRegister<T>;
  disabled?: boolean;
  vSpacing?: number;
  className?: string;
  accept?: string; // For file input types
  multiple?: boolean; // For multiple file selection
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
