import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { FirestoreError } from "firebase/firestore";

import { findGroupsQueryOptions } from "../api/find-groups";

export type UseFindGroupsQueryOptions = UseQueryOptions<
  string[],
  FirestoreError,
  string[],
  string[]
>;

export const useFindGroups = (
  uid: string,
  options?: Partial<UseFindGroupsQueryOptions>
) => {
  return useQuery({
    ...options,
    ...findGroupsQueryOptions(uid),
    staleTime: Infinity,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
  } satisfies UseFindGroupsQueryOptions);
};
