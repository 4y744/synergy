import { createLazyFileRoute, Outlet } from "@tanstack/react-router";
import { SidebarLayout } from "~/components/layouts/sidebar";

export const Route = createLazyFileRoute("/groups")({
  component: () => {
    return (
      <SidebarLayout>
        <Outlet />
      </SidebarLayout>
    );
  },
});
