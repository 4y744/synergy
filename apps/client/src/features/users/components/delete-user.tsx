import { ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "@tanstack/react-router";
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

import { useDeleteUser } from "../api/delete-user";

type DeleteUserDialogProps = Readonly<{
  children: ReactNode;
}>;

export const DeleteUserDialog = ({ children }: DeleteUserDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const { t } = useTranslation();

  const { mutate: deleteUser, isPending } = useDeleteUser();

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("client.feature.user.delete")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("client.feature.user.delete_desc")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("client.action.cancel")}</AlertDialogCancel>
          <Button
            onClick={() => navigate({ to: "/signup" }).then(deleteUser)}
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
DeleteUserDialog.displayName = "DeleteUserDialog";
