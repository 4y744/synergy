import { findGroupsQueryOptions } from "./find-groups";
import { getGroupQueryOptions } from "./get-group";
import { QueryClient } from "@tanstack/react-query";

export const loadGroups = async (uid: string, queryClient: QueryClient) => {
  const groupIds = await queryClient.fetchQuery(findGroupsQueryOptions(uid));
  const groups = await Promise.all(
    groupIds.map((groupId) => {
      const group = queryClient.fetchQuery(getGroupQueryOptions(groupId));
      queryClient.invalidateQueries({ queryKey: ["groups", groupId] });
      return group;
    })
  );
  return groups;
};
