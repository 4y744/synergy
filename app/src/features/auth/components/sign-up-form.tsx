"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "../schemas/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SignUpCredentials } from "../types/api";
import { Loader2 } from "lucide-react";
import { useSignUp } from "../hooks/use-sign-up";
import { useNavigate } from "react-router-dom";

type Props = Readonly<{
  onSwitchToSignIn?: () => void;
}>;

export const SignUpForm = ({ onSwitchToSignIn }: Props) => {
  const { signUp, loading } = useSignUp();
  const navigate = useNavigate();
  const form = useForm<SignUpCredentials>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<SignUpCredentials> = async (data) => {
    const { email, password } = data;
    await signUp("hello", email, password, {
      onSuccess: () => {
        navigate("/groups");
      },
      onError: (error) => {
        form.setError("confirmPassword", {
          message: error.code,
        });
      },
    });
  };

  return (
    <Card className="w-96">
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
              disabled={loading}
            >
              {loading && <Loader2 className="animate-spin" />}
              Sign up
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button
          variant="link"
          className="w-full"
          onClick={() => onSwitchToSignIn?.()}
        >
          Already have an account? Sign in!
        </Button>
      </CardFooter>
    </Card>
  );
};