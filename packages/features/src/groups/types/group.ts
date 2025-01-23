import z from "zod";

export const GroupSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdBy: z.string(),
  createdAt: z.date(),
});

export type Group = z.infer<typeof GroupSchema>;
