import { useEffect } from "react";
import {
  createLazyFileRoute,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";

import { useGroups } from "~/features/groups/api/get-group";
import { useChats } from "~/features/chats/api/get-chats";

export const Route = createLazyFileRoute("/(app)/groups/$groupId")({
  component: () => {
    const { groupId } = Route.useParams();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const groups = useGroups();
    const { data: chats } = useChats(groupId);

    // Try to redirect to the first chat if nothing is active.
    useEffect(() => {
      if (pathname.split("/").length < 4 && chats && chats.length > 0) {
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
