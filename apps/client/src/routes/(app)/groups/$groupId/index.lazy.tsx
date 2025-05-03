import { useTranslation } from "react-i18next";
import { createLazyFileRoute } from "@tanstack/react-router";

import { Muted } from "@synergy/ui";

import { Header } from "~/components/layouts/header";
import { ContentLayout } from "~/components/layouts/content-layout";

import { useGroup } from "~/features/groups/api/get-group";

export const Route = createLazyFileRoute("/(app)/groups/$groupId/")({
  component: () => {
    const { groupId } = Route.useParams();
    const { t } = useTranslation();

    const { data: group } = useGroup(groupId);

    return (
      <ContentLayout isCentered>
        <Header title={group?.name} />
        <Muted>{t("client.misc.no_chats")}</Muted>
      </ContentLayout>
    );
  },
});
