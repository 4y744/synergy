import { ComponentProps } from "react";
import { Loader2 } from "lucide-react";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useTranslation } from "react-i18next";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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

import { useSignIn } from "../hooks/use-sign-in";
import { SignInInput, signInInputSchema } from "../types/sign-in";

type SignInFormProps = Readonly<
  ComponentProps<"div"> & {
    onSuccess?: () => void;
    onSwitch?: () => void;
  }
>;

export const SignInForm = ({
  onSuccess,
  onSwitch,
  className,
  ...props
}: SignInFormProps) => {
  const {
    mutate: signIn,
    isPending,
    isSuccess,
  } = useSignIn({
    onSuccess,
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
    <Card
      className={cn("border-none shadow-none w-96", className)}
      {...props}
    >
      <CardHeader>
        <CardTitle>{t("auth.sign_in")}</CardTitle>
        <CardDescription>{t("auth.sign_in_desc")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.email")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={t("auth.placeholders.email")}
                    />
                  </FormControl>
                  <FormMessage render={(error) => t(error as any)} />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.password")}</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={t("auth.placeholders.password")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage render={(error) => t(error as any)} />
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
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button
          variant="link"
          className="w-full"
          onClick={() => onSwitch?.()}
        >
          {t("auth.no_account")}
        </Button>
      </CardFooter>
    </Card>
  );
};
