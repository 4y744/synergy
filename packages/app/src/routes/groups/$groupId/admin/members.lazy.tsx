import { UsersIcon } from "lucide-react";
import { createLazyFileRoute } from "@tanstack/react-router";

import { MembersList } from "@synergy/features/members";

import { ContentLayout } from "~/components/layouts/content-layout";
import { Topbar } from "~/components/layouts/topbar";

export const Route = createLazyFileRoute("/groups/$groupId/admin/members")({
  component: () => {
    const { groupId } = Route.useParams();
    return (
      <>
        <Topbar
          title="Manage members"
          icon={<UsersIcon size={16} />}
        />
        <ContentLayout>
          <MembersList groupId={groupId} />
        </ContentLayout>
      </>
    );
  },
});
