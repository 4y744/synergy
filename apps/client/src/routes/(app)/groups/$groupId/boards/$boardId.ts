import { createFileRoute } from "@tanstack/react-router";

import { getTasksOptions } from "~/features/tasks/api/get-tasks";

export const Route = createFileRoute("/(app)/groups/$groupId/boards/$boardId")({
  beforeLoad: ({ context, params }) => {
    const { queryClient } = context;
    const { groupId, boardId } = params;
    return queryClient.ensureQueryData({
      ...getTasksOptions(queryClient, groupId, boardId),
    });
  },
});
