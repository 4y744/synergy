import { useState, ReactNode, ComponentProps } from "react";
import { useTranslation } from "react-i18next";
import { Loader2Icon } from "lucide-react";

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

import { useCall } from "../api/get-calls";
import { useUpdateCall } from "../api/update-call";
import { CreateCallInput, createCallInputSchema } from "../api/create-call";

type UpdateCallProps = Readonly<
  ComponentProps<"form"> & {
    groupId: string;
    callId: string;
    onSuccess?: () => void;
  }
>;

export const UpdateCallForm = ({
  groupId,
  callId,
  onSuccess,
  onSubmit,
  className,
  ...props
}: UpdateCallProps) => {
  const { t } = useTranslation();

  const { data: call } = useCall(groupId, callId);
  const { mutateAsync: updateCall, isPending } = useUpdateCall(
    groupId,
    callId,
    { onSuccess, throwOnError: false }
  );

  const form = useForm<CreateCallInput>({
    resolver: zodResolver(createCallInputSchema),
    defaultValues: {
      name: call?.name,
    },
  });

  const _onSubmit: SubmitHandler<CreateCallInput> = (data) => {
    return updateCall(data);
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
                {t("client.feature.call.form.fields.name.label")}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t(
                    "client.feature.call.form.fields.name.placeholder"
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
              <Loader2Icon className="animate-spin" />
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
UpdateCallForm.displayName = "UpdateCallForm";

type UpdateCallDialogProps = Readonly<{
  children?: ReactNode;
  groupId: string;
  callId: string;
}>;

export const UpdateCallDialog = ({
  children,
  groupId,
  callId,
}: UpdateCallDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>{t("client.feature.call.update")}</DialogTitle>
        <UpdateCallForm
          groupId={groupId}
          callId={callId}
          onSuccess={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};
UpdateCallDialog.displayName = "UpdateCallDialog";
