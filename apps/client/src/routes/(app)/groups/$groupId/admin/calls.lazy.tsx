import { useTranslation } from "react-i18next";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Volume2Icon } from "lucide-react";

import { ContentLayout } from "~/components/layouts/content-layout";
import { Header } from "~/components/layouts/header";
import { CallsList } from "~/features/calls/components/calls-list";

export const Route = createLazyFileRoute("/(app)/groups/$groupId/admin/calls")({
  component: () => {
    const { groupId } = Route.useParams();
    const { t } = useTranslation();

    return (
      <ContentLayout>
        <Header
          title={t("client.sidebar.category.calls")}
          icon={<Volume2Icon size={16} />}
        />
        <CallsList groupId={groupId} />
      </ContentLayout>
    );
  },
});
