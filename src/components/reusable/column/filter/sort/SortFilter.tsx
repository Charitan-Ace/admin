import { Button } from "@/components/reusable/button/Button";
import { ArrowUpDown } from "lucide-react";
import { SortFilterProps } from "./interfaces";

const ColumnSortFilter = ({
  columnName,
  sortOrder,
  onChange,
}: SortFilterProps) => {
  const handleSortChange = () => {
    if (sortOrder === "default") {
      onChange("ascending");
    } else if (sortOrder === "ascending") {
      onChange("descending");
    } else {
      onChange("default");
    }
  };

  return (
    <div className="flex items-center justify-between">
      <span className="font-medium">{columnName}</span>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleSortChange}
        className="h-8 w-8 p-0"
      >
        <ArrowUpDown />
      </Button>
    </div>
  );
};

export default ColumnSortFilter;
