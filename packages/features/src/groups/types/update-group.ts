import z from "zod";

export const UpdateGroupSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .min(6, "form/group-too-short")
    .max(50, "form/group-too-long"),
});

export type UpdateGroup = z.infer<typeof UpdateGroupSchema>;
