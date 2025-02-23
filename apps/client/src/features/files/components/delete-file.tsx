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

import { useFile } from "../hooks/use-file";
import { useDeleteFile } from "../hooks/use-delete-file";

type DeleteFileDialogProps = Readonly<{
  children: ReactNode;
  groupId: string;
  folderId: string;
  fileId: string;
}>;

export const DeleteFileDialog = ({
  children,
  groupId,
  folderId,
  fileId,
}: DeleteFileDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const { data: file } = useFile(groupId, folderId, fileId);
  const { mutateAsync: deleteFile, isPending } = useDeleteFile(
    groupId,
    folderId,
    fileId
  );

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("client.feature.file.delete")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("client.feature.file.delete_desc", { name: file?.name })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("client.action.cancel")}</AlertDialogCancel>
          <Button
            onClick={() => deleteFile().then(() => setIsOpen(false))}
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
