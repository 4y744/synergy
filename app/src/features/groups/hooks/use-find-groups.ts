import { useQuery } from "@tanstack/react-query";
import { findGroupsQueryOptions } from "../api/find-groups";

export const useFindGroups = (uid: string) => {
  return useQuery(findGroupsQueryOptions(uid));
};
