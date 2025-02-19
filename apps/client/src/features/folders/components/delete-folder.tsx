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

import { useFolder } from "../hooks/use-folder";
import { useDeleteFolder } from "../hooks/use-delete-folder";
import { useTranslation } from "@synergy/i18n";

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

  const { data: folder } = useFolder(groupId, folderId);
  const { mutateAsync: deleteFolder, isPending } = useDeleteFolder(
    groupId,
    folderId
  );

  const { t } = useTranslation();

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("folder.delete")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("folder.delete_desc", { file: folder?.name })}
            <span className="font-medium"> #{folder?.name}</span>?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("generic.cancel")}</AlertDialogCancel>
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
