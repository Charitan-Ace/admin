import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { FormDropdownProps } from "./interfaces";
import { FieldValues, Controller } from "react-hook-form";

const FormDropdown = <T extends FieldValues>({
  name,
  label,
  error,
  control,
  options,
  disabled = false,
  vSpacing = 2,
  className = "",
}: FormDropdownProps<T>) => {
  return (
    <div className={`space-y-${vSpacing} ${className}`}>
      <Label htmlFor={name}>{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          console.log(label, field.value);
          return (
            <Select
              onValueChange={field.onChange}
              value={field.value}
              disabled={disabled}
            >
              <SelectTrigger>
                <SelectValue placeholder={`Select ${label}`} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option, index) => (
                  <SelectItem key={index} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );
        }}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default FormDropdown;
