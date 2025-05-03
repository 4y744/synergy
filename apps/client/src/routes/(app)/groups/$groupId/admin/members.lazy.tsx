import { useTranslation } from "react-i18next";
import { createLazyFileRoute } from "@tanstack/react-router";
import { UsersIcon } from "lucide-react";

import { MembersList } from "~/features/members/components/members-list";
import { ContentLayout } from "~/components/layouts/content-layout";
import { Header } from "~/components/layouts/header";

export const Route = createLazyFileRoute(
  "/(app)/groups/$groupId/admin/members"
)({
  component: () => {
    const { groupId } = Route.useParams();
    const { t } = useTranslation();

    return (
      <ContentLayout>
        <Header
          title={t("client.sidebar.category.members")}
          icon={<UsersIcon size={16} />}
        />
        <MembersList groupId={groupId} />
      </ContentLayout>
    );
  },
});
