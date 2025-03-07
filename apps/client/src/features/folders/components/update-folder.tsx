import { useState, ReactNode, ComponentProps } from "react";
import { Loader2 } from "lucide-react";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useTranslation } from "react-i18next";
import {
  Button,
  Input,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@synergy/ui";

import { cn } from "@synergy/utils";

import { useFolder } from "../hooks/use-folder";
import { useUpdateFolder } from "../hooks/use-update-folder";
import {
  UpdateFolderInput,
  updateFolderInputSchema,
} from "../types/update-folder";

type UpdateFolderProps = Readonly<
  ComponentProps<"form"> & {
    groupId: string;
    folderId: string;
    onSuccess?: () => void;
  }
>;

export const UpdateFolderForm = ({
  groupId,
  folderId,
  onSuccess,
  onSubmit,
  className,
  ...props
}: UpdateFolderProps) => {
  const { t } = useTranslation();

  const { data: folder } = useFolder(groupId, folderId);
  const { mutateAsync: updateFolder, isPending } = useUpdateFolder(
    groupId,
    folderId,
    { onSuccess, throwOnError: false }
  );

  const form = useForm<UpdateFolderInput>({
    resolver: zodResolver(updateFolderInputSchema),
    defaultValues: {
      name: folder?.name,
    },
  });

  const _onSubmit: SubmitHandler<UpdateFolderInput> = (data) => {
    return updateFolder(data);
  };

  return (
    <Form {...form}>
      <form
        className={cn("space-y-2", className)}
        onSubmit={(event) => {
          onSubmit?.(event);
          form.handleSubmit(_onSubmit)(event);
        }}
        {...props}
      >
        <FormField
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("client.feature.folder.form.fields.name.label")}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t(
                    "client.feature.folder.form.fields.name.placeholder"
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {isPending ? (
            <>
              <Loader2 className="animate-spin" />
              {t("client.action.saving")}
            </>
          ) : (
            t("client.action.save")
          )}
        </Button>
      </form>
    </Form>
  );
};

type UpdateFolderDialogProps = Readonly<{
  children?: ReactNode;
  groupId: string;
  folderId: string;
}>;

export const UpdateFolderDialog = ({
  children,
  groupId,
  folderId,
}: UpdateFolderDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>{t("client.feature.folder.update")}</DialogTitle>
        <UpdateFolderForm
          groupId={groupId}
          folderId={folderId}
          onSuccess={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};
