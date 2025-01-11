export interface Sort {
  sorted: boolean;
  empty: boolean;
  unsorted: boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface PagiableRequest<T> {
  pageNo?: number;
  pageSize?: number;
  order?: "ascending" | "descending";
  filter?: keyof T;
  keyword?: string;
}

export interface PaginationChangeCallback {
  pageNo?: number;
  pageSize?: number;
}
