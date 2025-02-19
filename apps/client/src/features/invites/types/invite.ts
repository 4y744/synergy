import z from "zod";

export const inviteSchema = z.object({
  id: z.string(),
  expiresAt: z.date(),
});

export type Invite = z.infer<typeof inviteSchema>;
