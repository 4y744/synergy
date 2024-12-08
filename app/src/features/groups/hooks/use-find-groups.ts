import { useQuery } from "@tanstack/react-query";
import { findGroupsQueryOptions } from "../api/find-groups";
import { UseFindGroupsQueryOptions } from "../types/find-groups";

export const useFindGroups = (
  uid: string,
  options?: UseFindGroupsQueryOptions
) => {
  return useQuery({
    ...options,
    ...findGroupsQueryOptions(uid),
  });
};
