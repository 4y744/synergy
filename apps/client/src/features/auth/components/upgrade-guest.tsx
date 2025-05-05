import { ComponentProps, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Loader2Icon } from "lucide-react";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Button,
} from "@synergy/ui";
import { cn } from "@synergy/utils";

import {
  UpgradeGuestInput,
  upgradeGuestInputSchema,
  useUpgradeGuest,
} from "../api/upgrade-guest";
import { getAuthError } from "../utils/get-auth-error";

type UpgradeGuestFormProps = Readonly<
  ComponentProps<"form"> & {
    onSuccess?: () => void;
  }
>;

export const UpgradeGuestForm = ({
  onSuccess,
  className,
  onSubmit,
  ...props
}: UpgradeGuestFormProps) => {
  const { t, i18n } = useTranslation();

  const { mutate: upgradeGuest, isPending } = useUpgradeGuest({
    onSuccess,
    onError: (error) => {
      form.setError("confirmPassword", {
        message: getAuthError(error.code),
      });
    },
    throwOnError: false,
  });

  const form = useForm<UpgradeGuestInput>({
    resolver: zodResolver(upgradeGuestInputSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => form.reset(), [i18n.language]);

  const _onSubmit: SubmitHandler<UpgradeGuestInput> = (data) => {
    if (data.password != data.confirmPassword && data.password)
      return form.setError("confirmPassword", {
        message: t("client.feature.auth.form.errors.password_mismatch"),
      });

    upgradeGuest(data);
  };

  return (
    <Form {...form}>
      <form
        className={cn("space-y-4 w-80 max-w-[100vw]", className)}
        onSubmit={(event) => {
          onSubmit?.(event);
          form.handleSubmit(_onSubmit)(event);
        }}
        {...props}
      >
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("client.feature.auth.form.fields.email.label")}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t(
                    "client.feature.auth.form.fields.email.placeholder"
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("client.feature.auth.form.fields.password.label")}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t(
                    "client.feature.auth.form.fields.password.placeholder"
                  )}
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="confirmPassword"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("client.feature.auth.form.fields.confirm_password.label")}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t(
                    "client.feature.auth.form.fields.confirm_password.placeholder"
                  )}
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full"
          disabled={isPending}
        >
          {isPending && <Loader2Icon className="animate-spin" />}
          {t("client.feature.auth.upgrade_guest")}
        </Button>
      </form>
    </Form>
  );
};
UpgradeGuestForm.displayName = "UpgradeGuestInput";
