import { createLazyFileRoute } from "@tanstack/react-router";

import { useTranslation } from "react-i18next";
import { Button, Muted } from "@synergy/ui";

import { ContentLayout } from "~/components/layouts/content-layout";
import { CreateGroupDialog } from "~/features/groups/components/create-group";
import { CreateMemberDialog } from "~/features/members/components/create-member";

export const Route = createLazyFileRoute("/(app)/groups/")({
  component: () => {
    const { t } = useTranslation();
    return (
      <ContentLayout isCentered>
        <Muted>{t("client.misc.no_chats")}</Muted>
        <div>
          <CreateGroupDialog>
            <Button variant="link">{t("client.feature.group.create")}</Button>
          </CreateGroupDialog>
          /
          <CreateMemberDialog>
            <Button variant="link">{t("client.feature.group.join")}</Button>
          </CreateMemberDialog>
        </div>
      </ContentLayout>
    );
  },
});
