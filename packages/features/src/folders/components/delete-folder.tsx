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

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete folder?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete
            <span className="font-medium"> #{folder?.name}</span>?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
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
