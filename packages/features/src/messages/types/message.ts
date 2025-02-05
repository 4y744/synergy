import z from "zod";

export const messageSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  payload: z.string(),
  createdBy: z.string(),
});

export type Message = z.infer<typeof messageSchema>;
