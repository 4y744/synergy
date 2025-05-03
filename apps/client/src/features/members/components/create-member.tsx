import { ComponentProps, ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Loader2Icon } from "lucide-react";

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

import { cn, isValidURL } from "@synergy/utils";

import {
  CreateMemberInput,
  createMemberInputSchema,
  useCreateMember,
} from "../api/create-member";

type CreateMemberFormProps = Readonly<
  ComponentProps<"form"> & {
    onSuccess?: () => void;
  }
>;

export const CreateMemberForm = ({
  onSuccess,
  onSubmit,
  className,
  ...props
}: CreateMemberFormProps) => {
  const { t } = useTranslation();

  const { mutateAsync: createMember, isPending } = useCreateMember({
    onSuccess,
    onError: () => {
      form.setError("inviteId", {
        message: t("client.feature.invite.form.errors.invalid"),
      });
    },
    throwOnError: false,
  });

  const form = useForm<CreateMemberInput>({
    resolver: zodResolver(createMemberInputSchema),
    defaultValues: {
      inviteId: "",
    },
  });

  const _onSubmit: SubmitHandler<CreateMemberInput> = ({ inviteId }) => {
    return createMember({
      inviteId: isValidURL(inviteId)
        ? inviteId.split("/").reverse()[0]
        : inviteId,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={(event) => {
          onSubmit?.(event);
          form.handleSubmit(_onSubmit)(event);
        }}
        className={cn("space-y-4", className)}
        {...props}
      >
        <FormField
          name="inviteId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("client.feature.invite.id")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="https://synergy-app.net/invite/my-invite-link"
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
              {t("client.action.joining")}
            </>
          ) : (
            t("client.action.join")
          )}
        </Button>
      </form>
    </Form>
  );
};
CreateMemberForm.displayName = "CreateMemberForm";

type CreateMemberDialogProps = Readonly<{
  children?: ReactNode;
}>;

export const CreateMemberDialog = ({ children }: CreateMemberDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>{t("client.feature.group.join")}</DialogTitle>
        <CreateMemberForm onSuccess={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
CreateMemberDialog.displayName = "CreateMemberDialog";
