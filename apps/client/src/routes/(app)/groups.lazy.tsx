import {
  createLazyFileRoute,
  Navigate,
  Outlet,
  useParams,
} from "@tanstack/react-router";

import { SidebarInset, SidebarProvider } from "@synergy/ui";

import { AppSidebar } from "~/components/layouts/sidebar";
import { useGroups } from "~/features/groups/hooks/use-groups";
import { ProtectedRoute } from "~/features/auth/components/protected-route";

export const Route = createLazyFileRoute("/(app)/groups")({
  component: () => {
    const { groupId } = useParams({ strict: false });
    const groups = useGroups();

    if (!groupId && groups.length > 0 && !groups[0].isPending) {
      return (
        <Navigate
          to="/groups/$groupId"
          params={{ groupId: groups[0].data!.id }}
        />
      );
    }

    return (
      <ProtectedRoute>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="relative">
            <Outlet />
          </SidebarInset>
        </SidebarProvider>
      </ProtectedRoute>
    );
  },
});
