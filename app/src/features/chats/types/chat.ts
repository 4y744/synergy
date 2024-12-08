import z from "zod";

export const ChatSchema = z.object({
  id: z.string(),
  name: z.string().min(6, "form/chat-too-short").max(50, "form/chat-too-long"),
  created: z.date(),
});

export type Chat = z.infer<typeof ChatSchema>;
