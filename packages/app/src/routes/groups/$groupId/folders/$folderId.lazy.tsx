import { FolderIcon } from "lucide-react";
import { createLazyFileRoute } from "@tanstack/react-router";

import { useFolder } from "@synergy/features/folders";
import { FilesList } from "@synergy/features/files";

import { Header } from "~/components/layouts/header";
import { Content } from "~/components/layouts/content";

export const Route = createLazyFileRoute("/groups/$groupId/folders/$folderId")({
  component: () => {
    const { groupId, folderId } = Route.useParams();
    const { data: folder } = useFolder(groupId, folderId);
    return (
      <>
        <Header>
          <FolderIcon size={16} />
          {folder?.name}
        </Header>
        <Content>
          <FilesList
            groupId={groupId}
            folderId={folderId}
          />
        </Content>
      </>
    );
  },
});
