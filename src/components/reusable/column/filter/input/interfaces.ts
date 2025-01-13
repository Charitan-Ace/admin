export interface ColumnFilterInputDropdownProps {
  column: string;
  value: string;
  onChange: (value: string) => void;
  vSpacing?: number;
  className?: string;
  debounceTimeout?: number;
}
