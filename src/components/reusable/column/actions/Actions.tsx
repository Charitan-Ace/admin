import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/reusable/button/Button";
import { ActionsProps } from "./interfaces";

const ActionsMenu: React.FC<ActionsProps> = ({ rowId, actionItems }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          ⋮
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {actionItems.map((item, index) => (
          <DropdownMenuItem key={index} onClick={() => item.handler(rowId)}>
            {item.handlerName}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsMenu;
