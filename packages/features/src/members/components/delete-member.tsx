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

import { useDeleteMember } from "../hooks/use-delete-member";

type DeleteMemberDialogProps = Readonly<{
  children?: ReactNode;
  groupId: string;
  memberId: string;
}>;

export const DeleteMemberDialog = ({
  children,
  groupId,
  memberId,
}: DeleteMemberDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { mutateAsync: deleteMember, isPending } = useDeleteMember(
    groupId,
    memberId
  );

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Kick member?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to kick this member?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            onClick={() => {
              deleteMember().then(() => setIsOpen(false));
            }}
            disabled={isPending}
            variant="destructive"
          >
            {isPending ? (
              <>
                <Loader2 className="animate-spin" />
                Kicking
              </>
            ) : (
              <>Kick</>
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
