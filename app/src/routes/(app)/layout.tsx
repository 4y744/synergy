import { Outlet, redirect } from "react-router-dom";
import { authenticate } from "@/features/auth/api/authenticate";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const loader = async () => {
  const { signedIn } = await authenticate();
  if (!signedIn) {
    throw redirect("/signin");
  }
  return null;
};

export const Component = () => {
  const [queryClient] = useState(new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
};
