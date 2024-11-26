import z from "zod";

export const GroupSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(6, "form/group-too-short")
    .max(50, "form/group-too-long"),
  created: z.date().optional(),
});
