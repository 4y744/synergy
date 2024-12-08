import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ChevronsUpDown } from "lucide-react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AddGroupDialog } from "../../features/groups/components/add-group-dialog";
import { useGroups } from "@/features/groups/hooks/use-groups";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { Link } from "react-router-dom";

export const NavGroups = () => {
  const { uid } = useAuth();
  const groups = useGroups(uid);
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="line-clamp-2 font-semibold">
                  Английски език
                </span>
              </div>
              <ChevronsUpDown />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            sideOffset={4}
          >
            <DropdownMenuLabel className="font-semibold text-xs text-muted-foreground">
              Groups
            </DropdownMenuLabel>
            {groups?.map((group) => (
              <DropdownMenuItem
                key={group.id}
                asChild
              >
                <Link to={`/groups/${group.id}`}>
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="text-sm leading-tight">
                    <span className="line-clamp-2">{group.name}</span>
                  </div>
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <AddGroupDialog />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
