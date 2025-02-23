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
  Input,
  Button,
  FormMessage,
} from "@synergy/ui";

import { AUTH_ERRORS } from "../configs/errors";
import { useSignIn } from "../hooks/use-sign-in";
import { SignInInput, signInInputSchema } from "../types/sign-in";

type SignInFormProps = Readonly<ComponentProps<"div">>;

export const SignInForm = (props: SignInFormProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    mutate: signIn,
    isPending,
    isSuccess,
  } = useSignIn({
    onSuccess: () => navigate({ to: "/groups" }),
    onError: (error) => {
      form.setError("password", {
        message: AUTH_ERRORS[error.code as keyof typeof AUTH_ERRORS],
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

  const onSubmit: SubmitHandler<SignInInput> = (data) => signIn(data);

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
          name="email"
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
          disabled={isPending || isSuccess}
        >
          {(isPending || isSuccess) && <Loader2 className="animate-spin" />}
          {t("client.feature.auth.sign_in")}
        </Button>
      </form>
      <Button
        variant="link"
        className="w-full"
        onClick={() => navigate({ to: "/signup" })}
      >
        {t("client.feature.auth.no_account")}
      </Button>
    </Form>
  );
};
SignInForm.displayName = "SignInForm";
