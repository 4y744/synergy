"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ChevronsUpDown, Plus } from "lucide-react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AddGroup } from "./add-group";

const groups = ["English", "Bulgarian", "Math"];

export const NavGroups = () => {
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
            {groups.map((group) => (
              <DropdownMenuItem key={group}>
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="text-sm leading-tight">
                  <span className="line-clamp-2">{group}</span>
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <AddGroup />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
