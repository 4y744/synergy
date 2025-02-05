import z from "zod";

export const inviteSchema = z.object({
  id: z.string().min(1, "form/invalid-invite"),
  expiresAt: z.date(),
});

export type Invite = z.infer<typeof inviteSchema>;
