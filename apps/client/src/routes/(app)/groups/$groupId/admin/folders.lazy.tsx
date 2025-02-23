import { createLazyFileRoute } from "@tanstack/react-router";
import { FolderIcon } from "lucide-react";

import { useTranslation } from "react-i18next";

import { FoldersList } from "~/features/folders/components/folders-list";
import { ContentLayout } from "~/components/layouts/content-layout";
import { Header } from "~/components/layouts/header";

export const Route = createLazyFileRoute(
  "/(app)/groups/$groupId/admin/folders"
)({
  component: () => {
    const { groupId } = Route.useParams();
    const { t } = useTranslation();

    return (
      <ContentLayout>
        <Header
          title={t("client.sidebar.category.folders")}
          icon={<FolderIcon size={16} />}
        />
        <FoldersList groupId={groupId} />
      </ContentLayout>
    );
  },
});
