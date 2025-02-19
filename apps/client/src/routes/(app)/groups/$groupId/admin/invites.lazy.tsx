import { MailPlusIcon } from "lucide-react";
import { createLazyFileRoute } from "@tanstack/react-router";

import { ContentLayout } from "~/components/layouts/content-layout";
import { Topbar } from "~/components/layouts/topbar";
import { InvitesList } from "~/features/invites/components/invites-list";
import { useTranslation } from "@synergy/i18n";

export const Route = createLazyFileRoute("/(app)/groups/$groupId/admin/invites")({
  component: () => {
    const { groupId } = Route.useParams();
    const { t } = useTranslation();
    return (
      <>
        <Topbar
          title={t("invite.manage")}
          icon={<MailPlusIcon size={16} />}
        />
        <ContentLayout>
          <InvitesList groupId={groupId} />
        </ContentLayout>
      </>
    );
  },
});
