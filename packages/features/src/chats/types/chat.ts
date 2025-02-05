import z from "zod";

export const chatSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.date(),
});

export type Chat = z.infer<typeof chatSchema>;
