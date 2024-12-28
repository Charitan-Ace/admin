"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Table from "@/components/reusable/table/Table";
import useTable from "@/components/reusable/table/hooks/useTable";
import { ColumnDef } from "@tanstack/react-table";

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

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
      header: "phone",
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

      {/* Edit User Dialog */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const updated: User = {
                  ...selectedUser,
                  name: formData.get("name") as string,
                  email: formData.get("email") as string,
                  phone: formData.get("phone") as string,
                };
                handleEditUser(updated);
              }}
            >
              <div className="space-y-4 mt-4">
                <Input
                  name="name"
                  defaultValue={selectedUser.name}
                  placeholder="Name"
                />
                <Input
                  name="email"
                  defaultValue={selectedUser.email}
                  placeholder="Email"
                />
                <Input
                  name="phone"
                  defaultValue={selectedUser.phone}
                  placeholder="phone"
                />
              </div>
              <DialogFooter className="mt-4 space-x-2">
                <Button type="submit">Save</Button>
                <Button
                  variant="outline"
                  onClick={() => setEditModalOpen(false)}
                >
                  Cancel
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

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
