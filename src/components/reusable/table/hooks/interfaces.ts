import { ColumnDef } from "@tanstack/react-table";
import { AxiosRequestConfig } from "axios";

export interface UseTableProps<T> {
  apiCall: (config?: AxiosRequestConfig) => Promise<T[]>;
  columns: ColumnDef<T>[];
  enablePagination?: boolean;
  enableFiltering?: boolean;
  paginationSize?: number;
}
