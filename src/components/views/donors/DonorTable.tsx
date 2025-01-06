import { ColumnDef } from "@tanstack/react-table";
import Table from "@/components/reusable/table/Table";
import donorsApiClient from "./services/DonorsMockApi";
import { Donor } from "./types";
import useTable from "@/components/reusable/table/hooks/useTable";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const donorColumns: ColumnDef<Donor>[] = [
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
      (row.getValue(columnId) as Donor).toString().includes(value),
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
    accessorKey: "donationAmount",
    header: ({ column }) => (
      <div>
        <span>Donation Amount</span>
        <Input
          type="text"
          placeholder="Filter by Amount"
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

const DonorsTable = () => {
  const { table, loading, refetch } = useTable<Donor>({
    apiCall: async () => donorsApiClient.get("donors"),
    columns: donorColumns,
    enablePagination: true,
  });

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Donors Table</h1>
      <Table
        table={table}
        loading={loading}
        enablePagination={true}
        refetch={refetch}
      />
    </div>
  );
};

export default DonorsTable;
