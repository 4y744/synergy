// import { db } from "@synergy/libs/firebase";
// import {
//   collection,
//   doc,
//   FirestoreError,
//   getDocs,
//   orderBy,
//   query,
//   startAfter,
// } from "firebase/firestore";
// import { Message, MessageSchema } from "../types/message";
// import {
//   InfiniteQueryPageParamsOptions,
//   UseInfiniteQueryOptions,
// } from "@tanstack/react-query";

// export const getMessages = async (
//   groupId: string,
//   chatId: string,
//   lastId: string | null
// ) => {
//   const { docs: messageDocs } = await getDocs(
//     query(
//       collection(db, "groups", groupId, "chats", chatId, "messages"),
//       orderBy("created"),
//       /* Either pass QueryConstraint if it exists or pass nothing. */
//       ...(lastId
//         ? [
//             startAfter(
//               doc(db, "groups", groupId, "chats", chatId, "messages", lastId)
//             ),
//           ]
//         : [])
//     )
//   );
//   const messages = messageDocs.map((doc) => {
//     const data = doc.data();
//     const message = MessageSchema.parse({
//       id: doc.id,
//       payload: data?.payload,
//       created: new Date(data?.created.seconds),
//     } satisfies Message);
//     return message;
//   });
//   return messages;
// };

// export type GetMessagesQueryOptions = UseInfiniteQueryOptions<
//   Message[],
//   FirestoreError,
//   Message[],
//   Message[],
//   string[],
//   string | null
// >;

// export const getMessagesQueryOptions = (
//   groupId: string,
//   chatId: string
// ): GetMessagesQueryOptions => {
//   return {
//     queryKey: ["groups", groupId, "chats", chatId, "messages"],
//     queryFn: ({ pageParam }) => {
//       return getMessages(groupId, chatId, pageParam);
//     },
//     getNextPageParam: (lastPage) => lastPage[lastPage.length - 1].id,
//     initialPageParam: null,
//   } satisfies GetMessagesQueryOptions;
// };
