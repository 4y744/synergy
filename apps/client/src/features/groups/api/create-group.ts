import { MutationOptions } from "@tanstack/react-query";

import {
  addDoc,
  collection,
  doc,
  FirestoreError,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { auth, db } from "@synergy/libs/firebase";

import { CreateGroupInput } from "../types/create-group";

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
