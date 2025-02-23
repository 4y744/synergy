import { createFileRoute } from "@tanstack/react-router";

import { getMembersOptions } from "~/features/members/api/get-members";

export const Route = createFileRoute("/(app)/groups/$groupId/admin/members")({
  beforeLoad: async ({ params, context }) => {
    const { queryClient } = context;
    const { groupId } = params;
    await queryClient.ensureQueryData(getMembersOptions(queryClient, groupId));
  },
});
