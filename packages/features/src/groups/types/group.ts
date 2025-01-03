import z from "zod";

export const GroupSchema = z.object({
  id: z.string(),
  name: z.string(),
  creator: z.string(),
  created: z.date(),
});

export const NewGroupSchema = z.object({
  name: z
    .string()
    .min(6, "form/group-too-short")
    .max(50, "form/group-too-long"),
  uid: z.string(),
});

export type Group = z.infer<typeof GroupSchema>;

export type NewGroup = z.infer<typeof NewGroupSchema>;
