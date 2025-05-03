import { ComponentProps, ReactNode, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FileUpIcon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Progress,
} from "@synergy/ui";

import { useCreateFile } from "../api/create-file";

export type CreateFileFormProps = Readonly<
  ComponentProps<"div"> & {
    groupId: string;
    folderId: string;
    onSuccess?: () => void;
  }
>;

export const CreateFileForm = ({
  groupId,
  folderId,
  onSuccess,
  className,
  ...props
}: CreateFileFormProps) => {
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const { mutateAsync, isPending } = useCreateFile(groupId, folderId, {
    onProgressChange: (progress) => setProgress(progress),
    onSuccess,
    throwOnError: false,
  });

  const onSubmit = (file: File) => mutateAsync(file);

  useEffect(() => {
    window.addEventListener("dragover", (event) => {
      event.preventDefault();
    });
    window.addEventListener("drop", (event) => {
      event.preventDefault();
    });
  }, []);

  if (isPending) {
    return (
      <div className="space-y-2">
        <div>
          <Progress value={progress} />
        </div>
        <div>{progress}%</div>
      </div>
    );
  }

  return (
    <>
      <div
        className="flex justify-center items-center
        w-full h-64 outline-dashed text-sm font-medium
        outline-2 outline-muted rounded-md cursor-pointer"
        onDrop={(event) => onSubmit(event.dataTransfer.files[0])}
        onClick={() => inputRef.current?.click()}
        {...props}
      >
        <FileUpIcon size={24} />
      </div>
      <input
        className="hidden"
        type="file"
        ref={inputRef}
        onChange={(event) => onSubmit(event.target.files![0])}
      />
    </>
  );
};
CreateFileForm.displayName = "CreateFileForm";

type CreateFileDialogProps = Readonly<{
  children?: ReactNode;
  groupId: string;
  folderId: string;
}>;

export const CreateFileDialog = ({
  children,
  groupId,
  folderId,
}: CreateFileDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("client.feature.file.create")}</DialogTitle>
          <DialogDescription>
            {t("client.feature.file.create_desc")}
          </DialogDescription>
        </DialogHeader>
        <CreateFileForm
          groupId={groupId}
          folderId={folderId}
          onSuccess={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};
CreateFileDialog.displayName = "CreateFileDialog";
