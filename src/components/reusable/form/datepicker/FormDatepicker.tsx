import { Label } from "@/components/ui/label";
import { Controller, FieldValues } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FormDatePickerProps } from "./interfaces";

const FormDatePicker = <T extends FieldValues>({
  name,
  label,
  error,
  control,
  disabled = false,
  vSpacing = 2,
  className = "",
}: FormDatePickerProps<T>) => {
  return (
    <div className={`flex flex-col space-y-${vSpacing} ${className}`}>
      <Label htmlFor={name}>{label}</Label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker
            selected={field.value ? new Date(field.value) : null}
            onChange={(date: Date) => field.onChange(date)}
            disabled={disabled}
            placeholderText={`Select ${label}`}
            className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        )}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default FormDatePicker;
