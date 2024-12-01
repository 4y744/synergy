import { db } from "@/libs/firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

type Params = {
  name: string;
  creator: string;
};

export const createGroup = async ({ name, creator }: Params) => {
  const groupDoc = await addDoc(collection(db, "groups"), {
    name,
    creator,
    created: serverTimestamp(),
  });
  await setDoc(doc(db, "groups", groupDoc.id, "members", creator), {
    uid: creator,
  }).catch((err) => console.log(err));
  return groupDoc.id;
};
