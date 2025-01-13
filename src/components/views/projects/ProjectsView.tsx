import { ColumnDef } from "@tanstack/react-table";
import Table from "@/components/reusable/table/Table";
import useTable from "@/components/reusable/table/hooks/useTable";
import { useStore } from "zustand";
import { ProjectsAPI } from "./services/ProjectsAPI";
import projectsStore from "./store/createProjectsStore";
import { Project } from "./services/interfaces";
import { Checkbox } from "@/components/ui/checkbox";
import DefaultColumnHeader from "@/components/reusable/column/header/Header";
import { FilterRequest, PagiableRequest } from "@/lib/api/interfaces/table";
import PaginationControls from "@/components/reusable/table/pagination/Pagination";
import { Button } from "@/components/reusable/button/Button";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ColumnFilterInputDropdown } from "@/components/reusable/column/filter/input/ColumnFilterInput";
import ColumnFilterPlaceholder from "@/components/reusable/column/filter/placeholder/ColumnFilterPlaceholder";
import ColumnSortFilter from "@/components/reusable/column/filter/sort/SortFilter";

const ProjectTable = () => {
  const { data, isLoading, paginationData, filterData, totalPages } =
    useStore(projectsStore);

  const updatePaginationParams = (paginationParams: PagiableRequest) => {
    projectsStore.getState().setFilterData({
      ...filterData,
      ...paginationParams,
    });
  };

  const updateFilterParams = (filterParams: FilterRequest) => {
    projectsStore.getState().setFilterData({
      ...filterData,
      ...filterParams,
    });
  };

  const charityColumns: ColumnDef<Project>[] = [
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
    useTable<Project>({
      data: data ?? [],
      totalPages: totalPages ?? 0,
      pageIndex: paginationData?.pageNumber ?? 0,
      paginationSize: paginationData?.pageSize ?? 10,
      columns: charityColumns,
      enablePagination: true,
      filter: { ...filterData },
      onPaginationChange: updatePaginationParams,
      refetch: ProjectsAPI.fetchAllProjects,
    });

  return (
    <div className="p-6 flex flex-col h-full justify-between">
      <div>
        <div className="flex flex-row justify-between">
          <h1 className="text-xl font-bold mb-4">Projects Table</h1>
          <Button
            variant="outline"
            onClick={() =>
              openCreateCharityModal(undefined, "Register New Project")
            }
          >
            Register New Project
          </Button>
        </div>
        <Table
          table={table}
          loading={isLoading}
          refetch={ProjectsAPI.fetchAllProjects}
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

export default ProjectTable;
