import { createFileRoute } from "@tanstack/react-router";
import { getFilesOptions } from "~/features/files/api/get-files";

export const Route = createFileRoute("/(app)/groups/$groupId/folders/$folderId")({
  beforeLoad: ({ context, params }) => {
    const { queryClient } = context;
    const { groupId, folderId } = params;
    return queryClient.ensureQueryData({
      ...getFilesOptions(queryClient, groupId, folderId),
    });
  },
});
