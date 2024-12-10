import { QueryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { getGroupQueryOptions } from "../api/get-group";
import { useEffect } from "react";
import { Group } from "../types/group";
import { FirestoreError } from "firebase/firestore";
import { subscribeGroup } from "../api/subscribe-group";

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
  useEffect(() => {
    const unsubscribe = subscribeGroup(groupId, (group) => {
      queryClient.setQueryData(["groups", groupId], group);
    });
    return () => unsubscribe();
  }, []);
  return useQuery({
    ...options,
    ...getGroupQueryOptions(groupId),
  } satisfies UseGroupQueryOptions);
};
