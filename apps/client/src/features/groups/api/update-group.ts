import {
  MutationOptions,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import { doc, FirestoreError, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import z from "zod";

import { db, storage } from "@synergy/libs/firebase";

export const updateGroupInputSchema = z.object({
  name: z.string().min(4).max(32),
  icon: z.instanceof(File).optional(),
});

export type UpdateGroupInput = z.infer<typeof updateGroupInputSchema>;

type UpdateGroupOptions = MutationOptions<
  void,
  FirestoreError,
  UpdateGroupInput
>;

export const updateGroupOptions = (groupId: string) => {
  return {
    mutationFn: async (data) => {
      const groupDocRef = doc(db, "groups", groupId);
      if (data.icon) {
        const { ref: pfpRef } = await uploadBytes(
          ref(storage, `/groups/${groupId}/icon`),
          data.icon
        );
        const url = await getDownloadURL(pfpRef);
        await updateDoc(groupDocRef, {
          icon: url,
        });
      }
      if (data.name) {
        await updateDoc(groupDocRef, { name: data.name });
      }
    },
  } satisfies UpdateGroupOptions;
};

type UseUpdateGroupOptions = UseMutationOptions<
  void,
  FirestoreError,
  UpdateGroupInput
>;

export const useUpdateGroup = (
  groupId: string,
  options?: Partial<UseUpdateGroupOptions>
) => {
  return useMutation({
    ...options,
    ...updateGroupOptions(groupId),
  } satisfies UseUpdateGroupOptions);
};
