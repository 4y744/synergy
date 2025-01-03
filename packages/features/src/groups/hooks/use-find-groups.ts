import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { findGroupsQueryOptions } from "../api/find-groups";
import { FirestoreError } from "firebase/firestore";

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
    refetchInterval: Infinity,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  } satisfies UseFindGroupsQueryOptions);
};
