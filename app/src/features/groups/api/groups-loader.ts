import { findGroupsQueryOptions } from "./find-groups";
import { getGroupQueryOptions } from "./get-group";
import { QueryClient } from "@tanstack/react-query";

export const groupsLoader = async (uid: string, queryClient: QueryClient) => {
  const groupIds = await queryClient.ensureQueryData(
    findGroupsQueryOptions(uid)
  );
  const groups = await Promise.all(
    groupIds.map((groupId) => {
      return queryClient.ensureQueryData(getGroupQueryOptions(groupId));
    })
  );
  //Invalidate, because group queries without subscribtions are considered stale immediately.
  //This allows useGroups to render the initial stale data without errors and then fetch and subscribe itself.
  queryClient.invalidateQueries({ queryKey: ["group"] });
  return groups;
};
