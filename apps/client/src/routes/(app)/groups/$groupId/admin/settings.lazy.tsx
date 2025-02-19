import { Settings } from "lucide-react";
import { createLazyFileRoute } from "@tanstack/react-router";

import { Button } from "@synergy/ui";

import { ContentLayout } from "~/components/layouts/content-layout";
import { Topbar } from "~/components/layouts/topbar";
import { UpdateGroupForm } from "~/features/groups/components/update-group";
import { DeleteGroupDialog } from "~/features/groups/components/delete-group";
import { useTranslation } from "@synergy/i18n";

export const Route = createLazyFileRoute("/(app)/groups/$groupId/admin/settings")({
  component: () => {
    const { groupId } = Route.useParams();
    const { t } = useTranslation();
    return (
      <>
        <Topbar
          title={t("group.settings")}
          icon={<Settings size={16} />}
        />
        <ContentLayout>
          <UpdateGroupForm groupId={groupId} />
          <DeleteGroupDialog groupId={groupId}>
            <Button variant="destructive">{t("group.delete")}</Button>
          </DeleteGroupDialog>
        </ContentLayout>
      </>
    );
  },
});
