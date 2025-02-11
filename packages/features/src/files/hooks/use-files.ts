import {
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";

import { FirestoreError } from "firebase/firestore";

import { ZodError } from "zod";

import { getFilesOptions } from "../api/get-files";
import { TFile } from "../types/file";

export type UseFilesOptions = UseQueryOptions<
  TFile[],
  FirestoreError | ZodError,
  TFile[],
  string[]
>;

export const useFiles = (
  groupId: string,
  folderId: string,
  options?: Partial<UseFilesOptions>
) => {
  const queryClient = useQueryClient();
  return useQuery({
    ...options,
    ...getFilesOptions(queryClient, groupId, folderId),
    staleTime: Infinity,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
  } satisfies UseFilesOptions);
};
