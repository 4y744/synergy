import z from "zod";

export const createInviteInputSchema = z.object({
  expiresAt: z.date(),
});

export type CreateInviteInput = z.infer<typeof createInviteInputSchema>;
