import z from "zod";

export const UserSchema = z.object({
  uid: z.string(),
  username: z.string(),
  created: z.date(),
});

export type User = z.infer<typeof UserSchema>;
