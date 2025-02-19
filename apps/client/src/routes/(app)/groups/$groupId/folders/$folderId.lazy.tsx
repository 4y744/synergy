import { FolderIcon } from "lucide-react";
import { createLazyFileRoute } from "@tanstack/react-router";

import { ContentLayout } from "~/components/layouts/content-layout";
import { Topbar } from "~/components/layouts/topbar";
import { FilesList } from "~/features/files/components/files-list";
import { useFolder } from "~/features/folders/hooks/use-folder";

export const Route = createLazyFileRoute("/(app)/groups/$groupId/folders/$folderId")({
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
