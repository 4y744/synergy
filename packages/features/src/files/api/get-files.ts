import { QueryClient, QueryOptions } from "@tanstack/react-query";

import {
  collection,
  FirestoreError,
  onSnapshot,
  Unsubscribe,
} from "firebase/firestore";

import { db } from "@synergy/libs/firebase";

import { registerQuerySubscription } from "@synergy/libs/react-query";

import { ZodError } from "zod";

import { fileSchema, TFile } from "../types/file";

const getFiles = async (
  groupId: string,
  folderId: string,
  options?: {
    onUpdate?: (files: TFile[]) => void;
    onError?: (error: FirestoreError | ZodError<TFile[]>) => void;
  }
) => {
  let unsubscribe!: Unsubscribe;
  const files = await new Promise(
    (
      resolve: (files: TFile[]) => void,
      reject: (error: ZodError<TFile[]>) => void
    ) => {
      unsubscribe = onSnapshot(
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
            options?.onUpdate?.(files.data);
          } else {
            reject(files.error);
            options?.onError?.(files.error);
          }
        },
        options?.onError
      );
    }
  );
  return { files, unsubscribe };
};

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
    queryFn: async ({ queryKey }) => {
      const { files, unsubscribe } = await getFiles(groupId, folderId, {
        onUpdate: (files) => {
          queryClient.setQueryData(queryKey, files);
        },
        onError: () => {
          queryClient.removeQueries({ queryKey });
        },
      });
      registerQuerySubscription(queryClient, queryKey, unsubscribe);
      return files;
    },
  } satisfies GetFilesOptions;
};
