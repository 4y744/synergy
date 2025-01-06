import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { FirestoreError } from "firebase/firestore";

import { findGroupsOptions } from "../api/find-groups";

export type UseFindGroupsOptions = UseQueryOptions<
  string[],
  FirestoreError,
  string[],
  string[]
>;

export const useFindGroups = (
  uid: string,
  options?: Partial<UseFindGroupsOptions>
) => {
  return useQuery({
    ...options,
    ...findGroupsOptions(uid),
    staleTime: Infinity,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
  } satisfies UseFindGroupsOptions);
};
