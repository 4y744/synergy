import { Fragment } from "react/jsx-runtime";
import { useTranslation } from "react-i18next";
import { MoreHorizontalIcon, PlusIcon } from "lucide-react";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@synergy/ui";

import { useTasks } from "../api/get-tasks";
import { CreateTaskDialog } from "./create-task";
import { UpdateTaskDialog } from "./update-task";
import { DeleteTaskDialog } from "./delete-task";

import { useUser } from "~/features/users/api/get-user";
import { useAuth } from "~/features/auth/hooks/use-auth";
import { useGroup } from "~/features/groups/api/get-group";

type TasksListProps = Readonly<{
  groupId: string;
  boardId: string;
}>;

export const TasksList = ({ groupId, boardId }: TasksListProps) => {
  const { t } = useTranslation();
  const { uid } = useAuth();

  const { data: tasks } = useTasks(groupId, boardId);
  const { data: group } = useGroup(groupId);

  return (
    <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4 auto-rows-fr">
      {tasks?.map(
        ({ id, name, description, assignedTo, createdAt, createdBy }) => (
          <div
            className="border border-border rounded-md p-4"
            key={id}
          >
            <div className="flex items-center">
              <span className="text-lg font-bold mr-auto w-3/4 truncate">
                {name}
              </span>
              {(uid == createdBy || uid == group?.createdBy) && (
                <DropdownMenu>
                  <DropdownMenuTrigger className="hover:bg-secondary rounded-md focus:outline-none">
                    <MoreHorizontalIcon
                      className="p-2"
                      size={32}
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuGroup>
                      <UpdateTaskDialog
                        groupId={groupId}
                        boardId={boardId}
                        taskId={id}
                      >
                        <DropdownMenuItem
                          onSelect={(event) => event.preventDefault()}
                        >
                          {t("client.action.edit")}
                        </DropdownMenuItem>
                      </UpdateTaskDialog>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DeleteTaskDialog
                        groupId={groupId}
                        boardId={boardId}
                        taskId={id}
                      >
                        <DropdownMenuItem
                          onSelect={(event) => event.preventDefault()}
                        >
                          {t("client.action.delete")}
                        </DropdownMenuItem>
                      </DeleteTaskDialog>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
            {assignedTo.length > 0 && (
              <div className="text-xs text-muted-foreground">
                <span>{t("client.feature.task.assigned_to")} </span>
                <span className="font-medium">
                  {assignedTo.map((uid, index) => (
                    <Fragment key={uid}>
                      {index ? ", " : ""}
                      <MemberName uid={uid} />
                    </Fragment>
                  ))}
                </span>
              </div>
            )}
            <div className="text-xs text-muted-foreground">
              <span>{t("client.feature.task.created_by")} </span>
              <span className="font-medium">
                <MemberName uid={createdBy} />
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              <span>{t("client.feature.task.created_at")} </span>
              <span className="font-medium">{createdAt.toLocaleString()}</span>
            </div>
            <p className="text-xs text-justify overflow-hidden mt-2">
              {description}
            </p>
          </div>
        )
      )}
      <CreateTaskDialog
        groupId={groupId}
        boardId={boardId}
      >
        <Button
          className="w-full h-full min-h-64"
          variant="outline"
        >
          <PlusIcon />
        </Button>
      </CreateTaskDialog>
    </div>
  );
};
TasksList.displayName = "TasksList";

// We need this, because "member" queries only come with a uid.
const MemberName = ({ uid }: { uid: string }) => {
  const { data: user, isPending } = useUser(uid);

  if (isPending) {
    return <></>;
  }

  return <>{user!.username}</>;
};
MemberName.displayName = "TasksList:MemberName";
