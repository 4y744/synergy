import { ComponentProps, ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import { Loader2Icon } from "lucide-react";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@synergy/ui";

import { cn } from "@synergy/utils";

import {
  useCreateFolder,
  CreateFolderInput,
  createFolderInputSchema,
} from "../api/create-folder";

type CreateFolderProps = Readonly<
  ComponentProps<"form"> & {
    groupId: string;
    onSuccess?: () => void;
  }
>;

export const CreateFolderForm = ({
  groupId,
  onSuccess,
  onSubmit,
  className,
  ...props
}: CreateFolderProps) => {
  const { t } = useTranslation();

  const { mutateAsync: createFolder, isPending } = useCreateFolder(groupId, {
    onSuccess,
    throwOnError: false,
  });

  const form = useForm<CreateFolderInput>({
    resolver: zodResolver(createFolderInputSchema),
    defaultValues: {
      name: "",
    },
  });

  const _onSubmit: SubmitHandler<CreateFolderInput> = (data) => {
    return createFolder(data);
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
          control={form.control}
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
        <Button
          type="submit"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2Icon className="animate-spin" />
              {t("client.action.creating")}
            </>
          ) : (
            t("client.action.create")
          )}
        </Button>
      </form>
    </Form>
  );
};
CreateFolderForm.displayName = "CreateFolderForm";

type CreateFolderDialogProps = Readonly<{
  children?: ReactNode;
  groupId: string;
}>;

export const CreateFolderDialog = ({
  children,
  groupId,
}: CreateFolderDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>{t("client.feature.folder.create")}</DialogTitle>
        <CreateFolderForm
          groupId={groupId}
          onSuccess={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};
CreateFolderDialog.displayName = "CreateFolderDialog";
