import { useQuery } from "@tanstack/react-query";
import { getGroups } from "../api/get-groups";

export const useGroups = (uid: string) => {
  return useQuery({
    queryKey: ["groups", uid],
    queryFn: () => getGroups({ uid }),
  });
};
