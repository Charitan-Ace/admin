import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { FormDropdownProps } from "./interfaces";
import { FieldValues } from "react-hook-form";

const FormDropdown = <T extends FieldValues>({
  id,
  label,
  error,
  register,
  options,
  disabled = false,
  vSpacing = 2,
  className = "",
}: FormDropdownProps<T>) => (
  <div className={`space-y-${vSpacing} ${className}`}>
    <Label htmlFor={id}>{label}</Label>
    <Select {...register(id)} disabled={disabled}>
      <SelectTrigger>
        <SelectValue placeholder={`Select ${label}`} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option, index) => (
          <SelectItem key={index} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

export default FormDropdown;
