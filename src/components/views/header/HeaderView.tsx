import { Button } from "@/components/reusable/button/Button";
import HeaderLink from "./child-components/header-link/HeaderLink";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { apiClient } from "@/lib/api/Client";
import { useNavigate } from "react-router";
import useModal from "@/components/reusable/modal/generic/hooks/useModal";
import AdminCreateModal from "./child-components/admin-create-modal/AdminCreateModal";
import { useState } from "react";
import { CreateAdminFormData } from "./child-components/admin-create-modal/interfaces";
import { toast, ToastContainer } from "react-toastify";
import { HeaderAPI } from "./services/HeaderViewAPI";

const HeaderView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiClient.auth.logout();
    } finally {
      navigate("/admin-login");
    }
  };

  const {
    isOpen: isCreateAdminModalOpen,
    // title: createAdminModalTitle,
    openModal: openCreateAdminModal,
    closeModal: closeCreateAdminModal,
  } = useModal(false);

  const handleRegisterAdmin = async (
    data: Omit<CreateAdminFormData, "confirmPassword">,
  ) => {
    setIsLoading(true);
    try {
      await HeaderAPI.registerNewAdmin(data);
      toast.success("Admin registered successfully!", {
        position: "bottom-right",
      });
    } catch (error) {
      toast.error(`Failed to register admin: ${error}`, {
        position: "bottom-right",
      });
    } finally {
      closeCreateAdminModal();
      setIsLoading(false);
    }
  };

  return (
    <header className="flex items-center justify-between bg-gray-100 px-6 py-2">
      <div className="flex items-center space-x-2">
        <span className="text-lg font-bold">Admin Dashboard</span>
        <ToastContainer />
      </div>

      <nav className="flex items-center space-x-4">
        <HeaderLink to="/projects" outlined>
          Projects
        </HeaderLink>
        <HeaderLink to="/charities" outlined>
          Charities
        </HeaderLink>
        <HeaderLink to="/donors" outlined>
          Donors
        </HeaderLink>
        <HeaderLink to="/statistics" outlined>
          Statistics
        </HeaderLink>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center space-x-2 focus:outline-none">
              <span className="hidden md:block">Admin</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="mt-3 space-y-1 p-1">
            <DropdownMenuItem asChild>
              <Button
                variant="outline"
                className="w-full"
                onClick={() =>
                  openCreateAdminModal(undefined, "Create New Admin")
                }
              >
                Create New Admin
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
      <AdminCreateModal
        isOpen={isCreateAdminModalOpen}
        onClose={closeCreateAdminModal}
        onSubmit={handleRegisterAdmin}
        loading={isLoading}
      />
    </header>
  );
};

export default HeaderView;
