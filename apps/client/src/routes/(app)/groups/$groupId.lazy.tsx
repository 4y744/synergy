import { useEffect } from "react";
import {
  createLazyFileRoute,
  Navigate,
  Outlet,
  useNavigate,
} from "@tanstack/react-router";

import { useGroups } from "~/features/groups/hooks/use-groups";
import { useChats } from "~/features/chats/hooks/use-chats";

export const Route = createLazyFileRoute("/(app)/groups/$groupId")({
  component: () => {
    const { groupId } = Route.useParams();
    const navigate = useNavigate();

    const groups = useGroups();
    const { data: chats } = useChats(groupId);

    // Redirect to the first chat when the group changes.
    useEffect(() => {
      if (chats && chats.length > 0) {
        navigate({
          to: "/groups/$groupId/chats/$chatId",
          params: { groupId, chatId: chats[0].id },
        });
      }
    }, [groupId]);

    if (!groups.find(({ data }) => data?.id == groupId)) {
      return <Navigate to="/groups" />;
    }

    return <Outlet />;
  },
});
