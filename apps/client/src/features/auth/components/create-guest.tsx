import { ComponentProps, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "@tanstack/react-router";
import { Loader2Icon } from "lucide-react";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
  Button,
  FormMessage,
} from "@synergy/ui";
import { cn } from "@synergy/utils";

import {
  CreateGuestInput,
  createGuestSchema,
  useCreateGuest,
} from "../api/create-guest";

type CreateGuestFormProps = Readonly<ComponentProps<"form">>;

export const CreateGuestForm = ({
  onSubmit,
  className,
  ...props
}: CreateGuestFormProps) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const { mutate: createGuest, isPending } = useCreateGuest({
    onSuccess: () => navigate({ to: "/groups" }),
    throwOnError: false,
  });

  const form = useForm<CreateGuestInput>({
    resolver: zodResolver(createGuestSchema),
    defaultValues: {
      username: "",
    },
  });

  useEffect(() => form.reset(), [i18n.language]);

  const _onSubmit: SubmitHandler<CreateGuestInput> = (data) =>
    createGuest(data);

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
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("client.feature.auth.form.fields.username.label")}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t(
                    "client.feature.auth.form.fields.username.placeholder"
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={isPending}
        >
          {isPending && <Loader2Icon className="animate-spin" />}
          {t("client.feature.auth.create_guest")}
        </Button>
      </form>
    </Form>
  );
};
CreateGuestForm.displayName = "CreateGuestForm";
