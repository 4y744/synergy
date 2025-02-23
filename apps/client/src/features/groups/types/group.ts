import z from "zod";

export const groupSchema = z.object({
  id: z.string(),
  name: z.string(),
  icon: z.string().optional(),
  createdBy: z.string(),
  createdAt: z.date(),
});

export type Group = z.infer<typeof groupSchema>;
