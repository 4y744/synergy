import { useQueries, useQueryClient } from "@tanstack/react-query";
import { useFindGroups } from "./use-find-groups";
import { UseGroupQueryOptions } from "./use-group";
import { getGroupQueryOptions } from "../api/get-group";

export const useGroups = (
  uid: string,
  options?: Partial<UseGroupQueryOptions>
) => {
  const { data: groupIds } = useFindGroups(uid, {
    initialData: [],
  });
  const queryClient = useQueryClient();
  return useQueries({
    queries: groupIds!.map((groupId) => {
      return {
        ...options,
        ...getGroupQueryOptions(groupId, queryClient),
        staleTime: Infinity,
        refetchInterval: Infinity,
        refetchIntervalInBackground: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
      } satisfies UseGroupQueryOptions;
    }),
  });
};
