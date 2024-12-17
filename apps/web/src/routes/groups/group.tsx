import { Outlet, redirect, useParams } from "react-router-dom";
import { prefetchGroups } from "@/features/groups/api/prefetch-groups";
import { Loader } from "@/types/router";
import { Link } from "lucide-react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/layouts/sidebar/app-sidebar";
import { authenticate } from "@/features/auth/api/authenticate";

export const loader: Loader = async ({ queryClient, authStore }) => {
  await authenticate(authStore);
  if (!authStore.getState().isSignedIn) {
    return redirect("/signin");
  }
  await prefetchGroups(authStore.getState().uid, queryClient);
  return null;
};

export default () => {
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
