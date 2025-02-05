import z from "zod";

export const memberSchema = z.object({
  uid: z.string(),
});

export type Member = z.infer<typeof memberSchema>;
