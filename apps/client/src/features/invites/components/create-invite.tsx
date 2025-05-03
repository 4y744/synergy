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

import {
  useCreateInvite,
  CreateInviteInput,
  createInviteInputSchema,
} from "../api/create-invite";

const EXPIRATION_TIME = {
  "5mins": "300000",
  "30mins": "1800000",
  "1hour": "3600000",
  "1day": "86400000",
  "1week": "604800000",
  "1month": "2678400000",
  "1year": "31556952000",
  never: "99999999999999",
};

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

  const { mutate: createInvite, isPending } = useCreateInvite(groupId, {
    onSuccess,
    throwOnError: false,
  });

  const form = useForm<CreateInviteInput>({
    resolver: zodResolver(createInviteInputSchema),
    defaultValues: {
      expiresIn: parseInt(EXPIRATION_TIME["5mins"]),
    },
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
          name="expiresIn"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("client.feature.invite.expires_in")}</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(parseInt(value))}
                defaultValue={EXPIRATION_TIME["5mins"]}
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
                  <SelectItem value={EXPIRATION_TIME["1day"]}>
                    {t("client.time.1_day")}
                  </SelectItem>
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
CreateInviteForm.displayName = "CreateInviteForm";

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
        <DialogTitle>{t("client.feature.invite.create")}</DialogTitle>
        <CreateInviteForm
          groupId={groupId}
          onSuccess={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};
CreateInviteDialog.displayName = "CreateInviteDialog";
