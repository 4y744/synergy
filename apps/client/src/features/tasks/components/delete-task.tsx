import { ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import { Loader2Icon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from "@synergy/ui";

import { useTask } from "../api/get-tasks";
import { useDeleteTask } from "../api/delete-task";

type DeleteTaskDialogProps = Readonly<{
  children: ReactNode;
  groupId: string;
  boardId: string;
  taskId: string;
}>;

export const DeleteTaskDialog = ({
  children,
  groupId,
  boardId,
  taskId,
}: DeleteTaskDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const { data: task } = useTask(groupId, boardId, taskId);
  const { mutateAsync: deleteTask, isPending } = useDeleteTask(
    groupId,
    boardId,
    taskId
  );

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("client.feature.task.delete")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("client.feature.task.delete_desc", { name: task?.name })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("client.action.cancel")}</AlertDialogCancel>
          <Button
            onClick={() => {
              deleteTask().then(() => setIsOpen(false));
            }}
            disabled={isPending}
            variant="destructive"
          >
            {isPending ? (
              <>
                <Loader2Icon className="animate-spin" />
                {t("client.action.delete")}
              </>
            ) : (
              t("client.action.deleting")
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
DeleteTaskDialog.displayName = "DeleteTaskDialog";
