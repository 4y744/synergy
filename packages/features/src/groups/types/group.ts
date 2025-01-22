import z from "zod";

export const GroupSchema = z.object({
  id: z.string(),
  name: z.string(),
  creator: z.string(),
  createdAt: z.date(),
});

export const NewGroupSchema = z.object({
  name: z
    .string()
    .min(6, "form/group-too-short")
    .max(50, "form/group-too-long"),
});

export type Group = z.infer<typeof GroupSchema>;

export type NewGroup = z.infer<typeof NewGroupSchema>;
