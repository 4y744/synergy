"use client";

import { Folder } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const folders = ["repository 1", "repository 2", "repository 3"];

export const NavFolders = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Folders</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {folders.map((folder) => (
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Folder />
                <span>{folder}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
