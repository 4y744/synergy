import z from "zod";

export const UserSchema = z.object({
  uid: z.string(),
  username: z.string(),
  createdAt: z.date(),
});

export const NewUserSchema = z.object({
  username: z.string(),
});

export type User = z.infer<typeof UserSchema>;

export type NewUser = z.infer<typeof NewUserSchema>;
