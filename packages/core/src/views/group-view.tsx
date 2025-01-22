import { loadAuth } from "@synergy/features/auth";
import { loadGroups } from "@synergy/features/groups";
import { SidebarInset, SidebarProvider } from "@synergy/ui";
import { Outlet, redirect } from "@tanstack/react-router";
import { AppSidebar } from "~/layouts/app-sidebar";
import { Loader } from "~/types/router";

const groupLoader: Loader = async ({ context }) => {
  const { authStore, queryClient } = context;
  const { uid } = await loadAuth(authStore);
  if (!uid) {
    throw redirect({ to: "/signin" });
  }
  await loadGroups(queryClient);
};

const GroupView = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
};

export const groupRouteOptions = {
  beforeLoad: groupLoader,
  component: GroupView,
};
