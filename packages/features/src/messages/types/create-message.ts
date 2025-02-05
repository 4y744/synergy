import z from "zod";

export const createMessageInputSchema = z.object({
  payload: z.string().min(1),
});

export type CreateMessageInput = z.infer<typeof createMessageInputSchema>;
