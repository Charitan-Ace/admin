import { Button } from "@/components/reusable/button/Button";
import { FilterIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ColumnFilterInputDropdownProps } from "./interfaces";
import { useCallback, useState } from "react";
import { debounce } from "lodash";

export function ColumnFilterInputDropdown({
  column,
  value,
  onChange,
  debounceTimeout = 500,
}: ColumnFilterInputDropdownProps) {
  const [localValue, setLocalValue] = useState(value);

  const debouncedHandleInputChange = useCallback(
    // eslint-disable-next-line react-compiler/react-compiler
    debounce((newValue: string) => {
      onChange(newValue);
    }, debounceTimeout),
    [onChange],
  );

  const handleInputChange = (newValue: string) => {
    if (newValue != localValue) {
      setLocalValue(newValue);
      debouncedHandleInputChange(newValue);
    }
  };

  const isFiltered = value !== null && value !== "";

  return (
    <div className="flex items-center space-x-4">
      <Popover
        onOpenChange={(open) => {
          if (!open) handleInputChange("");
        }}
      >
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <FilterIcon
              className={cn("h-4 w-4", isFiltered && "text-primary")}
            />
            <span className="sr-only">Filter {column}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="end">
          <div className="space-y-2">
            <Input
              placeholder={`Enter ${column.toLowerCase()}...`}
              value={localValue}
              onChange={(e) => handleInputChange(e.target.value)}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default ColumnFilterInputDropdown;
