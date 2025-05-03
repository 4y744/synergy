import {
  MutationOptions,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import { doc, FirestoreError, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import z from "zod";

import { auth, db, storage } from "@synergy/libs/firebase";

export const updateUserInputSchema = z.object({
  username: z.string().optional(),
  pfp: z.instanceof(File).optional(),
});

export type UpdateUserInput = z.infer<typeof updateUserInputSchema>;

type UpdateUserOptions = MutationOptions<void, FirestoreError, UpdateUserInput>;

export const updateUserOptions = () => {
  return {
    mutationFn: async (data) => {
      const userDocRef = doc(db, "users", auth.currentUser?.uid!);
      if (data.pfp) {
        const { ref: pfpRef } = await uploadBytes(
          ref(storage, `/users/${auth.currentUser!.uid}`),
          data.pfp
        );
        const url = await getDownloadURL(pfpRef);
        await updateDoc(userDocRef, {
          pfp: url,
        });
      }
      if (data.username) {
        await updateDoc(userDocRef, {
          username: data.username,
        });
      }
    },
  } satisfies UpdateUserOptions;
};

type UseUpdateUserOptions = UseMutationOptions<
  void,
  FirestoreError,
  UpdateUserInput
>;

export const useUpdateUser = (options?: Partial<UseUpdateUserOptions>) => {
  return useMutation({
    ...options,
    ...updateUserOptions(),
  } satisfies UseUpdateUserOptions);
};
