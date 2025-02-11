import { HashIcon } from "lucide-react";
import { createLazyFileRoute } from "@tanstack/react-router";

import { ChatsList } from "@synergy/features/chats";

import { Header } from "~/components/layouts/header";
import { Content } from "~/components/layouts/content";

export const Route = createLazyFileRoute("/groups/$groupId/admin/chats")({
  component: () => {
    const { groupId } = Route.useParams();
    return (
      <>
        <Header>
          <HashIcon size={16} />
          Manage chats
        </Header>
        <Content>
          <ChatsList groupId={groupId} />
        </Content>
      </>
    );
  },
});
