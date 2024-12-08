import { db } from "@/libs/firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { CreateGroupMutationOptions } from "../types/create-group";

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
    mutationKey: ["groups", "create"],
    mutationFn: ({ name, uid }) => createGroup(name, uid),
  } satisfies CreateGroupMutationOptions;
};
