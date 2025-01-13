import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCallback, useState } from "react";
import { debounce } from "lodash";
import { ColumnFilterSelectProps } from "./interfaces";
import { Button } from "@/components/reusable/button/Button";

export const ColumnFilterSelect: React.FC<ColumnFilterSelectProps> = ({
  value,
  onValueChange,
  column,
  options,
  debounceTimeout = 500,
}) => {
  const [localValue, setLocalValue] = useState(value);

  const debouncedHandleValueChange = useCallback(
    // eslint-disable-next-line react-compiler/react-compiler
    debounce((newValue: string | null) => {
      onValueChange(newValue === "all" ? null : newValue);
    }, debounceTimeout),
    [onValueChange, debounceTimeout],
  );

  const handleValueChange = (newValue: string | null) => {
    if (newValue !== localValue) {
      setLocalValue(newValue);
      debouncedHandleValueChange(newValue);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <Popover
        onOpenChange={(open) => {
          if (!open) handleValueChange(null);
        }}
      >
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <span className="sr-only">Filter {column}</span>
            <span className="h-4 w-4">▼</span>{" "}
            {/* Use an arrow symbol or icon here */}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="end">
          <div className="space-y-2">
            <Select
              value={localValue || "all"}
              onValueChange={handleValueChange}
            >
              <SelectTrigger>
                <SelectValue placeholder={`Select ${column.toLowerCase()}`} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {options?.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ColumnFilterSelect;
