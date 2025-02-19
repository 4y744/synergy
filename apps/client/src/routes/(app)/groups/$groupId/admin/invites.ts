import { createFileRoute } from "@tanstack/react-router";
import { getInvitesOptions } from "~/features/invites/api/get-invites";

export const Route = createFileRoute("/(app)/groups/$groupId/admin/invites")({
  beforeLoad: async ({ params, context }) => {
    const { queryClient } = context;
    const { groupId } = params;
    await queryClient.ensureQueryData(getInvitesOptions(queryClient, groupId));
  },
});
