import { Navigate, ReactNode } from "@tanstack/react-router";
import { useAuth } from "../hooks/use-auth";

type ProtectedRouteProps = Readonly<{
  children: ReactNode;
}>;

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isSignedIn } = useAuth();

  return isSignedIn ? children : <Navigate to="/signin" />;
};
