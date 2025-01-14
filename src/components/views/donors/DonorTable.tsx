import { ColumnDef } from "@tanstack/react-table";
import Table from "@/components/reusable/table/Table";
import useTable from "@/components/reusable/table/hooks/useTable";
import { useStore } from "zustand";
import { DonorsAPI } from "./services/DonorsAPI.ts";
import donorStore from "./store/createDonorStore";
import { Donor } from "./services/interfaces";
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
import { useState } from "react";
import { BookImage } from "lucide-react";
import useModal from "@/components/reusable/modal/generic/hooks/useModal";
import { CreateAccountForm } from "@/components/views/create-account/CreateAccountForm";
import { toast } from "react-toastify";
import { CreateAccountFormFields } from "@/components/views/create-account/types/interfaces";
import { CreateAccountFormData } from "../create-account/schemas/createAccountSchema";
import { useNavigate } from "react-router";
import { apiClient } from "@/lib/api/Client.ts";
import AssetsService from "@/lib/api/services/AssetsService.ts";


const DonorsTable = () => {
  const [loading, setLoading] = useState(false);
  const { data, isLoading, paginationData, filterData, totalPages } =
    useStore(donorStore);
  const navigate = useNavigate();

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

  const handleCreateAccount = async (data: CreateAccountFormData) => {
    try {
      setLoading(true);
      console.log("Form data received:", data);

      // First create the account
      const response = await DonorsAPI.createAccount({
        email: data.email,
        password: data.password,
        profile: {
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address ?? undefined,
        },
      });

      if(!response){
        toast.error("Failed to create account", {
          position: "bottom-right",
        });
        return;
      }

      const userId = (response as any).id;
      console.log("User ID:", userId);
      const files = data.image;

      const assetClients = new AssetsService(apiClient);

      if(!files){
        toast.success("Account created successfully!", {
          position: "bottom-right",
        });
        DonorsAPI.fetchAllDonors();
        return;
      }

      

      // If there's an image file, upload it
      if (files[0] instanceof File) {
        console.log("Image file found:", files[0]);
        const signedUrl = await assetClients.uploadFileWithSignedUrl(files[0], userId);
        if(signedUrl){
          await DonorsAPI.updateDonor(userId, {
            userId: userId,
            assetKeys: signedUrl,
          });
        }
      } else {
        console.log("No valid image file found in form data");
      }
      
      toast.success("Account created successfully!", {
        position: "bottom-right",
      });
      DonorsAPI.fetchAllDonors();
    } catch (error) {
      toast.error(`Failed to create account: ${error}`, {
        position: "bottom-right",
      });
    } finally {
      setLoading(false);
      closeCreateAccountModal();
    }
  };

  const {
    isOpen: isCreateAccountModalOpen,
    openModal: openCreateAccountModal,
    closeModal: closeCreateAccountModal,
  } = useModal(false);

  const charityColumns: ColumnDef<Donor>[] = [
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
    {
      id: "actions",
      // cell: ({ row }) => {
      //   const menuItems = [
      //     {
      //       handlerName: "Edit",
      //       handler: () => openCUModal(row.original.userId, `Edit ${row.original.companyName} charity`),
      //     },
      //     {
      //       handlerName: "Delete",
      //       handler: handleCharitiesDelete,
      //     },
      //   ];

      //   return (
      //     <ActionsMenu rowId={row.original.userId} actionItems={menuItems} />
      //   );
      // },
      cell: ({ row }) => (
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => navigate(`/donor/${row.original.userId}`)}
        >
          <BookImage />
        </Button>
      ),
      enableHiding: false,
      size: 20,
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
            onClick={() => openCreateAccountModal(undefined, "Create New Donor")}
          >
            Register New Donor
          </Button>
        </div>
        <Table
          table={table}
          loading={isLoading}
          refetch={DonorsAPI.fetchAllDonors}
        />
      </div>

      <CreateAccountForm
        isOpen={isCreateAccountModalOpen}
        onClose={closeCreateAccountModal}
        onSubmit={handleCreateAccount}
        loading={loading}
      />

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

export default DonorsTable;