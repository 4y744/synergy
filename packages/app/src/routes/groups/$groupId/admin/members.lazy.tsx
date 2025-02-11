import { UsersIcon } from "lucide-react";
import { createLazyFileRoute } from "@tanstack/react-router";

import { MembersList } from "@synergy/features/members";

import { Header } from "~/components/layouts/header";
import { Content } from "~/components/layouts/content";

export const Route = createLazyFileRoute("/groups/$groupId/admin/members")({
  component: () => {
    const { groupId } = Route.useParams();
    return (
      <>
        <Header>
          <UsersIcon size={16} />
          Manage members
        </Header>
        <Content>
          <MembersList groupId={groupId} />
        </Content>
      </>
    );
  },
});
