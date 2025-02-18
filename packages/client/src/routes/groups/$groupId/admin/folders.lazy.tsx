import { FolderIcon } from "lucide-react";
import { createLazyFileRoute } from "@tanstack/react-router";

import { FoldersList } from "@synergy/features/folders";

import { ContentLayout } from "~/components/layouts/content-layout";
import { Topbar } from "~/components/layouts/topbar";

export const Route = createLazyFileRoute("/groups/$groupId/admin/folders")({
  component: () => {
    const { groupId } = Route.useParams();
    return (
      <>
        <Topbar
          title="Manage folders"
          icon={<FolderIcon size={16} />}
        />
        <ContentLayout>
          <FoldersList groupId={groupId} />
        </ContentLayout>
      </>
    );
  },
});
