import z from "zod";

export const updateGroupInputSchema = z.object({
  name: z
    .string()
    .min(6, "form/group-too-short")
    .max(50, "form/group-too-long"),
});

export type UpdateGroupInput = z.infer<typeof updateGroupInputSchema>;
