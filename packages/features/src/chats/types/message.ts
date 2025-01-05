import z from "zod";

export const MessageSchema = z.object({
  id: z.string(),
  created: z.date(),
  payload: z.string(),
  createdBy: z.string(),
});

export const NewMessageSchema = z.object({
  payload: z.string().min(1),
  createdBy: z.string(),
});

export type Message = z.infer<typeof MessageSchema>;

export type NewMessage = z.infer<typeof NewMessageSchema>;
