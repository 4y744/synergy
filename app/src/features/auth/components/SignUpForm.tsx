import { useRef } from "react";
import { useSignUp } from "../hooks";
import { SignUpCredentials } from "../types";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormTitle,
  FormField,
  FormLabel,
  FormInput,
  FormError,
  FormSubmit,
} from "@/components/form";

export const SignUpForm = () => {
  const credentials = useRef<SignUpCredentials>({} as SignUpCredentials);
  const navigate = useNavigate();
  const { signUp, loading, error } = useSignUp();

  return (
    <Form>
      <FormTitle>Sign up</FormTitle>
      <FormField>
        <FormLabel>Username</FormLabel>
        <FormInput
          type="text"
          placeholder="John Doe"
          onChange={(event) =>
            (credentials.current.username = event.target.value)
          }
          error={error ? true : false}
        />
      </FormField>
      <FormField>
        <FormLabel>Email</FormLabel>
        <FormInput
          type="text"
          placeholder="johndoe@gmail.com"
          onChange={(event) => (credentials.current.email = event.target.value)}
          error={error ? true : false}
        />
      </FormField>
      <FormField>
        <FormLabel>Password</FormLabel>
        <FormInput
          type="password"
          placeholder="Your password..."
          onChange={(event) =>
            (credentials.current.password = event.target.value)
          }
          error={error ? true : false}
        />
      </FormField>
      <FormField>
        <FormLabel>Confirm password</FormLabel>
        <FormInput
          type="password"
          placeholder="Confirm your password..."
          onChange={(event) =>
            (credentials.current.confirmPassword = event.target.value)
          }
          error={error ? true : false}
        />
      </FormField>
      <FormError>{error}</FormError>
      <FormSubmit
        loading={loading}
        onClick={() => {
          signUp(
            credentials.current.username,
            credentials.current.email,
            credentials.current.password,
            credentials.current.confirmPassword,
            () => {
              navigate("/groups");
            }
          );
        }}
      >
        Sign in
      </FormSubmit>
    </Form>
  );
};
