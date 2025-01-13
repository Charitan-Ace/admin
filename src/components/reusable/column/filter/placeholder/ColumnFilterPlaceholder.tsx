import { ColumnFilterPlaceholderProps } from "./interfaces";

export function ColumnFilterPlaceholder({
  column,
  filterContent,
}: ColumnFilterPlaceholderProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="font-medium">{column}</span>
      {filterContent}
    </div>
  );
}

export default ColumnFilterPlaceholder;
