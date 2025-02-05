import { ChatsList, CreateChatDialog } from "@synergy/features/chats";
import { Button, H1, Page } from "@synergy/ui";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/groups/$groupId/admin/chats")({
  component: () => {
    const { groupId } = Route.useParams();
    return (
      <Page>
        <H1>Chats</H1>
        <ChatsList groupId={groupId} />
        <CreateChatDialog groupId={groupId}>
          <Button>Create a new chat</Button>
        </CreateChatDialog>
      </Page>
    );
  },
});
