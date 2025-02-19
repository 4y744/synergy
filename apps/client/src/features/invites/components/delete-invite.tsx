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

import { useDeleteInvite } from "../hooks/use-delete-invite";

type DeleteInviteDialogProps = Readonly<{
  children?: ReactNode;
  groupId: string;
  inviteId: string;
}>;

export const DeleteInviteDialog = ({
  children,
  groupId,
  inviteId,
}: DeleteInviteDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { mutateAsync: deleteInvite, isPending } = useDeleteInvite(
    groupId,
    inviteId
  );

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete invite?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this invite?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            onClick={() => {
              deleteInvite().then(() => setIsOpen(false));
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
