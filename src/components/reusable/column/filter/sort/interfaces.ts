export interface SortFilterProps {
  columnName: string;
  sortOrder: "ascending" | "descending" | "default";
  onChange: (order: "ascending" | "descending" | "default") => void;
}
