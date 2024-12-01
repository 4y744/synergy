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
import { SignInSchema } from "../schemas/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SignInCredentials } from "../types/api";
import { Loader2 } from "lucide-react";
import { useSignIn } from "../hooks/use-sign-in";
import { useNavigate } from "react-router-dom";

type Props = Readonly<{
  onSwitchToSignUp?: () => void;
}>;

export const SignInForm = ({ onSwitchToSignUp }: Props) => {
  const { signIn, loading } = useSignIn();
  const navigate = useNavigate();
  const form = useForm<SignInCredentials>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<SignInCredentials> = async (data) => {
    const { email, password } = data;
    await signIn(email, password, {
      onSuccess: () => {
        navigate("/groups");
      },
      onError: (error) => {
        form.setError("password", {
          message: error.code,
        });
      },
    });
  };

  return (
    <Card className="w-96">
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
              disabled={loading}
            >
              {loading && <Loader2 className="animate-spin" />}
              Sign in
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button
          variant="link"
          className="w-full"
          onClick={() => onSwitchToSignUp?.()}
        >
          Don't have an account? Sign up!
        </Button>
      </CardFooter>
    </Card>
  );
};
