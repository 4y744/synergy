import { useQueries, useQueryClient } from "@tanstack/react-query";

import { getGroupOptions } from "../api/get-group";
import { useFindGroups } from "./use-find-groups";
import { UseGroupOptions } from "./use-group";

export const useGroups = (uid: string, options?: Partial<UseGroupOptions>) => {
  const { data: groupIds } = useFindGroups(uid, {
    initialData: [],
  });
  const queryClient = useQueryClient();
  return useQueries({
    queries: groupIds!.map((groupId) => {
      return {
        ...options,
        ...getGroupOptions(groupId, queryClient),
        staleTime: Infinity,
        refetchIntervalInBackground: false,
        refetchOnWindowFocus: false,
      } satisfies UseGroupOptions;
    }),
  });
};
