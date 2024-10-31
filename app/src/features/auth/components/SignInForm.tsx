import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSignIn } from "../hooks";
import { SignInCredentials } from "../types";

import {
  Form,
  Title,
  Field,
  Label,
  Input,
  Submit,
  Error,
} from "@/components/form";

export const SignInForm = () => {
  const credentials = useRef<SignInCredentials>({} as SignInCredentials);
  const navigate = useNavigate();
  const { signIn, loading, error } = useSignIn();

  return (
    <Form>
      <Title>Sign in</Title>
      <Field>
        <Label>Email</Label>
        <Input
          type="text"
          placeholder="johndoe@gmail.com"
          onChange={(event) => (credentials.current.email = event.target.value)}
          error={error}
        />
      </Field>
      <Field>
        <Label>Password</Label>
        <Input
          type="password"
          placeholder="Your password..."
          onChange={(event) =>
            (credentials.current.password = event.target.value)
          }
          error={error}
        />
      </Field>
      <Error>{error}</Error>
      <Submit
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
      </Submit>
    </Form>
  );
};
