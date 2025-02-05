import { createLazyFileRoute } from "@tanstack/react-router";
import { H1, Page } from "@synergy/ui";
import { MembersList } from "@synergy/features/members";

export const Route = createLazyFileRoute("/groups/$groupId/admin/members")({
  component: () => {
    const { groupId } = Route.useParams();
    return (
      <Page>
        <H1>Members</H1>
        <MembersList groupId={groupId} />
      </Page>
    );
  },
});
