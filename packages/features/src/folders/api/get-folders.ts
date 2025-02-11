import { QueryClient, QueryOptions } from "@tanstack/react-query";

import {
  collection,
  FirestoreError,
  onSnapshot,
  Unsubscribe,
} from "firebase/firestore";

import { ZodError } from "zod";

import { db } from "@synergy/libs/firebase";

import { registerQuerySubscription } from "@synergy/libs/react-query";

import { Folder, folderSchema } from "../types/folder";

const getFolders = async (
  groupId: string,
  options?: {
    onUpdate?: (folders: Folder[]) => void;
    onError?: (error: FirestoreError | ZodError<Folder[]>) => void;
  }
) => {
  let unsubscribe!: Unsubscribe;
  const folders = await new Promise(
    (
      resolve: (folders: Folder[]) => void,
      reject: (error: FirestoreError | ZodError<Folder[]>) => void
    ) => {
      unsubscribe = onSnapshot(
        collection(db, "groups", groupId, "folders"),
        (snapshot) => {
          const folders = folderSchema.array().safeParse(
            snapshot.docs.map((doc) => {
              const data = doc.data({ serverTimestamps: "estimate" });
              return {
                id: doc.id,
                name: data?.name,
                createdAt: data?.createdAt.toDate(),
              } satisfies Folder;
            })
          );

          if (folders.success) {
            resolve(folders.data);
            options?.onUpdate?.(folders.data);
          } else {
            reject(folders.error);
            options?.onError?.(folders.error);
          }
        },
        options?.onError
      );
    }
  );
  return { folders, unsubscribe };
};

type GetFoldersOptions = QueryOptions<
  Folder[],
  FirestoreError | ZodError<Folder[]>,
  Folder[],
  string[]
>;

export const getFoldersOptions = (
  queryClient: QueryClient,
  groupId: string
) => {
  return {
    queryKey: ["groups", groupId, "folders"],
    queryFn: async ({ queryKey }) => {
      const { folders, unsubscribe } = await getFolders(groupId, {
        onUpdate: (group) => {
          queryClient.setQueryData(queryKey, group);
        },
        onError: () => {
          queryClient.removeQueries({ queryKey });
        },
      });
      registerQuerySubscription(queryClient, queryKey, unsubscribe);
      return folders;
    },
  } satisfies GetFoldersOptions;
};
