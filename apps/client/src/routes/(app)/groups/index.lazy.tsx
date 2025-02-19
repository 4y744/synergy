import { createLazyFileRoute } from "@tanstack/react-router";

import { Button, Muted } from "@synergy/ui";

import { ContentLayout } from "~/components/layouts/content-layout";
import { Topbar } from "~/components/layouts/topbar";
import { CreateGroupDialog } from "~/features/groups/components/create-group";
import { CreateMemberDialog } from "~/features/members/components/create-member";
import { useTranslation } from "@synergy/i18n";

export const Route = createLazyFileRoute("/(app)/groups/")({
  component: () => {
    const { t } = useTranslation();

    return (
      <>
        <Topbar />
        <ContentLayout isCentered>
          <Muted>{t("misc.no_chats")}</Muted>
          <div>
            <CreateGroupDialog>
              <Button variant="link">{t("group.create")}</Button>
            </CreateGroupDialog>
            /
            <CreateMemberDialog>
              <Button variant="link">{t("group.join")}</Button>
            </CreateMemberDialog>
          </div>
        </ContentLayout>
      </>
    );
  },
});
