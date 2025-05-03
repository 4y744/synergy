import { useTranslation } from "react-i18next";
import { createLazyFileRoute } from "@tanstack/react-router";
import { MailPlusIcon } from "lucide-react";

import { InvitesList } from "~/features/invites/components/invites-list";
import { ContentLayout } from "~/components/layouts/content-layout";
import { Header } from "~/components/layouts/header";

export const Route = createLazyFileRoute(
  "/(app)/groups/$groupId/admin/invites"
)({
  component: () => {
    const { groupId } = Route.useParams();
    const { t } = useTranslation();

    return (
      <ContentLayout>
        <Header
          title={t("client.sidebar.category.invites")}
          icon={<MailPlusIcon size={16} />}
        />
        <InvitesList groupId={groupId} />
      </ContentLayout>
    );
  },
});
