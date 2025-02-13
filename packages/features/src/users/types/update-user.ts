import z from "zod";

export const updateUserInputSchema = z.object({
  username: z.string().optional(),
  pfp: z.instanceof(File).optional(),
});

export type UpdateUserInput = z.infer<typeof updateUserInputSchema>;
