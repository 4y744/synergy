import { createLazyFileRoute } from "@tanstack/react-router";

import { useGroup } from "@synergy/features/groups";
import { Muted } from "@synergy/ui";

import { ContentLayout } from "~/components/layouts/content-layout";
import { Topbar } from "~/components/layouts/topbar";

export const Route = createLazyFileRoute("/groups/$groupId/")({
  component: () => {
    const { groupId } = Route.useParams();
    const { data: group } = useGroup(groupId);
    return (
      <>
        <Topbar title={group?.name} />
        <ContentLayout isCentered>
          <Muted>Looks like there aren't any chats in this group.</Muted>
        </ContentLayout>
      </>
    );
  },
});
