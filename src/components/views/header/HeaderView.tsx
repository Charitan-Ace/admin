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

const HeaderView = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiClient.auth.logout();
    } finally {
      navigate("/admin-login");
    }
  };

  return (
    <header className="flex items-center justify-between bg-gray-100 px-6 py-2">
      <div className="flex items-center space-x-2">
        <span className="text-lg font-bold">Admin Dashboard</span>
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
              <img
                src="/path-to-profile.png"
                alt="Admin Profile"
                className="h-8 w-8 rounded-full"
              />
              <span className="hidden md:block">Admin</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="mt-3 space-y-1 p-1">
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
    </header>
  );
};

export default HeaderView;
