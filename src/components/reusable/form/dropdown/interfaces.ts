import { FieldValues, Control, FieldPath } from "react-hook-form";

export interface FormDropdownProps<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  error?: string;
  control?: Control<T>;
  options: string[];
  disabled?: boolean;
  vSpacing?: number;
  className?: string;
}
