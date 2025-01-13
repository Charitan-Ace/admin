import { ColumnDef } from "@tanstack/react-table";
import Table from "@/components/reusable/table/Table";
import useTable from "@/components/reusable/table/hooks/useTable";
import { useStore } from "zustand";
import { DonorsAPI } from "./services/DonorsAPI";
import donorStore from "./store/createDonorStore";
import { Donor } from "./services/interfaces";
import { Checkbox } from "@/components/ui/checkbox";
import DefaultColumnHeader from "@/components/reusable/column/header/Header";
import { FilterRequest, PagiableRequest } from "@/lib/api/interfaces/table";
import PaginationControls from "@/components/reusable/table/pagination/Pagination";
// import ActionsMenu from "@/components/reusable/column/actions/Actions";
import { Button } from "@/components/reusable/button/Button";
// import useModal from "@/components/reusable/modal/generic/hooks/useModal";
// import DeleteModal from "@/components/reusable/modal/generic/child-component/delete-modal/DeleteModal";
// import { BookImage } from "lucide-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ColumnFilterInputDropdown } from "@/components/reusable/column/filter/input/ColumnFilterInput";
import ColumnFilterPlaceholder from "@/components/reusable/column/filter/placeholder/ColumnFilterPlaceholder";
import ColumnSortFilter from "@/components/reusable/column/filter/sort/SortFilter";

const DonorTable = () => {
  const { data, isLoading, paginationData, filterData, totalPages } =
    useStore(donorStore);

  const updatePaginationParams = (paginationParams: PagiableRequest) => {
    donorStore.getState().setFilterData({
      ...filterData,
      ...paginationParams,
    });
  };

  const updateFilterParams = (filterParams: FilterRequest) => {
    donorStore.getState().setFilterData({
      ...filterData,
      ...filterParams,
    });
  };

  const donorColumns: ColumnDef<Donor>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="whitespace-nowrap"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="whitespace-nowrap"
        />
      ),
      enableSorting: false,
      enableHiding: false,
      size: 20,
    },
    {
      id: "firstName",
      accessorKey: "firstName",
      header: () => (
        <ColumnFilterPlaceholder
          column="First name"
          filterContent={
            <div className="flex flex-row gap-x-2">
              <ColumnSortFilter
                sortOrder={
                  filterData?.filter === "firstName"
                    ? (filterData?.order ?? "ascending")
                    : "unsorted"
                }
                onChange={(order) => {
                  updateFilterParams({
                    filter: "firstName",
                    order: order === "unsorted" ? undefined : order,
                  });
                }}
              />
              <ColumnFilterInputDropdown
                column="First Name"
                value={
                  filterData?.filter === "firstName"
                    ? (filterData?.keyword ?? "")
                    : ""
                }
                onChange={(value) => {
                  updateFilterParams({
                    filter: "firstName",
                    keyword: value,
                  });
                }}
              />
            </div>
          }
        />
      ),
    },
    {
      id: "lastName",
      accessorKey: "lastName",
      header: () => (
        <ColumnFilterPlaceholder
          column="Last Name"
          filterContent={
            <div className="flex flex-row gap-x-2">
              <ColumnSortFilter
                sortOrder={
                  filterData?.filter === "lastName"
                    ? (filterData?.order ?? "unsorted")
                    : "unsorted"
                }
                onChange={(order) => {
                  updateFilterParams({
                    filter: "lastName",
                    order: order === "unsorted" ? undefined : order,
                  });
                }}
              />
              <ColumnFilterInputDropdown
                column="Last Name"
                value={
                  filterData?.filter === "lastName"
                    ? (filterData?.keyword ?? "")
                    : ""
                }
                onChange={(value) => {
                  updateFilterParams({
                    filter: "lastName",
                    keyword: value,
                  });
                }}
              />
            </div>
          }
        />
      ),
    },
    {
      id: "address",
      accessorKey: "address",
      header: () => <DefaultColumnHeader title="Address" />,
    },
  ];

  const { table, goToPage, setPageSize, nextPage, previousPage } =
    useTable<Donor>({
      data: data ?? [],
      totalPages: totalPages ?? 0,
      pageIndex: paginationData?.pageNumber ?? 0,
      paginationSize: paginationData?.pageSize ?? 10,
      columns: donorColumns,
      enablePagination: true,
      filter: { ...filterData },
      onPaginationChange: updatePaginationParams,
      refetch: DonorsAPI.fetchAllDonors,
    });

  return (
    <div className="p-6 flex flex-col h-full justify-between">
      <div>
        <div className="flex flex-row justify-between">
          <h1 className="text-xl font-bold mb-4">Donors Table</h1>
          <Button
            variant="outline"
            onClick={() =>
              openCreateCharityModal(undefined, "Register New Donor")
            }
          >
            Register New Donor
          </Button>
        </div>
        <Table
          table={table}
          loading={isLoading}
          refetch={DonorsAPI.fetchAllDonors}
          // onSelectedRowsDelete={() => console.log('hi')}
        />
      </div>
      <div className="mt-auto">
        <PaginationControls
          pageNo={paginationData?.pageNumber ?? 0}
          pageSize={paginationData?.pageSize ?? 0}
          totalPages={totalPages ?? 0}
          goToPage={goToPage}
          changePageSize={setPageSize}
          nextPage={nextPage}
          previousPage={previousPage}
        />
      </div>

      <ToastContainer />
    </div>
  );
};

export default DonorTable;
