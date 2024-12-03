import { LoaderFunctionArgs } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";

export type DataLoader = (
  args: LoaderFunctionArgs,
  queryClient: QueryClient
) => any | Promise<any>;
