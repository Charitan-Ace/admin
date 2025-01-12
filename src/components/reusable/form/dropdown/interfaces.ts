import { FieldValues, Path, UseFormRegister } from "react-hook-form";

export interface FormDropdownProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  error?: string;
  register: UseFormRegister<T>;
  options: string[];
  disabled?: boolean;
  vSpacing?: number;
  className?: string;
}
