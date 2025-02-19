import { UsersIcon } from "lucide-react";
import { createLazyFileRoute } from "@tanstack/react-router";

import { ContentLayout } from "~/components/layouts/content-layout";
import { Topbar } from "~/components/layouts/topbar";
import { MembersList } from "~/features/members/components/members-list";
import { useTranslation } from "@synergy/i18n";

export const Route = createLazyFileRoute("/(app)/groups/$groupId/admin/members")({
  component: () => {
    const { groupId } = Route.useParams();

    const { t } = useTranslation();
    return (
      <>
        <Topbar
          title={t("member.manage")}
          icon={<UsersIcon size={16} />}
        />
        <ContentLayout>
          <MembersList groupId={groupId} />
        </ContentLayout>
      </>
    );
  },
});
