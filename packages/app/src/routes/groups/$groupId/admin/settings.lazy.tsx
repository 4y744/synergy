import { DeleteGroupDialog, UpdateGroupForm } from "@synergy/features/groups";
import { Button, H1, Page } from "@synergy/ui";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/groups/$groupId/admin/settings")({
  component: () => {
    const { groupId } = Route.useParams();
    return (
      <Page>
        <H1>Settings</H1>
        <UpdateGroupForm groupId={groupId} />
        <DeleteGroupDialog groupId={groupId}>
          <Button variant="destructive">Delete group</Button>
        </DeleteGroupDialog>
      </Page>
    );
  },
});
