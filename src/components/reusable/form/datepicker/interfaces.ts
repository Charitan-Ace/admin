import { FieldValues, Control, FieldPath } from "react-hook-form";

export interface FormDatePickerProps<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  error?: string;
  control?: Control<T>;
  disabled?: boolean;
  vSpacing?: number;
  className?: string;
}
