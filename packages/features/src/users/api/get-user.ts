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

const getUser = async (
  uid: string,
  options?: {
    onUpdate?: (user: User) => void;
  }
) => {
  let unsubscribe!: Unsubscribe;
  const user = await new Promise((resolve: (user: User) => void) => {
    unsubscribe = onSnapshot(
      doc(db, "users", uid),
      (snapshot) => {
        const data = snapshot.data({ serverTimestamps: "estimate" });
        const user = userSchema.parse({
          uid,
          username: data?.username,
          createdAt: data?.createdAt.toDate(),
        } satisfies User);
        resolve(user);
        options?.onUpdate?.(user);
      },
      unsubscribe
    );
  });
  return { user, unsubscribe };
};

type GetUserOptions = QueryOptions<User, FirestoreError, User, string[]>;

export const getUserOptions = (uid: string, queryClient: QueryClient) => {
  return {
    queryKey: ["users", uid],
    queryFn: async ({ queryKey }) => {
      const { user, unsubscribe } = await getUser(uid, {
        onUpdate: (user) => {
          queryClient.setQueryData(queryKey, user);
        },
      });
      registerQuerySubscription(queryClient, queryKey, unsubscribe);
      return user;
    },
  } satisfies GetUserOptions;
};
