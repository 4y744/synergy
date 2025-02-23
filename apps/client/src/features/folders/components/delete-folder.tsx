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

import { useFolder } from "../hooks/use-folder";
import { useDeleteFolder } from "../hooks/use-delete-folder";

type DeleteFolderDialogProps = Readonly<{
  children: ReactNode;
  groupId: string;
  folderId: string;
}>;

export const DeleteFolderDialog = ({
  children,
  groupId,
  folderId,
}: DeleteFolderDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const { data: folder } = useFolder(groupId, folderId);
  const { mutateAsync: deleteFolder, isPending } = useDeleteFolder(
    groupId,
    folderId
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
            {t("client.feature.folder.delete")}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t("client.feature.folder.delete_desc", { name: folder?.name })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("client.action.cancel")}</AlertDialogCancel>
          <Button
            onClick={() => {
              deleteFolder().then(() => setIsOpen(false));
            }}
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
