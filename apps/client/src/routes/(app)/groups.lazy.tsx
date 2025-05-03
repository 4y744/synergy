import { useEffect } from "react";
import {
  createLazyFileRoute,
  Outlet,
  useNavigate,
  useParams,
} from "@tanstack/react-router";

import { SidebarInset, SidebarProvider } from "@synergy/ui";

import { HeaderProvider } from "~/components/layouts/header";
import { AppSidebar } from "~/components/layouts/sidebar";

import { ProtectedRoute } from "~/features/auth/components/protected-route";
import { useGroups } from "~/features/groups/api/get-group";

export const Route = createLazyFileRoute("/(app)/groups")({
  component: () => {
    const { groupId } = useParams({ strict: false });
    const navigate = useNavigate();

    const groups = useGroups();

    useEffect(() => {
      if (!groupId && groups.length > 0 && !groups[0].isPending) {
        navigate({
          to: "/groups/$groupId",
          params: { groupId: groups[0].data!.id },
        });
      }
    });

    return (
      <ProtectedRoute>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <HeaderProvider>
              <Outlet />
            </HeaderProvider>
          </SidebarInset>
        </SidebarProvider>
      </ProtectedRoute>
    );
  },
});
