import z from "zod";

export const InviteSchema = z.object({
  id: z.string().min(1, "form/invalid-invite"),
  expiresAt: z.date(),
});

export const NewInviteSchema = z.object({
  expiresAt: z.date(),
});

export type Invite = z.infer<typeof InviteSchema>;

export type NewInvite = z.infer<typeof NewInviteSchema>;
