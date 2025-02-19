import { FolderIcon } from "lucide-react";
import { createLazyFileRoute } from "@tanstack/react-router";

import { ContentLayout } from "~/components/layouts/content-layout";
import { Topbar } from "~/components/layouts/topbar";
import { FoldersList } from "~/features/folders/components/folders-list";
import { useTranslation } from "@synergy/i18n";

export const Route = createLazyFileRoute("/(app)/groups/$groupId/admin/folders")({
  component: () => {
    const { groupId } = Route.useParams();

    const { t } = useTranslation();
    return (
      <>
        <Topbar
          title={t("folder.manage")}
          icon={<FolderIcon size={16} />}
        />
        <ContentLayout>
          <FoldersList groupId={groupId} />
        </ContentLayout>
      </>
    );
  },
});
