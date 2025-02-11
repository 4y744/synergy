import { QueryClient, QueryOptions } from "@tanstack/react-query";

import { ZodError } from "zod";

import {
  collection,
  FirestoreError,
  onSnapshot,
  Unsubscribe,
} from "firebase/firestore";

import { registerQuerySubscription } from "@synergy/libs/react-query";

import { db } from "@synergy/libs/firebase";

import { Member, memberSchema } from "../types/member";

const getMembers = async (
  groupId: string,
  options?: {
    onUpdate?: (members: Member[]) => void;
    onError?: (error: FirestoreError | ZodError<Member[]>) => void;
  }
) => {
  let unsubscribe!: Unsubscribe;
  const members = await new Promise(
    (
      resolve: (members: Member[]) => void,
      reject: (error: ZodError<Member[]>) => void
    ) => {
      unsubscribe = onSnapshot(
        collection(db, "groups", groupId, "members"),
        (snapshot) => {
          const members = memberSchema.array().safeParse(
            snapshot.docs.map((doc) => {
              const { uid } = doc.data({ serverTimestamps: "estimate" });
              return {
                uid,
              } satisfies Member;
            })
          );

          if (members.success) {
            resolve(members.data);
            options?.onUpdate?.(members.data);
          } else {
            reject(members.error);
            options?.onError?.(members.error);
          }
        },
        options?.onError
      );
    }
  );
  return { members, unsubscribe };
};

type GetMembersOptions = QueryOptions<
  Member[],
  FirestoreError | ZodError<Member[]>,
  Member[],
  string[]
>;

export const getMembersOptions = (
  queryClient: QueryClient,
  groupId: string
) => {
  return {
    queryKey: ["groups", groupId, "members"],
    queryFn: async ({ queryKey }) => {
      const { members, unsubscribe } = await getMembers(groupId, {
        onUpdate: (data) => {
          queryClient.setQueryData(queryKey, data);
        },
        onError: () => {
          queryClient.removeQueries({ queryKey });
        },
      });
      registerQuerySubscription(queryClient, queryKey, unsubscribe);
      return members;
    },
  } satisfies GetMembersOptions;
};
