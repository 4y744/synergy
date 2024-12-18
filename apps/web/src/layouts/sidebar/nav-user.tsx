import { LogOut, Settings, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getProfileAlt, getRandomProfileColor } from "@/utils/profile";
import { cn } from "@/utils/cn";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { useSignOut } from "@/features/auth/hooks/use-sign-out";

export const NavUser = () => {
  const navigate = useNavigate();

  const { username, email } = useAuth();
  const { mutate: signOut } = useSignOut();

  const profileBackground = getRandomProfileColor();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        onFocus={(event) => event.target.blur()}
        asChild
      >
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage />
            <AvatarFallback className={cn("rounded-lg", profileBackground)}>
              {getProfileAlt(username)}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{username}</span>
            <span className="truncate text-xs">{email}</span>
          </div>
          <Settings />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel>My account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              navigate("/");
              signOut();
            }}
          >
            <LogOut />
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
