import { MailPlusIcon } from "lucide-react";
import { createLazyFileRoute } from "@tanstack/react-router";

import { InvitesList } from "@synergy/features/invites";

import { Header } from "~/components/layouts/header";
import { Content } from "~/components/layouts/content";

export const Route = createLazyFileRoute("/groups/$groupId/admin/invites")({
  component: () => {
    const { groupId } = Route.useParams();
    return (
      <>
        <Header>
          <MailPlusIcon size={16} />
          Manage invites
        </Header>
        <Content>
          <InvitesList groupId={groupId} />
        </Content>
      </>
    );
  },
});
