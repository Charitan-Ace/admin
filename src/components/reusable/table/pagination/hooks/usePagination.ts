import { useState, useCallback } from "react";
import { UsePaginationProps } from "./interfaces";

export default function usePagination({
  totalItems,
  initialPageNo = 0,
  initialPageSize = 10,
}: UsePaginationProps) {
  const [pageNo, setPageNo] = useState<number>(initialPageNo);
  const [pageSize, setPageSize] = useState<number>(initialPageSize);

  const totalPages = Math.ceil(totalItems / pageSize);

  const goToPage = useCallback(
    (newPageNo: number) => {
      if (newPageNo >= 0 && newPageNo < totalPages) {
        setPageNo(newPageNo);
      }
    },
    [totalPages],
  );

  const changePageSize = useCallback(
    (newPageSize: number) => {
      if (newPageSize <= 0) return;
      setPageSize(newPageSize);

      if (pageNo >= totalPages) {
        setPageNo(totalPages - 1);
      }
    },
    [pageNo, totalPages],
  );

  const nextPage = useCallback(() => {
    if (pageNo < totalPages - 1) {
      setPageNo(pageNo + 1);
    }
  }, [pageNo, totalPages]);

  const previousPage = useCallback(() => {
    if (pageNo > 0) {
      setPageNo(pageNo - 1);
    }
  }, [pageNo]);

  return {
    pageNo,
    pageSize,
    totalPages,
    goToPage,
    changePageSize,
    nextPage,
    previousPage,
  };
}
