import { AppSidebar } from "@/layouts/sidebar/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { queryClient } from "@/libs/react-query";
import { authenticate } from "@/features/auth/api/authenticate";

export const loader = async () => {
  const auth = await authenticate();
  const uid = auth.uid;
  return queryClient.ensureQueryData({
    queryKey: ["groups", uid],
    queryFn: () => [],
  });
};

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
