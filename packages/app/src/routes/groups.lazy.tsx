import { useGroups } from "@synergy/features/groups";
import { SidebarInset, SidebarProvider } from "@synergy/ui";
import {
  createLazyFileRoute,
  Navigate,
  Outlet,
  useParams,
} from "@tanstack/react-router";
import { AppSidebar } from "~/components/layouts/sidebar";

export const Route = createLazyFileRoute("/groups")({
  component: () => {
    const { groupId } = useParams({ strict: false });
    const groups = useGroups();

    if (!groupId && groups.length > 0 && groups[0]?.data) {
      return (
        <Navigate
          to="/groups/$groupId"
          params={{ groupId: groups[0].data!.id }}
        />
      );
    }

    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="relative">
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    );
  },
});
