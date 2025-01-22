import { QueryClient } from "@tanstack/react-query";

import { findGroupsOptions } from "./find-groups";
import { getGroupOptions } from "./get-group";

export const loadGroups = async (queryClient: QueryClient) => {
  const groupIds = await queryClient.ensureQueryData(findGroupsOptions());
  await Promise.all(
    groupIds.map((groupId) => {
      return queryClient.ensureQueryData(getGroupOptions(groupId, queryClient));
    })
  );
};
