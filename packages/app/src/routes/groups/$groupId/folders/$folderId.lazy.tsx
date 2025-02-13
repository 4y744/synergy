import { FolderIcon } from "lucide-react";
import { createLazyFileRoute } from "@tanstack/react-router";

import { useFolder } from "@synergy/features/folders";
import { FilesList } from "@synergy/features/files";

import { ContentLayout } from "~/components/layouts/content-layout";
import { Topbar } from "~/components/layouts/topbar";

export const Route = createLazyFileRoute("/groups/$groupId/folders/$folderId")({
  component: () => {
    const { groupId, folderId } = Route.useParams();
    const { data: folder } = useFolder(groupId, folderId);
    return (
      <>
        <Topbar
          title={folder?.name}
          icon={<FolderIcon size={16} />}
        />
        <ContentLayout>
          <FilesList
            groupId={groupId}
            folderId={folderId}
          />
        </ContentLayout>
      </>
    );
  },
});
