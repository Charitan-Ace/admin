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

export interface PagiableRequest {
  pageNo?: number;
  pageSize?: number;
}

export interface FilterRequest {
  order?: "ascending" | "descending";
  filter?: string;
  keyword?: string;
}
