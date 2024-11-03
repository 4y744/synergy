import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSignIn } from "../hooks";
import { SignInCredentials } from "../types";

import {
  Form,
  FormTitle,
  FormField,
  FormLabel,
  FormInput,
  FormError,
  FormSubmit,
} from "@/components/form";

export const SignInForm = () => {
  const credentials = useRef<SignInCredentials>({} as SignInCredentials);
  const navigate = useNavigate();
  const { signIn, loading, error } = useSignIn();

  return (
    <Form>
      <FormTitle>Sign in</FormTitle>
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
      <FormError>{error}</FormError>
      <FormSubmit
        loading={loading}
        onClick={() => {
          signIn(
            credentials.current.email,
            credentials.current.password,
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
