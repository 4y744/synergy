import z from "zod";

export const NewMemberSchema = z.object({
  inviteId: z.string(),
});

export type NewMember = z.infer<typeof NewMemberSchema>;
