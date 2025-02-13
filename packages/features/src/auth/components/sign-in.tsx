import { ComponentProps } from "react";
import { Loader2 } from "lucide-react";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

  const onSubmit: SubmitHandler<SignInInput> = (data) => signIn(data);

  return (
    <Card
      className={cn("border-none shadow-none w-96", className)}
      {...props}
    >
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>Sign into your account.</CardDescription>
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="johndoe@gmail.com"
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password..."
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
              Sign in
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
          Don't have an account? Sign up!
        </Button>
      </CardFooter>
    </Card>
  );
};
