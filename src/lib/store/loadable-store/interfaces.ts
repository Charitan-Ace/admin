import { Pageable, PagiableRequest } from "@/lib/api/interfaces/table";

interface LoadableState<T> {
  data: T[] | null;
  paginationData: Pageable | null;
  filterData: PagiableRequest<T> | null;
  totalElements: number | null;
  totalPages: number | null;
  isLoading: boolean;
  error: string | null;
  setLoading: (isLoading: boolean) => void;
  setData: (data: T[]) => void;
  setFilterData: (filterData: PagiableRequest<T>) => void;
  setTotalElements: (totalElements: number) => void;
  setTotalPages: (totalPages: number) => void;
  setPaginationData: (paginationData: Pageable) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export type { LoadableState };
