import { Outlet } from "react-router-dom";
import { authenticatedLoader } from "@/features/auth/api/authenticated-loader";

export const loader = authenticatedLoader();

export const Component = () => {
  return <Outlet />;
};
