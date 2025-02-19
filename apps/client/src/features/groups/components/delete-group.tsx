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

import { useGroup } from "../hooks/use-group";
import { useDeleteGroup } from "../hooks/use-delete-group";
import { useTranslation } from "@synergy/i18n";

type DeleteGroupDialogProps = Readonly<{
  children: ReactNode;
  groupId: string;
}>;

export const DeleteGroupDialog = ({
  children,
  groupId,
}: DeleteGroupDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: group } = useGroup(groupId);
  const { mutateAsync: deleteGroup, isPending } = useDeleteGroup(groupId);

  const { t } = useTranslation();

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("group.delete")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("group.delete_desc", { name: group?.name })}
            <span className="font-medium"> {group?.name}</span>?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("generic.cancel")}</AlertDialogCancel>
          <Button
            onClick={() => deleteGroup().then(() => setIsOpen(false))}
            disabled={isPending}
            variant="destructive"
          >
            {isPending ? (
              <>
                <Loader2 className="animate-spin" />
                {t("generic.deleting")}
              </>
            ) : (
              t("generic.delete")
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
