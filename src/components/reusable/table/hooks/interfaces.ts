import { ColumnDef } from "@tanstack/react-table";

export interface UseTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  enablePagination?: boolean;
  enableFiltering?: boolean;
  pageIndex?: number;
  paginationSize?: number;
}
