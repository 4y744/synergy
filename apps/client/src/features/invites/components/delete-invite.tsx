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

import { useDeleteInvite } from "../api/delete-invite";

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
  const { t } = useTranslation();

  const { mutate: deleteInvite, isPending } = useDeleteInvite(
    groupId,
    inviteId,
    {
      onSuccess: () => setIsOpen(false),
    }
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
            {t("client.feature.invite.delete")}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t("client.feature.invite.delete_desc")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("client.action.cancel")}</AlertDialogCancel>
          <Button
            onClick={() => deleteInvite()}
            disabled={isPending}
            variant="destructive"
          >
            {isPending ? (
              <>
                <Loader2Icon className="animate-spin" />
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
DeleteInviteDialog.displayName = "DeleteInviteDialog";
