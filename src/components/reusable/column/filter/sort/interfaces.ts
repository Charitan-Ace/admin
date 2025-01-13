export interface SortFilterProps {
  sortOrder: "ascending" | "descending" | "unsorted";
  onChange: (order: "ascending" | "descending" | "unsorted") => void;
}
