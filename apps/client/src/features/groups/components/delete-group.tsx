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

import { useGroup } from "../hooks/use-group";
import { useDeleteGroup } from "../hooks/use-delete-group";

type DeleteGroupDialogProps = Readonly<{
  children: ReactNode;
  groupId: string;
}>;

export const DeleteGroupDialog = ({
  children,
  groupId,
}: DeleteGroupDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const { data: group } = useGroup(groupId);
  const { mutateAsync: deleteGroup, isPending } = useDeleteGroup(groupId);

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {t("client.feature.group.delete")}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t("client.feature.group.delete_desc", { name: group?.name })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("client.action.cancel")}</AlertDialogCancel>
          <Button
            onClick={() => deleteGroup().then(() => setIsOpen(false))}
            disabled={isPending}
            variant="destructive"
          >
            {isPending ? (
              <>
                <Loader2 className="animate-spin" />
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
