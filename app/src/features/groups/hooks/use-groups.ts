import { useQueries, useQueryClient } from "@tanstack/react-query";
import { useFindGroups } from "./use-find-groups";
import { subscribeGroupQueryOptions } from "../api/subscribe-group";
import { UseGroupQueryOptions } from "../types/group";

/**
 * Requires ```groupsLoader``` to prefetch data.
 * If a specific query is marked as ```stale```, it fetches it and actively keeps it updated.
 * When unmounted, fires a ```signal``` that unsibscribes from the updater. It also marks all group queries as ```stale```.
 * This forces the upper-most ```useGroups``` in the component tree to refetch them and add its own updater.
 * @param uid used to find groups that belong to the user.
 * @returns groups that the user is a member of.
 */
export const useGroups = (uid: string, options?: UseGroupQueryOptions) => {
  const { data: groupIds } = useFindGroups(uid);
  const queryClient = useQueryClient();
  const queries = useQueries({
    queries: groupIds!.map((groupId) => ({
      ...options,
      ...subscribeGroupQueryOptions(groupId, {
        onUpdate: (group) => {
          queryClient.setQueryData(["groups", groupId], group);
        },
        onAbort: () => {
          queryClient.invalidateQueries({ queryKey: ["groups", groupId] });
        },
      }),
    })),
  });
  return queries.map((query) => query.data!);
};
