import { AppSidebar } from "@/features/groups/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export const Component = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SidebarTrigger />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
};
