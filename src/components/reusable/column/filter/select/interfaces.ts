export interface ColumnFilterSelectProps {
  value: string | null;
  onValueChange: (newValue: string | null) => void;
  column: string;
  options: string[];
  debounceTimeout?: number;
}
