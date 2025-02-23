import { ComponentProps, ReactNode, useState } from "react";
import { Loader2 } from "lucide-react";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { t } from "i18next";

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

import { useCreateChat } from "../hooks/use-create-chat";
import { CreateChatInput, createChatInputSchema } from "../types/create-chat";

type CreateChatProps = Readonly<
  ComponentProps<"form"> & {
    groupId: string;
    onSuccess?: () => void;
  }
>;

export const CreateChatForm = ({
  groupId,
  onSuccess,
  onSubmit,
  className,
  ...props
}: CreateChatProps) => {
  const { mutateAsync: createChat, isPending } = useCreateChat(groupId, {
    onSuccess,
    throwOnError: false,
  });

  const form = useForm<CreateChatInput>({
    resolver: zodResolver(createChatInputSchema),
    defaultValues: {
      name: "",
    },
  });

  const _onSubmit: SubmitHandler<CreateChatInput> = (data) => {
    return createChat(data);
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
                {t("client.feature.chat.form.fields.name.label")}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t(
                    "client.feature.chat.form.fields.name.placeholder"
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
              <Loader2 className="animate-spin" />
              {t("client.action.create")}
            </>
          ) : (
            t("client.action.creating")
          )}
        </Button>
      </form>
    </Form>
  );
};

type CreateChatDialogProps = Readonly<{
  children?: ReactNode;
  groupId: string;
}>;

export const CreateChatDialog = ({
  children,
  groupId,
}: CreateChatDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>{t("client.feature.chat.create")}</DialogTitle>
        <CreateChatForm
          groupId={groupId}
          onSuccess={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};
