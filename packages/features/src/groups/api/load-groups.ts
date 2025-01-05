import { findGroupsQueryOptions } from "./find-groups";
import { QueryClient } from "@tanstack/react-query";
import { getGroupQueryOptions } from "./get-group";

export const loadGroups = async (uid: string, queryClient: QueryClient) => {
  const groupIds = await queryClient.ensureQueryData(
    findGroupsQueryOptions(uid)
  );
  await Promise.all(
    groupIds.map((groupId) => {
      return queryClient.ensureQueryData(
        getGroupQueryOptions(groupId, queryClient)
      );
    })
  );
};
