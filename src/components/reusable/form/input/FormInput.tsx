import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormInputProps } from "./interfaces";
import { FieldValues } from "react-hook-form";

const FormInput = <T extends FieldValues>({
  id,
  placeholder,
  label,
  error,
  register,
  disabled = false,
  vSpacing = 2,
  type = "text",
  className = "",
}: FormInputProps<T>) => (
  <div className={`space-y-${vSpacing} ${className}`}>
    <Label htmlFor={id}>{label}</Label>
    <Input
      id={id}
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      {...register(id)}
    />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

export default FormInput;
