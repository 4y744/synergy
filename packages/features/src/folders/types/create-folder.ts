import z from "zod";

export const createFolderInputSchema = z.object({
  name: z.string().min(6, "form/chat-too-short").max(50, "form/chat-too-long"),
});

export type CreateFolderInput = z.infer<typeof createFolderInputSchema>;
