import { useQueries, useQueryClient } from "@tanstack/react-query";

import { getGroupQueryOptions } from "../api/get-group";
import { useFindGroups } from "./use-find-groups";
import { UseGroupQueryOptions } from "./use-group";

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
        refetchIntervalInBackground: false,
        refetchOnWindowFocus: false,
      } satisfies UseGroupQueryOptions;
    }),
  });
};
