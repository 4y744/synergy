import { QueryClient } from "@tanstack/react-query";

import { findGroupsOptions } from "./find-groups";
import { getGroupOptions } from "./get-group";

export const loadGroups = async (uid: string, queryClient: QueryClient) => {
  const groupIds = await queryClient.ensureQueryData(findGroupsOptions(uid));
  await Promise.all(
    groupIds.map((groupId) => {
      return queryClient.ensureQueryData(getGroupOptions(groupId, queryClient));
    })
  );
};
