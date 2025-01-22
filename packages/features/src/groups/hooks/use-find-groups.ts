import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { FirestoreError } from "firebase/firestore";

import { findGroupsOptions } from "../api/find-groups";

type UseFindGroupsOptions = UseQueryOptions<
  string[],
  FirestoreError,
  string[],
  string[]
>;

export const useFindGroups = (options?: Partial<UseFindGroupsOptions>) => {
  return useQuery({
    ...options,
    ...findGroupsOptions(),
    staleTime: Infinity,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
  } satisfies UseFindGroupsOptions);
};
