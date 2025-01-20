import {
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { User } from "../types/user";
import { FirestoreError } from "firebase/firestore";
import { getUserOptions } from "../api/get-user";

export type UseUserOptions = UseQueryOptions<
  User,
  FirestoreError,
  User,
  string[]
>;

export const useUser = (uid: string, options?: Partial<UseUserOptions>) => {
  const queryClient = useQueryClient();
  return useQuery({
    ...options,
    ...getUserOptions(uid, queryClient),
    staleTime: Infinity,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
  } satisfies UseUserOptions);
};
