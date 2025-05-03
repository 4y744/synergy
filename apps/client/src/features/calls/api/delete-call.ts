import {
  MutationOptions,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import { deleteDoc, doc, FirestoreError } from "firebase/firestore";

import { db } from "@synergy/libs/firebase";

type DeleteCallOptions = MutationOptions<void, FirestoreError, void>;

export const deleteCallOptions = (groupId: string, callId: string) => {
  return {
    mutationFn: () => deleteDoc(doc(db, "groups", groupId, "calls", callId)),
  } satisfies DeleteCallOptions;
};

type UseDeleteCallOptions = UseMutationOptions<void, FirestoreError, void>;

export const useDeleteCall = (
  groupId: string,
  callId: string,
  options?: Partial<UseDeleteCallOptions>
) => {
  return useMutation({
    ...options,
    ...deleteCallOptions(groupId, callId),
  } satisfies UseDeleteCallOptions);
};
