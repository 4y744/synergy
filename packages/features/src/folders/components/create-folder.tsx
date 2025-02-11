import { ComponentProps, ReactNode, useState } from "react";
import { Loader2 } from "lucide-react";

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

import { useCreateFolder } from "../hooks/use-create-folder";
import {
  CreateFolderInput,
  createFolderInputSchema,
} from "../types/create-folder";

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
  const { mutateAsync: createFolder, isPending } = useCreateFolder(groupId, {
    onSuccess,
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
        <Button
          type="submit"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="animate-spin" />
              Creating
            </>
          ) : (
            <>Create</>
          )}
        </Button>
      </form>
    </Form>
  );
};

type CreateFolderDialogProps = Readonly<{
  children?: ReactNode;
  groupId: string;
}>;

export const CreateFolderDialog = ({
  children,
  groupId,
}: CreateFolderDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>Create folder</DialogTitle>
        <CreateFolderForm
          groupId={groupId}
          onSuccess={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};
