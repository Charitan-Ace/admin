import { ColumnDef } from "@tanstack/react-table";
import Table from "@/components/reusable/table/Table";
import { Button } from "@/components/ui/button";
import mockApiClient from "./services/ProjectsMockApi";
import { Project } from "./types";
import useTable from "@/components/reusable/table/hooks/useTable";
import { Input } from "@/components/ui/input";

const projectColumns: ColumnDef<Project>[] = [
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
      (row.getValue(columnId) as Project).toString().includes(value),
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
    accessorKey: "tags",
    header: ({ column }) => (
      <div>
        <span>Tags</span>
        <Input
          type="text"
          placeholder="Filter by Tags"
          onChange={(e: React.FocusEvent<HTMLInputElement>) =>
            column.setFilterValue(e.target.value)
          }
          className="my-2"
        />
      </div>
    ),
    cell: ({ getValue }) => (getValue() as string[]).join(", "),
    filterFn: (row, columnId, value) =>
      (row.getValue(columnId) as string[])
        .join(", ")
        .toLowerCase()
        .includes(value.toLowerCase()),
  },
];

const ProjectsTable = () => {
  const { table, loading, refetch } = useTable<Project>({
    apiCall: async () => mockApiClient.get("projects"),
    columns: projectColumns,
    enablePagination: true,
  });

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Projects Table</h1>
      <Button className="mb-4" onClick={refetch}>
        Refresh Data
      </Button>
      <Table
        table={table}
        loading={loading}
        enablePagination={true}
        refetch={refetch}
      />
    </div>
  );
};

export default ProjectsTable;
