import { Settings } from "lucide-react";
import { createLazyFileRoute } from "@tanstack/react-router";

import { DeleteGroupDialog, UpdateGroupForm } from "@synergy/features/groups";
import { Button } from "@synergy/ui";

import { Header } from "~/components/layouts/header";
import { Content } from "~/components/layouts/content";

export const Route = createLazyFileRoute("/groups/$groupId/admin/settings")({
  component: () => {
    const { groupId } = Route.useParams();
    return (
      <>
        <Header>
          <Settings size={16} />
          Group settings
        </Header>
        <Content>
          <UpdateGroupForm groupId={groupId} />
          <DeleteGroupDialog groupId={groupId}>
            <Button variant="destructive">Delete group</Button>
          </DeleteGroupDialog>
        </Content>
      </>
    );
  },
});
