import {
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";

import { FirestoreError } from "firebase/firestore";

import { getMembersOptions } from "../api/get-members";
import { Member } from "../types/member";

type UseMembersOptions = UseQueryOptions<
  Member[],
  FirestoreError,
  Member[],
  string[]
>;

export const useMembers = (
  groupId: string,
  options?: Partial<UseMembersOptions>
) => {
  const queryClient = useQueryClient();
  return useQuery({
    ...options,
    ...getMembersOptions(queryClient, groupId),
  } satisfies UseMembersOptions);
};
