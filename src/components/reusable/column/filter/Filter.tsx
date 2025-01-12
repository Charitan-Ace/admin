import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/reusable/button/Button";
import { FilterIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ColumnFilterProps } from "./interfaces";

export function ColumnFilter({
  column,
  type,
  value,
  onChange,
  options,
}: ColumnFilterProps) {
  const [open, setOpen] = useState(false);

  const handleChange = (newValue: string | null) => {
    onChange(newValue);
    setOpen(false);
  };

  const isFiltered = value !== null && value !== "";

  return (
    <div className="flex items-center justify-between">
      <span className="font-medium">{column}</span>
      <Popover open={open} onOpenChange={setOpen}>
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
            {type === "text" && (
              <Input
                placeholder={`Enter ${column.toLowerCase()}...`}
                value={value || ""}
                onChange={(e) => handleChange(e.target.value)}
              />
            )}
            {type === "select" && (
              <Select
                value={value || "all"}
                onValueChange={(newValue) =>
                  handleChange(newValue === "all" ? null : newValue)
                }
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
            )}
            {type === "date" && (
              <Calendar
                mode="single"
                selected={value ? new Date(value) : undefined}
                onSelect={(date) =>
                  handleChange(date ? date.toISOString().split("T")[0] : null)
                }
                initialFocus
              />
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
