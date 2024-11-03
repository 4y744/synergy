import { useNavigate } from "react-router-dom";
import { useSignOut } from "../hooks";
import {
  Form,
  FormTitle,
  FormField,
  FormLabel,
  FormError,
  FormSubmit,
} from "@/components/form";

export const SignOutForm = () => {
  const { signOut, loading, error } = useSignOut();
  const navigate = useNavigate();
  return (
    <Form>
      <FormTitle>Sign out</FormTitle>
      <FormField>
        <FormLabel>
          Are you sure you want to sign out of your account?
        </FormLabel>
      </FormField>
      <FormError>{error}</FormError>
      <FormSubmit
        loading={loading}
        onClick={() => signOut(() => navigate("/"))}
      >
        Sign out
      </FormSubmit>
    </Form>
  );
};
