import { doc, onSnapshot } from "firebase/firestore";
import { Group, GroupSchema } from "../types/group";
import { db } from "@/libs/firebase";

export const subscribeGroup = (
  groupId: string,
  onUpdate: (group: Group) => void
) => {
  return onSnapshot(doc(db, "groups", groupId), async (snapshot) => {
    const data = snapshot.data();
    const group = GroupSchema.parse({
      id: snapshot.id,
      name: data?.name,
      creator: data?.creator,
      created: new Date(data?.created.seconds),
    });
    onUpdate(group);
  });
};
