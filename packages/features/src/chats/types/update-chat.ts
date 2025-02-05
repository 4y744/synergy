import z from "zod";

export const updateChatInputSchema = z.object({
  name: z.string().min(6, "form/chat-too-short").max(50, "form/chat-too-long"),
});

export type UpdateChatInput = z.infer<typeof updateChatInputSchema>;
