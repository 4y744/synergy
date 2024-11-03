import { useQuery } from "@tanstack/react-query";
import { getGroupsQueryOptions } from "../api/getGroups";

export const useGroups = (uid: string) => {
  return useQuery(getGroupsQueryOptions(uid));
};
