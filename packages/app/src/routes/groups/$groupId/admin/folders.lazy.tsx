import { FolderIcon } from "lucide-react";
import { createLazyFileRoute } from "@tanstack/react-router";

import { FoldersList } from "@synergy/features/folders";

import { Header } from "~/components/layouts/header";
import { Content } from "~/components/layouts/content";

export const Route = createLazyFileRoute("/groups/$groupId/admin/folders")({
  component: () => {
    const { groupId } = Route.useParams();
    return (
      <>
        <Header>
          <FolderIcon size={16} />
          Manage folders
        </Header>
        <Content>
          <FoldersList groupId={groupId} />
        </Content>
      </>
    );
  },
});
