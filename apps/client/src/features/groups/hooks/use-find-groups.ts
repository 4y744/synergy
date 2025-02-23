import {
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";

import { FirestoreError } from "firebase/firestore";

import { findGroupsOptions } from "../api/find-groups";

type UseFindGroupsOptions = UseQueryOptions<
  string[],
  FirestoreError,
  string[],
  string[]
>;

export const useFindGroups = (options?: Partial<UseFindGroupsOptions>) => {
  const queryClient = useQueryClient();
  return useQuery({
    ...options,
    ...findGroupsOptions(queryClient),
  } satisfies UseFindGroupsOptions);
};
