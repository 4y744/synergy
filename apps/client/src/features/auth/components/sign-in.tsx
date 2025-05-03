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

import { SignInInput, signInInputSchema, useSignIn } from "../api/sign-in";
import { getAuthError } from "../utils/get-auth-error";

type SignInFormProps = Readonly<ComponentProps<"form">>;

export const SignInForm = ({
  className,
  onSubmit,
  ...props
}: SignInFormProps) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const { mutate: signIn, isPending } = useSignIn({
    onSuccess: () => navigate({ to: "/groups" }),
    onError: (error) => {
      form.setError("password", {
        message: getAuthError(error.code),
      });
    },
    throwOnError: false,
  });

  const form = useForm<SignInInput>({
    resolver: zodResolver(signInInputSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => form.reset(), [i18n.language]);

  const _onSubmit: SubmitHandler<SignInInput> = (data) => signIn(data);

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
                  type="password"
                  placeholder={t(
                    "client.feature.auth.form.fields.password.placeholder"
                  )}
                  {...field}
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
          {t("client.feature.auth.sign_in")}
        </Button>
      </form>
    </Form>
  );
};
SignInForm.displayName = "SignInForm";
