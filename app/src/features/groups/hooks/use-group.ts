import { useQuery, useQueryClient } from "@tanstack/react-query";
import { subscribeGroupQueryOptions } from "../api/subscribe-group";
import { UseGroupQueryOptions } from "../types/group";

export const useGroup = (groupId: string, options?: UseGroupQueryOptions) => {
  const queryClient = useQueryClient();
  const query = useQuery({
    ...options,
    ...subscribeGroupQueryOptions(groupId, {
      onUpdate: (group) => {
        queryClient.setQueryData(["groups", groupId], group);
      },
      onAbort: () => {
        queryClient.invalidateQueries({ queryKey: ["groups", groupId] });
      },
    }),
  });
  return query.data!;
};
