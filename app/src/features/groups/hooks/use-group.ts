import { QueryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { getGroupQueryOptions } from "../api/get-group";
import { Group } from "../types/group";
import { FirestoreError } from "firebase/firestore";

export type UseGroupQueryOptions = QueryOptions<
  Group,
  FirestoreError,
  Group,
  string[]
>;

export const useGroup = (
  groupId: string,
  options?: Partial<UseGroupQueryOptions>
) => {
  const queryClient = useQueryClient();
  return useQuery({
    ...options,
    ...getGroupQueryOptions(groupId, queryClient),
  } satisfies UseGroupQueryOptions);
};
