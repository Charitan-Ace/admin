import React from "react";
import { Button } from "@/components/reusable/button/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PaginationControlsProps } from "./interfaces";

const PaginationControls: React.FC<PaginationControlsProps> = ({
  paginationVariants = [5, 10, 20],
  pageNo,
  pageSize,
  totalPages,
  changePageSize,
  nextPage,
  previousPage,
  onPageChange,
}) => {
  const handlePageSizeChange = (value: string) => {
    const newPageSize = Number(value);
    changePageSize(newPageSize);
    if (onPageChange) {
      onPageChange(pageNo, newPageSize);
    }
  };

  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <div className="flex flex-row gap-x-2">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select value={`${pageSize}`} onValueChange={handlePageSizeChange}>
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pageSize.toString()} />
            </SelectTrigger>
            <SelectContent side="top">
              {paginationVariants.map((variant) => (
                <SelectItem key={variant} value={`${variant}`}>
                  {variant}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {pageNo + 1} of {totalPages}
        </div>
      </div>

      <div className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={previousPage}
          disabled={pageNo === 0}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={nextPage}
          disabled={pageNo === totalPages - 1}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default PaginationControls;
