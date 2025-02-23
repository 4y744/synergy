import {
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { FirestoreError } from "firebase/firestore";

import { getFoldersOptions } from "../api/get-folders";

import { Folder } from "../types/folder";

export type UseFoldersOptions = UseQueryOptions<
  Folder[],
  FirestoreError,
  Folder[],
  string[]
>;

export const useFolders = (
  groupId: string,
  options?: Partial<UseFoldersOptions>
) => {
  const queryClient = useQueryClient();
  return useQuery({
    ...options,
    ...getFoldersOptions(queryClient, groupId),
  } satisfies UseFoldersOptions);
};
