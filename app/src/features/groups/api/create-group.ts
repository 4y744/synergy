import { db } from "@/libs/firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

type CreateGroupParams = {
  name: string;
  creator: string;
};

export const createGroup = async ({ name, creator }: CreateGroupParams) => {
  const group = await addDoc(collection(db, "groups"), {
    name,
    creator,
    created: serverTimestamp(),
  });
  await setDoc(doc(db, "groups", group.id, "members", creator), {
    uid: creator,
  });
  return group;
};
