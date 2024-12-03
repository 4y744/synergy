import { AppSidebar } from "@/layouts/sidebar/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { authenticate } from "@/features/auth/api/authenticate";
import { groupsLoader } from "@/features/groups/api/groups-loader";
import { DataLoader } from "@/types/router";

export const loader: DataLoader = async (_, queryClient) => {
  const auth = await authenticate();
  return await groupsLoader(auth.uid, queryClient);
};

export default () => {
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
