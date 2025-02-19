import { QueryClient, QueryOptions } from "@tanstack/react-query";
import { collection, FirestoreError, onSnapshot } from "firebase/firestore";

import { db } from "@synergy/libs/firebase";

import { fileSchema, TFile } from "../types/file";

export type GetFilesOptions = QueryOptions<
  TFile[],
  FirestoreError,
  TFile[],
  string[]
>;

export const getFilesOptions = (
  queryClient: QueryClient,
  groupId: string,
  folderId: string
) => {
  return {
    queryKey: ["groups", groupId, "folders", folderId, "files"],
    queryFn: ({ queryKey }) => {
      return new Promise((resolve, reject) => {
        const unsubscribe = onSnapshot(
          collection(db, "groups", groupId, "folders", folderId, "files"),
          (snapshot) => {
            const files = fileSchema.array().safeParse(
              snapshot.docs.map((doc) => {
                const data = doc.data({
                  serverTimestamps: "estimate",
                });
                return {
                  id: doc.id,
                  name: data?.name,
                  url: data?.url,
                  createdBy: data?.createdBy,
                  createdAt: data?.createdAt.toDate(),
                } satisfies TFile;
              })
            );

            if (files.success) {
              resolve(files.data);
              queryClient.setQueryData(queryKey, files.data);
            } else {
              unsubscribe();
              reject(files.error);
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
  } satisfies GetFilesOptions;
};
