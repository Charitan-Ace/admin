import HeaderLink from "./child-components/header-link/HeaderLink";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const HeaderView = () => {
  return (
    <header className="flex items-center justify-between bg-gray-100 px-6 py-2">
      <div className="flex items-center space-x-2">
        <span className="text-lg font-bold">Admin Dashboard</span>
      </div>

      <nav className="flex items-center space-x-4">
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
              <HeaderLink to="/profile" outlined>
                Profile
              </HeaderLink>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <HeaderLink to="/settings" outlined>
                Settings
              </HeaderLink>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <HeaderLink to="/logout" outlined className="mt-2">
                Logout
              </HeaderLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
  );
};

export default HeaderView;
