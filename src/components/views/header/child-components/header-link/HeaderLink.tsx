import { Link } from "react-router";
import { cn } from "@/lib/utils";
import { HeaderLinkProps } from "./types";

const HeaderLink = ({
  to,
  children,
  outlined = false,
  className = "",
  ...props
}: HeaderLinkProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "px-4 py-2 text-sm font-medium rounded-md transition-colors",
        outlined
          ? "border border-gray-300 text-gray-700 hover:bg-gray-200"
          : "bg-gray-800 text-white hover:bg-gray-700",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
};

export default HeaderLink;
