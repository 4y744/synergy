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

import { useDeleteFile } from "../hooks/use-delete-file";
import { useFile } from "../hooks/use-file";

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
          <AlertDialogTitle>Delete file?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete
            <span className="font-medium"> {file?.name}</span>?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            onClick={() => deleteFile().then(() => setIsOpen(false))}
            disabled={isPending}
            variant="destructive"
          >
            {isPending ? (
              <>
                <Loader2 className="animate-spin" />
                Deleting
              </>
            ) : (
              <>Delete</>
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
