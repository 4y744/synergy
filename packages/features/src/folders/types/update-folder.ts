import z from "zod";

export const updateFolderInputSchema = z.object({
  name: z.string().min(6, "form/name-too-short").max(50, "form/name-too-long"),
});

export type UpdateFolderInput = z.infer<typeof updateFolderInputSchema>;
