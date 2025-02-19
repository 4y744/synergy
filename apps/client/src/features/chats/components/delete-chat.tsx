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

import { useChat } from "../hooks/use-chat";
import { useDeleteChat } from "../hooks/use-delete-chat";
import { useTranslation } from "@synergy/i18n";

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

  const { data: chat } = useChat(groupId, chatId);
  const { mutateAsync: deleteChat, isPending } = useDeleteChat(groupId, chatId);

  const { t } = useTranslation();

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("chat.delete")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("chat.delete_desc", { name: chat?.name })}
            <span className="font-medium"> #{chat?.name}</span>?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("generic.cancel")}</AlertDialogCancel>
          <Button
            onClick={() => {
              deleteChat().then(() => setIsOpen(false));
            }}
            disabled={isPending}
            variant="destructive"
          >
            {isPending ? (
              <>
                <Loader2 className="animate-spin" />
                {t("generic.delete")}
              </>
            ) : (
              t("generic.deleting")
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
