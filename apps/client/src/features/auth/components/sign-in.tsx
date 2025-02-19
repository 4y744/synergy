import { ComponentProps } from "react";
import { Loader2 } from "lucide-react";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useTranslation } from "@synergy/i18n";

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

import { useSignIn } from "../hooks/use-sign-in";
import { SignInInput, signInInputSchema } from "../types/sign-in";
import { useNavigate } from "@tanstack/react-router";

type SignInFormProps = Readonly<ComponentProps<"form">>;

export const SignInForm = (props: SignInFormProps) => {
  const navigate = useNavigate();

  const {
    mutate: signIn,
    isPending,
    isSuccess,
  } = useSignIn({
    onSuccess: () => navigate({ to: "/groups" }),
    onError: (error) => {
      form.setError("password", {
        message: error.code,
      });
    },
  });

  const form = useForm<SignInInput>({
    resolver: zodResolver(signInInputSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { t } = useTranslation();

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
              <FormLabel>{t("auth.form.fields.email.label")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t("auth.form.fields.email.placeholder")}
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
              <FormLabel>{t("auth.form.fields.password.label")}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder={t("auth.form.fields.password.placeholder")}
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
          {t("auth.sign_in")}
        </Button>
        <Button
          variant="link"
          className="w-full"
          onClick={() => navigate({ to: "/signup" })}
        >
          {t("auth.no_account")}
        </Button>
      </form>
    </Form>
  );
};
