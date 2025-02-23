import { createLazyFileRoute, Navigate } from "@tanstack/react-router";

import { CLIENT_URL } from "~/config/env";

import { ContentLayout } from "~/components/layouts/content-layout";
import { LoadingFallback } from "~/components/loading-fallback";

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
        <LoadingFallback />
      </ContentLayout>
    );
  },
});
