import { authenticate } from "@/features/auth/api/authenticate";
import { AuthFormSwitch } from "@/features/auth/components/auth-form-switch";
import { DataLoader } from "@/types/router";
import { redirect } from "react-router-dom";

export const loader: DataLoader = async () => {
  const { isSignedIn } = await authenticate();
  if (isSignedIn) {
    return redirect("/groups");
  }
  return null;
};

export default () => {
  return <AuthFormSwitch initial="signup" />;
};
