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

import { useUser } from "~/features/users/api/get-user";
import { useGroup } from "~/features/groups/api/get-group";

import { useDeleteMember } from "../api/delete-member";

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

  const { t } = useTranslation();

  const { mutate: deleteMember, isPending } = useDeleteMember(
    groupId,
    memberId,
    {
      onSuccess: () => setIsOpen(false),
    }
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
            {t(`client.feature.member.${type}`)}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {type == "kick"
              ? t(`client.feature.member.kick_desc`, { name: user?.username })
              : t(`client.feature.member.leave_desc`, { name: group?.name })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("client.action.cancel")}</AlertDialogCancel>
          <Button
            onClick={() => deleteMember()}
            disabled={isPending}
            variant="destructive"
          >
            {isPending ? (
              <>
                <Loader2Icon className="animate-spin" />
                {t(
                  type == "kick"
                    ? "client.action.kicking"
                    : "client.action.leaving"
                )}
              </>
            ) : (
              t(`client.action.${type}`)
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
DeleteMemberDialog.displayName = "DeleteMemberDialog";
