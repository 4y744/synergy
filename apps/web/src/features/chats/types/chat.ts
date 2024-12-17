import z from "zod";

export const ChatSchema = z.object({
  id: z.string(),
  name: z.string(),
  created: z.date(),
});

export const NewChatShema = z.object({
  name: z.string().min(6, "form/chat-too-short").max(50, "form/chat-too-long"),
});

export type Chat = z.infer<typeof ChatSchema>;
export type NewChat = z.infer<typeof NewChatShema>;
