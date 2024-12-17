import { authenticate } from "@/features/auth/api/authenticate";
import { AuthFormSwitch } from "@/features/auth/components/auth-form-switch";
import { Loader } from "@/types/router";
import { redirect } from "react-router-dom";

export const loader: Loader = async ({ authStore }) => {
  await authenticate(authStore);
  if (authStore.getState().isSignedIn) {
    return redirect("/groups");
  }
  return null;
};

export default () => {
  return <AuthFormSwitch initial="signin" />;
};
