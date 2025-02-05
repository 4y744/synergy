import { CreateInviteDialog, InvitesList } from "@synergy/features/invites";
import { Button, H1, Page } from "@synergy/ui";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/groups/$groupId/admin/invites")({
  component: () => {
    const { groupId } = Route.useParams();

    return (
      <Page>
        <H1>Invites</H1>
        <InvitesList groupId={groupId} />
        <CreateInviteDialog groupId={groupId}>
          <Button>Create invite</Button>
        </CreateInviteDialog>
      </Page>
    );
  },
});
