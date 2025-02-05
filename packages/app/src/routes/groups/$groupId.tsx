import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { findGroupsOptions } from "@synergy/features/groups";

export const Route = createFileRoute("/groups/$groupId")({
  beforeLoad: async ({ context, params }) => {
    const { queryClient } = context;
    const groups = await queryClient.ensureQueryData(findGroupsOptions());
    if (!groups.includes(params.groupId)) {
      throw redirect({ to: "/groups" });
    }
  },
  component: () => <Outlet />,
});
