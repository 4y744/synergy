import { useQueries, useQueryClient } from "@tanstack/react-query";
import { useFindGroups } from "./use-find-groups";
import { useEffect } from "react";
import { UseGroupQueryOptions } from "./use-group";
import { getGroupQueryOptions } from "../api/get-group";
import { subscribeGroup } from "../api/subscribe-group";

/**
 * Requires ```groupsLoader``` to prefetch data.
 * If a specific query is marked as ```stale```, it fetches it and actively keeps it updated.
 * When unmounted, fires a ```signal``` that unsibscribes from the updater. It also marks all group queries as ```stale```.
 * This forces the upper-most ```useGroups``` in the component tree to refetch them and add its own updater.
 * @param uid used to find groups that belong to the user.
 * @returns groups that the user is a member of.
 */
export const useGroups = (
  uid: string,
  options?: Partial<UseGroupQueryOptions>
) => {
  const { data: groupIds } = useFindGroups(uid, {
    initialData: [],
  });
  const queryClient = useQueryClient();
  useEffect(() => {
    const unsubscribeArr = groupIds?.map((groupId) => {
      return subscribeGroup(groupId, (group) => {
        queryClient.setQueryData(["groups", groupId], group);
      });
    });
    return () => {
      unsubscribeArr?.forEach((unsubscribe) => unsubscribe());
    };
  }, []);
  return useQueries({
    queries:
      groupIds!.map(
        (groupId) =>
          ({
            ...options,
            ...getGroupQueryOptions(groupId),
          }) satisfies UseGroupQueryOptions
      ) || [],
  });
};
