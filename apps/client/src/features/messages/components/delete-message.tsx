import { ReactNode, useState } from "react";
import { Loader2 } from "lucide-react";

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
import { useTranslation } from "@synergy/i18n";

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

  const { mutateAsync: deleteMessage, isPending } = useDeleteMessage(
    groupId,
    chatId,
    messageId
  );

  const { t } = useTranslation();

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("message.delete")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("message.delete_desc")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("generic.cancel")}</AlertDialogCancel>
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
                {t("generic.deleting")}
              </>
            ) : (
              t("generic.delete")
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
