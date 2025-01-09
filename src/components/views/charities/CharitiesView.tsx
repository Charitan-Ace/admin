import { ColumnDef } from "@tanstack/react-table";
import Table from "@/components/reusable/table/Table";
import mockApiClient from "./services/CharitiesMockApi";
import { Charity } from "./types";
import useTable from "@/components/reusable/table/hooks/useTable";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/reusable/button/Button";
import useModal from "@/components/reusable/modal/generic/hooks/useModal";
import GenericModal from "@/components/reusable/modal/generic/GenericModal";

const CharitiesTable = () => {
  const charityColumns: ColumnDef<Charity>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <div>
          <span>ID</span>
          <Input
            type="text"
            placeholder="Filter by ID"
            onChange={(e: React.FocusEvent<HTMLInputElement>) =>
              column.setFilterValue(e.target.value)
            }
            className="my-2"
          />
        </div>
      ),
      filterFn: (row, columnId, value) =>
        (row.getValue(columnId) as Charity).toString().includes(value),
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <div>
          <span>Name</span>
          <Input
            type="text"
            placeholder="Filter by Name"
            onChange={(e: React.FocusEvent<HTMLInputElement>) =>
              column.setFilterValue(e.target.value)
            }
            className="my-2"
          />
        </div>
      ),
      filterFn: (row, columnId, value) =>
        (row.getValue(columnId) as string)
          .toLowerCase()
          .includes(value.toLowerCase()),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <div>
          <span>Status</span>
          <Input
            type="text"
            placeholder="Filter by Status"
            onChange={(e: React.FocusEvent<HTMLInputElement>) =>
              column.setFilterValue(e.target.value)
            }
            className="my-2"
          />
        </div>
      ),
      filterFn: (row, columnId, value) =>
        (row.getValue(columnId) as string)
          .toLowerCase()
          .includes(value.toLowerCase()),
    },
    {
      accessorKey: "donationGoal",
      header: ({ column }) => (
        <div>
          <span>Donation Goal</span>
          <Input
            type="text"
            placeholder="Filter by Goal"
            onChange={(e: React.FocusEvent<HTMLInputElement>) =>
              column.setFilterValue(e.target.value)
            }
            className="my-2"
          />
        </div>
      ),
      filterFn: (row, columnId, value) =>
        (row.getValue(columnId) as number).toString().includes(value),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">⋮</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleEdit(row.original)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDelete(row.original)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const { table, loading, refetch } = useTable<Charity>({
    apiCall: async () => mockApiClient.get("charities"),
    columns: charityColumns,
    enablePagination: true,
  });

  const handleEdit = (row: Charity) => {
    console.log("Editing row:", row);
    openModal("Edit Charity");
  };

  const handleDelete = (row: Charity) => {
    console.log("Deleting row:", row);
    openModal("Delete Charity");
  };

  const { isOpen, title, openModal, closeModal } = useModal();

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Charities Table</h1>
      <Table
        table={table}
        loading={loading}
        enablePagination={true}
        refetch={refetch}
      />
      <GenericModal title={title} isOpen={isOpen} onClose={closeModal} />
    </div>
  );
};

export default CharitiesTable;
