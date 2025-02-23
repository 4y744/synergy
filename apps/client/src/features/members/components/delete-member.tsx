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

import { useUser } from "~/features/users/hooks/use-user";
import { useGroup } from "~/features/groups/hooks/use-group";

import { useDeleteMember } from "../hooks/use-delete-member";

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
            onClick={() => {
              deleteMember().then(() => setIsOpen(false));
            }}
            disabled={isPending}
            variant="destructive"
          >
            {isPending ? (
              <>
                <Loader2 className="animate-spin" />
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
