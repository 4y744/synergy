import {
  createLazyFileRoute,
  Navigate,
  Outlet,
  useLocation,
} from "@tanstack/react-router";

import { useGroups } from "@synergy/features/groups";
import { useChats } from "@synergy/features/chats";

export const Route = createLazyFileRoute("/groups/$groupId")({
  component: () => {
    const { groupId } = Route.useParams();
    const { pathname } = useLocation();

    const groups = useGroups();
    const { data: chats } = useChats(groupId);

    if (!groups.find(({ data }) => data?.id == groupId)) {
      return <Navigate to="/groups" />;
    }

    if (
      pathname.split("/").filter((value) => value).length == 2 && //very dumb
      chats &&
      chats.length > 0
    ) {
      return (
        <Navigate
          to="/groups/$groupId/chats/$chatId"
          params={{ groupId, chatId: chats[0].id }}
        />
      );
    }

    return <Outlet />;
  },
});
