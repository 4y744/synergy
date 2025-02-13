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
import { useUser } from "~/users";
import { useGroup } from "~/groups";

type DeleteMemberDialogProps = Readonly<{
  children?: ReactNode;
  groupId: string;
  memberId: string;
  type: "leave" | "kick";
}>;

export const DeleteMemberDialog = ({
  children,
  groupId,
  memberId,
  type,
}: DeleteMemberDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { mutateAsync: deleteMember, isPending } = useDeleteMember(
    groupId,
    memberId
  );

  const { data: group } = useGroup(groupId);
  const { data: user } = useUser(memberId);

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {type == "kick" ? "Kick member?" : "Leave group?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {type == "kick" ? (
              <>
                Are you sure you want to kick
                <span className="font-medium"> {user?.username}</span>?
              </>
            ) : (
              <>
                Are you sure you want to leave
                <span className="font-medium"> {group?.name}</span>?
              </>
            )}
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
                {type == "kick" ? "Kicking" : "Leaving"}
              </>
            ) : (
              <>{type == "kick" ? <>Kick</> : <>Leave</>}</>
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
