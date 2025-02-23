import { ComponentProps, ReactNode, useState } from "react";
import { Loader2 } from "lucide-react";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useTranslation } from "react-i18next";

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@synergy/ui";

import { cn } from "@synergy/utils";

import { EXPIRATION_TIME } from "../configs/expiration";
import { useCreateInvite } from "../hooks/use-create-invite";
import {
  CreateInviteInput,
  createInviteInputSchema,
} from "../types/create-invite";

type CreateInviteFormProps = Readonly<
  ComponentProps<"form"> & {
    groupId: string;
    onSuccess?: () => void;
  }
>;

export const CreateInviteForm = ({
  groupId,
  onSuccess,
  onSubmit,
  className,
  ...props
}: CreateInviteFormProps) => {
  const { t } = useTranslation();

  const { mutateAsync: createInvite, isPending } = useCreateInvite(groupId, {
    onSuccess,
    throwOnError: false,
  });

  const form = useForm<CreateInviteInput>({
    resolver: zodResolver(createInviteInputSchema),
  });

  const _onSubmit: SubmitHandler<CreateInviteInput> = (date) => {
    return createInvite(date);
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
          name="expiresAt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("client.feature.invite.expires_in")}</FormLabel>
              <Select
                onValueChange={(value) => {
                  return field.onChange(new Date(Date.now() + parseInt(value)));
                }}
                defaultValue={field.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder="-" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={EXPIRATION_TIME["5mins"]}>
                    {t("client.time.5_mins")}
                  </SelectItem>
                  <SelectItem value={EXPIRATION_TIME["30mins"]}>
                    {t("client.time.30_mins")}
                  </SelectItem>
                  <SelectItem value={EXPIRATION_TIME["1hour"]}>
                    {t("client.time.1_hour")}
                  </SelectItem>
                  <SelectItem value={EXPIRATION_TIME["1day"]}>1 day</SelectItem>
                  <SelectItem value={EXPIRATION_TIME["1week"]}>
                    {t("client.time.1_week")}
                  </SelectItem>
                  <SelectItem value={EXPIRATION_TIME["1month"]}>
                    {t("client.time.1_month")}
                  </SelectItem>
                  <SelectItem value={EXPIRATION_TIME["1year"]}>
                    {t("client.time.1_year")}
                  </SelectItem>
                  <SelectItem value={EXPIRATION_TIME["never"]}>
                    {t("client.time.never")}
                  </SelectItem>
                </SelectContent>
              </Select>
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

type CreateInviteDialogProps = Readonly<{
  children?: ReactNode;
  groupId: string;
}>;

export const CreateInviteDialog = ({
  children,
  groupId,
}: CreateInviteDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>{t("client.action.create")}</DialogTitle>
        <CreateInviteForm
          groupId={groupId}
          onSuccess={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};
