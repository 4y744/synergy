import { ComponentProps } from "react";
import { Loader2 } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useTranslation } from "react-i18next";

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

import { AUTH_ERRORS } from "../configs/errors";
import { useSignUp } from "../hooks/use-sign-up";
import { SignUpInput, signUpInputSchema } from "../types/sign-up";

type SignUpFormProps = Readonly<ComponentProps<"div">>;

export const SignUpForm = (props: SignUpFormProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    mutate: signUp,
    isPending,
    isSuccess,
  } = useSignUp({
    onSuccess: () => navigate({ to: "/groups" }),
    onError: (error) => {
      form.setError("confirmPassword", {
        message: AUTH_ERRORS[error.code as keyof typeof AUTH_ERRORS],
      });
    },
    throwOnError: false,
  });

  const form = useForm<SignUpInput>({
    resolver: zodResolver(signUpInputSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<SignUpInput> = (data) => signUp(data);

  return (
    <Form
      {...form}
      {...props}
    >
      <form
        className="space-y-4 w-80 max-w-[100vw]"
        onSubmit={form.handleSubmit(onSubmit)}
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
          disabled={isPending || isSuccess}
        >
          {(isPending || isSuccess) && <Loader2 className="animate-spin" />}
          {t("client.feature.auth.sign_up")}
        </Button>
      </form>
      <Button
        variant="link"
        className="w-full"
        onClick={() => navigate({ to: "/signin" })}
      >
        {t("client.feature.auth.have_account")}
      </Button>
    </Form>
  );
};
SignUpForm.displayName = "SignUpInput";
