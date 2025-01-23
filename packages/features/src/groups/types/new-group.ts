import z from "zod";

export const NewGroupSchema = z.object({
  name: z
    .string()
    .min(6, "form/group-too-short")
    .max(50, "form/group-too-long"),
});

export type NewGroup = z.infer<typeof NewGroupSchema>;
