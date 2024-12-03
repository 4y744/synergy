import { Outlet, redirect } from "react-router-dom";
import { authenticate } from "@/features/auth/api/authenticate";
import { DataLoader } from "@/types/router";

export const loader: DataLoader = async () => {
  const { signedIn } = await authenticate();
  if (!signedIn) {
    throw redirect("/signin");
  }
  return null;
};

export default () => {
  return <Outlet />;
};
