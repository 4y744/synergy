import { useState, ReactNode, ComponentProps } from "react";
import { Loader2 } from "lucide-react";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
  const { data: folder } = useFolder(groupId, folderId);
  const { mutateAsync: updateFolder, isPending } = useUpdateFolder(
    groupId,
    folderId,
    { onSuccess }
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
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="My cool group"
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
              Saving
            </>
          ) : (
            <>Save</>
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

  const { data: folder } = useFolder(groupId, folderId);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>
          Edit
          <span className="font-medium"> #{folder?.name}</span>?
        </DialogTitle>
        <UpdateFolderForm
          groupId={groupId}
          folderId={folderId}
          onSuccess={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};
