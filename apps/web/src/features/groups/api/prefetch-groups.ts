import { findGroupsQueryOptions } from "./find-groups";
import { QueryClient } from "@tanstack/react-query";
import { getGroupQueryOptions } from "./get-group";

export const prefetchGroups = async (uid: string, queryClient: QueryClient) => {
  const groupIds = await queryClient.fetchQuery(findGroupsQueryOptions(uid));
  await Promise.all(
    groupIds.map((groupId) => {
      return queryClient.prefetchQuery(
        getGroupQueryOptions(groupId, queryClient)
      );
    })
  );
  return null;
};
