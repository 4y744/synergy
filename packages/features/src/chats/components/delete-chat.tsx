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

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete chat?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete {chat?.name}?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
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
                Deleting
              </>
            ) : (
              <>Delete</>
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
