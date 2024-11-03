import { useAuth } from "../hooks";
import { Navigate, Outlet } from "react-router-dom";
import { Spinner } from "@/components/loading";
import { cn } from "@/utils/cn";

export const ProtectedRoute = () => {
  const { signedIn, loading } = useAuth();

  if (loading) {
    return (
      <div
        className={cn(
          "fixed top-0 left-0 w-full h-full",
          "flex justify-center items-center"
        )}
      >
        <Spinner />
      </div>
    );
  }

  if (!signedIn) {
    return <Navigate to={"/signin"} />;
  }

  return <Outlet />;
};
