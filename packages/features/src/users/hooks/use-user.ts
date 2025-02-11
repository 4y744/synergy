import {
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { FirestoreError } from "firebase/firestore";

import { getUserOptions } from "../api/get-user";
import { User } from "../types/user";

type UseUserOptions = UseQueryOptions<User, FirestoreError, User, string[]>;

export const useUser = (uid: string, options?: Partial<UseUserOptions>) => {
  const queryClient = useQueryClient();
  return useQuery({
    ...options,
    ...getUserOptions(queryClient, uid),
    staleTime: Infinity,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
  } satisfies UseUserOptions);
};
