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

import { useBoard } from "../api/get-boards";
import { useDeleteBoard } from "../api/delete-board";

type DeleteBoardDialogProps = Readonly<{
  children: ReactNode;
  groupId: string;
  boardId: string;
}>;

export const DeleteBoardDialog = ({
  children,
  groupId,
  boardId,
}: DeleteBoardDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const { data: board } = useBoard(groupId, boardId);
  const { mutateAsync: deleteBoard, isPending } = useDeleteBoard(
    groupId,
    boardId
  );

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {t("client.feature.board.delete")}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t("client.feature.board.delete_desc", { name: board?.name })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("client.action.cancel")}</AlertDialogCancel>
          <Button
            onClick={() => {
              deleteBoard().then(() => setIsOpen(false));
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
DeleteBoardDialog.displayName = "DeleteBoardDialog";
