import { FolderIcon } from "lucide-react";
import { createLazyFileRoute, Navigate } from "@tanstack/react-router";

import { FilesList } from "~/features/files/components/files-list";
import { useFolder } from "~/features/folders/hooks/use-folder";
import { ContentLayout } from "~/components/layouts/content-layout";
import { Header } from "~/components/layouts/header";

export const Route = createLazyFileRoute(
  "/(app)/groups/$groupId/folders/$folderId"
)({
  component: () => {
    const { groupId, folderId } = Route.useParams();
    const { data: folder } = useFolder(groupId, folderId);

    if (!folder) {
      return (
        <Navigate
          to="/groups/$groupId"
          params={{ groupId }}
        />
      );
    }

    return (
      <ContentLayout>
        <Header
          title={folder?.name}
          icon={<FolderIcon size={16} />}
        />
        <FilesList
          groupId={groupId}
          folderId={folderId}
        />
      </ContentLayout>
    );
  },
});
