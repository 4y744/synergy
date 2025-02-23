import { createLazyFileRoute } from "@tanstack/react-router";
import { HashIcon } from "lucide-react";

import { useTranslation } from "react-i18next";

import { ChatsList } from "~/features/chats/components/chats-list";
import { ContentLayout } from "~/components/layouts/content-layout";
import { Header } from "~/components/layouts/header";

export const Route = createLazyFileRoute("/(app)/groups/$groupId/admin/chats")({
  component: () => {
    const { groupId } = Route.useParams();
    const { t } = useTranslation();

    return (
      <ContentLayout>
        <Header
          title={t("client.sidebar.category.chats")}
          icon={<HashIcon size={16} />}
        />
        <ChatsList groupId={groupId} />
      </ContentLayout>
    );
  },
});
