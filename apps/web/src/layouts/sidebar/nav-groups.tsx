import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ChevronsUpDown, Loader2, Plus } from "lucide-react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AddGroupDialog } from "@/features/groups/components/add-group-dialog";
import { useGroups } from "@/features/groups/hooks/use-groups";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { getProfileAlt } from "@/utils/profile";
import { Muted } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";

export const NavGroups = () => {
  const { uid } = useAuth();
  const groups = useGroups(uid);

  const { groupId } = useParams();

  if (!groupId && groups[0].data) {
    return <Navigate to={`/groups/${groups[0].data.id}`} />;
  }

  const group = groups.find(({ data }) => data?.id == groupId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        onFocus={(event) => event.target.blur()}
      >
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          {groups.length == 0 ? (
            <Muted className="text-xs w-full">
              You aren't part of any groups.
            </Muted>
          ) : (
            <>
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage />
                <AvatarFallback className="rounded-lg">
                  {getProfileAlt(group?.data?.name || "NA")}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="line-clamp-2 font-semibold">
                  {group?.data?.name || "No group"}
                </span>
              </div>
            </>
          )}
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
        {groups
          .filter((group) => !group.isPending)
          .map(({ data: group }) => (
            <DropdownMenuItem
              key={group?.id}
              asChild
            >
              <Link to={`/groups/${group?.id}`}>
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="text-sm leading-tight">
                  <span className="line-clamp-2">{group?.name}</span>
                </div>
              </Link>
            </DropdownMenuItem>
          ))}
        <DropdownMenuSeparator />
        <AddGroupDialog>
          <Button className="w-full">
            <Plus />
            <span className="line-clamp-2">Add a group</span>
          </Button>
        </AddGroupDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
