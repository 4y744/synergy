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

import { useChat } from "../api/get-chats";
import { useDeleteChat } from "../api/delete-chat";

type DeleteChatDialogProps = Readonly<{
  children: ReactNode;
  groupId: string;
  chatId: string;
}>;

export const DeleteChatDialog = ({
  children,
  groupId,
  chatId,
}: DeleteChatDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const { data: chat } = useChat(groupId, chatId);
  const { mutateAsync: deleteChat, isPending } = useDeleteChat(groupId, chatId);

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("client.feature.chat.delete")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("client.feature.chat.delete_desc", { name: chat?.name })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("client.action.cancel")}</AlertDialogCancel>
          <Button
            onClick={() => {
              deleteChat().then(() => setIsOpen(false));
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
DeleteChatDialog.displayName = "DeleteChatDialog";
