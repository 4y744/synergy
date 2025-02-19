import { useQueries, useQueryClient } from "@tanstack/react-query";

import { getGroupOptions } from "../api/get-group";
import { useFindGroups } from "./use-find-groups";
import { UseGroupOptions } from "./use-group";

export const useGroups = (options?: Partial<UseGroupOptions>) => {
  const { data: groupIds } = useFindGroups({
    initialData: [],
  });
  const queryClient = useQueryClient();
  return useQueries({
    queries:
      groupIds?.map((groupId) => {
        return {
          ...options,
          ...getGroupOptions(queryClient, groupId),
          staleTime: Infinity,
          refetchIntervalInBackground: false,
          refetchOnWindowFocus: false,
          throwOnError: false,
        } satisfies UseGroupOptions;
      }) || [],
  });
};
