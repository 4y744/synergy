import { MailPlusIcon } from "lucide-react";
import { createLazyFileRoute } from "@tanstack/react-router";

import { InvitesList } from "@synergy/features/invites";

import { ContentLayout } from "~/components/layouts/content-layout";
import { Topbar } from "~/components/layouts/topbar";

export const Route = createLazyFileRoute("/groups/$groupId/admin/invites")({
  component: () => {
    const { groupId } = Route.useParams();
    return (
      <>
        <Topbar
          title="Manage invites"
          icon={<MailPlusIcon size={16} />}
        />
        <ContentLayout>
          <InvitesList groupId={groupId} />
        </ContentLayout>
      </>
    );
  },
});
