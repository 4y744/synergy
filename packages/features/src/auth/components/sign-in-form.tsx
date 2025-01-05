import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
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

import { zodResolver } from "@hookform/resolvers/zod";

import { SignIn, SignInSchema } from "../types/sign-in";
import { useSignIn } from "../hooks/use-sign-in";

export const SignInForm = () => {
  const { mutate: signIn, isPending } = useSignIn({
    onSuccess: () => {
      navigate("/groups");
    },
    onError: (error) => {
      form.setError("password", {
        message: error.code,
      });
    },
  });
  const form = useForm<SignIn>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<SignIn> = (data) => signIn(data);

  return (
    <Card className="border-none shadow-none w-96">
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
              disabled={isPending}
            >
              {isPending && <Loader2 className="animate-spin" />}
              Sign in
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button
          variant="link"
          className="w-full"
          onClick={() => navigate("/signup")}
        >
          Don't have an account? Sign up!
        </Button>
      </CardFooter>
    </Card>
  );
};
