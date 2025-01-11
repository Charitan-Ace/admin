import { useState, useEffect } from "react";
import {
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  PaginationState,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { UseTableProps } from "./interfaces";

export default function useTable<T>({
  data,
  columns,
  refetch,
  onPaginationChange,
  totalPages,
  pageIndex = 0,
  paginationSize = 10,
}: UseTableProps<T>) {
  // States for sorting, filtering, and pagination
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: pageIndex,
    pageSize: paginationSize,
  });

  // Handle page changes and fetch data
  useEffect(() => {
    if (onPaginationChange) {
      onPaginationChange({
        pageNo: pagination.pageIndex,
        pageSize: pagination.pageSize,
      });
    }
    if (refetch) {
      refetch();
    }
  }, [pagination.pageIndex, pagination.pageSize, refetch, totalPages]);

  // Manage the table instance without pagination logic from react-table
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  const goToPage = (pageIndex: number) => {
    setPagination((prev) => ({
      ...prev,
      pageIndex,
    }));
    if (onPaginationChange) {
      onPaginationChange({
        pageNo: pageIndex,
        pageSize: pagination.pageSize,
      });
    }
  };

  const setPageSize = (pageSize: number) => {
    setPagination((prev) => ({
      ...prev,
      pageSize,
    }));
    if (onPaginationChange) {
      onPaginationChange({
        pageNo: pagination.pageIndex,
        pageSize,
      });
    }
  };

  const nextPage = () => {
    setPagination((prev) => {
      const nextPageIndex = Math.min(prev.pageIndex + 1, totalPages - 1);
      return { ...prev, pageIndex: nextPageIndex };
    });
  };

  const previousPage = () => {
    setPagination((prev) => {
      const prevPageIndex = Math.max(prev.pageIndex - 1, 0);
      return { ...prev, pageIndex: prevPageIndex };
    });
  };

  return {
    table,
    goToPage,
    setPageSize,
    nextPage,
    previousPage,
  };
}
