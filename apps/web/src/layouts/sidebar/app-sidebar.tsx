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
import { useParams } from "react-router-dom";

type Props = Readonly<ComponentProps<typeof Sidebar>>;

export const AppSidebar = (props: Props) => {
  const { groupId } = useParams();
  return (
    <Sidebar
      {...props}
      variant="sidebar"
    >
      <SidebarHeader>
        <NavGroups />
      </SidebarHeader>
      <SidebarContent>
        {groupId && (
          <>
            <NavAdmin />
            <NavChats />
          </>
        )}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
};
