import { Button } from "@/components/reusable/button/Button";
import { ArrowUp, ArrowDown, MoreHorizontal } from "lucide-react"; // Add an icon for unsorted
import { SortFilterProps } from "./interfaces";

const ColumnSortFilter = ({ sortOrder, onChange }: SortFilterProps) => {
  const handleSortChange = () => {
    if (sortOrder === "descending") {
      onChange("ascending");
    } else if (sortOrder === "ascending") {
      onChange("descending");
    } else {
      onChange("ascending");
    }
  };

  const renderSortIcon = () => {
    switch (sortOrder) {
      case "ascending":
        return <ArrowUp />;
      case "descending":
        return <ArrowDown />;
      default:
        return <MoreHorizontal />;
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleSortChange}
      className="h-8 w-8 p-0"
    >
      {renderSortIcon()}
    </Button>
  );
};

export default ColumnSortFilter;
