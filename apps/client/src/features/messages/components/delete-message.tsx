import { ReactNode, useState } from "react";
import { Loader2 } from "lucide-react";

import { useTranslation } from "react-i18next";

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

import { useDeleteMessage } from "../hooks/use-delete-message";

type DeleteMessageDialogProps = Readonly<{
  children?: ReactNode;
  groupId: string;
  chatId: string;
  messageId: string;
}>;

export const DeleteMessageDialog = ({
  children,
  groupId,
  chatId,
  messageId,
}: DeleteMessageDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const { mutateAsync: deleteMessage, isPending } = useDeleteMessage(
    groupId,
    chatId,
    messageId
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
            {t("client.feature.message.delete")}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t("client.feature.message.delete_desc")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("client.action.cancel")}</AlertDialogCancel>
          <Button
            onClick={() => {
              deleteMessage().then(() => setIsOpen(false));
            }}
            disabled={isPending}
            variant="destructive"
          >
            {isPending ? (
              <>
                <Loader2 className="animate-spin" />
                {t("client.action.deleting")}
              </>
            ) : (
              t("client.action.delete")
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
