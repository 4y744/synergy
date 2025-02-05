import { ComponentProps } from "react";
import { useNavigate } from "@tanstack/react-router";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Loader2 } from "lucide-react";

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

import { useSignUp } from "../hooks/use-sign-up";
import { SignUpInput, signUpInputSchema } from "../types/sign-up";

type SignUpFormProps = Readonly<ComponentProps<"div">>;

export const SignUpForm = ({ className, ...props }: SignUpFormProps) => {
  const navigate = useNavigate();
  const { mutate: signUp, isPending } = useSignUp({
    onSuccess: () => navigate({ to: "/groups" }),
    onError: (error) => {
      form.setError("confirmPassword", {
        message: error.code,
      });
    },
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
    <Card
      className={cn("border-none shadow-none w-96", className)}
      {...props}
    >
      <CardHeader>
        <CardTitle>Sign up</CardTitle>
        <CardDescription>Create an account.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="John Doe"
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
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your password..."
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
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your password..."
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
              {isPending && <Loader2 className="animate-spin" />}
              Sign up
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button
          variant="link"
          className="w-full"
          onClick={() => navigate({ to: "/signin" })}
        >
          Already have an account? Sign in!
        </Button>
      </CardFooter>
    </Card>
  );
};
