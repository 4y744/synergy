import { HashIcon } from "lucide-react";
import { createLazyFileRoute } from "@tanstack/react-router";

import { ContentLayout } from "~/components/layouts/content-layout";
import { Topbar } from "~/components/layouts/topbar";
import { ChatsList } from "~/features/chats/components/chats-list";
import { useTranslation } from "@synergy/i18n";

export const Route = createLazyFileRoute("/(app)/groups/$groupId/admin/chats")({
  component: () => {
    const { groupId } = Route.useParams();
    const { t } = useTranslation();
    return (
      <>
        <Topbar
          title={t("chat.manage")}
          icon={<HashIcon size={16} />}
        />
        <ContentLayout>
          <ChatsList groupId={groupId} />
        </ContentLayout>
      </>
    );
  },
});
