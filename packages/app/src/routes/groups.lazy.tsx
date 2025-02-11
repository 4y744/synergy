import { createLazyFileRoute, Outlet } from "@tanstack/react-router";

import { SidebarInset, SidebarProvider } from "@synergy/ui";

import { AppSidebar } from "~/components/layouts/sidebar";

export const Route = createLazyFileRoute("/groups")({
  component: () => {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    );
  },
});
