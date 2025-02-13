import { QueryClient, QueryOptions } from "@tanstack/react-query";
import { doc, FirestoreError, onSnapshot } from "firebase/firestore";
import { ZodError } from "zod";

import { db } from "@synergy/libs/firebase";

import { Group, groupSchema } from "../types/group";

type GetGroupOptions = QueryOptions<
  Group,
  FirestoreError | ZodError<Group>,
  Group,
  string[]
>;

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
