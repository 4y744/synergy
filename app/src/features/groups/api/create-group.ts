import { db } from "@/libs/firebase";
import { UseMutationOptions } from "@tanstack/react-query";
import {
  addDoc,
  collection,
  doc,
  FirestoreError,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

export const createGroup = async (name: string, uid: string) => {
  const { id: groupId } = await addDoc(collection(db, "groups"), {
    name,
    creator: uid,
    created: serverTimestamp(),
  });
  await setDoc(doc(db, "groups", groupId, "members", uid), {
    uid: uid,
  });
  return groupId;
};

export const createGroupMutationOptions = () => {
  return {
    mutationKey: ["group", "add"],
    mutationFn: ({ name, uid }) => {
      return createGroup(name, uid);
    },
  } satisfies UseMutationOptions<
    string,
    FirestoreError,
    { name: string; uid: string }
  >;
};
