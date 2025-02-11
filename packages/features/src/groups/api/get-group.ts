import { QueryClient, QueryOptions } from "@tanstack/react-query";

import { Unsubscribe } from "firebase/auth";
import { doc, FirestoreError, onSnapshot } from "firebase/firestore";

import { ZodError } from "zod";

import { db } from "@synergy/libs/firebase";
import { registerQuerySubscription } from "@synergy/libs/react-query";

import { Group, groupSchema } from "../types/group";

const getGroup = async (
  groupId: string,
  options?: {
    onUpdate?: (group: Group) => void;
    onError?: (error: FirestoreError | ZodError<Group>) => void;
  }
) => {
  let unsubscribe!: Unsubscribe;
  const group = await new Promise(
    (
      resolve: (group: Group) => void,
      reject: (error: ZodError<Group>) => void
    ) => {
      unsubscribe = onSnapshot(
        doc(db, "groups", groupId),
        (snapshot) => {
          const data = snapshot.data({ serverTimestamps: "estimate" });
          const group = groupSchema.safeParse({
            id: snapshot.id,
            name: data?.name,
            createdBy: data?.createdBy,
            createdAt: data?.createdAt.toDate(),
          } satisfies Group);

          if (group.success) {
            resolve(group.data);
            options?.onUpdate?.(group.data);
          } else {
            reject(group.error);
            options?.onError?.(group.error);
          }
        },
        options?.onError
      );
    }
  );
  return { group, unsubscribe };
};

type GetGroupOptions = QueryOptions<
  Group,
  FirestoreError | ZodError<Group>,
  Group,
  string[]
>;

export const getGroupOptions = (queryClient: QueryClient, groupId: string) => {
  return {
    queryKey: ["groups", groupId],
    queryFn: async ({ queryKey }) => {
      const { group, unsubscribe } = await getGroup(groupId, {
        onUpdate: (group) => {
          queryClient.setQueryData(queryKey, group);
        },
        onError: () => {
          queryClient.removeQueries({ queryKey });
        },
      });
      registerQuerySubscription(queryClient, queryKey, unsubscribe);
      return group;
    },
  } satisfies GetGroupOptions;
};
