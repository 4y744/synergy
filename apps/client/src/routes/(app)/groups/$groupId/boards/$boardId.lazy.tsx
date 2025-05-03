import { createLazyFileRoute, Navigate } from "@tanstack/react-router";
import { ClipboardListIcon } from "lucide-react";

import { ContentLayout } from "~/components/layouts/content-layout";
import { Header } from "~/components/layouts/header";

import { useBoard } from "~/features/boards/api/get-boards";
import { TasksList } from "~/features/tasks/components/tasks-list";

export const Route = createLazyFileRoute(
  "/(app)/groups/$groupId/boards/$boardId"
)({
  component: () => {
    const { groupId, boardId } = Route.useParams();
    const { data: board } = useBoard(groupId, boardId);

    if (!board) {
      return (
        <Navigate
          to="/groups/$groupId"
          params={{ groupId }}
        />
      );
    }

    return (
      <ContentLayout>
        <Header
          title={board?.name}
          icon={<ClipboardListIcon size={16} />}
        />
        <TasksList
          groupId={groupId}
          boardId={boardId}
        />
      </ContentLayout>
    );
  },
});
