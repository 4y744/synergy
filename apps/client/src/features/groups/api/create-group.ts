import {
  MutationOptions,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import {
  addDoc,
  collection,
  doc,
  FirestoreError,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import z from "zod";

import { auth, db } from "@synergy/libs/firebase";

export const createGroupInputSchema = z.object({
  name: z.string().min(4).max(32),
});

export type CreateGroupInput = z.infer<typeof createGroupInputSchema>;

type CreateGroupOptions = MutationOptions<
  string,
  FirestoreError,
  CreateGroupInput
>;

export const createGroupOptions = () => {
  return {
    mutationFn: async (data) => {
      const uid = auth.currentUser!.uid;
      const { id: groupId } = await addDoc(collection(db, "groups"), {
        ...data,
        createdBy: uid,
        createdAt: serverTimestamp(),
      });
      await setDoc(doc(db, "groups", groupId, "members", uid), {
        uid,
      });
      return groupId;
    },
  } satisfies CreateGroupOptions;
};

type UseCreateGroupOptions = UseMutationOptions<
  string,
  FirestoreError,
  CreateGroupInput
>;

export const useCreateGroup = (options?: Partial<UseCreateGroupOptions>) => {
  return useMutation({
    ...options,
    ...createGroupOptions(),
  } satisfies UseCreateGroupOptions);
};
