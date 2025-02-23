import {
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";

import { FirestoreError } from "firebase/firestore";

import { getGroupOptions } from "../api/get-group";
import { Group } from "../types/group";

export type UseGroupOptions = UseQueryOptions<
  Group,
  FirestoreError,
  Group,
  string[]
>;

export const useGroup = (
  groupId: string,
  options?: Partial<UseGroupOptions>
) => {
  const queryClient = useQueryClient();
  return useQuery({
    ...options,
    ...getGroupOptions(queryClient, groupId),
  } satisfies UseGroupOptions);
};
