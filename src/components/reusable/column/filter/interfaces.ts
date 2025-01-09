export interface ColumnFilterProps {
  column: string;
  type: "text" | "select" | "date";
  value: string | null;
  onChange: (value: string | null) => void;
  options?: string[];
}
