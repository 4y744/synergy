import { useNavigate } from "react-router-dom";
import { useSignOut } from "../hooks";
import { Error, Field, Form, Label, Submit, Title } from "@/components/form";

export const SignOutForm = () => {
  const { signOut, loading, error } = useSignOut();
  const navigate = useNavigate();
  return (
    <Form>
      <Title>Sign out</Title>
      <Field>
        <Label>Are you sure you want to sign out of your account?</Label>
      </Field>
      <Error>{error}</Error>
      <Submit
        loading={loading}
        onClick={() => signOut(() => navigate("/"))}
      >
        Sign out
      </Submit>
    </Form>
  );
};
