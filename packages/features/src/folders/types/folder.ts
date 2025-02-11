import z from "zod";

export const folderSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.date(),
});

export type Folder = z.infer<typeof folderSchema>;
