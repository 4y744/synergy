import z from "zod";

export const createGroupInputSchema = z.object({
  name: z
    .string()
    .min(6, "form/group-too-short")
    .max(50, "form/group-too-long"),
});

export type CreateGroupInput = z.infer<typeof createGroupInputSchema>;
