import { useTranslation } from "react-i18next";
import { createLazyFileRoute } from "@tanstack/react-router";
import { ClipboardListIcon } from "lucide-react";

import { ContentLayout } from "~/components/layouts/content-layout";
import { Header } from "~/components/layouts/header";
import { BoardsList } from "~/features/boards/components/boards-list";

export const Route = createLazyFileRoute("/(app)/groups/$groupId/admin/boards")(
  {
    component: () => {
      const { groupId } = Route.useParams();
      const { t } = useTranslation();

      return (
        <ContentLayout>
          <Header
            title={t("client.sidebar.category.boards")}
            icon={<ClipboardListIcon size={16} />}
          />
          <BoardsList groupId={groupId} />
        </ContentLayout>
      );
    },
  }
);
