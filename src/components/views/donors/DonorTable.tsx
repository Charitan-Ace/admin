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
import { Button } from "@/components/reusable/button/Button";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router";

const DonorsTable = () => {
  const navigate = useNavigate();
  
  const handleEdit = (donor: Donor) => {
    navigate(`/donors/${donor.id}`);
  };

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

  const [data, setData] = useState<Donor[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [pageIndex, setPageIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchData = async (pageNo: number, pageSize: number) => {
    try {
      setLoading(true);
      const response = await donorsApiClient.get("donors");
      console.log('Donors data:', response);
      setData(response);
      setTotalPages(Math.ceil(response.length / pageSize));
    } catch (error) {
      console.error('Error fetching donors:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch only
  useEffect(() => {
    fetchData(0, 10);
  }, []); // Empty dependency array for initial load only

  const { table } = useTable<Donor>({
    data,
    columns: donorColumns,
    pageIndex,
    paginationSize: 10,
    totalPages,
    onPaginationChange: ({ pageNo, pageSize }) => {
      if (pageNo !== pageIndex) { // Only fetch if page actually changed
        setPageIndex(pageNo);
        fetchData(pageNo, pageSize);
      }
    },
  });

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Donors Table</h1>
      <Table
        table={table}
        loading={loading}
        enablePagination={true}
      />
    </div>
  );
};

export default DonorsTable;
