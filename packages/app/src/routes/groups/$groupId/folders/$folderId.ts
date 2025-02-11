import { createFileRoute } from "@tanstack/react-router";
import { getFilesOptions } from "@synergy/features/files";

export const Route = createFileRoute("/groups/$groupId/folders/$folderId")({
  beforeLoad: ({ context, params }) => {
    const { queryClient } = context;
    const { groupId, folderId } = params;
    return queryClient.ensureQueryData({
      ...getFilesOptions(queryClient, groupId, folderId),
    });
  },
});
