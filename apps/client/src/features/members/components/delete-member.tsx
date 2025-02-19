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
import { useUser } from "~/features/users/hooks/use-user";
import { useGroup } from "~/features/groups/hooks/use-group";
import { useTranslation } from "@synergy/i18n";

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

  const { t } = useTranslation();

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {t(type == "kick" ? "member.kick" : "member.leave")}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {type == "kick" ? (
              <>
                {t("member.kick_desc")}
                <span className="font-medium"> {user?.username}</span>?
              </>
            ) : (
              <>
                {t("member.leave_desc")}
                <span className="font-medium"> {group?.name}</span>?
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("generic.cancel")}</AlertDialogCancel>
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
                {t(type == "kick" ? "generic.kicking" : "generic.leaving")}
              </>
            ) : (
              t(type == "kick" ? "generic.kick" : "generic.leave")
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
