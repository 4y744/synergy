import {
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";

import { FirestoreError } from "firebase/firestore";

import { getInvitesOptions } from "../api/get-invites";
import { Invite } from "../types/invite";

type UseInvitesOptions = UseQueryOptions<
  Invite[],
  FirestoreError,
  Invite[],
  string[]
>;

export const useInvites = (
  groupId: string,
  options?: Partial<UseInvitesOptions>
) => {
  const queryClient = useQueryClient();
  return useQuery({
    ...options,
    ...getInvitesOptions(queryClient, groupId),
    staleTime: Infinity,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
  } satisfies UseInvitesOptions);
};
