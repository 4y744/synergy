import { QueryClient, QueryOptions } from "@tanstack/react-query";
import { collection, FirestoreError, onSnapshot } from "firebase/firestore";
import { ZodError } from "zod";

import { db } from "@synergy/libs/firebase";

import { Folder, folderSchema } from "../types/folder";

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
    queryFn: ({ queryKey }) => {
      return new Promise<Folder[]>((resolve, reject) => {
        const unsubscribe = onSnapshot(
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
              queryClient.setQueryData(queryKey, folders.data);
            } else {
              unsubscribe();
              reject(folders.error);
              queryClient.removeQueries({ queryKey });
            }
          },
          (err) => {
            reject(err);
            queryClient.removeQueries({ queryKey });
          }
        );
      });
    },
  } satisfies GetFoldersOptions;
};
