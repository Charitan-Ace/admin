export interface PaginationControlsProps {
  paginationVariants?: number[];
  pageNo: number;
  pageSize: number;
  totalPages: number;
  goToPage: (pageNo: number) => void;
  changePageSize: (pageSize: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  onPageChange?: (pageNo: number, pageSize: number) => void;
}
