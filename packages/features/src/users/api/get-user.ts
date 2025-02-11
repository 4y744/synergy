import { QueryClient, QueryOptions } from "@tanstack/react-query";

import {
  doc,
  FirestoreError,
  onSnapshot,
  Unsubscribe,
} from "firebase/firestore";

import { db } from "@synergy/libs/firebase";
import { registerQuerySubscription } from "@synergy/libs/react-query";

import { User, userSchema } from "../types/user";
import { ZodError } from "zod";

const getUser = async (
  uid: string,
  options?: {
    onUpdate?: (user: User) => void;
    onError?: (error: FirestoreError | ZodError<User>) => void;
  }
) => {
  let unsubscribe!: Unsubscribe;
  const user = await new Promise(
    (
      resolve: (user: User) => void,
      reject: (error: ZodError<User>) => void
    ) => {
      unsubscribe = onSnapshot(
        doc(db, "users", uid),
        (snapshot) => {
          const data = snapshot.data({ serverTimestamps: "estimate" });
          const user = userSchema.safeParse({
            uid,
            username: data?.username,
            createdAt: data?.createdAt.toDate(),
          } satisfies User);

          if (user.success) {
            resolve(user.data);
            options?.onUpdate?.(user.data);
          } else {
            reject(user.error);
            options?.onError?.(user.error);
          }
        },
        options?.onError
      );
    }
  );
  return { user, unsubscribe };
};

type GetUserOptions = QueryOptions<User, FirestoreError, User, string[]>;

export const getUserOptions = (queryClient: QueryClient, uid: string) => {
  return {
    queryKey: ["users", uid],
    queryFn: async ({ queryKey }) => {
      const { user, unsubscribe } = await getUser(uid, {
        onUpdate: (user) => {
          queryClient.setQueryData(queryKey, user);
        },
        onError: () => {
          queryClient.removeQueries({ queryKey });
        },
      });
      registerQuerySubscription(queryClient, queryKey, unsubscribe);
      return user;
    },
  } satisfies GetUserOptions;
};
