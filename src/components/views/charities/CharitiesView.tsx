import { ColumnDef } from "@tanstack/react-table";
import Table from "@/components/reusable/table/Table";
import useTable from "@/components/reusable/table/hooks/useTable";
import { useStore } from "zustand";
import { CharitiesAPI } from "./services/CharitiesAPI";
import charityStore from "./store/createCharityStore";
import { Charity, OrganizationType } from "./services/interfaces";
import { Checkbox } from "@/components/ui/checkbox";
// import { ColumnFilter } from "@/components/reusable/column/filter/Filter";
import DefaultColumnHeader from "@/components/reusable/column/header/Header";
import { FilterRequest, PagiableRequest } from "@/lib/api/interfaces/table";
import PaginationControls from "@/components/reusable/table/pagination/Pagination";
// import ActionsMenu from "@/components/reusable/column/actions/Actions";
import ColumnSortFilter from "@/components/reusable/column/filter/sort/SortFilter";
import { Button } from "@/components/reusable/button/Button";
import useModal from "@/components/reusable/modal/generic/hooks/useModal";
// import DeleteModal from "@/components/reusable/modal/generic/child-component/delete-modal/DeleteModal";
import CreateCharityFormModal from "./child-components/CreateCharityModal/CreateCharityModal";
// import { BookImage } from "lucide-react";
import { CreateCharityFormData } from "./child-components/CreateCharityModal/interfaces";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ColumnFilterInputDropdown from "@/components/reusable/column/filter/input/ColumnFilterInput";
import ColumnFilterPlaceholder from "@/components/reusable/column/filter/placeholder/ColumnFilterPlaceholder";
import ColumnFilterSelect from "@/components/reusable/column/filter/select/ColumnFilterSelect";

const CharitiesTable = () => {
  const { data, isLoading, paginationData, filterData, totalPages } =
    useStore(charityStore);

  const updatePaginationParams = (paginationParams: PagiableRequest) => {
    charityStore.getState().setFilterData({
      ...filterData,
      ...paginationParams,
    });
  };

  const updateFilterParams = (filterParams: FilterRequest) => {
    charityStore.getState().setFilterData({
      ...filterData,
      ...filterParams,
    });
  };

  const charityColumns: ColumnDef<Charity>[] = [
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
      id: "companyName",
      accessorKey: "companyName",
      header: () => (
        <ColumnFilterPlaceholder
          column="Company Name"
          filterContent={
            <div className="flex flex-row gap-x-2">
              <ColumnSortFilter
                sortOrder={
                  filterData?.filter === "companyName"
                    ? (filterData?.order ?? "ascending")
                    : "ascending"
                }
                onChange={(order) => {
                  updateFilterParams({
                    filter: "companyName",
                    order: order === "unsorted" ? undefined : order,
                  });
                }}
              />
              <ColumnFilterInputDropdown
                column="Last Name"
                value={
                  filterData?.filter === "companyName"
                    ? (filterData?.keyword ?? "")
                    : ""
                }
                onChange={(value) => {
                  updateFilterParams({
                    filter: "companyName",
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
      enableSorting: true,
    },
    {
      id: "organizationType",
      accessorKey: "organizationType",
      header: () => (
        <ColumnFilterPlaceholder
          column="Organization Type"
          filterContent={
            <ColumnFilterSelect
              column="Organization Type"
              value={
                filterData?.filter === "organizationType"
                  ? (filterData?.keyword ?? null)
                  : null
              }
              options={Object.values(OrganizationType)}
              onValueChange={(value) => {
                updateFilterParams({
                  filter: value === null ? undefined : value.toLowerCase(),
                  keyword: value ?? undefined,
                });
              }}
            />
          }
        />
      ),
    },
    {
      id: "taxCode",
      accessorKey: "taxCode",
      header: () => <DefaultColumnHeader title="Tax Code" />,
    },
    // {
    //   id: "actions",
    //   // cell: ({ row }) => {
    //   //   const menuItems = [
    //   //     {
    //   //       handlerName: "Edit",
    //   //       handler: () => openCUModal(row.original.userId, `Edit ${row.original.companyName} charity`),
    //   //     },
    //   //     {
    //   //       handlerName: "Delete",
    //   //       handler: handleCharitiesDelete,
    //   //     },
    //   //   ];

    //   //   return (
    //   //     <ActionsMenu rowId={row.original.userId} actionItems={menuItems} />
    //   //   );
    //   // },
    //   cell: ({ row }) => (
    //     <Button variant="outline" size="icon">
    //       <BookImage />
    //     </Button>
    //   ),
    //   enableHiding: false,
    //   size: 20,
    // },
  ];

  const { table, goToPage, setPageSize, nextPage, previousPage } =
    useTable<Charity>({
      data: data ?? [],
      totalPages: totalPages ?? 0,
      pageIndex: paginationData?.pageNumber ?? 0,
      paginationSize: paginationData?.pageSize ?? 10,
      columns: charityColumns,
      enablePagination: true,
      filter: { ...filterData },
      onPaginationChange: updatePaginationParams,
      refetch: CharitiesAPI.fetchAllCharities,
    });

  // const handleCharitiesDelete = () => {
  //   const selectedCharities = table.getSelectedRowModel().rows.map((row) => row.original);
  //   const charityNames = selectedCharities.map((charity) => charity.companyName).join(", ");

  //   openDeleteModal(
  //     selectedCharities.map((charity) => charity.userId),
  //     `Are you sure you want to delete the following charities: ${charityNames}?`
  //   );
  // };

  // const {
  //   id: deleteCharityId,
  //   isOpen: isDeleteModalOpen,
  //   title: deleteTitle,
  //   openModal: openDeleteModal,
  //   closeModal: closeDeleteModal,
  // } = useModal();

  const handleRegisterCharity = async (data: CreateCharityFormData) => {
    try {
      await CharitiesAPI.registerNewCharity({ ...data });

      toast.success("Charity registered successfully!", {
        position: "bottom-right",
      });
    } catch (error) {
      toast.error(`Failed to register charity: ${error}`, {
        position: "bottom-right",
      });
    } finally {
      closeCreateCharityModal();
    }
  };

  const {
    isOpen: isCreateCharityModalOpen,
    // title: createCharityModalTitle,
    openModal: openCreateCharityModal,
    closeModal: closeCreateCharityModal,
  } = useModal(false);

  return (
    <div className="p-6 flex flex-col h-full justify-between">
      <div>
        <div className="flex flex-row justify-between">
          <h1 className="text-xl font-bold mb-4">Charities Table</h1>
          <Button
            variant="outline"
            onClick={() =>
              openCreateCharityModal(undefined, "Create New Charity")
            }
          >
            Create New Charity
          </Button>
        </div>
        <Table
          table={table}
          loading={isLoading}
          refetch={CharitiesAPI.fetchAllCharities}
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

      <CreateCharityFormModal
        isOpen={isCreateCharityModalOpen}
        onClose={closeCreateCharityModal}
        onSubmit={handleRegisterCharity}
        loading={isLoading}
        // charityData={selectedCharity}
      />

      {/* <DeleteModal
        id={deleteCharityId ?? -1}
        isOpen={isDeleteModalOpen}
        onClose={() => closeDeleteModal()}
        onDelete={() => closeDeleteModal()}
        title="Delete Charity"
        message={deleteTitle}
      /> */}

      <ToastContainer />
    </div>
  );
};

export default CharitiesTable;
