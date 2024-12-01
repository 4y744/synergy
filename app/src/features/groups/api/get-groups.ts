import { db } from "@/libs/firebase";
import {
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { GroupSchema } from "../schemas/group";

type Params = {
  uid: string;
};

export const getGroups = async ({ uid }: Params) => {
  const memberDocs = await getDocs(
    query(collectionGroup(db, "members"), where("uid", "==", uid))
  );
  const groupDocs = await Promise.all(
    memberDocs.docs
      .map((doc) => doc.ref.parent.parent?.id)
      .map((id) => getDoc(doc(db, "groups", `${id}`)))
  );
  const parsed = groupDocs.map((doc) => {
    const data = doc.data();
    return GroupSchema.safeParse({
      id: doc.id,
      name: data?.name,
      creator: data?.creator,
      created: new Date(data?.created.seconds),
    });
  });
  console.log(parsed[0].error);
  return parsed
    .map((group) => (group.success ? group.data : null))
    .filter((group) => group != null);
};
