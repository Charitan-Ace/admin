import { ColumnDef } from "@tanstack/react-table";
import Table from "@/components/reusable/table/Table";
import useTable from "@/components/reusable/table/hooks/useTable";
import { useStore } from "zustand";
import { ProjectsAPI } from "./services/ProjectsAPI";
import projectsStore from "./store/createProjectsStore";
import {
  Country,
  Project,
  ProjectCategoryType,
  ProjectStatusType,
} from "./services/interfaces";
import { Checkbox } from "@/components/ui/checkbox";
import DefaultColumnHeader from "@/components/reusable/column/header/Header";
import { FilterRequest, PagiableRequest } from "@/lib/api/interfaces/table";
import PaginationControls from "@/components/reusable/table/pagination/Pagination";
import { Button } from "@/components/reusable/button/Button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ColumnFilterInputDropdown } from "@/components/reusable/column/filter/input/ColumnFilterInput";
import ColumnFilterPlaceholder from "@/components/reusable/column/filter/placeholder/ColumnFilterPlaceholder";
import ColumnFilterSelect from "@/components/reusable/column/filter/select/ColumnFilterSelect";
import ActionsMenu from "@/components/reusable/column/actions/Actions";
import Badge from "@/components/reusable/badge/BadgeComponent";
import { categoryColors, statusColors } from "./interfaces";
import DeleteModal from "@/components/reusable/modal/generic/child-component/delete-modal/DeleteModal";
import useModal from "@/components/reusable/modal/generic/hooks/useModal";
import ConfirmModal from "@/components/reusable/modal/generic/child-component/confirm-modal/ConfirmModal";

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

  const {
    id: deleteProjectId,
    isOpen: isDeleteProjectModalOpen,
    title: deleteProjectModalTitle,
    openModal: openDeleteProjectModal,
    closeModal: closeDeleteProjectModal,
  } = useModal();

  const {
    id: confirmProjectId,
    type: confirmProjectType,
    isOpen: isConfirmProjectModalOpen,
    title: confirmProjectModalTitle,
    openModal: openConfirmProjectModal,
    closeModal: closeConfirmProjectModal,
  } = useModal();

  const projectsColumns: ColumnDef<Project>[] = [
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
      id: "title",
      accessorKey: "title",
      header: () => (
        <ColumnFilterPlaceholder
          column="Project Title"
          filterContent={
            <ColumnFilterInputDropdown
              column="Project Title"
              value={
                filterData?.filter === "title"
                  ? (filterData?.keyword ?? "")
                  : ""
              }
              onChange={(value) => {
                updateFilterParams({
                  filter: "title",
                  keyword: value,
                });
              }}
            />
          }
        />
      ),
    },
    {
      id: "description",
      accessorKey: "description",
      header: () => <DefaultColumnHeader title="Description" />,
      size: 400,
    },
    {
      id: "goal",
      accessorKey: "goal",
      header: () => <DefaultColumnHeader title="Goal ($)" />,
      cell: ({ row }) => (
        <span>{(row.getValue("goal") as string).toLocaleString()}</span>
      ),
    },
    {
      id: "startTime",
      accessorKey: "startTime",
      header: () => <DefaultColumnHeader title="Start Time" />,
      cell: ({ row }) => (
        <span>
          {new Date(
            Number(row.getValue("startTime")) * 1000,
          ).toLocaleDateString()}
        </span>
      ),
    },
    {
      id: "endTime",
      accessorKey: "endTime",
      header: () => <DefaultColumnHeader title="End Time" />,
      cell: ({ row }) => (
        <span>
          {new Date(
            Number(row.getValue("endTime")) * 1000,
          ).toLocaleDateString()}
        </span>
      ),
    },
    {
      id: "statusType",
      accessorKey: "statusType",
      header: () => (
        <ColumnFilterPlaceholder
          column="Status"
          filterContent={
            <ColumnFilterSelect
              column="Status"
              value={
                filterData?.filter === "statusType"
                  ? (filterData?.keyword ?? null)
                  : null
              }
              options={Object.values(ProjectStatusType)}
              onValueChange={(value) => {
                updateFilterParams({
                  filter: "statusType",
                  keyword: value ?? undefined,
                });
              }}
            />
          }
        />
      ),
      cell: ({ row }) => {
        const status = row.getValue("statusType") as string;
        return <Badge text={status} color={statusColors[status]} />;
      },
    },
    {
      id: "categoryType",
      accessorKey: "categoryType",
      header: () => (
        <ColumnFilterPlaceholder
          column="Category"
          filterContent={
            <ColumnFilterSelect
              column="Category"
              value={
                filterData?.filter === "categoryType"
                  ? (filterData?.keyword ?? null)
                  : null
              }
              options={Object.values(ProjectCategoryType)}
              onValueChange={(value) => {
                updateFilterParams({
                  filter: "categoryType",
                  keyword: value ?? undefined,
                });
              }}
            />
          }
        />
      ),
      cell: ({ row }) => {
        const category = row.getValue("categoryType") as string;
        return <Badge text={category} color={categoryColors[category]} />;
      },
    },
    {
      id: "countryIsoCode",
      accessorKey: "countryIsoCode",
      header: () => (
        <ColumnFilterPlaceholder
          column="Country"
          filterContent={
            <ColumnFilterSelect
              column="Country"
              value={
                filterData?.filter === "countryIsoCode"
                  ? (filterData?.keyword ?? null)
                  : null
              }
              options={Object.keys(Country)}
              onValueChange={(value) => {
                updateFilterParams({
                  filter: "countryIsoCode",
                  keyword: value ?? undefined,
                });
              }}
            />
          }
        />
      ),
      cell: ({ row }) => (
        <img
          src={`https://flagsapi.com/${row.getValue("countryIsoCode")}/flat/64.png`}
        />
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const id = row.original.id;
        const status = row.original.statusType;

        const menuItems = [
          {
            handlerName: "Edit",
            handler: () => console.log(id, "edit"),
          },
          {
            handlerName: "Profile",
            handler: () => console.log(id, "profile"),
          },
        ];

        if (status === "PENDING") {
          menuItems.push({
            handlerName: "Approve",
            handler: () =>
              handleOpenProjectConfirmModal(id, row.original.title, {
                type: "approving",
              }),
          });
        } else if (status === "APPROVED") {
          menuItems.push({
            handlerName: "Halt",
            handler: () =>
              handleOpenProjectConfirmModal(id, row.original.title, {
                type: "halting",
              }),
          });
        }

        if (status !== "DELETED") {
          menuItems.push({
            handlerName: "Delete",
            handler: () => handleOpenProjectsDeleteModal(),
          });
        }

        return <ActionsMenu rowId={id} actionItems={menuItems} />;
      },
      enableHiding: false,
      size: 20,
    },
  ];

  const handleOpenProjectsDeleteModal = () => {
    const selectedCharities = table
      .getSelectedRowModel()
      .rows.map((row) => row.original);
    const charityNames = selectedCharities
      .map((project) => project.title)
      .join(", ");

    openDeleteProjectModal(
      selectedCharities.map((charity) => charity.id),
      `Are you sure you want to delete the following projects: ${charityNames}?`,
    );
  };

  const handleOpenProjectConfirmModal = (
    id: string,
    name: string,
    params: { type: "halting" | "approving" },
  ) => {
    if (params.type == "halting") {
      openConfirmProjectModal(
        id,
        `Are you sure you want to halt project ${name}?`,
        params.type,
      );
    } else if (params.type === "approving") {
      openConfirmProjectModal(
        id,
        `Are you sure you want to approve project ${name}?`,
        params.type,
      );
    }
  };

  const { table, goToPage, setPageSize, nextPage, previousPage } =
    useTable<Project>({
      data: data ?? [],
      totalPages: totalPages ?? 0,
      pageIndex: paginationData?.pageNumber ?? 0,
      paginationSize: paginationData?.pageSize ?? 10,
      columns: projectsColumns,
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
          onSelectedRowsDelete={handleOpenProjectsDeleteModal}
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

      <ConfirmModal
        isLoading={isLoading}
        isOpen={isConfirmProjectModalOpen}
        onClose={closeConfirmProjectModal}
        onConfirm={() =>
          confirmProjectType == "halting"
            ? ProjectsAPI.haltProject(
                confirmProjectId ?? "",
                () =>
                  toast.success("Project halted successfully!", {
                    position: "bottom-right",
                  }),
                () =>
                  toast.error(`Failed to halt project`, {
                    position: "bottom-right",
                  }),
                closeConfirmProjectModal,
              )
            : ProjectsAPI.approveProject(
                Array.isArray(confirmProjectId)
                  ? confirmProjectId[0]
                  : (confirmProjectId ?? ""),
                () =>
                  toast.success("Project approved successfully!", {
                    position: "bottom-right",
                  }),
                () =>
                  toast.error(`Failed to approve project`, {
                    position: "bottom-right",
                  }),
                closeConfirmProjectModal,
              )
        }
        title={
          confirmProjectType == "halting"
            ? "Halting Project"
            : "Approving Project"
        }
        message={confirmProjectModalTitle}
      />

      <DeleteModal
        isLoading={isLoading}
        isOpen={isDeleteProjectModalOpen}
        onClose={closeDeleteProjectModal}
        onDelete={() =>
          ProjectsAPI.deleteProject(
            deleteProjectId ?? [],
            () =>
              toast.success("Project deleted successfully!", {
                position: "bottom-right",
              }),
            () =>
              toast.error(`Failed to delete project`, {
                position: "bottom-right",
              }),
            closeDeleteProjectModal,
          )
        }
        title="Delete Project"
        message={deleteProjectModalTitle}
      />

      <ToastContainer />
    </div>
  );
};

export default ProjectTable;
