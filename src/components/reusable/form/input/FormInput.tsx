import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormInputProps } from "./interfaces";
import { FieldValues } from "react-hook-form";

const FormInput = <T extends FieldValues>({
  id,
  type,
  placeholder,
  label,
  error,
  register,
  disabled = false,
  vSpacing = 2,
  className = "",
  accept,
  multiple,
  onChange,
}: FormInputProps<T>) => (
  <div className={`space-y-${vSpacing} ${className}`}>
    <Label htmlFor={id}>{label}</Label>
    <Input
      id={id}
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      accept={type === 'file' ? (accept || 'image/*,video/*') : undefined}
      multiple={type === 'file' ? multiple : undefined}
      className={type === 'file' ? 'file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold hover:file:bg-violet-100' : ''}
      onChange={onChange}
      {...register(id)}
    />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

export default FormInput;
