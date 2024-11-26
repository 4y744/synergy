"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { ComponentProps } from "react";
import { NavChats } from "./nav-chats";
import { NavGroups } from "./nav-groups";
import { NavUser } from "./nav-user";
import { NavAdmin } from "./nav-admin";

type Props = ComponentProps<typeof Sidebar>;

export const AppSidebar = (props: Props) => {
  return (
    <Sidebar
      {...props}
      variant="sidebar"
    >
      <SidebarHeader>
        <NavGroups />
      </SidebarHeader>
      <SidebarContent>
        <NavAdmin />
        <NavChats />
        {/* <NavFolders /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
};
