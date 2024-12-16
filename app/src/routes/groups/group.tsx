import { Outlet, useParams } from "react-router-dom";
import { prefetchGroups } from "@/features/groups/api/prefetch-groups";
import { DataLoader } from "@/types/router";
import { Link } from "lucide-react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/layouts/sidebar/app-sidebar";

export const loader: DataLoader = async ({ queryClient, authStore }) => {
  await new Promise((resolve) => {
    const unsubscribe = authStore.subscribe(
      (state) => state.isInitialized,
      (isInitialized) => {
        if (isInitialized) {
          resolve(null);
          unsubscribe();
        }
      },
      { fireImmediately: true }
    );
  });
  await prefetchGroups(authStore.getState().uid, queryClient);
  return null;
};

export default () => {
  const { groupId } = useParams();

  if (!groupId) {
    return <></>;
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SidebarTrigger />
        <Link to="/">to home page</Link>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
};
