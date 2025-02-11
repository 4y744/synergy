import z from "zod";

export const createFileInputSchema = z.instanceof(File);

export type CreateFileInput = z.infer<typeof createFileInputSchema>;
