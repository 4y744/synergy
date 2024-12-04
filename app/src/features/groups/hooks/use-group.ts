import { useQuery, useQueryClient } from "@tanstack/react-query";
import { subscribeGroupQueryOptions } from "../api/subscribe-group";

export const useGroup = (groupId: string) => {
  const queryClient = useQueryClient();
  const query = useQuery(
    subscribeGroupQueryOptions(groupId, {
      onUpdate: (group) => {
        queryClient.setQueryData(["group", groupId], group);
      },
      onAbort: () => {
        queryClient.invalidateQueries({ queryKey: ["group", groupId] });
      },
    })
  );
  return query.data!;
};
