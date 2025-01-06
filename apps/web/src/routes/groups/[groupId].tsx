import { Outlet, redirect, useParams } from "react-router-dom";

import { CustomLoaderData } from "~/core/router";

import {
  SidebarInset,
  SidebarProvider,
  Muted,
  ThemeProvider,
} from "@synergy/ui";

import { loadAuth } from "@synergy/features/auth";
import { loadGroups } from "@synergy/features/groups";

import { loadChats } from "@synergy/features/chats";

import { cn } from "@synergy/utils";

import { CustomLoader } from "@synergy/libs/react-router";

import { AppSidebar } from "@synergy/core";

export const loader: CustomLoader<CustomLoaderData> = async ({
  params,
  queryClient,
  authStore,
}) => {
  await loadAuth(authStore);
  if (!authStore.getState().isSignedIn) {
    return redirect("/signin");
  }

  const { uid } = authStore.getState();
  await loadGroups(uid, queryClient);

  if (params.groupId) {
    loadChats(params.groupId, queryClient);
  }
};

export default () => {
  const { groupId } = useParams();

  return (
    <ThemeProvider defaultTheme="dark">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          {groupId ? (
            <Outlet />
          ) : (
            <div
              className={cn(
                "w-full h-full",
                "flex justify-center items-center"
              )}
            >
              <Muted>Join or create a group</Muted>
            </div>
          )}
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
};
