import {
  QueryClient,
  QueryOptions,
  useQueries,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { doc, FirestoreError, onSnapshot } from "firebase/firestore";
import z from "zod";

import { db } from "@synergy/libs/firebase";

import { useFindGroups } from "./find-groups";

export const groupSchema = z.object({
  id: z.string(),
  name: z.string(),
  icon: z.string().optional(),
  createdBy: z.string(),
  createdAt: z.date(),
});

export type Group = z.infer<typeof groupSchema>;

type GetGroupOptions = QueryOptions<Group, FirestoreError, Group, string[]>;

export const getGroupOptions = (queryClient: QueryClient, groupId: string) => {
  return {
    queryKey: ["groups", groupId],
    queryFn: ({ queryKey }) => {
      return new Promise<Group>((resolve, reject) => {
        const unsubscribe = onSnapshot(
          doc(db, "groups", groupId),
          (snapshot) => {
            const data = snapshot.data({ serverTimestamps: "estimate" });
            const group = groupSchema.safeParse({
              id: snapshot.id,
              name: data?.name,
              icon: data?.icon,
              createdBy: data?.createdBy,
              createdAt: data?.createdAt.toDate(),
            } satisfies Group);

            if (group.success) {
              resolve(group.data);
              queryClient.setQueryData(queryKey, group.data);
            } else {
              unsubscribe();
              reject(group.error);
              queryClient.removeQueries({ queryKey });
            }
          },
          (error) => {
            reject(error);
            queryClient.removeQueries({ queryKey });
          }
        );
      });
    },
  } satisfies GetGroupOptions;
};

type UseGroupOptions = UseQueryOptions<Group, FirestoreError, Group, string[]>;

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

export const useGroups = (options?: Partial<UseGroupOptions>) => {
  const { data: groupIds } = useFindGroups({
    initialData: [],
  });
  const queryClient = useQueryClient();
  return useQueries({
    queries:
      groupIds?.map((groupId) => {
        return {
          ...options,
          ...getGroupOptions(queryClient, groupId),
        } satisfies UseGroupOptions;
      }) || [],
  });
};
