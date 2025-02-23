import { createLazyFileRoute } from "@tanstack/react-router";
import { Settings } from "lucide-react";

import { useTranslation } from "react-i18next";
import { Button } from "@synergy/ui";

import { UpdateGroupForm } from "~/features/groups/components/update-group";
import { DeleteGroupDialog } from "~/features/groups/components/delete-group";
import { Header } from "~/components/layouts/header";
import { ContentLayout } from "~/components/layouts/content-layout";

export const Route = createLazyFileRoute(
  "/(app)/groups/$groupId/admin/settings"
)({
  component: () => {
    const { groupId } = Route.useParams();
    const { t } = useTranslation();

    return (
      <ContentLayout>
        <Header
          title={t("client.feature.group.settings")}
          icon={<Settings size={16} />}
        />
        <UpdateGroupForm groupId={groupId} />
        <DeleteGroupDialog groupId={groupId}>
          <Button variant="destructive">
            {t("client.feature.group.delete")}
          </Button>
        </DeleteGroupDialog>
      </ContentLayout>
    );
  },
});
