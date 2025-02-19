import { createLazyFileRoute } from "@tanstack/react-router";

import { Muted } from "@synergy/ui";

import { ContentLayout } from "~/components/layouts/content-layout";
import { Topbar } from "~/components/layouts/topbar";
import { useGroup } from "~/features/groups/hooks/use-group";
import { useTranslation } from "@synergy/i18n";

export const Route = createLazyFileRoute("/(app)/groups/$groupId/")({
  component: () => {
    const { groupId } = Route.useParams();
    const { data: group } = useGroup(groupId);

    const { t } = useTranslation();

    return (
      <>
        <Topbar title={group?.name} />
        <ContentLayout isCentered>
          <Muted>{t("misc.no_chats")}</Muted>
        </ContentLayout>
      </>
    );
  },
});
