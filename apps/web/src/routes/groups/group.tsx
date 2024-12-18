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
import { cn } from "@/utils/cn";
import { Muted } from "@/components/ui/typography";
import { prefetchChats } from "@/features/chats/api/prefetch-chats";

export const loader: Loader = async ({ args, queryClient, authStore }) => {
  await authenticate(authStore);
  if (!authStore.getState().isSignedIn) {
    return redirect("/signin");
  }
  await prefetchGroups(authStore.getState().uid, queryClient);
  if (args.params.groupId) {
    await prefetchChats(args.params.groupId, queryClient);
  }
  return null;
};

export default () => {
  const { groupId } = useParams();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SidebarTrigger />
        <Link to="/">to home page</Link>
        {groupId ? (
          <Outlet />
        ) : (
          <div
            className={cn("w-full h-full", "flex justify-center items-center")}
          >
            <Muted>Join or create a group.</Muted>
          </div>
        )}
      </SidebarInset>
    </SidebarProvider>
  );
};
