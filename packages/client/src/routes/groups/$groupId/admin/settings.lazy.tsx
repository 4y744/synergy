import { Settings } from "lucide-react";
import { createLazyFileRoute } from "@tanstack/react-router";

import { DeleteGroupDialog, UpdateGroupForm } from "@synergy/features/groups";
import { Button } from "@synergy/ui";

import { ContentLayout } from "~/components/layouts/content-layout";
import { Topbar } from "~/components/layouts/topbar";

export const Route = createLazyFileRoute("/groups/$groupId/admin/settings")({
  component: () => {
    const { groupId } = Route.useParams();
    return (
      <>
        <Topbar
          title="Groups settings"
          icon={<Settings size={16} />}
        />
        <ContentLayout>
          <UpdateGroupForm groupId={groupId} />
          <DeleteGroupDialog groupId={groupId}>
            <Button variant="destructive">Delete group</Button>
          </DeleteGroupDialog>
        </ContentLayout>
      </>
    );
  },
});
