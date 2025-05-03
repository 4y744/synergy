import { createLazyFileRoute, Navigate } from "@tanstack/react-router";
import { Loader2Icon } from "lucide-react";

import { ContentLayout } from "~/components/layouts/content-layout";
import { CLIENT_URL } from "~/config/env";

export const Route = createLazyFileRoute("/invite/$inviteId")({
  component: () => {
    const { inviteId } = Route.useParams();
    return (
      <ContentLayout isCentered>
        <Navigate
          to="/"
          href={`${CLIENT_URL}/invite/${inviteId}`}
          reloadDocument
        />
        <Loader2Icon
          className="animate-spin"
          size={48}
        />
      </ContentLayout>
    );
  },
});
