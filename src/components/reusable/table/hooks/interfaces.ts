import { FilterRequest, PagiableRequest } from "@/lib/api/interfaces/table";
import { ColumnDef } from "@tanstack/react-table";

export interface UseTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  enablePagination?: boolean;
  pageIndex: number;
  paginationSize: number;
  totalPages: number;
  refetch?: () => Promise<void>;
  onPaginationChange?: (paginationParams: PagiableRequest) => void;
  filter?: FilterRequest;
}
