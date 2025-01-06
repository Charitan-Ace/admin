import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import Table from "@/components/reusable/table/Table";
import useTable from "@/components/reusable/table/hooks/useTable";
import { ColumnDef } from "@tanstack/react-table";
import { UserEditModal } from "./UserEditModal"; // Updated import path

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface UserDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

async function fetchUsers(): Promise<User[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
}

export default function AdminUsersPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Define columns inside the component
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedUser(user);
                setEditModalOpen(true);
              }}
            >
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                setSelectedUser(user);
                setDeleteModalOpen(true);
              }}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  const { table, refetch, loading } = useTable<User>({
    apiCall: fetchUsers,
    columns,
    enablePagination: true,
    enableFiltering: true,
    paginationSize: 10,
  });

  const handleEditUser = async (updatedUser: User) => {
    await fetch(`/api/users/${updatedUser.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    });
    setEditModalOpen(false);
    setSelectedUser(null);
    refetch();
  };

  const handleDeleteUser = async (userId: number) => {
    await fetch(`/api/users/${userId}`, { method: "DELETE" });
    setDeleteModalOpen(false);
    setSelectedUser(null);
    refetch();
  };

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">User Management</h1>

      <Table
        table={table}
        refetch={refetch}
        loading={loading}
        enablePagination={true}
      />

      {/* Edit Modal */}
      {selectedUser && editModalOpen && (
        <UserEditModal
          user={{
            id: selectedUser.id,
            firstName: selectedUser.name.split(" ")[0] || "",
            lastName: selectedUser.name.split(" ").slice(1).join(" ") || "",
            email: selectedUser.email,
            phone: selectedUser.phone || "",
          }}
          onClose={() => setEditModalOpen(false)}
          onSave={(updatedUser: UserDto) => {
            const newUser: User = {
              id: selectedUser.id,
              name: `${updatedUser.firstName} ${updatedUser.lastName}`,
              email: updatedUser.email,
              phone: updatedUser.phone || "",
            };
            handleEditUser(newUser);
          }}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4 mt-4">
              <p>Are you sure you want to delete {selectedUser.name}?</p>
              <DialogFooter className="space-x-2">
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteUser(selectedUser.id)}
                >
                  Delete
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setDeleteModalOpen(false)}
                >
                  Cancel
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
