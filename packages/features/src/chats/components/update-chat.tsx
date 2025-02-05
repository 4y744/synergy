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

import { useUpdateChat } from "../hooks/use-update-chat";
import { useChat } from "../hooks/use-chat";
import { CreateChatInput, createChatInputSchema } from "../types/create-chat";

type UpdateChatProps = Readonly<
  ComponentProps<"form"> & {
    groupId: string;
    chatId: string;
    onSuccess?: () => void;
  }
>;

export const UpdateChatForm = ({
  groupId,
  chatId,
  onSuccess,
  onSubmit,
  className,
  ...props
}: UpdateChatProps) => {
  const { data: chat } = useChat(groupId, chatId);
  const { mutateAsync: updateChat, isPending } = useUpdateChat(
    groupId,
    chatId,
    { onSuccess }
  );

  const form = useForm<CreateChatInput>({
    resolver: zodResolver(createChatInputSchema),
    defaultValues: {
      name: chat?.name,
    },
  });

  const _onSubmit: SubmitHandler<CreateChatInput> = (data) => {
    return updateChat(data);
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

type UpdateChatDialogProps = Readonly<{
  children?: ReactNode;
  groupId: string;
  chatId: string;
}>;

export const UpdateChatDialog = ({
  children,
  groupId,
  chatId,
}: UpdateChatDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>Edit chat</DialogTitle>
        <UpdateChatForm
          groupId={groupId}
          chatId={chatId}
          onSuccess={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};
