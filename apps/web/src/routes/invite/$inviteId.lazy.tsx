import { createLazyFileRoute, Navigate } from "@tanstack/react-router";
import { CLIENT_URL } from "~/config/env";

export const Route = createLazyFileRoute("/invite/$inviteId")({
  component: () => {
    const { inviteId } = Route.useParams();
    return (
      <Navigate
        to="/"
        href={`${CLIENT_URL}/invite/${inviteId}`}
        reloadDocument
      />
    );
  },
});
