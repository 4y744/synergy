import { HashIcon } from "lucide-react";
import { createLazyFileRoute } from "@tanstack/react-router";

import { ChatsList } from "@synergy/features/chats";

import { ContentLayout } from "~/components/layouts/content-layout";
import { Topbar } from "~/components/layouts/topbar";

export const Route = createLazyFileRoute("/groups/$groupId/admin/chats")({
  component: () => {
    const { groupId } = Route.useParams();
    return (
      <>
        <Topbar
          title="Manage chats"
          icon={<HashIcon size={16} />}
        />
        <ContentLayout>
          <ChatsList groupId={groupId} />
        </ContentLayout>
      </>
    );
  },
});
