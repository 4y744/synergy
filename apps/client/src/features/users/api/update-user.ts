import { MutationOptions } from "@tanstack/react-query";
import { doc, FirestoreError, updateDoc } from "firebase/firestore";

import { auth, db, storage } from "@synergy/libs/firebase";

import { UpdateUserInput } from "../types/update-user";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

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
      await updateDoc(userDocRef, {
        username: data.username,
      });
    },
  } satisfies UpdateUserOptions;
};
