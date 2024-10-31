import { useRef } from "react";
import { useSignUp } from "../hooks";
import { SignUpCredentials } from "../types";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Title,
  Field,
  Label,
  Input,
  Submit,
  Error,
} from "@/components/form";

export const SignUpForm = () => {
  const credentials = useRef<SignUpCredentials>({} as SignUpCredentials);
  const navigate = useNavigate();
  const { signUp, loading, error } = useSignUp();

  return (
    <Form>
      <Title>Sign up</Title>
      <Field>
        <Label>Username</Label>
        <Input
          type="text"
          placeholder="John Doe"
          onChange={(event) =>
            (credentials.current.username = event.target.value)
          }
          error={error}
        />
      </Field>
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
      <Field>
        <Label>Confirm password</Label>
        <Input
          type="password"
          placeholder="Confirm your password..."
          onChange={(event) =>
            (credentials.current.confirmPassword = event.target.value)
          }
          error={error}
        />
      </Field>
      <Error>{error}</Error>
      <Submit
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
      </Submit>
    </Form>
  );
};
