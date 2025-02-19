import z from "zod";

export const createMemberInputSchema = z.object({
  inviteId: z.string(),
});

export type CreateMemberInput = z.infer<typeof createMemberInputSchema>;
