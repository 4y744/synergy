import z from "zod";

export const MessageSchema = z.object({
  id: z.string(),
  created: z.date(),
  payload: z.string(),
});

export type Message = z.infer<typeof MessageSchema>;
